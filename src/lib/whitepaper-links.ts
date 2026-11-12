// Download links of the four Sustainability White Papers (#53②), editable by the
// client at /admin/whitepapers without a redeploy.
//
// The link a visitor gets is the one saved in the admin page; when none is saved,
// the default `downloadUrl` in src/data/whitepapers.ts. Links are looked up on the
// server when the download form is sent, so they never appear in the page HTML
// and a change takes effect immediately.
//
// Storage (one small JSON value, see .env.example):
// - Upstash Redis REST API (Vercel Marketplace → Upstash for Redis, free tier):
//   KV_REST_API_URL + KV_REST_API_TOKEN, or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.
// - Otherwise, outside Vercel only: a local file .data/whitepaper-links.json
//   (for local development; Vercel's file system is read-only).
//
// Server-only: it reads the storage token.
import { promises as fs } from "fs"
import path from "path"
import { whitepaperCases } from "@/data/whitepapers"

const KEY = "coesg:whitepaper-links"
const LOCAL_FILE = path.join(process.cwd(), ".data", "whitepaper-links.json")

type Overrides = Record<string, string>

export class LinkStoreNotConfigured extends Error {}

function redisConfig() {
  const url = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "").trim()
  const token = (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "").trim()
  return url && token ? { url: url.replace(/\/$/, ""), token } : null
}

export function linkStoreKind(): "redis" | "file" | "none" {
  if (redisConfig()) return "redis"
  return process.env.VERCEL ? "none" : "file"
}

async function redis(command: string[]) {
  const config = redisConfig()!
  const response = await fetch(config.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) throw new Error(`Redis responded ${response.status}`)
  return ((await response.json()) as { result: unknown }).result
}

function clean(value: unknown): Overrides {
  if (!value || typeof value !== "object") return {}
  const known = new Set(whitepaperCases.map((c) => c.slug))
  return Object.fromEntries(Object.entries(value).filter(([id, url]) => known.has(id) && typeof url === "string" && isValidLink(url))) as Overrides
}

async function readOverrides(): Promise<Overrides> {
  const kind = linkStoreKind()
  try {
    if (kind === "redis") {
      const raw = await redis(["GET", KEY])
      return typeof raw === "string" ? clean(JSON.parse(raw)) : {}
    }
    if (kind === "file") return clean(JSON.parse(await fs.readFile(LOCAL_FILE, "utf-8")))
  } catch (error) {
    // A missing file is normal; anything else falls back to the defaults
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) {
      console.error(`[whitepaper-links] read failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  return {}
}

async function writeOverrides(overrides: Overrides) {
  const kind = linkStoreKind()
  if (kind === "none") throw new LinkStoreNotConfigured("No storage configured")
  const json = JSON.stringify(overrides)
  if (kind === "redis") {
    await redis(["SET", KEY, json])
    return
  }
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true })
  await fs.writeFile(LOCAL_FILE, json, "utf-8")
}

/** Only https links; Google Drive or any other host. */
export function isValidLink(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === "https:" && value.length <= 2000
  } catch {
    return false
  }
}

export interface WhitepaperLink {
  id: string
  name: string
  defaultUrl: string
  /** The link visitors get now */
  url: string
  /** True when the link comes from the admin page rather than the default */
  custom: boolean
}

export async function getWhitepaperLinks(): Promise<WhitepaperLink[]> {
  const overrides = await readOverrides()
  return whitepaperCases.map((c) => ({
    id: c.slug,
    name: c.name.zh,
    defaultUrl: c.downloadUrl,
    url: overrides[c.slug] ?? c.downloadUrl,
    custom: c.slug in overrides,
  }))
}

export async function getWhitepaperLink(id: string) {
  return (await getWhitepaperLinks()).find((l) => l.id === id)
}

/** Save a new link, or `null` to go back to the default. */
export async function setWhitepaperLink(id: string, url: string | null) {
  const overrides = await readOverrides()
  if (url === null) delete overrides[id]
  else overrides[id] = url
  await writeOverrides(overrides)
}
