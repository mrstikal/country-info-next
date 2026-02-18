"use client";

import type { CountryListItem } from "@/types/country";

type Props = {
  countries: CountryListItem[];
  onOpen: (iso2: string) => void;
  emptyText?: string;
};

export default function CountryChips({
                                       countries,
                                       onOpen,
                                       emptyText = "—",
                                     }: Props) {
  if (!countries.length) return <>{emptyText}</>;

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1">
      {countries.map((c) => (
        <button
          key={c.iso2}
          type="button"
          onClick={() => onOpen(c.iso2)}
          className="country-button"
          title={`Open details: ${c.name} (${c.iso2})`}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}