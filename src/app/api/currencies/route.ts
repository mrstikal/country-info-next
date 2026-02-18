import {
  getCurrencies,
  getCountriesUsingCurrency,
} from "@/lib/soap-adapter/integrations/currencies";
import type { CurrencyRow } from "@/types/currency";
import { mapWithConcurrency } from "@/lib/utils/concurrency";
import { jsonBadGateway, jsonOk } from "@/app/api/_utils";

export async function GET() {
  try {
    const currencies = await getCurrencies();

    const rows: CurrencyRow[] = await mapWithConcurrency(
      currencies,
      8,
      async (cur) => ({
        name: cur.name,
        code: cur.code,
        countries: await getCountriesUsingCurrency(cur.code),
      })
    );

    return jsonOk({ rows });
  } catch {
    return jsonBadGateway("Currencies service temporarily unavailable.");
  }
}