import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  kicker?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
  tone?: "light" | "dark"
  as?: "h1" | "h2" | "h3"
  /** Visual size of the title */
  size?: "lg" | "md"
  className?: string
  children?: React.ReactNode
}

// The one heading pattern used by every section: kicker → title → description.
export function SectionHeader({
  kicker,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  size = "lg",
  className,
  children,
}: SectionHeaderProps) {
  const dark = tone === "dark"
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "items-start max-w-3xl",
        className,
      )}
    >
      {kicker && (
        <p
          className={cn(
            "kicker-rule text-[13px] font-bold tracking-[0.12em]",
            dark ? "text-brand-yellow" : "text-primary",
          )}
        >
          {kicker}
        </p>
      )}
      <Tag
        className={cn(
          "font-black leading-[1.25]",
          size === "lg" ? "text-[1.75rem] sm:text-4xl lg:text-[2.75rem]" : "text-2xl sm:text-3xl",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "text-base sm:text-lg leading-[1.85]",
            dark ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  )
}
