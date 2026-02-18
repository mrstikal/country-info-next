import type {CountryListItem} from "@/types/country";

export type CurrencyListItem = {
  code: string;
  name: string;
};

export type CurrencyRow = {
  name: string;
  code: string;
  countries: CountryListItem[];
};

