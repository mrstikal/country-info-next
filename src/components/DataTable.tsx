"use client";

import type { ReactNode } from "react";

export type DataTableHeader = {
  key: string;
  content: ReactNode;
  className?: string;
};

type Props = {
  headers: DataTableHeader[];
  children: ReactNode;
  isEmpty: boolean;
  emptyColSpan?: number;
  emptyText?: string;
};

export default function DataTable({
                                    headers,
                                    children,
                                    isEmpty,
                                    emptyColSpan,
                                    emptyText = "No results.",
                                  }: Props) {
  const colSpan = emptyColSpan ?? Math.max(1, headers.length);

  return (
    <div className="rounded-md border border-zinc-200">
      <table className="min-w-full border-separate border-spacing-0 relative">
        <thead>
        <tr className="bg-zinc-50">
          {headers.map((h) => (
            <th key={h.key} className={["sticky-header", h.className].filter(Boolean).join(" ")}>
              {h.content}
            </th>
          ))}
        </tr>
        </thead>

        <tbody>
        {children}

        {isEmpty ? (
          <tr>
            <td colSpan={colSpan} className="px-4 py-8 text-center text-sm text-zinc-600">
              {emptyText}
            </td>
          </tr>
        ) : null}
        </tbody>
      </table>
    </div>
  );
}