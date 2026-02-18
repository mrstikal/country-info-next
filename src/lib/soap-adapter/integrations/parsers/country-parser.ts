import type { FullCountryInfo, CountryLanguage } from "@/types/country";
import type {
  CountryNameSoapBody,
  FullCountryInfoSoapBody,
  ListOfCountryNamesByCodeSoapBody,
} from "@/types/soap-bodies";

import type { CountryListItem } from "@/types/country";

import { mapAndFilter } from "@/lib/soap-adapter/helpers";

export function parseCountryName(body: CountryNameSoapBody): string {
  return body?.CountryNameResponse?.CountryNameResult as string ?? "";
}

export function parseFullCountryInfo(body: FullCountryInfoSoapBody): FullCountryInfo {
  const res = body?.FullCountryInfoResponse?.FullCountryInfoResult;
  const langItems = res?.Languages?.tLanguage;

  const languages: CountryLanguage[] = mapAndFilter(
    langItems,
    (x: { sName?: unknown; sISOCode?: unknown }) => ({
      name: String(x?.sName ?? "").trim(),
      isoCode: String(x?.sISOCode ?? "").trim(),
    }),
    (x) => x.name.length > 0 && x.isoCode.length > 0
  );

  return {
    name: res?.sName as string ?? "",
    capitalCity: res?.sCapitalCity as string ?? "",
    phoneCode: res?.sPhoneCode as string ?? "",
    continentCode: res?.sContinentCode as string ?? "",
    currencyIsoCode: res?.sCurrencyISOCode as string ?? "",
    currencyName: res?.sCurrencyName as string ?? "",
    flagUrl: res?.sCountryFlag as string ?? "",
    languages: languages.length ? languages : undefined,
  };
}

export function parseCountriesList(body: ListOfCountryNamesByCodeSoapBody): CountryListItem[] {
  const items =
    body?.ListOfCountryNamesByCodeResponse?.ListOfCountryNamesByCodeResult?.tCountryCodeAndName;

  return mapAndFilter(
    items,
    (x: { sISOCode?: unknown; sName?: unknown }) => ({
      iso2: String((x?.sISOCode as string) ?? "")
        .trim()
        .toUpperCase(),
      name: String((x?.sName as string) ?? "").trim(),
    }),
    (x) => x.iso2.length === 2 && x.name.length > 0,
    (a, b) => a.name.localeCompare(b.name)
  );
}