import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  Coffee,
  Compass,
  FileSearch,
  FileText,
  Flag,
  Footprints,
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  HelpCircle,
  History,
  Layers,
  Lightbulb,
  Mail,
  Map,
  MessageCircle,
  Mic2,
  Newspaper,
  Quote,
  Repeat,
  Rocket,
  Route,
  Scale,
  Search,
  Shield,
  Sparkles,
  Sprout,
  Target,
  TrendingUp,
  UserRound,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import type { ChapterDef } from "@/lib/chapters"
import type { Messages } from "@/i18n/messages"

export interface NavItem {
  title: string
  desc: string
  href: string
  icon: LucideIcon
}

export interface NavGroup {
  key: string
  label: string
  href: string
  items: NavItem[]
}

// Icons a chapter may name in its `icon` field.
export const NAV_ICONS: Record<string, LucideIcon> = {
  Award, BarChart3, BookOpen, Briefcase, Building2, CalendarDays, Coffee, Compass, FileSearch, FileText,
  Flag, Footprints, Globe2, GraduationCap, Handshake, HeartHandshake, HelpCircle, History, Layers, Lightbulb,
  Mail, Map, MessageCircle, Mic2, Newspaper, Quote, Repeat, Rocket, Route, Scale, Search, Shield, Sparkles,
  Sprout, Target, TrendingUp, UserRound, Users, Wallet,
}

// What the navbar needs from the dictionary: top-level names plus each page's chapters.
export interface NavData {
  labels: Messages["nav"]
  chapters: Record<"sustainability" | "events" | "learning" | "consulting", readonly ChapterDef[]>
}

export function getNavData(messages: Messages): NavData {
  return {
    labels: messages.nav,
    chapters: {
      sustainability: messages.sustainability.chapters,
      events: messages.events.chapters,
      learning: messages.learning.chapters,
      consulting: messages.consulting.chapters,
    },
  }
}

// Dropdown menus for the main navigation. Each menu is the page's own chapter
// list, in page order: the dropdown, the in-page ChapterNav and the page's
// sections all come from `chapters` in that page's message file.
export function getNavGroups(locale: string, { labels, chapters }: NavData): NavGroup[] {
  const pages = ["sustainability", "events", "learning", "consulting"] as const
  return pages.map((page) => {
    const base = `/${locale}/${page}`
    return {
      key: page,
      label: labels[page].label,
      href: base,
      items: chapters[page].map((c) => ({
        title: c.label,
        desc: c.desc,
        href: c.route ? `/${locale}${c.route}` : `${base}#${c.id}`,
        icon: NAV_ICONS[c.icon] ?? ArrowRight,
      })),
    }
  })
}
