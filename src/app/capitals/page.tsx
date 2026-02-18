import { type CapitalRow } from "@/types/capital";
import CapitalsClient from "./capitalsClient";
import { getBaseUrl } from "@/helpers/getBaseUrl";

export default async function CapitalsPage() {
  const baseUrl = await getBaseUrl();

  const res = await fetch(`${baseUrl}/api/capitals`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to load capitals data.");
  }

  const data = (await res.json()) as { rows: CapitalRow[] };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-6">
        <h1 className="page-heading">
          Capitals
        </h1>

        <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-6">
          <CapitalsClient rows={data.rows}/>
        </div>
      </div>
    </div>
  );
}