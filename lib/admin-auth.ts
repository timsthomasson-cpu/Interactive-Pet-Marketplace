// Shared helpers for the password-protected /admin area (used to review
// outbound click data without needing direct D1 access).
//
// This is a single-operator admin tool (just Tim), so the auth model is
// intentionally simple: one shared password (set via
// `wrangler secret put ADMIN_PASSWORD`, and in .dev.vars for local dev),
// plus a signed session cookie. No user accounts, no session DB.
//
// Cookie value is `${expiresAtMs}.${signatureHex}`, where signature is an
// HMAC-SHA256 of expiresAtMs keyed by ADMIN_PASSWORD. This lets middleware
// verify the cookie wasn't forged or tampered with, without storing any
// session state server-side.

const SESSION_COOKIE = "admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function timingSafeEqualStrings(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function createSessionToken(adminPassword: string): Promise<string> {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const signature = await hmac(adminPassword, String(expiresAt));
  return `${expiresAt}.${signature}`;
}

export async function isValidSessionToken(
  token: string | undefined,
  adminPassword: string
): Promise<boolean> {
  if (!token) return false;
  const [expiresAtStr, signature] = token.split(".");
  if (!expiresAtStr || !signature) return false;

  const expiresAt = Number(expiresAtStr);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const expectedSignature = await hmac(adminPassword, expiresAtStr);
  return timingSafeEqualStrings(signature, expectedSignature);
}

export const ADMIN_SESSION_COOKIE = SESSION_COOKIE;
export const ADMIN_SESSION_MAX_AGE_SECONDS = SESSION_DURATION_MS / 1000;
