import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { ninjaGetDevicesDetailed } from "@/lib/ninja";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  requireUser(request);
  const url = new URL(request.url);
  const pageSize = Number(url.searchParams.get("pageSize") || "200");
  const devices = await ninjaGetDevicesDetailed({ pageSize });
  return NextResponse.json(devices);
}
