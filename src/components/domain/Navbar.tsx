"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { LocaleSwitcher } from "@/components/domain/LocaleSwitcher"
import {
  Menu,
  X,
  ChevronDown,
  Compass,
  Briefcase,
  BarChart3,
  Globe2,
  CalendarDays,
  GraduationCap,
  History,
  FileSearch,
  Handshake,
  MessageCircle,
  Lightbulb,
  TrendingUp,
  Shield,
  Mic2,
  Sparkles,
  Building2,
  Users,
  HelpCircle,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import type { LucideIcon } from "lucide-react"

/* ═══════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════ */

interface NavItem {
  title: string
  href: string
  desc?: string
  icon?: LucideIcon
}

interface NavColumn {
  title: string
  items: NavItem[]
}

interface NavGroup {
  label: string
  href: string
  columns: NavColumn[]
}

interface NavbarProps {
  locale: Locale
  labels: {
    sustainability: {
      label: string
      vision: string
      visionDesc: string
      services: string
      servicesDesc: string
      practices: string
      practicesDesc: string
      ecosystem: string
      ecosystemDesc: string
    }
    events: {
      label: string
      list: string
      listDesc: string
      workshops: string
      workshopsDesc: string
      history: string
      historyDesc: string
      caseStudies: string
      caseStudiesDesc: string
    }
    learning: {
      label: string
      collaboration: string
      collaborationDesc: string
      communication: string
      communicationDesc: string
      innovation: string
      innovationDesc: string
      market: string
      marketDesc: string
      responsibility: string
      responsibilityDesc: string
      interviews: string
      interviewsDesc: string
    }
    consulting: {
      label: string
      solutions: string
      solutionsDesc: string
      ngo: string
      ngoDesc: string
      membership: string
      membershipDesc: string
      faq: string
      faqDesc: string
      contact: string
      contactDesc: string
    }
    join: string
    cta: string
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   Animation variants
   ═══════════════════════════════════════════════════════════════════════ */

const megaMenuVariants = {
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
      stiffness: 120,
      damping: 20,
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
   MegaMenuItem — individual card item in dropdown
   ═══════════════════════════════════════════════════════════════════════ */

function MegaMenuItem({
  item,
  onNavigate,
}: {
  item: NavItem
  onNavigate: () => void
}) {
  const Icon = item.icon
  return (
    <motion.div variants={itemVariants}>
      <Link
        href={item.href}
        onClick={onNavigate}
        className="group/card flex items-start gap-3.5 rounded-xl p-3.5 transition-all duration-200 hover:bg-primary/[0.04] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.04)] active:scale-[0.99]"
      >
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/[0.06] text-primary/70 transition-all duration-200 group-hover/card:bg-primary/[0.1] group-hover/card:text-primary group-hover/card:scale-105">
          {Icon ? (
            <Icon size={18} strokeWidth={1.8} />
          ) : (
            <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[13.5px] font-semibold leading-tight text-foreground/90 transition-colors group-hover/card:text-primary">
            {item.title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground/80 line-clamp-2">
            {item.desc}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   NavTrigger — top-level nav item that opens mega menu
   ═══════════════════════════════════════════════════════════════════════ */

const NavTrigger = React.forwardRef<
  HTMLButtonElement,
  {
    label: string
    isActive: boolean
    isOpen: boolean
  }
>(({ label, isActive, isOpen }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "relative flex items-center gap-1 px-4 py-2 text-[13.5px] font-medium tracking-[-0.01em] transition-colors duration-200 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        isActive
          ? "text-primary"
          : isOpen
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
      <ChevronDown
        size={13}
        strokeWidth={2}
        className={cn(
          "transition-transform duration-300 ease-out opacity-50",
          isOpen && "rotate-180 opacity-70"
        )}
      />
      {/* Active indicator dot */}
      {isActive && (
        <motion.div
          layoutId="nav-active-dot"
          className="absolute -bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-primary"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  )
})
NavTrigger.displayName = "NavTrigger"

/* ═══════════════════════════════════════════════════════════════════════
   MegaMenu — the dropdown panel with shared viewport logic
   ═══════════════════════════════════════════════════════════════════════ */

function MegaMenu({
  group,
  onNavigate,
  xOffset,
}: {
  group: NavGroup
  onNavigate: () => void
  xOffset: number
}) {
  return (
    <motion.div
      layout
      variants={megaMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative z-50 pt-2"
      style={{ 
        left: "50%",
        x: "-50%" 
      }}
      transition={{
        layout: { type: "spring", stiffness: 220, damping: 26 }
      }}
    >
      <div className="relative group/viewport">
        <motion.div
          layout
          className={cn(
            "relative flex overflow-hidden rounded-3xl border border-border/50 bg-white/95 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.03)]",
            "w-[840px] h-[400px] opacity-100"
          )}
          transition={{
            layout: { type: "spring", stiffness: 220, damping: 26 }
          }}
        >
          {/* Subtle noise texture overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjAyNSIvPjwvc3ZnPg==')] opacity-60" />

          {/* Subtle gradient top edge */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={group.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex h-full divide-x divide-border/40"
              >
                {group.columns.map((column) => (
                  <div
                    key={column.title}
                    className="w-[280px] shrink-0 p-7"
                  >
                    <h3 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/45">
                      {column.title}
                    </h3>
                    <div className="flex flex-col gap-1">
                      {column.items.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={onNavigate}
                            className="group/nav-item -mx-3.5 flex items-start gap-3.5 rounded-2xl p-3.5 transition-all duration-200 hover:bg-primary/[0.04] active:scale-[0.98]"
                          >
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/[0.06] text-primary/70 transition-colors group-hover/nav-item:bg-primary/[0.1] group-hover/nav-item:text-primary">
                              {Icon ? (
                                <Icon size={18} strokeWidth={1.8} />
                              ) : (
                                <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[14px] font-semibold leading-tight text-foreground/90 transition-colors group-hover/nav-item:text-primary whitespace-nowrap truncate">
                                {item.title}
                              </p>
                              {item.desc && (
                                <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground/75 whitespace-nowrap truncate">
                                  {item.desc}
                                </p>
                              )}
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom gradient accent */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
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
  const [activeMenuPos, setActiveMenuPos] = React.useState<number>(0)
  const [expandedMobileGroup, setExpandedMobileGroup] = React.useState<string | null>(null)
  
  const navContainerRef = React.useRef<HTMLDivElement>(null)
  const triggerRefs = React.useRef<Record<string, HTMLButtonElement | null>>({})
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  // Update position whenever activeMenu changes
  React.useEffect(() => {
    if (activeMenu && triggerRefs.current[activeMenu] && navContainerRef.current) {
      const trigger = triggerRefs.current[activeMenu]!
      const container = navContainerRef.current!
      const triggerRect = trigger.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      
      // Calculate relative center
      const center = triggerRect.left - containerRect.left + triggerRect.width / 2
      setActiveMenuPos(center)
    }
  }, [activeMenu])

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
  const openMenu = React.useCallback((key: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setActiveMenu(key)
  }, [])

  const scheduleClose = React.useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
      closeTimeoutRef.current = null
    }, CLOSE_DELAY)
  }, [])

  const cancelClose = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  // ── Route matching ──
  const isGroupActive = (href: string) => pathname?.startsWith(href) ?? false

  // ── Navigation data with icons ──
  const navGroups: NavGroup[] = React.useMemo(() => [
    {
      label: labels.sustainability.label,
      href: `/${locale}/sustainability`,
      columns: [
        {
          title: "品牌與方法論",
          items: [
            { title: labels.sustainability.vision, desc: labels.sustainability.visionDesc, href: `/${locale}/sustainability#methodology`, icon: Compass },
            { title: labels.sustainability.ecosystem, desc: labels.sustainability.ecosystemDesc, href: `/${locale}/sustainability#ecosystem`, icon: Globe2 },
          ]
        },
        {
          title: "服務與實踐",
          items: [
            { title: labels.sustainability.services, desc: labels.sustainability.servicesDesc, href: `/${locale}/sustainability#services`, icon: Briefcase },
            { title: labels.sustainability.practices, desc: labels.sustainability.practicesDesc, href: `/${locale}/sustainability#impact`, icon: BarChart3 },
          ]
        }
      ]
    },
    {
      label: labels.events.label,
      href: `/${locale}/events`,
      columns: [
        {
          title: "活動動態",
          items: [
            { title: labels.events.list, desc: labels.events.listDesc, href: `/${locale}/events`, icon: CalendarDays },
            { title: labels.events.workshops, desc: labels.events.workshopsDesc, href: `/${locale}/events#workshops`, icon: GraduationCap },
          ]
        },
        {
          title: "回顧與案例",
          items: [
            { title: labels.events.history, desc: labels.events.historyDesc, href: `/${locale}/events#history`, icon: History },
            { title: labels.events.caseStudies, desc: labels.events.caseStudiesDesc, href: `/${locale}/events#cases`, icon: FileSearch },
          ]
        }
      ]
    },
    {
      label: labels.learning.label,
      href: `/${locale}/learning`,
      columns: [
        {
          title: "轉型策略",
          items: [
            { title: labels.learning.innovation, desc: labels.learning.innovationDesc, href: `/${locale}/learning#innovation`, icon: Lightbulb },
            { title: labels.learning.market, desc: labels.learning.marketDesc, href: `/${locale}/learning#market`, icon: TrendingUp },
            { title: labels.learning.responsibility, desc: labels.learning.responsibilityDesc, href: `/${locale}/learning#responsibility`, icon: Shield },
          ]
        },
        {
          title: "溝通與協作",
          items: [
            { title: labels.learning.collaboration, desc: labels.learning.collaborationDesc, href: `/${locale}/learning#collaboration`, icon: Handshake },
            { title: labels.learning.communication, desc: labels.learning.communicationDesc, href: `/${locale}/learning#communication`, icon: MessageCircle },
            { title: labels.learning.interviews, desc: labels.learning.interviewsDesc, href: `/${locale}/learning#interviews`, icon: Mic2 },
          ]
        }
      ]
    },
    {
      label: labels.consulting.label,
      href: `/${locale}/consulting`,
      columns: [
        {
          title: "方案與機制",
          items: [
            { title: labels.consulting.solutions, desc: labels.consulting.solutionsDesc, href: `/${locale}/consulting#solutions`, icon: Sparkles },
            { title: labels.consulting.ngo, desc: labels.consulting.ngoDesc, href: `/${locale}/consulting#ngo`, icon: Building2 },
            { title: labels.consulting.membership, desc: labels.consulting.membershipDesc, href: `/${locale}/consulting#membership`, icon: Users },
          ]
        },
        {
          title: "聯絡資訊",
          items: [
            { title: labels.consulting.faq, desc: labels.consulting.faqDesc, href: `/${locale}/consulting#faq`, icon: HelpCircle },
            { title: labels.consulting.contact, desc: labels.consulting.contactDesc, href: `/${locale}/consulting#contact`, icon: Mail },
          ]
        }
      ]
    },
  ], [locale, labels])

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
          <div className="flex items-center gap-0.5 relative" ref={navContainerRef}>
            {navGroups.map((group) => (
              <div
                key={group.label}
                onMouseEnter={() => openMenu(group.label)}
                onMouseLeave={scheduleClose}
              >
                <NavTrigger
                  ref={(el) => { triggerRefs.current[group.label] = el }}
                  label={group.label}
                  isActive={isGroupActive(group.href)}
                  isOpen={activeMenu === group.label}
                />
              </div>
            ))}

            {/* Shared Viewport for MegaMenu */}
            <AnimatePresence>
              {activeMenu && (
                <div
                  className="absolute top-full left-0 w-full pt-1"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  {/* Floating Arrow Indicator — positioned relative to the full-width viewport */}
                  <motion.div 
                    layoutId="nav-arrow"
                    className="absolute top-1 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] border-l border-t border-border/60 bg-white z-[60]" 
                    style={{ left: activeMenuPos }}
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  />
                  
                  <MegaMenu
                    key="shared-mega-menu"
                    group={navGroups.find(g => g.label === activeMenu)!}
                    xOffset={activeMenuPos}
                    onNavigate={() => setActiveMenu(null)}
                  />
                </div>
              )}
            </AnimatePresence>

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
            <Container className="py-5 max-h-[80vh] overflow-y-auto">
              <nav className="flex flex-col gap-0.5">
                {navGroups.map((group) => {
                  const isExpanded = expandedMobileGroup === group.label
                  const isActive = isGroupActive(group.href)

                  return (
                    <div key={group.label}>
                      <button
                        onClick={() =>
                          setExpandedMobileGroup(isExpanded ? null : group.label)
                        }
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
                              {group.columns.flatMap(c => c.items).map((item) => {
                                const Icon = item.icon
                                return (
                                  <motion.div key={item.title} variants={itemVariants}>
                                    <Link
                                      href={item.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-primary/[0.04] active:bg-primary/[0.06]"
                                    >
                                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/[0.06] text-primary/60">
                                        {Icon ? <Icon size={14} strokeWidth={1.8} /> : <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />}
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-foreground/90">
                                          {item.title}
                                        </p>
                                        {item.desc && (
                                          <p className="text-xs text-muted-foreground/70 mt-0.5 leading-relaxed">
                                            {item.desc}
                                          </p>
                                        )}
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
