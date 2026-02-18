import "server-only";

export async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  mapper: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function worker() {
    while (true) {
      const i = index++;
      if (i >= items.length) return;
      results[i] = await mapper(items[i]);
    }
  }

  const workers = Array.from(
    {length: Math.max(1, Math.min(limit, items.length))},
    () => worker()
  );

  await Promise.all(workers);
  return results;
}