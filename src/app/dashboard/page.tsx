import { UserBadge } from "@/components/user-badge";
import { NinjaSummaryCards } from "@/components/ninja/summary-cards";
import { NinjaAlertsTable } from "@/components/ninja/alerts-table";
import { NinjaDevicesTable } from "@/components/ninja/devices-table";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-zinc-600">Live NinjaOne overview.</p>
        </div>
        <UserBadge />
      </div>

      <NinjaSummaryCards />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <NinjaAlertsTable />
        <NinjaDevicesTable />
      </div>
    </div>
  );
}
