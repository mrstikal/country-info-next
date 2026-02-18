"use client";

import Image from "next/image";
import type { FullCountryInfo } from "@/types/country";

type Props = {
  iso2?: string;
  country: FullCountryInfo;
};

export default function CountryOverview({iso2, country}: Props) {
  const currencyText =
    country.currencyName && country.currencyIsoCode
      ? `${country.currencyName} (${country.currencyIsoCode})`
      : country.currencyName
        ? country.currencyName
        : country.currencyIsoCode
          ? country.currencyIsoCode
          : "—";

  const languagesText =
    country.languages && country.languages.length
      ? country.languages.map((l) => `${l.name} (${l.isoCode})`).join(", ")
      : "—";

  return (
    <div className="w-full max-w-md text-lg leading-8 text-zinc-600 space-y-3">
      <p>
        Country:&nbsp;
        <span className="font-semibold text-indigo-900">
          {country.name}
        </span>
        {iso2 ? (
          <span className="text-zinc-500"> ({iso2})</span>
        ) : null}
      </p>

      <table className="text-base leading-7">
        <tbody>
        <tr>
          <td className="table-td-left">Capital:</td>
          <td className="table-td-right">{country.capitalCity ?? "—"}</td>
        </tr>
        <tr>
          <td className="table-td-left">Currency:</td>
          <td className="table-td-right">{currencyText ?? "—"}</td>
        </tr>
        <tr>
          <td className="table-td-left">Languages:</td>
          <td className="table-td-right">{languagesText ?? "—"}</td>
        </tr>
        <tr>
          <td className="table-td-left">Phone code:</td>
          <td className="table-td-right">{country.phoneCode ?? "—"}</td>
        </tr>
        <tr>
          <td className="table-td-left">Continent:</td>
          <td className="table-td-right">{country.continentCode ?? "—"}</td>
        </tr>
        </tbody>
      </table>

      {country.flagUrl ? (
        <div className="pt-2">
          <p className="text-sm text-zinc-500">Flag</p>
          <div className="relative mt-2 h-24 w-40 overflow-hidden bg-white">
            <Image
              src={country.flagUrl}
              alt={`Flag of ${country.name}`}
              fill
              sizes="160px"
              className="object-contain object-left"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}