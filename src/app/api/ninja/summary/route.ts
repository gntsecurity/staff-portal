import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { ninjaGetActiveAlerts, ninjaGetDevicesDetailed } from "@/lib/ninja";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  requireUser(request);

  const [alerts, devices] = await Promise.all([
    ninjaGetActiveAlerts(),
    ninjaGetDevicesDetailed({ pageSize: 1000 })
  ]);

  const totalDevices = devices.items.length;
  const offlineDevices = devices.items.filter((d) => d.offline === true).length;

  const totalAlerts = alerts.items.length;
  const criticalAlerts = alerts.items.filter((a) => (a.severity || "").toUpperCase() === "CRITICAL").length;

  return NextResponse.json({
    totals: { totalDevices, offlineDevices, totalAlerts, criticalAlerts },
    updatedAt: new Date().toISOString()
  });
}
