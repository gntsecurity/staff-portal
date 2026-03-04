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
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Overview
          </div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-950">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Live NinjaOne status, alerts, and device health.
          </p>
        </div>
        <UserBadge />
      </div>

      <section className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-zinc-900">Quick Actions</div>
            <div className="text-xs text-zinc-500">Common staff links</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <a
            href={LINKS.insurance}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-zinc-200/70 bg-gradient-to-b from-white to-zinc-50 p-4 transition hover:border-zinc-300 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-zinc-500">Insurance</div>
                <div className="mt-1 text-sm font-semibold text-zinc-900">
                  Next Insurance Certificate
                </div>
                <div className="mt-2 text-xs text-zinc-500">View proof of coverage</div>
              </div>
              <div className="text-xs text-zinc-400 transition group-hover:text-zinc-600">↗</div>
            </div>
          </a>

          <a
            href={LINKS.crowdstrike}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-zinc-200/70 bg-gradient-to-b from-white to-zinc-50 p-4 transition hover:border-zinc-300 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-zinc-500">Endpoint Security</div>
                <div className="mt-1 text-sm font-semibold text-zinc-900">CrowdStrike Falcon</div>
                <div className="mt-2 text-xs text-zinc-500">Open console login</div>
              </div>
              <div className="text-xs text-zinc-400 transition group-hover:text-zinc-600">↗</div>
            </div>
          </a>

          <a
            href={LINKS.gusto}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-zinc-200/70 bg-gradient-to-b from-white to-zinc-50 p-4 transition hover:border-zinc-300 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-zinc-500">Payroll</div>
                <div className="mt-1 text-sm font-semibold text-zinc-900">Gusto</div>
                <div className="mt-2 text-xs text-zinc-500">Open payroll login</div>
              </div>
              <div className="text-xs text-zinc-400 transition group-hover:text-zinc-600">↗</div>
            </div>
          </a>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-zinc-900">NinjaOne</div>
            <div className="text-xs text-zinc-500">Health and alerts</div>
          </div>
        </div>
        <NinjaSummaryCards />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm">
          <div className="mb-3">
            <div className="text-sm font-semibold text-zinc-900">Active Alerts</div>
            <div className="text-xs text-zinc-500">Latest alert activity</div>
          </div>
          <NinjaAlertsTable />
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm">
          <div className="mb-3">
            <div className="text-sm font-semibold text-zinc-900">Devices</div>
            <div className="text-xs text-zinc-500">Recent device status</div>
          </div>
          <NinjaDevicesTable />
        </div>
      </section>
    </div>
  );
}