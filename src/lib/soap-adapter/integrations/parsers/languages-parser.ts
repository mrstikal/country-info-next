import type { LanguageRow } from "@/types/language";
import type { FullCountryInfoAllCountriesSoapBody } from "@/types/soap-bodies";

import { mapAndFilter } from "@/lib/soap-adapter/helpers";

export function parseLanguagesRows(body: FullCountryInfoAllCountriesSoapBody): LanguageRow[] {
  const items = body?.FullCountryInfoAllCountriesResponse?.FullCountryInfoAllCountriesResult?.tCountryInfo;

  const countriesRaw = mapAndFilter(items, (c: any) => c);

  const langMap = new Map<
    string,
    { isoCode: string; name: string; countries: Map<string, string> }
  >();

  for (const c of countriesRaw) {
    const countryIso2 = String((c as any)?.sISOCode ?? "").trim().toUpperCase();
    const countryName = String((c as any)?.sName ?? "").trim();
    if (countryIso2.length !== 2 || !countryName) continue;

    const langItems = (c as any)?.Languages?.tLanguage;

    const langs = mapAndFilter(
      langItems,
      (l: { sISOCode?: unknown; sName?: unknown }) => ({
        isoCode: String(l?.sISOCode as string ?? "").trim(),
        name: String(l?.sName as string ?? "").trim(),
      }),
      (l) => l.isoCode.length > 0 && l.name.length > 0
    );

    for (const l of langs) {
      const key = l.isoCode.toUpperCase();
      if (!langMap.has(key)) {
        langMap.set(key, {
          isoCode: l.isoCode,
          name: l.name,
          countries: new Map<string, string>(),
        });
      }

      langMap.get(key)!.countries.set(countryIso2, countryName);
    }
  }

  const rows: LanguageRow[] = Array.from(langMap.values()).map((v) => ({
    isoCode: v.isoCode,
    name: v.name,
    countries: Array.from(v.countries.entries())
      .map(([iso2, name]) => ({iso2, name}))
      .sort((a, b) => a.name.localeCompare(b.name)),
  }));

  return rows.sort((a, b) => a.name.localeCompare(b.name));
}