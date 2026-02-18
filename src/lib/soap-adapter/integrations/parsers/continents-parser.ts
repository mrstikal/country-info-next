import type {
  ContinentRow,
  ContinentByCode,
  CountriesWithContinent
} from "@/types/continent";
import type {
  FullCountryInfoAllCountriesSoapBody,
  ListOfContinentsByCodeSoapBody
} from "@/types/soap-bodies";

import { mapAndFilter } from "@/lib/soap-adapter/helpers";

export function parseContinentsByCode(body: ListOfContinentsByCodeSoapBody): ContinentByCode[] {
  const items = body?.ListOfContinentsByCodeResponse?.ListOfContinentsByCodeResult?.tContinent;
  return mapAndFilter(
    items,
    (x: { sCode?: unknown; sName?: unknown }) => ({
      code: String(x?.sCode as string ?? "").trim().toUpperCase(),
      name: String(x?.sName as string ?? "").trim(),
    }),
    (x) => x.code.length > 0 && x.name.length > 0,
    (a, b) => a.code.localeCompare(b.code)
  );
}

export function parseCountriesWithContinent(body: FullCountryInfoAllCountriesSoapBody): CountriesWithContinent[] {
  const items = body?.FullCountryInfoAllCountriesResponse?.FullCountryInfoAllCountriesResult?.tCountryInfo;
  return mapAndFilter(
    items,
    (c: { sISOCode?: unknown; sName?: unknown; sContinentCode?: unknown }) => ({
      iso2: String(c?.sISOCode as string ?? "").trim().toUpperCase(),
      name: String(c?.sName as string ?? "").trim(),
      continentCode: String(c?.sContinentCode as string ?? "").trim().toUpperCase(),
    }),
    (x) => x.iso2.length === 2 && x.name.length > 0
  );
}

export async function parseContinentsRows(
  continents: ContinentByCode[],
  countries: CountriesWithContinent[]
): Promise<ContinentRow[]> {
  const byCode = new Map<string, ContinentRow>();
  for (const c of continents) {
    byCode.set(c.code, {code: c.code, name: c.name, countries: []});
  }

  const unknown: ContinentRow = {code: "??", name: "Unknown", countries: []};

  for (const c of countries) {
    const bucket = byCode.get(c.continentCode) ?? unknown;
    bucket.countries.push({iso2: c.iso2, name: c.name});
  }

  for (const row of byCode.values()) {
    row.countries.sort((a, b) => a.name.localeCompare(b.name));
  }
  unknown.countries.sort((a, b) => a.name.localeCompare(b.name));

  const rows = Array.from(byCode.values()).sort((a, b) => a.name.localeCompare(b.name));

  return unknown.countries.length ? [...rows, unknown] : rows;
}