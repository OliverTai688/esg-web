import { adminConfigured, isAdmin } from "@/lib/admin-auth"
import { getWhitepaperLinks, linkStoreKind } from "@/lib/whitepaper-links"
import { login, logout, resetLink, saveLink } from "../actions"

// /admin/whitepapers: the client updates the download link of each white paper
// (#53②), e.g. after replacing a PDF in Google Drive. Visitors get the new link
// from the next download on; no redeploy.

const ERRORS: Record<string, string> = {
  password: "密碼不正確。",
  limited: "嘗試次數太多，請 15 分鐘後再試。",
  session: "登入已過期，請重新登入。",
  link: "連結格式不正確：請貼上以 https:// 開頭的完整網址。",
  storage: "網站尚未設定儲存空間，連結無法儲存。請聯絡網站公司（需要設定 Upstash Redis）。",
  save: "儲存失敗，請稍後再試；若持續失敗請聯絡網站公司。",
  unknown: "找不到這本白皮書。",
}

const box = "rounded-2xl border border-border bg-white p-6 sm:p-8"
const input = "w-full rounded-lg border border-ink/20 bg-white px-3 py-2.5 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
const primary = "inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-base font-bold text-white hover:brightness-95"
const secondary = "inline-flex min-h-11 items-center justify-center rounded-full border border-ink/20 px-5 text-sm font-bold text-ink hover:bg-ink/[0.04]"

export default async function WhitepaperLinksAdmin({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string; id?: string }> }) {
  const { saved, error, id: errorId } = await searchParams
  const message = error ? ERRORS[error] ?? "發生錯誤，請再試一次。" : null

  if (!adminConfigured()) {
    return (
      <main className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-2xl font-black">白皮書下載連結</h1>
        <p className={`${box} mt-6`}>後台尚未啟用：網站公司需要先設定後台密碼（ADMIN_PASSWORD，至少 8 個字元）。</p>
      </main>
    )
  }

  if (!(await isAdmin())) {
    return (
      <main className="mx-auto max-w-md px-6 py-16">
        <h1 className="text-2xl font-black">共好玟化官網後台</h1>
        <form action={login} className={`${box} mt-6 space-y-4`}>
          <label htmlFor="password" className="block text-sm font-bold">
            後台密碼
          </label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className={input} />
          {message && (
            <p role="alert" className="text-sm font-bold text-[#B8401F]">
              {message}
            </p>
          )}
          <button type="submit" className={primary}>
            登入
          </button>
        </form>
      </main>
    )
  }

  const links = await getWhitepaperLinks()
  const storage = linkStoreKind()

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-black">白皮書下載連結</h1>
        <form action={logout}>
          <button type="submit" className={secondary}>
            登出
          </button>
        </form>
      </div>
      <div className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink/80">
        <p>訪客在「永續白皮書」頁填完下載表單後，會拿到這裡的連結。儲存後下一位訪客就會拿到新連結，不需要重新部署網站。</p>
        <p>使用 Google 雲端硬碟時，請把檔案的共用設定改為「知道連結的任何人都能檢視」，再複製連結貼上。</p>
      </div>
      {storage === "none" && (
        <p role="alert" className="mt-6 rounded-xl bg-orange-soft p-4 text-sm font-bold">
          {ERRORS.storage}
        </p>
      )}
      {message && (
        <p role="alert" className="mt-6 rounded-xl bg-orange-soft p-4 text-sm font-bold text-[#B8401F]">
          {message}
        </p>
      )}
      <ul className="mt-8 space-y-6">
        {links.map((link) => (
          <li key={link.id} className={box}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-black">{link.name}</h2>
              <span className="text-xs font-bold text-ink/60">{link.custom ? "使用後台設定的連結" : "使用預設連結"}</span>
            </div>
            <p className="mt-2 break-all text-sm">
              目前連結：
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-link">
                {link.url}
              </a>
            </p>
            {saved === link.id && (
              <p role="status" className="mt-3 text-sm font-bold text-[#2E7D32]">
                已儲存。
              </p>
            )}
            <form action={saveLink} className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input type="hidden" name="id" value={link.id} />
              <label htmlFor={`url-${link.id}`} className="sr-only">
                {link.name} 的新連結
              </label>
              <input
                id={`url-${link.id}`}
                name="url"
                type="url"
                inputMode="url"
                required
                placeholder="https://drive.google.com/…"
                aria-invalid={error === "link" && errorId === link.id ? true : undefined}
                className={input}
              />
              <button type="submit" className={`${primary} shrink-0`}>
                儲存
              </button>
            </form>
            {link.custom && (
              <form action={resetLink} className="mt-3">
                <input type="hidden" name="id" value={link.id} />
                <button type="submit" className="text-sm font-bold text-link">
                  恢復預設連結
                </button>
                <span className="ml-2 break-all text-xs text-ink/60">（{link.defaultUrl}）</span>
              </form>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
