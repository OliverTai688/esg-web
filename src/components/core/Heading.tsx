import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headingVariants = cva("flex flex-col gap-2", {
  variants: {
    align: {
      left: "text-left items-start",
      center: "text-center items-center",
      right: "text-right items-end",
    },
    spacing: {
      default: "mb-12 md:mb-16",
      sm: "mb-8",
      lg: "mb-20 md:mb-24",
      none: "mb-0",
    },
  },
  defaultVariants: {
    align: "left",
    spacing: "default",
  },
})

interface HeadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headingVariants> {
  label?: string
  title: string
  subTitle?: string
  description?: string
  level?: 1 | 2 | 3 | 4
}

const Heading = React.forwardRef<HTMLDivElement, HeadingProps>(
  ({ className, align, spacing, label, title, subTitle, description, level = 2, ...props }, ref) => {
    const TitleTag = `h${level}` as React.ElementType

    const titleStyles = {
      1: "text-heading-1",
      2: "text-heading-2",
      3: "text-heading-3",
      4: "text-xl md:text-2xl font-bold leading-[1.4] text-foreground/80",
    }[level]

    return (
      <div
        ref={ref}
        className={cn(headingVariants({ align, spacing, className }))}
        {...props}
      >
        {/* Section label — unified accent orange (#6), readable size (#7) */}
        {label && (
          <span className="text-accent text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] mb-4">
            {label}
          </span>
        )}
        <TitleTag className={cn(titleStyles, "max-w-[900px]")}>
          {title}
        </TitleTag>
        {subTitle && (
          <p className={cn(
            "text-lg md:text-xl font-bold text-primary max-w-[800px] mt-6 tracking-tight leading-snug",
            align === "center" && "mx-auto"
          )}>
            {subTitle}
          </p>
        )}
        {description && (
          <p className={cn(
            "text-base md:text-lg text-muted-foreground/80 mt-4 max-w-[700px] md:max-w-[900px] leading-relaxed",
            align === "center" && "mx-auto"
          )}>
            {description}
          </p>
        )}
      </div>
    )
  }
)
Heading.displayName = "Heading"

export { Heading }
