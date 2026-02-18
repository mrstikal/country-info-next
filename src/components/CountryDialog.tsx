"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import type { FullCountryInfo, CountryDialogHandle } from "@/types/country";
import CountryOverview from "@/components/CountryOverview";

const CountryDialog = forwardRef<CountryDialogHandle>(function CountryDialog(
  _props,
  ref
) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [iso2, setIso2] = useState<string | null>(null);
  const [country, setCountry] = useState<FullCountryInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function open(nextIso2: string) {
    const code = nextIso2.trim().toUpperCase();

    setIso2(code);
    setCountry(null);
    setError(null);
    setLoading(true);

    dialogRef.current?.showModal();

    try {
      const res = await fetch(`/api/country/${code}`, {
        method: "GET",
        headers: {Accept: "application/json"},
      });

      const data = (await res.json()) as
        | { iso2: string; country: FullCountryInfo }
        | { error: string };

      if (!res.ok || "error" in data) {
        throw new Error("error" in data ? data.error : "Request failed.");
      }

      setCountry(data.country);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed.");
    } finally {
      setLoading(false);
    }
  }

  function close() {
    dialogRef.current?.close();
    setIso2(null);
    setCountry(null);
    setError(null);
    setLoading(false);
  }

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    []
  );

  return (
    <dialog
      ref={dialogRef}
      onClose={close}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      className="w-[min(92vw,720px)] rounded-lg border border-zinc-200 p-0 shadow-xl backdrop:bg-black/30"
    >
      <div className="border-b border-zinc-200 bg-white px-5 py-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-zinc-500">Country details</p>
        </div>

        <button
          type="button"
          onClick={close}
          className="rounded-md border border-zinc-300 bg-white px-3 py-0 text-zinc-600 hover:bg-indigo-50 cursor-pointer text-xl leading-7"
        >
          &times;
        </button>
      </div>

      <div className="bg-white px-5 py-5">
        {loading ? (
          <p className="text-zinc-600">Loading details…</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : country ? (
          <CountryOverview iso2={iso2 ?? undefined} country={country}/>
        ) : (
          <p className="text-zinc-600">No data available.</p>
        )}
      </div>
    </dialog>
  );
});

export default CountryDialog;