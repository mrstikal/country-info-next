import { SoapErrorKind } from "@/types/soap";

export function buildSoapEnvelope(bodyXml: string): string {
  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    ${bodyXml}
  </soap:Body>
</soap:Envelope>`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isRetryableHttpStatus(status: number): boolean {
  return status === 502 || status === 503 || status === 504;
}

export function classifyNetworkError(err: unknown): SoapErrorKind {
  const name = (err as Record<string, unknown>)?.name;
  if (name === "AbortError") return "TIMEOUT";
  return "NETWORK_ERROR";
}