import "server-only";
import { soapRequestAndPick } from "@/lib/soap-adapter";
import { NS } from "@/constants";

import { CurrencyListItem } from "@/types/currency";
import { CountryListItem } from "@/types/country";
import type {
  CountriesUsingCurrencySoapBody,
  ListOfCurrenciesByCodeSoapBody,
} from "@/types/soap-bodies";

import { baseSoapOptions } from "@/lib/soap-adapter/helpers";

import {
  buildListOfCurrenciesByCodeBody,
  buildCountriesUsingCurrencyBody,
} from "@/lib/soap-adapter/integrations/parsers/currencies-bodies";

import {
  parseCurrencies,
  parseCountriesUsingCurrency,
} from "@/lib/soap-adapter/integrations/parsers/currencies-parser";

export async function getCurrencies(): Promise<CurrencyListItem[]> {
  return soapRequestAndPick<CurrencyListItem[], ListOfCurrenciesByCodeSoapBody>(
    baseSoapOptions(
      `${NS}/ListOfCurrenciesByCode`,
      buildListOfCurrenciesByCodeBody()
    ),
    parseCurrencies
  );
}

export async function getCountriesUsingCurrency(
  currencyCode: string
): Promise<CountryListItem[]> {
  const code = currencyCode.trim().toUpperCase();

  return soapRequestAndPick<CountryListItem[], CountriesUsingCurrencySoapBody>(
    baseSoapOptions(
      `${NS}/CountriesUsingCurrency`,
      buildCountriesUsingCurrencyBody(code)
    ),
    parseCountriesUsingCurrency
  );
}