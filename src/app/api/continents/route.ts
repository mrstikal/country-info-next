import { getContinentsRows } from "@/lib/soap-adapter/integrations/continents";
import { jsonBadGateway, jsonOk } from "@/app/api/_utils";

export const revalidate = 604800;

export async function GET() {
  try {
    const rows = await getContinentsRows();
    return jsonOk({ rows });
  } catch {
    return jsonBadGateway("Continents service temporarily unavailable.");
  }
}