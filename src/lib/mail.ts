// Server-only mail sending for the site's three forms (rev2 WP-F, D1).
//
// Form submissions are only emailed to the customer-service mailbox; the site
// stores nothing (decided 2026-11-09). Mail goes out through Gmail's SMTP server
// with the sending account's app password (decided 2026-11-09, replacing Resend).
//
// Environment (see .env.example):
//   GMAIL_USER          The Google account that sends, e.g. gho001@coesg.tw.
//   GMAIL_APP_PASSWORD  A 16-character app password for that account (Google
//                       Account → Security → 2-Step Verification → App passwords).
//                       Required unless FORMS_DRY_RUN=true.
//   MAIL_FROM_NAME      Display name of the sender. Default below.
//   MAIL_TO             Recipient. Default site.supportEmail (gho001@coesg.tw).
//   FORMS_DRY_RUN       "true": do not send; log the whole email to the server
//                       console and report success. For local and test-site checks.
//
// Never import this file from a client component: it reads the app password.
import nodemailer from "nodemailer"
import { site } from "@/lib/site"

const DEFAULT_FROM_NAME = "共好玟化官網"
const SEND_TIMEOUT_MS = 15_000

export interface MailMessage {
  subject: string
  /** Plain-text body */
  text: string
  /** The submitter's address, so staff can reply directly */
  replyTo?: string
}

export type MailResult =
  | { ok: true; dryRun: boolean }
  | { ok: false; reason: "not_configured" | "send_failed" }

// Keep header values on one line.
function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim()
}

export function mailConfig() {
  const user = process.env.GMAIL_USER?.trim() || ""
  return {
    dryRun: process.env.FORMS_DRY_RUN === "true",
    user,
    // Google shows app passwords in groups of four; spaces are not part of it
    password: (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, ""),
    fromName: process.env.MAIL_FROM_NAME?.trim() || DEFAULT_FROM_NAME,
    to: process.env.MAIL_TO?.trim() || site.supportEmail,
  }
}

export async function sendMail(message: MailMessage): Promise<MailResult> {
  const { dryRun, user, password, fromName, to } = mailConfig()
  const subject = oneLine(message.subject)
  const replyTo = message.replyTo ? oneLine(message.replyTo) : undefined
  // Gmail only sends as the signed-in account (or its verified aliases)
  const from = { name: fromName, address: user || site.supportEmail }

  if (dryRun) {
    console.info(
      [
        "[forms] FORMS_DRY_RUN=true: email not sent",
        `From: ${from.name} <${from.address}>`,
        `To: ${to}`,
        `Reply-To: ${replyTo ?? "(none)"}`,
        `Subject: ${subject}`,
        "",
        message.text,
      ].join("\n")
    )
    return { ok: true, dryRun: true }
  }

  if (!user || !password) {
    console.error("[forms] Mail is not configured: set GMAIL_USER and GMAIL_APP_PASSWORD, or FORMS_DRY_RUN=true for testing.")
    return { ok: false, reason: "not_configured" }
  }

  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass: password },
      connectionTimeout: SEND_TIMEOUT_MS,
      greetingTimeout: SEND_TIMEOUT_MS,
      socketTimeout: SEND_TIMEOUT_MS,
    })
    await transport.sendMail({ from, to, subject, text: message.text, ...(replyTo ? { replyTo } : {}) })
    return { ok: true, dryRun: false }
  } catch (error) {
    // Log the SMTP error only; never the submitter's data. A 535 here usually
    // means a wrong app password, or 2-Step Verification is off on the account.
    console.error(`[forms] Gmail SMTP failed: ${error instanceof Error ? error.message : String(error)}`)
    return { ok: false, reason: "send_failed" }
  }
}
