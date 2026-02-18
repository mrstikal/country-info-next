import { CurrencyListItem } from "@/types/currency";
import { CountryListItem } from "@/types/country";
import type {
  CountriesUsingCurrencySoapBody,
  ListOfCurrenciesByCodeSoapBody,
} from "@/types/soap-bodies";

import { mapAndFilter } from "@/lib/soap-adapter/helpers";

export function parseCurrencies(body: ListOfCurrenciesByCodeSoapBody): CurrencyListItem[] {
  const items = body?.ListOfCurrenciesByCodeResponse?.ListOfCurrenciesByCodeResult?.tCurrency;
  return mapAndFilter(
    items,
    (x: { sISOCode?: unknown; sName?: unknown }) => ({
      code: String(x?.sISOCode as string ?? "").trim(),
      name: String(x?.sName as string ?? "").trim(),
    }),
    (x) => x.code.length > 0 && x.name.length > 0,
    (a, b) => a.code.localeCompare(b.code)
  );
}

export function parseCountriesUsingCurrency(body: CountriesUsingCurrencySoapBody): CountryListItem[] {
  const items = body?.CountriesUsingCurrencyResponse?.CountriesUsingCurrencyResult?.tCountryCodeAndName;
  return mapAndFilter(
    items,
    (x: { sISOCode?: unknown; sName?: unknown }) => ({
      iso2: String(x?.sISOCode as string ?? "").trim(),
      name: String(x?.sName as string ?? "").trim(),
    }),
    (x) => x.iso2.length === 2 && x.name.length > 0,
    (a, b) => a.name.localeCompare(b.name)
  );
}