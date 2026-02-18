import "server-only";
import { soapRequestAndPick } from "@/lib/soap-adapter";
import { NS } from "@/constants";

import type { ContinentRow } from "@/types/continent";
import type {
  FullCountryInfoAllCountriesSoapBody,
  ListOfContinentsByCodeSoapBody
} from "@/types/soap-bodies";

import { baseSoapOptions } from "@/lib/soap-adapter/helpers";

import {
  buildListOfContinentsByCodeBody,
  buildFullCountryInfoAllCountriesBody,
} from "@/lib/soap-adapter/integrations/parsers/continents-bodies";

import {
  parseContinentsByCode,
  parseCountriesWithContinent,
  parseContinentsRows,
} from "@/lib/soap-adapter/integrations/parsers/continents-parser";

export async function getContinentsRows(): Promise<ContinentRow[]> {
  const [continents, countries] = await Promise.all([
    soapRequestAndPick<ReturnType<typeof parseContinentsByCode>, ListOfContinentsByCodeSoapBody>(
      baseSoapOptions(
        `${NS}/ListOfContinentsByCode`,
        buildListOfContinentsByCodeBody()
      ),
      parseContinentsByCode
    ),
    soapRequestAndPick<ReturnType<typeof parseCountriesWithContinent>, FullCountryInfoAllCountriesSoapBody>(
      baseSoapOptions(
        `${NS}/FullCountryInfoAllCountries`,
        buildFullCountryInfoAllCountriesBody()
      ),
      parseCountriesWithContinent
    ),
  ]);

  return parseContinentsRows(continents, countries);
}