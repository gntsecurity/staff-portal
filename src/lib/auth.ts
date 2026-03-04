export type CurrentUser = {
  email: string;
  name: string;
};

export function getCurrentUser(request: Request): CurrentUser | null {
  const headers = request.headers;

  const email =
    headers.get("cf-access-authenticated-user-email") ||
    headers.get("Cf-Access-Authenticated-User-Email") ||
    process.env.DEV_USER_EMAIL ||
    "";

  const name =
    headers.get("cf-access-authenticated-user-name") ||
    headers.get("Cf-Access-Authenticated-User-Name") ||
    "";

  if (!email) return null;

  const safeName = (name || email.split("@")[0] || "Employee").toString();

  return { email: email.toString(), name: safeName };
}

export function getCurrentUserOrThrow(request: Request): CurrentUser {
  const user = getCurrentUser(request);
  if (!user) throw new Error("Unauthorized");
  return user;
}

export function requireUser(request: Request): CurrentUser {
  return getCurrentUserOrThrow(request);
}
