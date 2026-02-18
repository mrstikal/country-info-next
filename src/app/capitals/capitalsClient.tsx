"use client";

import { useCallback, useRef, useState } from "react";
import type { CapitalRow } from "@/types/capital";
import type { CountryDialogHandle } from "@/types/country";
import CountryDialog from "@/components/CountryDialog";
import FilterBar from "@/components/FilterBar";
import { useTextFilter } from "@/hooks/useTextFilter";
import DataTable from "@/components/DataTable";

type Props = {
  rows: CapitalRow[];
};

export default function CapitalsClient({rows}: Props) {
  const [query, setQuery] = useState("");
  const dialogRef = useRef<CountryDialogHandle | null>(null);

  const getHaystack = useCallback(
    (r: CapitalRow) => `${r.capital} ${r.country.name} ${r.country.iso2}`,
    []
  );

  const filtered = useTextFilter(rows, query, getHaystack);

  return (
    <div className="grid gap-4">
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        placeholder="Search in capital, country name, ISO…"
        shown={filtered.length}
        total={rows.length}
      />

      <DataTable
        headers={[
          { key: "capital", content: "Capital" },
          { key: "country", content: "Country" },
          { key: "iso", content: "ISO" },
        ]}
        isEmpty={!filtered.length}
        emptyColSpan={3}
      >
        {filtered.map((r) => (
          <tr
            key={`${r.country.iso2}:${r.capital}`}
            className="hover:bg-indigo-50/60"
          >
            <td className="table-currencies-td text-zinc-900">
              {r.capital || "—"}
            </td>

            <td className="table-currencies-td">
              <button
                type="button"
                onClick={() => dialogRef.current?.open(r.country.iso2)}
                className="country-button"
                title={`Open details: ${r.country.name} (${r.country.iso2})`}
              >
                {r.country.name}
              </button>
            </td>

            <td className="table-currencies-td font-mono text-zinc-900">
              {r.country.iso2}
            </td>
          </tr>
        ))}
      </DataTable>

      <CountryDialog ref={dialogRef} />
    </div>
  );
}