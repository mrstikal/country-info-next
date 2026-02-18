import { headers } from "next/headers";
import { getFullCountryInfo } from "@/lib/soap-adapter/integrations/country";
import CountryOverview from "@/components/CountryOverview";

async function guessIso2FromHeaders(): Promise<string> {
  const h = await headers();

  const candidates = [
    h.get("x-vercel-ip-country"),
    h.get("cf-ipcountry"),
    h.get("x-country"),
  ]
    .filter(Boolean)
    .map((v) => String(v).trim().toUpperCase());

  const iso2 = candidates[0];
  if (iso2 && iso2.length === 2) return iso2;

  return "CZ";
}

export default async function Home() {
  const iso2 = await guessIso2FromHeaders();
  const full = await getFullCountryInfo(iso2);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main
        className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between pb-32 pt-4 px-6 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
          <h1 className="max-w-3xl text-3xl font-semibold leading-10 tracking-tight text-black">
            Based on the information provided by your browser, your current country code is {iso2}
          </h1>

          <div className="w-full max-w-md text-lg leading-8 text-zinc-600">
            <p>
              Detected ISO2:&nbsp;
              <span className="font-semibold text-zinc-950">
                {iso2}
              </span>
            </p>

            <CountryOverview iso2={iso2} country={full}/>
          </div>
        </div>
      </main>
    </div>
  );
}