export type ReportData = {
  generatedAt: string;

  totals: {
    countries: number;
    currencies: number;
    languages: number;
  };

  topCurrencies: Array<{
    code: string;
    name: string;
    countriesCount: number;
  }>;

  topLanguages: Array<{
    isoCode: string;
    name: string;
    countriesCount: number;
  }>;

  continents: Array<{
    code: string;
    name: string;
    countriesCount: number;
  }>;
};