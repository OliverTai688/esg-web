// Field rules shared by the three forms' client components and the
// /api/forms route (rev2 WP-F), so both sides check the same limits.
// No secrets here: this file is safe to import from client components.

export type FormKind = "contact" | "subscribe" | "whitepaper"

export type FieldError = "required" | "email" | "tooLong" | "option"

/** Error codes the API returns; `network` is added by the client. */
export type SubmitError = "invalid" | "rate_limited" | "not_configured" | "send_failed" | "network"

export interface FieldRule {
  required?: boolean
  max: number
  email?: boolean
}

export const formFields: Record<FormKind, Record<string, FieldRule>> = {
  contact: {
    name: { required: true, max: 100 },
    email: { required: true, max: 254, email: true },
    organization: { max: 200 },
    topic: { max: 100 },
    message: { max: 5000 },
  },
  subscribe: {
    email: { required: true, max: 254, email: true },
  },
  whitepaper: {
    name: { required: true, max: 100 },
    jobTitle: { required: true, max: 100 },
    email: { required: true, max: 254, email: true },
    paperId: { required: true, max: 100 },
    paperTitle: { required: true, max: 200 },
  },
}

/** Name of the hidden honeypot field. People never see or fill it. */
export const HONEYPOT_FIELD = "website"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function checkField(rule: FieldRule, value: string): FieldError | null {
  if (!value) return rule.required ? "required" : null
  if (value.length > rule.max) return "tooLong"
  if (rule.email && !EMAIL_PATTERN.test(value)) return "email"
  return null
}

export function checkForm(kind: FormKind, values: Record<string, string>): Record<string, FieldError> {
  const errors: Record<string, FieldError> = {}
  for (const [name, rule] of Object.entries(formFields[kind])) {
    const error = checkField(rule, (values[name] ?? "").trim())
    if (error) errors[name] = error
  }
  return errors
}
