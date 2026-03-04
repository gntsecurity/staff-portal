import { UserBadge } from "@/components/user-badge";
import { NinjaAlertsTable } from "@/components/ninja/alerts-table";

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Alerts</h1>
          <p className="text-sm text-zinc-600">Active triggered conditions from NinjaOne.</p>
        </div>
        <UserBadge />
      </div>
      <NinjaAlertsTable full />
    </div>
  );
}
