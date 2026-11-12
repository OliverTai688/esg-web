// Sign-in for the small admin area (/admin). One shared password, set in the
// ADMIN_PASSWORD environment variable; there are no user accounts.
//
// A signed-in browser holds an httpOnly cookie "<expiry>.<HMAC>" signed with a
// key derived from the password, so changing ADMIN_PASSWORD signs everyone out.
// Without ADMIN_PASSWORD the admin area stays locked.
//
// Server-only.
import { createHash, createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

export const ADMIN_COOKIE = "coesg_admin"
const SESSION_SECONDS = 8 * 60 * 60

function password() {
  return process.env.ADMIN_PASSWORD?.trim() || ""
}

export function adminConfigured() {
  return password().length >= 8
}

function sign(payload: string) {
  return createHmac("sha256", `coesg-admin:${password()}`).update(payload).digest("hex")
}

function sameText(a: string, b: string) {
  // Compare fixed-length digests so the comparison takes the same time
  const ha = createHash("sha256").update(a).digest()
  const hb = createHash("sha256").update(b).digest()
  return timingSafeEqual(ha, hb)
}

export function passwordMatches(input: string) {
  return adminConfigured() && sameText(input, password())
}

export async function isAdmin() {
  if (!adminConfigured()) return false
  const token = (await cookies()).get(ADMIN_COOKIE)?.value ?? ""
  const [expiry, signature] = token.split(".")
  if (!expiry || !signature || Number(expiry) < Date.now() / 1000) return false
  return sameText(signature, sign(expiry))
}

export async function startSession() {
  const expiry = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS)
  ;(await cookies()).set(ADMIN_COOKIE, `${expiry}.${sign(expiry)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_SECONDS,
  })
}

export async function endSession() {
  ;(await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" })
}

// Slow down password guessing: 10 attempts per IP per 15 minutes (per server instance).
const attempts = new Map<string, number[]>()
export function loginLimited(ip: string, now = Date.now()) {
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < 15 * 60 * 1000)
  recent.push(now)
  attempts.set(ip, recent)
  return recent.length > 10
}
