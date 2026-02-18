import "server-only";
import { generateReportData } from "@/lib/services/report-service";
import { jsonBadGateway, jsonOk } from "@/app/api/_utils";

export const revalidate = 604800;

export async function GET() {
  try {
    const payload = await generateReportData();
    return jsonOk(payload);
  } catch (error) {
    console.error("Report generation failed:", error);
    return jsonBadGateway("Report service temporarily unavailable.");
  }
}