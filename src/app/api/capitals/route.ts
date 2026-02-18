import { getCountries } from "@/lib/soap-adapter/integrations/country";
import { getCapitalCity } from "@/lib/soap-adapter/integrations/capitals";
import type { CapitalRow } from "@/types/capital";

import { mapWithConcurrency } from "@/lib/utils/concurrency";
import { jsonBadGateway, jsonOk } from "@/app/api/_utils";

export async function GET() {
  try {
    const countries = await getCountries();

    const rows: CapitalRow[] = await mapWithConcurrency(
      countries,
      10,
      async (c) => ({
        capital: await getCapitalCity(c.iso2),
        country: c,
      })
    );

    const sorted = rows
      .map((r) => ({
        ...r,
        capital: String(r.capital ?? "").trim(),
      }))
      .filter((r) => r.country?.iso2?.length === 2 && r.country?.name?.length)
      .sort((a, b) => {
        const byCapital = (a.capital || "—").localeCompare(b.capital || "—");
        if (byCapital !== 0) return byCapital;
        return a.country.name.localeCompare(b.country.name);
      });

    return jsonOk({ rows: sorted });
  } catch {
    return jsonBadGateway("Capitals service temporarily unavailable.");
  }
}