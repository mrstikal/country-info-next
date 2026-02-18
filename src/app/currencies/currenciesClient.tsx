"use client";

import { useCallback, useRef, useState } from "react";
import type { CurrencyRow } from "@/types/currency";
import type { CountryDialogHandle } from "@/types/country";
import CountryDialog from "@/components/CountryDialog";
import FilterBar from "@/components/FilterBar";
import CountryChips from "@/components/CountryChips";
import { useTextFilter } from "@/hooks/useTextFilter";
import DataTable from "@/components/DataTable";

type Props = {
  rows: CurrencyRow[];
};

export default function CurrenciesClient({rows}: Props) {
  const [query, setQuery] = useState("");
  const dialogRef = useRef<CountryDialogHandle | null>(null);

  const getHaystack = useCallback(
    (r: CurrencyRow) =>
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
        placeholder="Search in name, code, countries…"
        shown={filtered.length}
        total={rows.length}
      />

      <DataTable
        headers={[
          { key: "code", content: "Code" },
          { key: "name", content: "Currency name" },
          { key: "countries", content: "Countries" },
        ]}
        isEmpty={!filtered.length}
        emptyColSpan={3}
      >
        {filtered.map((r) => (
          <tr key={r.code} className="hover:bg-indigo-50/60">
            <td className="table-currencies-td">{r.code}</td>
            <td className="table-currencies-td">{r.name}</td>
            <td className="table-currencies-td">
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