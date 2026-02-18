import "server-only";
import { soapRequestAndPick } from "@/lib/soap-adapter";
import { NS } from "@/constants";

import type { LanguageRow } from "@/types/language";
import type { FullCountryInfoAllCountriesSoapBody } from "@/types/soap-bodies";

import { baseSoapOptions } from "@/lib/soap-adapter/helpers";

import {
  buildFullCountryInfoAllCountriesBody,
} from "@/lib/soap-adapter/integrations/parsers/languages-bodies";

import {
  parseLanguagesRows,
} from "@/lib/soap-adapter/integrations/parsers/languages-parser";

export async function getLanguagesRows(): Promise<LanguageRow[]> {
  return soapRequestAndPick<LanguageRow[], FullCountryInfoAllCountriesSoapBody>(
    baseSoapOptions(
      `${NS}/FullCountryInfoAllCountries`,
      buildFullCountryInfoAllCountriesBody()
    ),
    parseLanguagesRows
  );
}