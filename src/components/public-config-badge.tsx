import { cache } from "react";

const getConfig = cache(async () => {
  const res = await fetch("http://localhost:3000/api/public-config", { cache: "no-store" });
  if (!res.ok) return { portalName: "GNT Staff Portal", ninjaOneBaseUrl: "" };
  return (await res.json()) as { portalName: string; ninjaOneBaseUrl: string };
});

export async function PublicConfigBadge() {
  const cfg = await getConfig();
  return (
    <div className="text-xs text-zinc-600">
      <span className="font-medium text-zinc-800">{cfg.portalName}</span>
    </div>
  );
}
