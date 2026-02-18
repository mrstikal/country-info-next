export type SoapFault = {
  faultcode?: string;
  faultstring?: string;
};

export type SoapErrorKind =
  | "HTTP_ERROR"
  | "SOAP_FAULT"
  | "TIMEOUT"
  | "NETWORK_ERROR"
  | "PARSE_ERROR"
  | "UNEXPECTED_RESPONSE";

export type SoapClientOptions = {
  endpoint: string;
  soapAction: string;
  bodyXml: string;
  cache?: RequestCache;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
  timeoutMs?: number;
  retries?: number;
  headers?: Record<string, string>;
};