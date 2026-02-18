import { getFullCountryInfo } from "@/lib/soap-adapter/integrations/country";
import { jsonBadGateway, jsonBadRequest, jsonOk } from "@/app/api/_utils";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ iso2: string }> }
) {
  const { iso2 } = await params;
  const code = String(iso2 ?? "").trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(code)) {
    return jsonBadRequest("Invalid ISO2 code.");
  }

  try {
    const country = await getFullCountryInfo(code);
    return jsonOk({ iso2: code, country });
  } catch {
    return jsonBadGateway("Country service temporarily unavailable.");
  }
}