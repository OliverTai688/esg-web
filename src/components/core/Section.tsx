import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { GridPattern, TopoPattern, BigText } from "@/components/core/BackgroundPattern"
import { SectionEntrance } from "@/components/core/SectionEntrance"

const sectionVariants = cva("relative w-full", {
  variants: {
    padding: {
      default: "py-20 md:py-24 lg:py-32",
      sm: "py-12 md:py-16",
      lg: "py-32 md:py-40 lg:py-48",
      none: "py-0",
    },
    background: {
      default: "bg-background",
      muted: "bg-muted/30",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary",
    },
  },
  defaultVariants: {
    padding: "default",
    background: "default",
  },
})

interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType
  withPattern?: boolean
  withTopo?: boolean
  bigText?: string
  /** Render a background layer (e.g. AnimatedGradientBackground) at the section root,
   *  outside SectionEntrance so it fills the full section including padding. */
  backgroundSlot?: React.ReactNode
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, padding, background, withPattern, withTopo, bigText, backgroundSlot, as: Component = "section", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(sectionVariants({ padding, background, className }), "relative overflow-hidden")}
        {...props}
      >
        {withPattern && (
          <GridPattern className="opacity-[0.03] pointer-events-none" />
        )}

        {withTopo && (
          <TopoPattern className="opacity-[0.06] pointer-events-none" />
        )}

        {bigText && (
          <BigText text={bigText} className="opacity-70" />
        )}

        {backgroundSlot}

        <SectionEntrance>
          {children}
        </SectionEntrance>
      </Component>
    )
  }
)
Section.displayName = "Section"

export { Section }
