import { Button } from "@/components/ui/button"
import { ChannelIcon } from "@/components/site/SocialIcons"
import { contactFor, type ContactPurpose } from "@/lib/site"

/**
 * A "talk to us" button that follows the locale: LINE on the Chinese site,
 * email or LinkedIn on the English site (EN rule R17). `variant` is the Chinese
 * style; on the English site a LINE-green button becomes the brand default.
 */
export function ChannelButton({
  locale,
  purpose,
  children,
  variant = "line",
  size = "lg",
  externalLabel,
  className,
}: {
  locale: string
  purpose: ContactPurpose
  children: React.ReactNode
  variant?: "line" | "outline" | "outlineInverse" | "default"
  size?: "default" | "lg"
  /** Screen-reader note for links that open a new window. */
  externalLabel?: string
  className?: string
}) {
  const c = contactFor(locale, purpose)
  const v = c.channel !== "line" && variant === "line" ? "default" : variant
  return (
    <Button size={size} variant={v} className={className} asChild>
      <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        <ChannelIcon channel={c.channel} />
        {children}
        {c.external && externalLabel && <span className="sr-only">{externalLabel}</span>}
      </a>
    </Button>
  )
}
