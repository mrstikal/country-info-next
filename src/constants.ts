export const SOAP_ENDPOINT =
  "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso";

export const NS = "http://www.oorsprong.org/websamples.countryinfo";

export const DEMO_FETCH = {
  cache: "force-cache" as const,
  next: { revalidate: 86400 },
  timeoutMs: 8000,
  retries: 1,
};

export const DEFAULT_TIMEOUT_MS = 8000;
export const DEFAULT_RETRIES = 1;
export const RETRY_DELAY_BASE_MS = 200;