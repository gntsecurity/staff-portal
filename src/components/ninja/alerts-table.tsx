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
  device?: {
    id: number;
    displayName?: string;
    offline?: boolean;
    references?: {
      organization?: { name?: string };
      location?: { name?: string };
    };
  };
};

const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

function sevBadge(sevRaw: string) {
  const sev = (sevRaw || "").toLowerCase();
  if (sev.includes("critical") || sev === "5" || sev === "high") return "bg-red-50 text-red-700 ring-red-200";
  if (sev.includes("major") || sev.includes("warning") || sev === "4" || sev === "medium")
    return "bg-amber-50 text-amber-800 ring-amber-200";
  if (sev.includes("minor") || sev === "3" || sev === "low") return "bg-zinc-50 text-zinc-700 ring-zinc-200";
  return "bg-zinc-50 text-zinc-700 ring-zinc-200";
}

function fmtDate(ms?: number) {
  if (!ms) return "—";
  return new Date(ms).toLocaleString();
}

export function NinjaAlertsTable({ full }: { full?: boolean }) {
  const { data, error, isLoading } = useSWR("/api/ninja/alerts", fetcher, { refreshInterval: 30000 });

  const items: AlertItem[] = data?.items || [];
  const rows = full ? items : items.slice(0, 12);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        <div>
          <div className="text-sm font-semibold text-zinc-900">Active Alerts</div>
          <div className="text-xs text-zinc-500">
            {isLoading ? "Loading..." : `${items.length} total`}
          </div>
        </div>
        {error ? (
          <div className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-200">
            API error
          </div>
        ) : null}
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border-t border-zinc-200/70 text-sm">
          <thead className="sticky top-0 z-10 bg-zinc-50/90 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 backdrop-blur">
            <tr>
              <th className="px-4 py-3 text-left">Severity</th>
              <th className="px-4 py-3 text-left">Device</th>
              <th className="px-4 py-3 text-left">Org</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/70">
            {rows.map((a) => {
              const sev = (a.severity || "—").toString();
              const deviceName = a.device?.displayName || `#${a.deviceId}`;
              const org = a.device?.references?.organization?.name || "—";
              const loc = a.device?.references?.location?.name || "—";
              const subject = a.subject || a.message || "—";
              const updated = fmtDate(a.updateTime);

              return (
                <tr key={a.uid} className="transition hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${sevBadge(sev)}`}>
                      {sev}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-zinc-900">{deviceName}</td>
                  <td className="px-4 py-3 text-zinc-700">{org}</td>
                  <td className="px-4 py-3 text-zinc-700">{loc}</td>
                  <td className="px-4 py-3">
                    <div className="max-w-[520px] truncate text-zinc-900">{subject}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-zinc-700">{updated}</td>
                </tr>
              );
            })}

            {!isLoading && rows.length === 0 ? (
              <tr>
                <td className="px-5 py-10 text-sm text-zinc-600" colSpan={6}>
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