import { UserBadge } from "@/components/user-badge";
import { NinjaSummaryCards } from "@/components/ninja/summary-cards";
import { NinjaAlertsTable } from "@/components/ninja/alerts-table";
import { NinjaDevicesTable } from "@/components/ninja/devices-table";

const LINKS = {
  insurance:
    "https://portal.nextinsurance.com/public/certificates/live-certificate/8823c82c73b80325d7862fe322993035",
  crowdstrike: "https://falcon.crowdstrike.com/login/",
  gusto: "https://login.gusto.com/",
};

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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <a
          href={LINKS.insurance}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow"
        >
          <div className="text-xs font-medium text-zinc-500">Insurance</div>
          <div className="mt-1 text-sm font-semibold text-zinc-900">Next Insurance Certificate</div>
          <div className="mt-2 text-xs text-zinc-500">View proof of coverage</div>
        </a>

        <a
          href={LINKS.crowdstrike}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow"
        >
          <div className="text-xs font-medium text-zinc-500">Endpoint Security</div>
          <div className="mt-1 text-sm font-semibold text-zinc-900">CrowdStrike Falcon</div>
          <div className="mt-2 text-xs text-zinc-500">Open console login</div>
        </a>

        <a
          href={LINKS.gusto}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow"
        >
          <div className="text-xs font-medium text-zinc-500">Payroll</div>
          <div className="mt-1 text-sm font-semibold text-zinc-900">Gusto</div>
          <div className="mt-2 text-xs text-zinc-500">Open payroll login</div>
        </a>
      </div>

      <NinjaSummaryCards />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <NinjaAlertsTable />
        <NinjaDevicesTable />
      </div>
    </div>
  );
}