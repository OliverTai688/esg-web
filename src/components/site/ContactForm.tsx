"use client"

import * as React from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Messages } from "@/i18n/messages"

// No backend is in scope (decided 2026-10-06): the form composes an email in the
// visitor's mail app, addressed to the support mailbox, with every field filled in.
//
// A link elsewhere on the page can hand over a topic: `<a href="#contact"
// data-contact-topic="2">` selects the third topic on its way to the form.
// Without JavaScript the link still scrolls here; the first topic stays selected.
export function ContactForm({ labels, to }: { labels: Messages["contactForm"]; to: string }) {
  const [sent, setSent] = React.useState(false)
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
  const required = (
    <span className="text-primary" title={labels.required}>
      *
    </span>
  )

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className={field}>
          <label className={label} htmlFor="cf-name">
            {labels.name} {required}
          </label>
          <Input id="cf-name" name="name" autoComplete="name" placeholder={labels.namePlaceholder} required />
        </div>
        <div className={field}>
          <label className={label} htmlFor="cf-email">
            {labels.email} {required}
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
