"use client";

import { useDeferredValue, useMemo } from "react";

export function useTextFilter<T>(
  items: readonly T[],
  query: string,
  getText: (item: T) => string
): T[] {
  const deferredQuery = useDeferredValue(query);

  return useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) return [...items];

    return items.filter((item) => getText(item).toLowerCase().includes(q));
  }, [deferredQuery, items, getText]);
}