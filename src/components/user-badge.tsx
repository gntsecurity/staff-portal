"use client";

import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed");
  return res.json();
};

export function UserBadge() {
  const { data } = useSWR("/api/me", fetcher, { refreshInterval: 60000 });

  const email = (data?.email || "").toString();
  const name = (data?.name || "").toString();

  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm">
      <div className="font-medium">{name || "Employee"}</div>
      <div className="text-xs text-zinc-600">{email}</div>
    </div>
  );
}
