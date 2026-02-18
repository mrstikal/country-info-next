export type CountryListItem = {
  iso2: string;
  name: string;
};

export type CountryDialogHandle = {
  open: (iso2: string) => void;
  close: () => void;
};

export type CountryLanguage = {
  name: string;
  isoCode: string;
};

export type FullCountryInfo = {
  name: string;
  capitalCity?: string;
  phoneCode?: string;
  continentCode?: string;
  currencyIsoCode?: string;
  currencyName?: string;
  flagUrl?: string;
  languages?: CountryLanguage[];
};