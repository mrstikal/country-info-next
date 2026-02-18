import { SoapErrorKind, SoapFault } from "@/types/soap";

export default class SoapError extends Error {
  kind: SoapErrorKind;
  status?: number;
  statusText?: string;
  soapFault?: SoapFault;
  endpoint?: string;
  soapAction?: string;
  cause?: unknown;

  constructor(
    message: string,
    details: {
      kind: SoapErrorKind;
      status?: number;
      statusText?: string;
      soapFault?: SoapFault;
      endpoint?: string;
      soapAction?: string;
      cause?: unknown;
    }
  ) {
    super(message);
    this.name = "SoapError";
    this.kind = details.kind;
    this.status = details.status;
    this.statusText = details.statusText;
    this.soapFault = details.soapFault;
    this.endpoint = details.endpoint;
    this.soapAction = details.soapAction;
    this.cause = details.cause;
  }
}