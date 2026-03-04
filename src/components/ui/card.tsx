export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium text-zinc-700">{children}</div>;
}

export function CardValue({ children }: { children: React.ReactNode }) {
  return <div className="mt-2 text-2xl font-semibold tracking-tight">{children}</div>;
}

export function CardSub({ children }: { children: React.ReactNode }) {
  return <div className="mt-1 text-xs text-zinc-600">{children}</div>;
}
