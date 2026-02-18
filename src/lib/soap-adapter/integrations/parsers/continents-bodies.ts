import "server-only";
import { buildSoapBody } from "@/lib/soap-adapter/helpers";
import { NS } from "@/constants";

export function buildListOfContinentsByCodeBody(): string {
  return buildSoapBody("ListOfContinentsByCode", "", NS);
}

export function buildFullCountryInfoAllCountriesBody(): string {
  return buildSoapBody("FullCountryInfoAllCountries", "", NS);
}