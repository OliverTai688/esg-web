import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  clean?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = "div", clean = false, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "mx-auto w-full px-6 md:px-8",
          !clean && "max-w-[1120px]",
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container }
