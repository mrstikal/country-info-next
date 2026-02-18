import { CountryListItem } from "@/types/country";

export type LanguageRow = {
  isoCode: string;
  name: string;
  countries: CountryListItem[];
};