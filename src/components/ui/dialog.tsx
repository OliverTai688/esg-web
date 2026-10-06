"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  return (
    <AnimatePresence>
      {open && (
        <DialogRoot onOpenChange={onOpenChange}>
          {children}
        </DialogRoot>
      )}
    </AnimatePresence>
  )
}

const DialogRoot = ({ 
  children, 
  onOpenChange 
}: { 
  children: React.ReactNode; 
  onOpenChange: (open: boolean) => void 
}) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    document.body.style.overflow = "hidden"
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = "unset"
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [onOpenChange])

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative z-50 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl border border-border bg-background shadow-2xl flex flex-col"
      >
        {children}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-6 top-6 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none bg-muted/50 p-2"
        >
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </button>
      </motion.div>
    </div>,
    document.body
  )
}

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left p-8 pb-4", className)} {...props} />
)

const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-2xl font-black leading-none tracking-tight", className)} {...props} />
)

const DialogContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex-1 overflow-y-auto p-8 pt-4", className)} {...props} />
)

export { Dialog, DialogHeader, DialogTitle, DialogContent }
