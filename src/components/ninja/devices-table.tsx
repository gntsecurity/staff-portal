"use client";

import useSWR from "swr";

type DeviceItem = {
  id: number;
  displayName?: string;
  dnsName?: string;
  offline?: boolean;
  nodeClass?: string;
  lastContact?: number;
  lastUpdate?: number;
};

const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

function statusBadge(offline?: boolean) {
  if (offline) return "bg-red-50 text-red-700 ring-red-200";
  return "bg-emerald-50 text-emerald-700 ring-emerald-200";
}

function fmtDate(ms?: number) {
  if (!ms) return "—";
  return new Date(ms).toLocaleString();
}

export function NinjaDevicesTable({ full }: { full?: boolean }) {
  const { data, error, isLoading } = useSWR("/api/ninja/devices?pageSize=500", fetcher, { refreshInterval: 60000 });

  const items: DeviceItem[] = data?.items || [];
  const rows = full ? items : items.slice(0, 12);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        <div>
          <div className="text-sm font-semibold text-zinc-900">Devices</div>
          <div className="text-xs text-zinc-500">
            {isLoading ? "Loading..." : `${items.length} loaded`}
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
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">DNS</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Last Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/70">
            {rows.map((d) => {
              const status = d.offline ? "OFFLINE" : "ONLINE";
              const name = d.displayName || `#${d.id}`;
              const last = fmtDate(d.lastContact);

              return (
                <tr key={d.id} className="transition hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusBadge(d.offline)}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-zinc-900">{name}</td>
                  <td className="px-4 py-3 text-zinc-700">
                    <div className="max-w-[320px] truncate">{d.dnsName || "—"}</div>
                  </td>
                  <td className="px-4 py-3 text-zinc-700">{d.nodeClass || "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-zinc-700">{last}</td>
                </tr>
              );
            })}

            {!isLoading && rows.length === 0 ? (
              <tr>
                <td className="px-5 py-10 text-sm text-zinc-600" colSpan={5}>
                  No devices returned.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}