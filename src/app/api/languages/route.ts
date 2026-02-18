import { getLanguagesRows } from "@/lib/soap-adapter/integrations/languages";
import { jsonBadGateway, jsonOk } from "@/app/api/_utils";

export const revalidate = 604800;

export async function GET() {
  try {
    const rows = await getLanguagesRows();
    return jsonOk({rows});
  } catch {
    return jsonBadGateway("Languages service temporarily unavailable.");
  }
}