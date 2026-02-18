// src/types/soap-bodies.ts
export type MaybeArray<T> = T | T[];

export type CapitalCitySoapBody = {
  CapitalCityResponse?: {
    CapitalCityResult?: unknown;
  };
};

export type CountryNameSoapBody = {
  CountryNameResponse?: {
    CountryNameResult?: unknown;
  };
};

export type FullCountryInfoSoapBody = {
  FullCountryInfoResponse?: {
    FullCountryInfoResult?: {
      sName?: unknown;
      sCapitalCity?: unknown;
      sPhoneCode?: unknown;
      sContinentCode?: unknown;
      sCurrencyISOCode?: unknown;
      sCurrencyName?: unknown;
      sCountryFlag?: unknown;
      Languages?: {
        tLanguage?: MaybeArray<{
          sName?: unknown;
          sISOCode?: unknown;
        }>;
      };
    };
  };
};

export type ListOfCountryNamesByCodeSoapBody = {
  ListOfCountryNamesByCodeResponse?: {
    ListOfCountryNamesByCodeResult?: {
      tCountryCodeAndName?: MaybeArray<{
        sISOCode?: unknown;
        sName?: unknown;
      }>;
    };
  };
};

export type ListOfCurrenciesByCodeSoapBody = {
  ListOfCurrenciesByCodeResponse?: {
    ListOfCurrenciesByCodeResult?: {
      tCurrency?: MaybeArray<{
        sISOCode?: unknown;
        sName?: unknown;
      }>;
    };
  };
};

export type CountriesUsingCurrencySoapBody = {
  CountriesUsingCurrencyResponse?: {
    CountriesUsingCurrencyResult?: {
      tCountryCodeAndName?: MaybeArray<{
        sISOCode?: unknown;
        sName?: unknown;
      }>;
    };
  };
};

export type ListOfContinentsByCodeSoapBody = {
  ListOfContinentsByCodeResponse?: {
    ListOfContinentsByCodeResult?: {
      tContinent?: MaybeArray<{
        sCode?: unknown;
        sName?: unknown;
      }>;
    };
  };
};

export type FullCountryInfoAllCountriesSoapBody = {
  FullCountryInfoAllCountriesResponse?: {
    FullCountryInfoAllCountriesResult?: {
      tCountryInfo?: MaybeArray<{
        sISOCode?: unknown;
        sName?: unknown;
        sContinentCode?: unknown;
        Languages?: {
          tLanguage?: MaybeArray<{
            sISOCode?: unknown;
            sName?: unknown;
          }>;
        };
      }>;
    };
  };
};