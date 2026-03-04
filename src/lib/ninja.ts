import { env } from "@/lib/config";

type TokenCache = {
  accessToken: string;
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

function nowMs() {
  return Date.now();
}

function tokenUrl() {
  const e = env();
  return new URL(e.NINJAONE_TOKEN_PATH, e.NINJAONE_BASE_URL).toString();
}

function apiUrl(path: string) {
  const e = env();
  return new URL(path, e.NINJAONE_BASE_URL).toString();
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.NINJAONE_CLIENT_ID || "";
  const clientSecret = process.env.NINJAONE_CLIENT_SECRET || "";
  if (!clientId || !clientSecret) {
    throw new Error("Missing NINJAONE_CLIENT_ID or NINJAONE_CLIENT_SECRET");
  }

  if (tokenCache && tokenCache.expiresAt - nowMs() > 30000) {
    return tokenCache.accessToken;
  }

  const body = new URLSearchParams();
  body.set("grant_type", "client_credentials");
  body.set("client_id", clientId);
  body.set("client_secret", clientSecret);
  const scope = env().NINJAONE_SCOPE || "";
  if (scope) body.set("scope", scope);

  const res = await fetch(tokenUrl(), {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: body.toString()
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`NinjaOne token request failed (${res.status}): ${t}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in?: number };
  const expiresIn = typeof data.expires_in === "number" ? data.expires_in : 3600;

  tokenCache = {
    accessToken: data.access_token,
    expiresAt: nowMs() + expiresIn * 1000
  };

  return tokenCache.accessToken;
}

async function ninjaFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(apiUrl(path), {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`
    },
    cache: "no-store"
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`NinjaOne API failed (${res.status}) ${path}: ${t}`);
  }

  return (await res.json()) as T;
}

export type NinjaAlert = {
  uid: string;
  deviceId: number;
  message?: string;
  createTime?: number;
  updateTime?: number;
  sourceName?: string;
  subject?: string;
  severity?: string;
  device?: {
    id: number;
    displayName?: string;
    offline?: boolean;
    references?: {
      organization?: { id: number; name?: string };
      location?: { id: number; name?: string };
    };
  };
};

export type NinjaDevice = {
  id: number;
  displayName?: string;
  dnsName?: string;
  offline?: boolean;
  nodeClass?: string;
  lastContact?: number;
  lastUpdate?: number;
};

export async function ninjaGetActiveAlerts(): Promise<{ items: NinjaAlert[] }> {
  const items = await ninjaFetch<NinjaAlert[]>("/api/v2/alerts");
  return { items };
}

export async function ninjaGetDevicesDetailed(opts: { pageSize: number }): Promise<{ items: NinjaDevice[] }> {
  const qs = new URLSearchParams();
  qs.set("pageSize", String(opts.pageSize));
  const items = await ninjaFetch<NinjaDevice[]>(`/api/v2/devices-detailed?${qs.toString()}`);
  return { items };
}

export async function ninjaGetDeviceDashboardUrl(deviceId: number): Promise<{ url: string }> {
  const data = await ninjaFetch<{ url?: string }>(`/api/v2/device/${deviceId}/dashboard-url?redirect=false`);
  return { url: data.url || apiUrl(`/device/${deviceId}`) };
}
