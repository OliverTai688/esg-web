"use client"

import * as React from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { site } from "@/lib/site"
import { formCopy } from "./messages"
import { useFormPost } from "./useFormPost"
import { FieldErrorText, FormStatusText, Honeypot, RequiredMark, errorProps, fieldLabelClass } from "./parts"

// rev2 #53②: name, job title and email (all required) and which white paper.
// On submit, /api/forms emails gho001@coesg.tw (including the chosen paper);
// only after that succeeds does the download link for that paper appear here.
// The download URLs are in the page anyway, so this is a courtesy gate, not access control.
//
// The props are the contract the whitepaper page uses; keep them stable. The
// page places the founder introduction next to this form (#53②); this
// component renders the form only.
export interface WhitepaperOption {
  id: string
  /** Client name shown in the choice, e.g. 大古鑄鐵 */
  title: string
  /** Download URL of the web version */
  url: string
}

export function WhitepaperDownload({ locale, papers }: { locale: string; papers: readonly WhitepaperOption[] }) {
  const copy = formCopy(locale)
  const t = copy.whitepaper
  const { state, submit, reset } = useFormPost("whitepaper", locale)
  const [paperId, setPaperId] = React.useState(papers[0]?.id ?? "")
  const [ready, setReady] = React.useState<WhitepaperOption | null>(null)
  const linkRef = React.useRef<HTMLAnchorElement>(null)
  const errors = state.fields

  React.useEffect(() => {
    if (ready) linkRef.current?.focus()
  }, [ready])

  if (papers.length === 0) return null

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (state.status === "sending") return
    const paper = papers.find((p) => p.id === paperId)
    const ok = await submit(event.currentTarget, { paperTitle: paper?.title ?? "" })
    if (ok && paper) setReady(paper)
  }

  const another = () => {
    setReady(null)
    reset()
  }

  const field = "space-y-2"
  const required = <RequiredMark label={copy.required} />

  return (
    <div className="space-y-4">
      {/* Kept mounted while the link shows, so the details stay filled in for another download */}
      <form onSubmit={onSubmit} noValidate hidden={!!ready} className="relative space-y-5">
        <Honeypot />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className={field}>
            <label className={fieldLabelClass} htmlFor="wp-name">
              {t.name} {required}
            </label>
            <Input id="wp-name" name="name" autoComplete="name" required maxLength={100} {...errorProps("wp-name", errors.name)} />
            <FieldErrorText id="wp-name" error={errors.name} copy={copy} />
          </div>
          <div className={field}>
            <label className={fieldLabelClass} htmlFor="wp-job">
              {t.jobTitle} {required}
            </label>
            <Input id="wp-job" name="jobTitle" autoComplete="organization-title" required maxLength={100} {...errorProps("wp-job", errors.jobTitle)} />
            <FieldErrorText id="wp-job" error={errors.jobTitle} copy={copy} />
          </div>
        </div>
        <div className={field}>
          <label className={fieldLabelClass} htmlFor="wp-email">
            {t.email} {required}
          </label>
          <Input id="wp-email" name="email" type="email" autoComplete="email" required maxLength={254} {...errorProps("wp-email", errors.email)} />
          <FieldErrorText id="wp-email" error={errors.email} copy={copy} />
        </div>
        <fieldset className={field} aria-describedby={errors.paperId ? "wp-paper-error" : undefined}>
          <legend className={`${fieldLabelClass} mb-2`}>
            {t.paper} {required}
          </legend>
          <div className="flex flex-wrap gap-2">
            {papers.map((paper) => (
              <label key={paper.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="paperId"
                  value={paper.id}
                  checked={paper.id === paperId}
                  onChange={() => setPaperId(paper.id)}
                  className="peer sr-only"
                />
                {/* 44px tap target */}
                <span className="flex min-h-11 items-center rounded-full border border-border bg-card px-4 text-sm font-medium text-ink/80 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
                  {paper.title}
                </span>
              </label>
            ))}
          </div>
          <FieldErrorText id="wp-paper" error={errors.paperId} copy={copy} />
        </fieldset>
        <Button type="submit" size="lg" className="w-full sm:w-auto" aria-disabled={state.status === "sending"}>
          <Download />
          {t.submit}
        </Button>
      </form>

      <FormStatusText state={state} copy={copy} email={site.supportEmail} success={t.success} />

      {ready && (
        <div className="space-y-4">
          <Button asChild size="lg" className="h-auto min-h-13 whitespace-normal py-3 text-left">
            <a ref={linkRef} href={ready.url} target="_blank" rel="noopener noreferrer">
              <Download />
              {t.download.replace("{title}", ready.title)}
            </a>
          </Button>
          <div>
            <button type="button" onClick={another} className="text-link inline-flex min-h-11 items-center text-sm font-bold">
              {t.another}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
