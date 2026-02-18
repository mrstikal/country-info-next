import "server-only";
import { buildSoapBody } from "@/lib/soap-adapter/helpers";
import { NS } from "@/constants";

export function buildCountryNameBody(countryIso2: string): string {
  const content = `<sCountryISOCode>${countryIso2}</sCountryISOCode>`;
  return buildSoapBody("CountryName", content, NS);
}

export function buildFullCountryInfoBody(countryIso2: string): string {
  const content = `<sCountryISOCode>${countryIso2}</sCountryISOCode>`;
  return buildSoapBody("FullCountryInfo", content, NS);
}

export function buildListOfCountryNamesByCodeBody(): string {
  return buildSoapBody("ListOfCountryNamesByCode", "", NS);
}