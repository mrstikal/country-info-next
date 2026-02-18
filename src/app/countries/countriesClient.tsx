"use client";

import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import type { CountryListItem, FullCountryInfo } from "@/types/country";
import CountryOverview from "@/components/CountryOverview";
import { selectClassNames } from "@/helpers/selectClassNames";

type Props = {
  countries: CountryListItem[];
};

type Option = { value: string; label: string };

export default function CountriesClient({countries}: Props) {
  const optionsByName = useMemo<Option[]>(
    () => countries.map((c) => ({value: c.iso2, label: c.name})),
    [countries]
  );

  const optionsByIso = useMemo<Option[]>(
    () =>
      [...countries]
        .sort((a, b) => a.iso2.localeCompare(b.iso2))
        .map((c) => ({value: c.iso2, label: c.iso2})),
    [countries]
  );

  const mapIsoToName = useMemo(() => {
    const m = new Map<string, string>();
    for (const c of countries) m.set(c.iso2, c.name);
    return m;
  }, [countries]);

  const [selectedIso2, setSelectedIso2] = useState<string | null>(null);
  const [country, setCountry] = useState<FullCountryInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [nameQuery, setNameQuery] = useState("");
  const [isoQuery, setIsoQuery] = useState("");

  const selectedNameOption = useMemo<Option | null>(() => {
    if (!selectedIso2) return null;
    const name = mapIsoToName.get(selectedIso2);
    return name ? {value: selectedIso2, label: name} : null;
  }, [mapIsoToName, selectedIso2]);

  const selectedIsoOption = useMemo<Option | null>(() => {
    if (!selectedIso2) return null;
    return {value: selectedIso2, label: selectedIso2};
  }, [selectedIso2]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const code = String(selectedIso2 ?? "").trim().toUpperCase();

      if (!code) {
        setCountry(null);
        setError(null);
        setLoading(false);
        return;
      }

      if (!/^[A-Z]{2}$/.test(code)) {
        setCountry(null);
        setError(`Invalid ISO2 code: "${code}"`);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/country/${encodeURIComponent(code)}`, {
          method: "GET",
          headers: {Accept: "application/json"},
        });

        const data = (await res.json()) as
          | { iso2: string; country: FullCountryInfo }
          | { error: string };

        if (!res.ok || "error" in data) {
          throw new Error("error" in data ? data.error : "Request failed.");
        }

        if (!cancelled) setCountry(data.country);
      } catch (e) {
        if (!cancelled) {
          setCountry(null);
          setError(e instanceof Error ? e.message : "Request failed.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [selectedIso2]);

  return (
    <div className="grid gap-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Name
          </label>

          <Select
            instanceId="country-by-name"
            options={optionsByName}
            value={selectedNameOption}
            onChange={(opt) => {
              setSelectedIso2(opt ? String(opt.value).trim().toUpperCase() : null);
              setNameQuery("");
            }}
            inputValue={nameQuery}
            onInputChange={(value, meta) => {
              if (meta.action === "input-change") setNameQuery(value);
              return value;
            }}
            isClearable={true}
            isSearchable
            placeholder="Find country by name…"
            unstyled
            classNames={selectClassNames}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            ISO code
          </label>

          <Select
            instanceId="country-by-iso"
            options={optionsByIso}
            value={selectedIsoOption}
            onChange={(opt) => {
              setSelectedIso2(opt ? String(opt.value).trim().toUpperCase() : null);
              setIsoQuery("");
            }}
            inputValue={isoQuery}
            onInputChange={(value, meta) => {
              if (meta.action === "input-change") setIsoQuery(value);
              return value;
            }}
            isClearable={true}
            isSearchable
            placeholder="Find country by ISO…"
            unstyled
            classNames={selectClassNames}
          />
        </div>
      </div>

      <div className="border-l-8 border-indigo-50 bg-white pl-5">
        {!selectedIso2 ? (
          <p className="text-zinc-600">
            Select a country in the drop-down menu above to view details.
          </p>
        ) : loading ? (
          <p className="text-zinc-600">Loading details…</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : country ? (
          <CountryOverview iso2={selectedIso2} country={country}/>
        ) : (
          <p className="text-zinc-600 ">No data available.</p>
        )}
      </div>
    </div>
  );
}