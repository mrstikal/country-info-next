"use client";

type Props = {
  label?: string;
  placeholder?: string;
  query: string;
  onQueryChange: (value: string) => void;
  shown: number;
  total: number;
};

export default function FilterBar({
                                    label = "Filter",
                                    placeholder = "Search…",
                                    query,
                                    onQueryChange,
                                    shown,
                                    total,
                                  }: Props) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="w-full max-w-md">
        <label className="mb-2 block text-sm font-medium text-zinc-700">
          {label}
        </label>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="styled-input"
        />
      </div>

      <div className="text-sm text-zinc-600">
        Showing <span className="font-medium text-zinc-950">{shown}</span> /{" "}
        {total}
      </div>
    </div>
  );
}