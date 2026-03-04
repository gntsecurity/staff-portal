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

export function NinjaDevicesTable({ full }: { full?: boolean }) {
  const { data, error, isLoading } = useSWR("/api/ninja/devices?pageSize=500", fetcher, { refreshInterval: 60000 });

  const items: DeviceItem[] = data?.items || [];
  const rows = full ? items : items.slice(0, 12);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <div className="text-sm font-semibold">Devices</div>
          <div className="text-xs text-zinc-600">{isLoading ? "Loading..." : `${items.length} loaded`}</div>
        </div>
        {error ? <div className="text-xs text-red-600">API error</div> : null}
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border-t border-zinc-200 text-sm">
          <thead className="bg-zinc-50 text-xs text-zinc-600">
            <tr>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">DNS</th>
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Last Contact</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => {
              const status = d.offline ? "OFFLINE" : "ONLINE";
              const name = d.displayName || `#${d.id}`;
              const last = d.lastContact ? new Date(d.lastContact).toLocaleString() : "—";
              return (
                <tr key={d.id} className="border-t border-zinc-200">
                  <td className="px-4 py-2">{status}</td>
                  <td className="px-4 py-2">{name}</td>
                  <td className="px-4 py-2">{d.dnsName || "—"}</td>
                  <td className="px-4 py-2">{d.nodeClass || "—"}</td>
                  <td className="px-4 py-2">{last}</td>
                </tr>
              );
            })}
            {!isLoading && rows.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-zinc-600" colSpan={5}>
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
