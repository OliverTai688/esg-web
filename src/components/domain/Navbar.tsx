"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { LocaleSwitcher } from "@/components/domain/LocaleSwitcher"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { getNavGroups, type NavGroup } from "@/lib/nav"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/dictionaries/zh"

interface NavbarProps {
  locale: Locale
  labels: Dictionary["nav"]
}

/* ═══════════════════════════════════════════════════════════════════════
   Animation variants
   ═══════════════════════════════════════════════════════════════════════ */

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: { duration: 0.15, ease: "easeIn" as const },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 220,
      damping: 24,
      staggerChildren: 0.03,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.98,
    transition: { duration: 0.12, ease: "easeIn" as const },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 24 },
  },
}

const mobileMenuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { type: "spring" as const, stiffness: 100, damping: 20 },
      opacity: { duration: 0.2, delay: 0.05 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.2, ease: "easeIn" as const },
      opacity: { duration: 0.1 },
    },
  },
}

const mobileSubMenuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { type: "spring" as const, stiffness: 140, damping: 22 },
      opacity: { duration: 0.15, delay: 0.05 },
      staggerChildren: 0.04,
      delayChildren: 0.08,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.15 },
      opacity: { duration: 0.08 },
    },
  },
}

/* ═══════════════════════════════════════════════════════════════════════
   DesktopNavGroup — top-level link + disclosure button + single-column menu
   The label navigates to the page; the chevron (or hover) opens the menu.
   ═══════════════════════════════════════════════════════════════════════ */

function DesktopNavGroup({
  group,
  locale,
  isActive,
  isOpen,
  onOpen,
  onClose,
  onScheduleClose,
}: {
  group: NavGroup
  locale: Locale
  isActive: boolean
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onScheduleClose: () => void
}) {
  const menuId = `nav-menu-${group.key}`
  const toggleRef = React.useRef<HTMLButtonElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)

  const focusFirstItem = () => {
    requestAnimationFrame(() => listRef.current?.querySelector("a")?.focus())
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) {
      event.stopPropagation()
      onClose()
      toggleRef.current?.focus()
    }
  }

  // Close once keyboard focus leaves the whole group
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) onClose()
  }

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onScheduleClose}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <div className="flex items-center">
        <Link
          href={group.href}
          onClick={onClose}
          className={cn(
            "relative py-2 pl-4 pr-1 text-[13.5px] font-medium tracking-[-0.01em] transition-colors duration-200 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
            isActive
              ? "text-primary"
              : isOpen
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
          )}
        >
          {group.label}
          {isActive && (
            <motion.div
              layoutId="nav-active-dot"
              className="absolute -bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </Link>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-label={locale === "zh" ? `${group.label}選單` : `${group.label} menu`}
          onClick={() => (isOpen ? onClose() : onOpen())}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault()
              onOpen()
              focusFirstItem()
            }
          }}
          className={cn(
            "flex h-8 w-6 items-center justify-center rounded-md outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/30",
            isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <ChevronDown
            size={13}
            strokeWidth={2}
            className={cn(
              "transition-transform duration-300 ease-out opacity-50",
              isOpen && "rotate-180 opacity-70"
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div id={menuId} className="absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-3">
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative rounded-2xl border border-border/50 bg-white p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.03)]"
            >
              {/* Arrow pointing at the trigger */}
              <div className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-[2px] border-l border-t border-border/60 bg-white" />

              <ul ref={listRef} className="relative flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.li key={item.href} variants={itemVariants}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group/nav-item flex items-start gap-3.5 rounded-xl p-3 outline-none transition-colors duration-200 hover:bg-primary/[0.04] focus-visible:bg-primary/[0.06] active:scale-[0.98]"
                      >
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/[0.06] text-primary/70 transition-colors group-hover/nav-item:bg-primary/[0.1] group-hover/nav-item:text-primary">
                          <Icon size={18} strokeWidth={1.8} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[14px] font-semibold leading-tight text-foreground/90 transition-colors group-hover/nav-item:text-primary">
                            {item.title}
                          </p>
                          <p className="mt-1 text-[12.5px] leading-snug text-muted-foreground/75">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   Navbar — main component
   ═══════════════════════════════════════════════════════════════════════ */

const CLOSE_DELAY = 150

const Navbar = ({ locale, labels }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [scrollProgress, setScrollProgress] = React.useState(0)
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null)
  const [expandedMobileGroup, setExpandedMobileGroup] = React.useState<string | null>(null)

  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  // ── Scroll handler ──
  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max > 0) setScrollProgress(Math.min(window.scrollY / max, 1))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ── Body scroll lock for mobile ──
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  // ── Hover intent helpers (close delay) ──
  const cancelClose = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  const openMenu = React.useCallback((key: string) => {
    cancelClose()
    setActiveMenu(key)
  }, [cancelClose])

  const closeMenu = React.useCallback(() => {
    cancelClose()
    setActiveMenu(null)
  }, [cancelClose])

  const scheduleClose = React.useCallback(() => {
    cancelClose()
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
      closeTimeoutRef.current = null
    }, CLOSE_DELAY)
  }, [cancelClose])

  // ── Route matching ──
  const isGroupActive = (href: string) => pathname?.startsWith(href) ?? false

  const navGroups = React.useMemo(() => getNavGroups(locale, labels), [locale, labels])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] border-b border-border/40"
          : "bg-white/70 backdrop-blur-xl border-b border-transparent"
      )}
    >
      {/* ── Scroll progress ── */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-primary via-primary/80 to-primary/40 z-10 transition-[width] duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <Container className="flex h-[60px] items-center justify-between">
        {/* ── Logo ── */}
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-1.5 shrink-0"
        >
          <span className="text-lg font-black tracking-tight text-foreground transition-colors duration-200 group-hover:text-foreground/80">
            共好
            <span className="text-primary transition-colors duration-200 group-hover:text-primary/80">
              玟化
            </span>
          </span>
        </Link>

        {/* ══════════════════════════════════════════════════════════════
           Desktop Navigation
           ══════════════════════════════════════════════════════════════ */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <div className="flex items-center gap-1">
            {navGroups.map((group) => (
              <DesktopNavGroup
                key={group.key}
                group={group}
                locale={locale}
                isActive={isGroupActive(group.href)}
                isOpen={activeMenu === group.key}
                onOpen={() => openMenu(group.key)}
                onClose={closeMenu}
                onScheduleClose={scheduleClose}
              />
            ))}

            {/* Join — simple link, no dropdown */}
            <Link
              href={`/${locale}/join`}
              className={cn(
                "relative px-4 py-2 text-[13.5px] font-medium tracking-[-0.01em] rounded-lg transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                isGroupActive(`/${locale}/join`)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {labels.join}
              {isGroupActive(`/${locale}/join`) && (
                <motion.div
                  layoutId="nav-active-dot"
                  className="absolute -bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          </div>
        </nav>

        {/* ── Desktop right: locale + CTA ── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <LocaleSwitcher locale={locale} />
          <Button
            variant="default"
            size="sm"
            className="rounded-full px-5 h-9 text-[13px] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            asChild
          >
            <Link href={`/${locale}/consulting`}>{labels.cta}</Link>
          </Button>
        </div>

        {/* ══════════════════════════════════════════════════════════════
           Mobile toggle
           ══════════════════════════════════════════════════════════════ */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-muted/60 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <div className="relative w-5 h-5">
            <Menu
              size={20}
              strokeWidth={1.8}
              className={cn(
                "absolute inset-0 transition-all duration-300",
                mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100"
              )}
            />
            <X
              size={20}
              strokeWidth={1.8}
              className={cn(
                "absolute inset-0 transition-all duration-300",
                mobileOpen ? "opacity-100" : "opacity-0 -rotate-90 scale-75"
              )}
            />
          </div>
        </button>
      </Container>

      {/* ══════════════════════════════════════════════════════════════
         Mobile Menu
         ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden overflow-hidden border-t border-border/30 bg-white/98 backdrop-blur-2xl"
          >
            <Container className="py-5 max-h-[80dvh] overflow-y-auto">
              <nav className="flex flex-col gap-0.5">
                {navGroups.map((group) => {
                  const isExpanded = expandedMobileGroup === group.key
                  const isActive = isGroupActive(group.href)

                  return (
                    <div key={group.key}>
                      <button
                        onClick={() =>
                          setExpandedMobileGroup(isExpanded ? null : group.key)
                        }
                        aria-expanded={isExpanded}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-3 rounded-xl text-[15px] font-semibold transition-colors duration-200",
                          isActive ? "text-primary" : "text-foreground",
                          isExpanded && "bg-primary/[0.03]"
                        )}
                      >
                        <span className="flex items-center gap-2.5">
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          )}
                          {group.label}
                        </span>
                        <ChevronDown
                          size={15}
                          strokeWidth={2}
                          className={cn(
                            "text-muted-foreground/50 transition-transform duration-300",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            variants={mobileSubMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="overflow-hidden"
                          >
                            <div className="ml-4 pl-3.5 border-l-[1.5px] border-primary/10 pb-2 space-y-0.5">
                              {group.items.map((item) => {
                                const Icon = item.icon
                                return (
                                  <motion.div key={item.href} variants={itemVariants}>
                                    <Link
                                      href={item.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-primary/[0.04] active:bg-primary/[0.06]"
                                    >
                                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/[0.06] text-primary/60">
                                        <Icon size={14} strokeWidth={1.8} />
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-foreground/90">
                                          {item.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground/70 mt-0.5 leading-relaxed">
                                          {item.desc}
                                        </p>
                                      </div>
                                    </Link>
                                  </motion.div>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}

                {/* Join link */}
                <Link
                  href={`/${locale}/join`}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-3 rounded-xl text-[15px] font-semibold transition-colors",
                    isGroupActive(`/${locale}/join`)
                      ? "text-primary"
                      : "text-foreground"
                  )}
                >
                  {isGroupActive(`/${locale}/join`) && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                  {labels.join}
                </Link>
              </nav>

              {/* Bottom section */}
              <div className="mt-5 pt-4 border-t border-border/30 flex flex-col gap-3.5">
                <div className="flex items-center justify-between px-3">
                  <span className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                    {locale === "zh" ? "語言" : "Language"}
                  </span>
                  <LocaleSwitcher locale={locale} />
                </div>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full rounded-full py-5 text-[15px] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all"
                  asChild
                >
                  <Link
                    href={`/${locale}/consulting`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {labels.cta}
                  </Link>
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export { Navbar }
