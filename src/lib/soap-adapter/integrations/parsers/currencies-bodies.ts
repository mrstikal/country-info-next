import "server-only";
import { buildSoapBody } from "@/lib/soap-adapter/helpers";
import { NS } from "@/constants";

export function buildListOfCurrenciesByCodeBody(): string {
  return buildSoapBody("ListOfCurrenciesByCode", "", NS);
}

export function buildCountriesUsingCurrencyBody(currencyCode: string): string {
  const content = `<sISOCurrencyCode>${currencyCode}</sISOCurrencyCode>`;
  return buildSoapBody("CountriesUsingCurrency", content, NS);
}