import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { ninjaGetDeviceDashboardUrl } from "@/lib/ninja";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  requireUser(request);
  const link = await ninjaGetDeviceDashboardUrl(Number(params.id));
  return NextResponse.json(link);
}
