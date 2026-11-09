// Copy shared by the site's three forms (rev2 WP-F): field errors and send
// errors, plus the whitepaper download form's own copy. It lives here, not in
// src/i18n/messages, because WhitepaperDownload's props are fixed to
// { locale, papers } and the error strings are the same for every form.
// English: half-width punctuation (EN rule R9); PDFs are marked [in Chinese] (R16).
import type { FieldError, SubmitError } from "./schema"

export interface FormCopy {
  required: string
  sending: string
  field: Record<FieldError, string>
  /** `{email}` is replaced with the support mailbox */
  submit: Record<SubmitError, string>
  whitepaper: {
    name: string
    jobTitle: string
    email: string
    paper: string
    submit: string
    success: string
    /** `{title}` is replaced with the client name, e.g. 大古鑄鐵 */
    download: string
    another: string
  }
}

const zh: FormCopy = {
  required: "必填",
  sending: "送出中…",
  field: {
    required: "請填寫這個欄位。",
    email: "請輸入正確的 Email，例如 name@example.com。",
    tooLong: "內容太長，請縮短後再送出。",
    option: "請重新選擇一個選項。",
  },
  submit: {
    invalid: "有欄位需要修正，請檢查後再送出。",
    rate_limited: "送出次數太多，請過幾分鐘再試。",
    not_configured: "表單暫時無法使用，資料沒有送出。請直接寄信到 {email}。",
    send_failed: "送出失敗，資料沒有寄出。請再按一次送出；仍然失敗的話，請直接寄信到 {email}。",
    network: "網路連線中斷，資料沒有寄出。請確認連線後再按一次送出。",
  },
  whitepaper: {
    name: "姓名",
    jobTitle: "職稱",
    email: "Email",
    paper: "要下載的白皮書",
    submit: "下載白皮書",
    success: "謝謝你！請點下方連結下載。",
    download: "下載「{title}」永續白皮書（PDF）",
    another: "下載其他白皮書",
  },
}

const en: FormCopy = {
  required: "Required",
  sending: "Sending...",
  field: {
    required: "Please fill in this field.",
    email: "Please enter a valid email address, for example name@example.com.",
    tooLong: "This is too long. Please shorten it and try again.",
    option: "Please choose an option again.",
  },
  submit: {
    invalid: "Some fields need attention. Please check them and try again.",
    rate_limited: "Too many attempts. Please wait a few minutes and try again.",
    not_configured: "This form is not available right now, and nothing was sent. Please email us at {email}.",
    send_failed: "Your form was not sent. Please try again. If it still fails, email us at {email}.",
    network: "Your connection dropped, and your form was not sent. Please check your connection and try again.",
  },
  whitepaper: {
    name: "Name",
    jobTitle: "Job title",
    email: "Email",
    paper: "Sustainability White Paper",
    submit: "Download [in Chinese]",
    success: "Thank you. Your download is ready.",
    download: "Download the {title} Sustainability White Paper (PDF) [in Chinese]",
    another: "Download another white paper",
  },
}

export function formCopy(locale: string): FormCopy {
  return locale === "en" ? en : zh
}
