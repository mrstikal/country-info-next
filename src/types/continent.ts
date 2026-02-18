import type { CountryListItem } from "@/types/country";

export type ContinentRow = {
  code: string;
  name: string;
  countries: CountryListItem[];
};

export type ContinentByCode = {
  code: string;
  name: string;
}

export type CountriesWithContinent = {
  iso2: string;
  name: string;
  continentCode: string;
}