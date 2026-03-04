import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { ninjaGetActiveAlerts } from "@/lib/ninja";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  requireUser(request);
  const alerts = await ninjaGetActiveAlerts();
  return NextResponse.json(alerts);
}
