import { UserBadge } from "@/components/user-badge";
import { NinjaDevicesTable } from "@/components/ninja/devices-table";

export default function DevicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Devices</h1>
          <p className="text-sm text-zinc-600">Fleet inventory from NinjaOne.</p>
        </div>
        <UserBadge />
      </div>
      <NinjaDevicesTable full />
    </div>
  );
}
