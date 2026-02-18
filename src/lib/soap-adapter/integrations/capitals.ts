import { soapRequestAndPick } from "@/lib/soap-adapter";
import {
  DEMO_FETCH,
  NS,
  SOAP_ENDPOINT,
} from "@/constants";
import type { CapitalCitySoapBody } from "@/types/soap-bodies";

function capitalCityBody(countryIso2: string) {
  return `<CapitalCity xmlns="${NS}">
  <sCountryISOCode>${countryIso2}</sCountryISOCode>
</CapitalCity>`;
}

export async function getCapitalCity(countryIso2: string): Promise<string> {
  const iso2 = countryIso2.trim().toUpperCase();

  return soapRequestAndPick<string, CapitalCitySoapBody>(
    {
      endpoint: SOAP_ENDPOINT,
      soapAction: `${NS}/CapitalCity`,
      bodyXml: capitalCityBody(iso2),
      ...DEMO_FETCH,
    },
    (body) => body?.CapitalCityResponse?.CapitalCityResult as string
  );
}
