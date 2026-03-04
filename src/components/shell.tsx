import Link from "next/link";
import { Suspense } from "react";
import { PublicConfigBadge } from "@/components/public-config-badge";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen">
        <aside className="w-64 shrink-0 border-r border-zinc-200 bg-white">
          <div className="px-5 py-5">
            <div className="text-sm font-semibold tracking-tight">GNT Security</div>
            <div className="text-xs text-zinc-600">Staff Portal</div>
          </div>

          <nav className="px-3 pb-6">
            <NavLink href="/dashboard" label="Dashboard" />
            <NavLink href="/alerts" label="Alerts" />
            <NavLink href="/devices" label="Devices" />
            <div className="mt-4 border-t border-zinc-200 pt-4">
              <ExternalLink href="https://gntsecurity.rmmservices.net/#/ticketing/board/4" label="Ticket System" />
              <ExternalLink href="https://gntsecurity.com" label="Main Website" />
            </div>
          </nav>
        </aside>

        <main className="flex-1">
          <header className="border-b border-zinc-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <div className="text-sm font-medium">Operations</div>
              <Suspense fallback={<div className="text-xs text-zinc-500">...</div>}>
                <PublicConfigBadge />
              </Suspense>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-6 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100">
      {label}
    </Link>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100">
      {label}
    </a>
  );
}
