"use client";

import useSWR from "swr";
import { Card, CardSub, CardTitle, CardValue } from "@/components/ui/card";

const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export function NinjaSummaryCards() {
  const { data, error } = useSWR("/api/ninja/summary", fetcher, { refreshInterval: 30000 });

  const totals = data?.totals || {};
  const updatedAt = data?.updatedAt ? new Date(data.updatedAt) : null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card>
        <CardTitle>Total Devices</CardTitle>
        <CardValue>{totals.totalDevices ?? "—"}</CardValue>
        <CardSub>{updatedAt ? `Updated ${updatedAt.toLocaleTimeString()}` : " "}</CardSub>
      </Card>

      <Card>
        <CardTitle>Offline Devices</CardTitle>
        <CardValue>{totals.offlineDevices ?? "—"}</CardValue>
        <CardSub>Based on NinjaOne device offline flag</CardSub>
      </Card>

      <Card>
        <CardTitle>Active Alerts</CardTitle>
        <CardValue>{totals.totalAlerts ?? "—"}</CardValue>
        <CardSub>Triggered conditions</CardSub>
      </Card>

      <Card>
        <CardTitle>Critical Alerts</CardTitle>
        <CardValue>{totals.criticalAlerts ?? "—"}</CardValue>
        <CardSub>{error ? "API error (see logs)" : " "}</CardSub>
      </Card>
    </div>
  );
}