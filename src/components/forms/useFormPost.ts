"use client"

import * as React from "react"
import { HONEYPOT_FIELD, checkForm, type FieldError, type FormKind, type SubmitError } from "./schema"

export type FormStatus = "idle" | "sending" | "success" | "error"

export interface FormState {
  status: FormStatus
  error?: SubmitError
  fields: Record<string, FieldError>
}

const IDLE: FormState = { status: "idle", fields: {} }

// Posts one of the site's forms to /api/forms. Checks the fields first (the
// server checks again), moves focus to the first field that needs fixing, and
// only reports success when the server says the email was sent.
export function useFormPost(kind: FormKind, locale: string) {
  const [state, setState] = React.useState<FormState>(IDLE)

  const submit = React.useCallback(
    async (form: HTMLFormElement, extra: Record<string, string> = {}) => {
      const data = new FormData(form)
      const values: Record<string, string> = {}
      for (const [key, value] of data.entries()) if (typeof value === "string") values[key] = value.trim()
      Object.assign(values, extra)

      const fields = checkForm(kind, values)
      if (Object.keys(fields).length > 0) {
        setState({ status: "error", error: "invalid", fields })
        focusFirst(form, fields)
        return false
      }

      setState({ status: "sending", fields: {} })
      try {
        const response = await fetch("/api/forms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, [HONEYPOT_FIELD]: values[HONEYPOT_FIELD] ?? "", form: kind, locale }),
        })
        const result = (await response.json().catch(() => null)) as
          | { ok: true }
          | { ok: false; error?: SubmitError; fields?: string[] }
          | null
        if (response.ok && result?.ok) {
          setState({ status: "success", fields: {} })
          return true
        }
        const serverFields: Record<string, FieldError> = {}
        if (result && !result.ok) for (const name of result.fields ?? []) serverFields[name] = "required"
        // Re-run the local check to get the precise reason per field.
        Object.assign(serverFields, checkForm(kind, values))
        if (result && !result.ok && result.fields?.includes("topic")) serverFields.topic = "option"
        setState({ status: "error", error: result && !result.ok ? (result.error ?? "send_failed") : "send_failed", fields: serverFields })
        focusFirst(form, serverFields)
        return false
      } catch {
        setState({ status: "error", error: "network", fields: {} })
        return false
      }
    },
    [kind, locale]
  )

  const reset = React.useCallback(() => setState(IDLE), [])

  return { state, submit, reset }
}

function focusFirst(form: HTMLFormElement, fields: Record<string, FieldError>) {
  const first = Object.keys(fields)[0]
  if (!first) return
  const element = form.elements.namedItem(first)
  if (element instanceof HTMLElement) element.focus()
  else if (element instanceof RadioNodeList && element[0] instanceof HTMLElement) element[0].focus()
}
