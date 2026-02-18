import { headers } from "next/headers";
import type { LanguageRow } from "@/types/language";
import LanguagesClient from "./languagesClient";

async function getBaseUrl() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) throw new Error("Missing Host header.");
  return `${proto}://${host}`;
}

export default async function LanguagesPage() {
  const baseUrl = await getBaseUrl();

  const res = await fetch(`${baseUrl}/api/languages`, {cache: "force-cache"});
  if (!res.ok) throw new Error("Failed to load languages data.");

  const data = (await res.json()) as { rows: LanguageRow[] };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-6">
        <h1 className="page-heading">
          Languages
        </h1>

        <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
          <LanguagesClient rows={data.rows}/>
        </div>
      </div>
    </div>
  );
}