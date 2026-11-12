"use client"

import { cn } from "@/lib/utils"
import { HONEYPOT_FIELD, type FieldError } from "./schema"
import type { FormCopy } from "./messages"
import type { FormState } from "./useFormPost"

export const fieldLabelClass = "text-sm font-bold text-ink"

// Same look as <Input>, for <select> and <textarea>.
export const controlClass =
  "flex w-full rounded-xl border border-input bg-card px-3.5 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive md:text-sm"

// Visual marker only: inputs carry `required`, which screen readers announce.
export function RequiredMark({ label }: { label: string }) {
  return (
    <span className="text-primary" title={label} aria-hidden="true">
      *
    </span>
  )
}

/** Props that tie an input to its error message. */
export function errorProps(id: string, error: FieldError | undefined) {
  return error ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` } : {}
}

export function FieldErrorText({ id, error, copy }: { id: string; error: FieldError | undefined; copy: FormCopy }) {
  if (!error) return null
  return (
    <p id={`${id}-error`} className="text-sm font-medium text-destructive">
      {copy.field[error]}
    </p>
  )
}

// Hidden from people (visually and from assistive tech); bots that fill every field fill this one.
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )
}

// The form's live region: always in the page so screen readers announce every change.
export function FormStatusText({
  state,
  copy,
  email,
  success,
  idle,
  className,
}: {
  state: FormState
  copy: FormCopy
  email: string
  success: string
  idle?: string
  className?: string
}) {
  let text = idle ?? ""
  if (state.status === "sending") text = copy.sending
  if (state.status === "success") text = success
  if (state.status === "error" && state.error) text = copy.submit[state.error].replace("{email}", email)
  return (
    <p
      aria-live="polite"
      className={cn(
        "text-sm leading-relaxed",
        state.status === "error" ? "font-medium text-destructive" : "text-muted-foreground",
        state.status === "success" && "font-bold text-ink",
        className
      )}
    >
      {text}
    </p>
  )
}
