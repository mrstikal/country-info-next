import type { ReportData } from "@/types/report";
import { getBaseUrl } from "@/helpers/getBaseUrl";

export default async function ReportPage() {
  const baseUrl = await getBaseUrl();

  const res = await fetch(`${baseUrl}/api/report`, {cache: "force-cache"});
  if (!res.ok) throw new Error("Failed to load report.");

  const data = (await res.json()) as ReportData;

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="page-heading">
              Report
            </h1>
            <p className="mt-3 text-zinc-600">
              Generated at:{" "}
              <span className="font-mono">{data.generatedAt}</span>
            </p>
          </div>

          <a
            href="/api/report"
            className="inline-flex items-center justify-center rounded-md border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-50"
          >
            Export JSON
          </a>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Countries</p>
            <p className="mt-1 text-3xl font-semibold text-zinc-950">
              {data.totals.countries}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Currencies</p>
            <p className="mt-1 text-3xl font-semibold text-zinc-950">
              {data.totals.currencies}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Languages</p>
            <p className="mt-1 text-3xl font-semibold text-zinc-950">
              {data.totals.languages}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-lg border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-zinc-950">
              Top currencies (by countries)
            </h2>

            <div className="mt-4 overflow-x-auto rounded-md border border-zinc-200">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                <tr className="bg-zinc-50">
                  <th className="sticky-header">Code</th>
                  <th className="sticky-header">Name</th>
                  <th className="sticky-header text-right!">Countries</th>
                </tr>
                </thead>
                <tbody>
                {data.topCurrencies.map((r) => (
                  <tr key={r.code} className="hover:bg-indigo-50/60">
                    <td className="table-currencies-td font-mono">{r.code}</td>
                    <td className="table-currencies-td">{r.name}</td>
                    <td className="table-currencies-td text-right font-mono">
                      {r.countriesCount}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-lg border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-zinc-950">
              Top languages (by countries)
            </h2>

            <div className="mt-4 overflow-x-auto rounded-md border border-zinc-200">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                <tr className="bg-zinc-50">
                  <th className="sticky-header">ISO</th>
                  <th className="sticky-header">Name</th>
                  <th className="sticky-header text-right!">Countries</th>
                </tr>
                </thead>
                <tbody>
                {data.topLanguages.map((r) => (
                  <tr key={r.isoCode} className="hover:bg-indigo-50/60">
                    <td className="table-currencies-td font-mono">{r.isoCode}</td>
                    <td className="table-currencies-td">{r.name}</td>
                    <td className="table-currencies-td text-right font-mono">
                      {r.countriesCount}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section className="mt-10 rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-950">
            Continents (countries count)
          </h2>

          <div className="mt-4 overflow-x-auto rounded-md border border-zinc-200">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
              <tr className="bg-zinc-50">
                <th className="sticky-header">Continent</th>
                <th className="sticky-header">Code</th>
                <th className="sticky-header text-right!">Countries</th>
              </tr>
              </thead>
              <tbody>
              {data.continents.map((r) => (
                <tr key={r.code} className="hover:bg-indigo-50/60">
                  <td className="table-currencies-td">{r.name}</td>
                  <td className="table-currencies-td font-mono">{r.code}</td>
                  <td className="table-currencies-td text-right font-mono">
                    {r.countriesCount}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}