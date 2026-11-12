"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Messages } from "@/i18n/messages"
import { site } from "@/lib/site"
import { formCopy } from "@/components/forms/messages"
import { useFormPost } from "@/components/forms/useFormPost"
import { FieldErrorText, FormStatusText, Honeypot, RequiredMark, controlClass, errorProps, fieldLabelClass } from "@/components/forms/parts"

// rev2 #48: the form posts to /api/forms, which emails gho001@coesg.tw with
// Reply-To set to the visitor; the site stores nothing. Success is shown in
// place only after the email was sent; a failure shows a retryable error.
// `to` is the address offered in error messages when sending fails.
//
// A link elsewhere on the page can hand over a topic: `<a href="#contact"
// data-contact-topic="2">` selects the third topic on its way to the form.
// Without JavaScript the link still scrolls here; the first topic stays selected.
export function ContactForm({ labels, to = site.supportEmail, locale }: { labels: Messages["contactForm"]; to?: string; locale?: string }) {
  const params = useParams<{ locale?: string }>()
  const lang = locale ?? params?.locale ?? "zh"
  const copy = formCopy(lang)
  const { state, submit } = useFormPost("contact", lang)
  const [topic, setTopic] = React.useState(0)
  const topicCount = labels.topics.length

  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("[data-contact-topic]") : null
      if (!link) return
      const index = Number(link.getAttribute("data-contact-topic"))
      if (Number.isInteger(index) && index >= 0) setTopic(Math.min(index, topicCount - 1))
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [topicCount])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (state.status === "sending") return
    if (!(await submit(form))) return
    // Clear the text fields; the chosen topic stays (radios are controlled by state).
    for (const element of Array.from(form.elements)) {
      if ((element instanceof HTMLInputElement && element.type !== "radio") || element instanceof HTMLTextAreaElement) element.value = ""
    }
  }

  const field = "space-y-2"
  const label = fieldLabelClass
  const required = <RequiredMark label={labels.required} />
  const errors = state.fields

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className={field}>
          <label className={label} htmlFor="cf-name">
            {labels.name} {required}
          </label>
          <Input id="cf-name" name="name" autoComplete="name" placeholder={labels.namePlaceholder} required maxLength={100} {...errorProps("cf-name", errors.name)} />
          <FieldErrorText id="cf-name" error={errors.name} copy={copy} />
        </div>
        <div className={field}>
          <label className={label} htmlFor="cf-email">
            {labels.email} {required}
          </label>
          <Input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={labels.emailPlaceholder}
            required
            maxLength={254}
            {...errorProps("cf-email", errors.email)}
          />
          <FieldErrorText id="cf-email" error={errors.email} copy={copy} />
        </div>
      </div>
      <div className={field}>
        <label className={label} htmlFor="cf-org">
          {labels.org}
        </label>
        <Input id="cf-org" name="organization" autoComplete="organization" placeholder={labels.orgPlaceholder} maxLength={200} {...errorProps("cf-org", errors.organization)} />
        <FieldErrorText id="cf-org" error={errors.organization} copy={copy} />
      </div>
      <fieldset className={field} aria-describedby={errors.topic ? "cf-topic-error" : undefined}>
        <legend className={`${label} mb-2`}>{labels.topic}</legend>
        <div className="flex flex-wrap gap-2">
          {labels.topics.map((name, i) => (
            <label key={name} className="cursor-pointer">
              <input type="radio" name="topic" value={name} checked={i === topic} onChange={() => setTopic(i)} className="peer sr-only" />
              {/* 44px tap target */}
              <span className="flex min-h-11 items-center rounded-full border border-border bg-card px-4 text-sm font-medium text-ink/80 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
                {name}
              </span>
            </label>
          ))}
        </div>
        <FieldErrorText id="cf-topic" error={errors.topic} copy={copy} />
      </fieldset>
      <div className={field}>
        <label className={label} htmlFor="cf-message">
          {labels.message}
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          maxLength={5000}
          placeholder={labels.messagePlaceholder}
          className={`${controlClass} py-3`}
          {...errorProps("cf-message", errors.message)}
        />
        <FieldErrorText id="cf-message" error={errors.message} copy={copy} />
      </div>
      <Button type="submit" size="lg" className="w-full" aria-disabled={state.status === "sending"}>
        <Send />
        {labels.submit}
      </Button>
      <FormStatusText state={state} copy={copy} email={to} success={labels.success} />
    </form>
  )
}
