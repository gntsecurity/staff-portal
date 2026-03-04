"use client";

import useSWR from "swr";

type AlertItem = {
  uid: string;
  deviceId: number;
  subject?: string;
  message?: string;
  severity?: string;
  updateTime?: number;
  createTime?: number;
  sourceName?: string;
  device?: { id: number; displayName?: string; offline?: boolean; references?: { organization?: { name?: string }; location?: { name?: string } } };
};

const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export function NinjaAlertsTable({ full }: { full?: boolean }) {
  const { data, error, isLoading } = useSWR("/api/ninja/alerts", fetcher, { refreshInterval: 30000 });

  const items: AlertItem[] = data?.items || [];
  const rows = full ? items : items.slice(0, 12);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <div className="text-sm font-semibold">Active Alerts</div>
          <div className="text-xs text-zinc-600">{isLoading ? "Loading..." : `${items.length} total`}</div>
        </div>
        {error ? <div className="text-xs text-red-600">API error</div> : null}
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border-t border-zinc-200 text-sm">
          <thead className="bg-zinc-50 text-xs text-zinc-600">
            <tr>
              <th className="px-4 py-2 text-left">Severity</th>
              <th className="px-4 py-2 text-left">Device</th>
              <th className="px-4 py-2 text-left">Org</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => {
              const sev = (a.severity || "—").toString();
              const deviceName = a.device?.displayName || `#${a.deviceId}`;
              const org = a.device?.references?.organization?.name || "—";
              const loc = a.device?.references?.location?.name || "—";
              const updated = a.updateTime ? new Date(a.updateTime).toLocaleString() : "—";
              return (
                <tr key={a.uid} className="border-t border-zinc-200">
                  <td className="px-4 py-2">{sev}</td>
                  <td className="px-4 py-2">{deviceName}</td>
                  <td className="px-4 py-2">{org}</td>
                  <td className="px-4 py-2">{loc}</td>
                  <td className="px-4 py-2">{a.subject || a.message || "—"}</td>
                  <td className="px-4 py-2">{updated}</td>
                </tr>
              );
            })}
            {!isLoading && rows.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-zinc-600" colSpan={6}>
                  No active alerts.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
