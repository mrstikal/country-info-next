"use client";

import { useCallback, useRef, useState } from "react";
import type { ContinentRow } from "@/types/continent";
import type { CountryDialogHandle } from "@/types/country";
import CountryDialog from "@/components/CountryDialog";
import FilterBar from "@/components/FilterBar";
import CountryChips from "@/components/CountryChips";
import { useTextFilter } from "@/hooks/useTextFilter";
import DataTable from "@/components/DataTable";

type Props = {
  rows: ContinentRow[];
};

export default function ContinentsClient({rows}: Props) {
  const [query, setQuery] = useState("");
  const dialogRef = useRef<CountryDialogHandle | null>(null);

  const getHaystack = useCallback(
    (r: ContinentRow) =>
      `${r.name} ${r.code} ${r.countries
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
        placeholder="Search in continent, code, countries…"
        shown={filtered.length}
        total={rows.length}
      />

      <DataTable
        headers={[
          { key: "continent", content: "Continent" },
          { key: "code", content: "Code" },
          { key: "count", content: "Countries", className: "text-right" },
          { key: "list", content: "Country list" },
        ]}
        isEmpty={!filtered.length}
        emptyColSpan={4}
      >
        {filtered.map((r) => (
          <tr key={r.code} className="hover:bg-indigo-50/60">
            <td className="table-currencies-td text-zinc-900">{r.name}</td>

            <td className="table-currencies-td font-mono text-zinc-900">
              {r.code}
            </td>

            <td className="table-currencies-td text-right font-mono text-zinc-900">
              {r.countries.length}
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