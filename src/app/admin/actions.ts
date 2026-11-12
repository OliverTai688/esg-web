"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { endSession, isAdmin, loginLimited, passwordMatches, startSession } from "@/lib/admin-auth"
import { LinkStoreNotConfigured, isValidLink, setWhitepaperLink } from "@/lib/whitepaper-links"
import { whitepaperCases } from "@/data/whitepapers"

const PAGE = "/admin/whitepapers"

async function clientIp() {
  const h = await headers()
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown"
}

export async function login(formData: FormData) {
  if (loginLimited(await clientIp())) redirect(`${PAGE}?error=limited`)
  const input = String(formData.get("password") ?? "")
  if (!passwordMatches(input)) redirect(`${PAGE}?error=password`)
  await startSession()
  redirect(PAGE)
}

export async function logout() {
  await endSession()
  redirect(PAGE)
}

async function save(id: string, url: string | null) {
  if (!(await isAdmin())) redirect(`${PAGE}?error=session`)
  if (!whitepaperCases.some((c) => c.slug === id)) redirect(`${PAGE}?error=unknown`)
  try {
    await setWhitepaperLink(id, url)
  } catch (error) {
    if (error instanceof LinkStoreNotConfigured) redirect(`${PAGE}?error=storage`)
    console.error(`[admin] saving link failed: ${error instanceof Error ? error.message : String(error)}`)
    redirect(`${PAGE}?error=save&id=${id}`)
  }
  redirect(`${PAGE}?saved=${id}`)
}

export async function saveLink(formData: FormData) {
  const id = String(formData.get("id") ?? "")
  const url = String(formData.get("url") ?? "").trim()
  if (!isValidLink(url)) redirect(`${PAGE}?error=link&id=${id}`)
  await save(id, url)
}

export async function resetLink(formData: FormData) {
  await save(String(formData.get("id") ?? ""), null)
}
