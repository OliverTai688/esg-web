"use client"

import * as React from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Messages } from "@/i18n/messages"

// No backend is in scope (decided 2026-10-06): the form composes an email in the
// visitor's mail app, addressed to the support mailbox, with every field filled in.
export function ContactForm({ labels, to }: { labels: Messages["contactForm"]; to: string }) {
  const [sent, setSent] = React.useState(false)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const get = (k: string) => String(data.get(k) ?? "").trim()
    const body = [
      `${labels.name}：${get("name")}`,
      `${labels.email}：${get("email")}`,
      `${labels.org}：${get("organization")}`,
      `${labels.topic}：${get("topic")}`,
      "",
      get("message"),
    ].join("\n")
    const subject = `${labels.mailSubject}｜${get("name")}${get("organization") ? `（${get("organization")}）` : ""}`
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const field = "space-y-2"
  const label = "text-sm font-bold text-ink"

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className={field}>
          <label className={label} htmlFor="cf-name">
            {labels.name} <span className="text-primary">*</span>
          </label>
          <Input id="cf-name" name="name" autoComplete="name" placeholder={labels.namePlaceholder} required />
        </div>
        <div className={field}>
          <label className={label} htmlFor="cf-email">
            {labels.email} <span className="text-primary">*</span>
          </label>
          <Input id="cf-email" name="email" type="email" autoComplete="email" placeholder={labels.emailPlaceholder} required />
        </div>
      </div>
      <div className={field}>
        <label className={label} htmlFor="cf-org">
          {labels.org}
        </label>
        <Input id="cf-org" name="organization" autoComplete="organization" placeholder={labels.orgPlaceholder} />
      </div>
      <fieldset className={field}>
        <legend className={`${label} mb-2`}>{labels.topic}</legend>
        <div className="flex flex-wrap gap-2">
          {labels.topics.map((topic, i) => (
            <label key={topic} className="cursor-pointer">
              <input type="radio" name="topic" value={topic} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-ink/80 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                {topic}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className={field}>
        <label className={label} htmlFor="cf-message">
          {labels.message}
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          placeholder={labels.messagePlaceholder}
          className="flex w-full rounded-xl border border-input bg-card px-3.5 py-3 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
        />
      </div>
      <Button type="submit" size="lg" className="w-full">
        <Send />
        {labels.submit}
      </Button>
      <p className="text-xs leading-relaxed text-muted-foreground" aria-live="polite">
        {sent ? labels.success : labels.mailNote}
      </p>
    </form>
  )
}
