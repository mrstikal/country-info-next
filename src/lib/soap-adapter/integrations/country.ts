import "server-only";
import { soapRequestAndPick } from "@/lib/soap-adapter"
import { NS } from "@/constants";

import type { FullCountryInfo, CountryListItem } from "@/types/country";
import type {
  FullCountryInfoSoapBody,
  ListOfCountryNamesByCodeSoapBody,
} from "@/types/soap-bodies";

import {
  baseSoapOptions,
} from "@/lib/soap-adapter/helpers";

import {
  buildFullCountryInfoBody,
  buildListOfCountryNamesByCodeBody,
} from "@/lib/soap-adapter/integrations/parsers/country-bodies";

import {
  parseFullCountryInfo,
  parseCountriesList,
} from "@/lib/soap-adapter/integrations/parsers/country-parser";


export async function getFullCountryInfo(
  countryIso2: string
): Promise<FullCountryInfo> {
  return soapRequestAndPick<FullCountryInfo, FullCountryInfoSoapBody>(
    baseSoapOptions(
      `${NS}/FullCountryInfo`,
      buildFullCountryInfoBody(countryIso2)
    ),
    parseFullCountryInfo
  );
}

export async function getCountries(): Promise<CountryListItem[]> {
  return soapRequestAndPick<CountryListItem[], ListOfCountryNamesByCodeSoapBody>(
    baseSoapOptions(
      `${NS}/ListOfCountryNamesByCode`,
      buildListOfCountryNamesByCodeBody()
    ),
    parseCountriesList
  );
}