import { getCountries } from "@/lib/soap-adapter/integrations/country";
import CountriesClient from "./countriesClient";

export default async function CountriesPage() {
  const countries = await getCountries();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-6 pb-16">
        <h1 className="page-heading">
          Countries
        </h1>

        <p className="mt-3 text-lg text-zinc-600">
          Find/select a country by name or ISO code.
        </p>

        <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-6">
          <CountriesClient countries={countries}/>
        </div>
      </div>
    </div>
  );
}