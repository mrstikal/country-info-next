import { XMLParser } from "fast-xml-parser";
import { SoapFault } from "@/types/soap";
import SoapError from "./SoapError";

export interface SoapResponse {
  Envelope?: {
    Body?: Record<string, unknown>;
    Fault?: SoapFault;
  };
}

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true,
});

export function parseSoapResponse(text: string): SoapResponse {
  try {
    return parser.parse(text) as SoapResponse;
  } catch (err) {
    throw new SoapError("Failed to parse SOAP XML response.", {
      kind: "PARSE_ERROR",
      cause: err,
    });
  }
}

export function handleSoapFault(data: SoapResponse, endpoint: string, soapAction: string): void {
  const fault: SoapFault | undefined =
    (data?.Envelope?.Body?.Fault as SoapFault | undefined) ??
    (data?.Envelope?.Body?.fault as SoapFault | undefined);

  if (fault?.faultstring) {
    throw new SoapError(`SOAP Fault: ${fault.faultstring}`, {
      kind: "SOAP_FAULT",
      soapFault: fault,
      endpoint,
      soapAction,
    });
  }
}

export function extractSoapBody(data: SoapResponse, endpoint: string, soapAction: string): Record<string, unknown> {
  const body = data?.Envelope?.Body;
  if (!body) {
    throw new SoapError("Unexpected SOAP response shape (Body missing).", {
      kind: "UNEXPECTED_RESPONSE",
      endpoint,
      soapAction,
    });
  }
  return body;
}