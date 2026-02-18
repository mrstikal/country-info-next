import "server-only";
import { getCountries } from "@/lib/soap-adapter/integrations/country";
import {
  getCurrencies,
  getCountriesUsingCurrency,
} from "@/lib/soap-adapter/integrations/currencies";
import { getLanguagesRows } from "@/lib/soap-adapter/integrations/languages";
import { getContinentsRows } from "@/lib/soap-adapter/integrations/continents";
import type { CurrencyRow } from "@/types/currency";
import type { ReportData } from "@/types/report";
import { mapWithConcurrency } from "@/lib/utils/concurrency";

export async function generateReportData(): Promise<ReportData> {
  const [countries, currencies, languageRows, continentRows] =
    await Promise.all([
      getCountries(),
      getCurrencies(),
      getLanguagesRows(),
      getContinentsRows(),
    ]);

  const currencyRows: CurrencyRow[] = await mapWithConcurrency(
    currencies,
    8,
    async (cur) => ({
      name: cur.name,
      code: cur.code,
      countries: await getCountriesUsingCurrency(cur.code),
    })
  );

  const topCurrencies = currencyRows
    .map((r) => ({
      code: r.code,
      name: r.name,
      countriesCount: r.countries.length,
    }))
    .sort((a, b) => b.countriesCount - a.countriesCount || a.code.localeCompare(b.code))
    .slice(0, 10);

  const topLanguages = languageRows
    .map((r) => ({
      isoCode: r.isoCode,
      name: r.name,
      countriesCount: r.countries.length,
    }))
    .sort((a, b) => b.countriesCount - a.countriesCount || a.isoCode.localeCompare(b.isoCode))
    .slice(0, 10);

  const continents = continentRows
    .map((r) => ({
      code: r.code,
      name: r.name,
      countriesCount: r.countries.length,
    }))
    .sort((a, b) => b.countriesCount - a.countriesCount || a.code.localeCompare(b.code));

  return {
    generatedAt: new Date().toISOString(),
    totals: {
      countries: countries.length,
      currencies: currencies.length,
      languages: languageRows.length,
    },
    topCurrencies,
    topLanguages,
    continents,
  };
}