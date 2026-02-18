import "server-only";

import { SoapClientOptions } from "@/types/soap";
import SoapError from "./SoapError";
import {
  buildSoapEnvelope,
  sleep,
  isRetryableHttpStatus,
  classifyNetworkError,

} from "./utils";
import { parseSoapResponse, handleSoapFault, extractSoapBody } from "./parser";
import {
  DEFAULT_TIMEOUT_MS,
  DEFAULT_RETRIES,
  RETRY_DELAY_BASE_MS
} from "@/constants"

export async function soapRequest<TBody = unknown>(
  options: SoapClientOptions
): Promise<TBody> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const retries = options.retries ?? DEFAULT_RETRIES;
  const xml = buildSoapEnvelope(options.bodyXml);

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(options.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: options.soapAction,
          ...(options.headers ?? {}),
        },
        body: xml,
        cache: options.cache ?? "no-store",
        next: options.next,
        signal: controller.signal,
      });

      const text = await res.text();

      if (!res.ok) {
        if (attempt < retries && isRetryableHttpStatus(res.status)) {
          await sleep(RETRY_DELAY_BASE_MS * (attempt + 1));
          continue;
        }

        throw new SoapError(
          `SOAP HTTP error ${res.status} ${res.statusText}`,
          {
            kind: "HTTP_ERROR" as const,
            status: res.status,
            statusText: res.statusText,
            endpoint: options.endpoint,
            soapAction: options.soapAction,
          }
        );
      }

      const data = parseSoapResponse(text);
      handleSoapFault(data, options.endpoint, options.soapAction);
      const body = extractSoapBody(data, options.endpoint, options.soapAction);
      return body as TBody;

    } catch (err) {
      if (err instanceof SoapError) throw err;

      const kind = classifyNetworkError(err);

      if (
        attempt < retries &&
        (kind === "NETWORK_ERROR" || kind === "TIMEOUT")
      ) {
        await sleep(RETRY_DELAY_BASE_MS * (attempt + 1));
        continue;
      }

      throw new SoapError("SOAP request failed.", {
        kind,
        endpoint: options.endpoint,
        soapAction: options.soapAction,
        cause: err,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw new SoapError("Max retries exceeded.", {
    kind: "NETWORK_ERROR" as const,
    endpoint: options.endpoint,
    soapAction: options.soapAction,
  });
}

export async function soapRequestAndPick<TResult, TBody extends object = Record<string, unknown>>(
  options: SoapClientOptions,
  pick: (body: TBody) => TResult
): Promise<TResult> {
  const body = await soapRequest<TBody>(options);
  const result = pick(body);

  if (result === undefined || result === null) {
    throw new SoapError(
      "Unexpected SOAP response shape (picked value missing).",
      {
        kind: "UNEXPECTED_RESPONSE" as const,
        endpoint: options.endpoint,
        soapAction: options.soapAction,
      }
    );
  }

  return result;
}