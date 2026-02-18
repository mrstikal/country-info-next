import { type CurrencyRow } from "@/types/currency";
import CurrenciesClient from "./currenciesClient";
import { getBaseUrl } from "@/helpers/getBaseUrl";

export default async function CurrenciesPage() {
  const baseUrl = await getBaseUrl();

  const res = await fetch(`${baseUrl}/api/currencies`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to load currencies data.");
  }

  const data = (await res.json()) as { rows: CurrencyRow[] };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-6">
        <h1 className="page-heading">
          Currencies
        </h1>

        <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
          <CurrenciesClient rows={data.rows}/>
        </div>
      </div>
    </div>
  );
}