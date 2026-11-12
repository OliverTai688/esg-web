"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"
import { formCopy } from "./messages"
import { useFormPost } from "./useFormPost"
import { FieldErrorText, FormStatusText, Honeypot, errorProps, fieldLabelClass } from "./parts"

export interface EmailSubscribeLabels {
  label: string
  submit: string
  note: string
  success: string
}

// rev2 #50: one email field. /api/forms emails the address to gho001@coesg.tw,
// where staff keep the list; the site stores nothing.
export function EmailSubscribe({ locale, labels, className }: { locale: string; labels: EmailSubscribeLabels; className?: string }) {
  const copy = formCopy(locale)
  const { state, submit } = useFormPost("subscribe", locale)
  const error = state.fields.email

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (state.status === "sending") return
    const form = event.currentTarget
    if (await submit(form)) {
      const input = form.elements.namedItem("email")
      if (input instanceof HTMLInputElement) input.value = ""
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("relative w-full max-w-md text-left", className)}>
      <Honeypot />
      <label className={fieldLabelClass} htmlFor="subscribe-email">
        {labels.label}
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Input
          id="subscribe-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          required
          maxLength={254}
          className="sm:flex-1"
          {...errorProps("subscribe-email", error)}
        />
        <Button type="submit" className="h-12 shrink-0" aria-disabled={state.status === "sending"}>
          {labels.submit}
        </Button>
      </div>
      <div className="mt-2 space-y-1">
        <FieldErrorText id="subscribe-email" error={error} copy={copy} />
        <FormStatusText state={state} copy={copy} email={site.supportEmail} success={labels.success} />
        <p className="text-xs leading-relaxed text-muted-foreground">{labels.note}</p>
      </div>
    </form>
  )
}
