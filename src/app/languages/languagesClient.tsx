"use client";

import { useCallback, useRef, useState } from "react";
import type { LanguageRow } from "@/types/language";
import type { CountryDialogHandle } from "@/types/country";
import CountryDialog from "@/components/CountryDialog";
import FilterBar from "@/components/FilterBar";
import CountryChips from "@/components/CountryChips";
import { useTextFilter } from "@/hooks/useTextFilter";
import DataTable from "@/components/DataTable";

type Props = {
  rows: LanguageRow[];
};

export default function LanguagesClient({rows}: Props) {
  const [query, setQuery] = useState("");
  const dialogRef = useRef<CountryDialogHandle | null>(null);

  const getHaystack = useCallback(
    (r: LanguageRow) =>
      `${r.name} ${r.isoCode} ${r.countries
        .map((c) => `${c.name} ${c.iso2}`)
        .join(" | ")}`,
    []
  );

  const filtered = useTextFilter(rows, query, getHaystack);

  return (
    <div className="grid gap-4">
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        placeholder="Search in language, ISO, countries…"
        shown={filtered.length}
        total={rows.length}
      />

      <DataTable
        headers={[
          { key: "lang", content: "Language" },
          { key: "iso", content: "ISO" },
          { key: "countries", content: "Countries" },
        ]}
        isEmpty={!filtered.length}
        emptyColSpan={3}
      >
        {filtered.map((r) => (
          <tr key={r.isoCode} className="hover:bg-indigo-50/60">
            <td className="table-currencies-td text-zinc-900">{r.name}</td>

            <td className="table-currencies-td font-mono text-zinc-900">
              {r.isoCode}
            </td>

            <td className="table-currencies-td text-zinc-700">
              <CountryChips
                countries={r.countries}
                onOpen={(iso2) => dialogRef.current?.open(iso2)}
              />
            </td>
          </tr>
        ))}
      </DataTable>

      <CountryDialog ref={dialogRef} />
    </div>
  );
}