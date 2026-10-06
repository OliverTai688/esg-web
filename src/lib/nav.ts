import {
  Compass,
  Briefcase,
  BarChart3,
  Globe2,
  CalendarDays,
  GraduationCap,
  Repeat,
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
  type LucideIcon,
} from "lucide-react"
import type { Dictionary } from "@/i18n/dictionaries/zh"

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

// Dropdown menus for the main navigation.
// Items are listed in the order their sections appear on the page, top to bottom —
// when a page's sections are added, removed or reordered, update the list here.
export function getNavGroups(locale: string, labels: Dictionary["nav"]): NavGroup[] {
  const sustainability = `/${locale}/sustainability`
  const events = `/${locale}/events`
  const learning = `/${locale}/learning`
  const consulting = `/${locale}/consulting`

  return [
    {
      key: "sustainability",
      label: labels.sustainability.label,
      href: sustainability,
      items: [
        { title: labels.sustainability.services, desc: labels.sustainability.servicesDesc, href: `${sustainability}#services`, icon: Briefcase },
        { title: labels.sustainability.practices, desc: labels.sustainability.practicesDesc, href: `${sustainability}#impact`, icon: BarChart3 },
        { title: labels.sustainability.vision, desc: labels.sustainability.visionDesc, href: `${sustainability}#methodology`, icon: Compass },
        { title: labels.sustainability.ecosystem, desc: labels.sustainability.ecosystemDesc, href: `${sustainability}#ecosystem`, icon: Globe2 },
      ],
    },
    {
      key: "events",
      label: labels.events.label,
      href: events,
      items: [
        { title: labels.events.list, desc: labels.events.listDesc, href: `${events}#upcoming`, icon: CalendarDays },
        { title: labels.events.workshops, desc: labels.events.workshopsDesc, href: `${events}#workshops`, icon: GraduationCap },
        { title: labels.events.services, desc: labels.events.servicesDesc, href: `${events}#services`, icon: Repeat },
        { title: labels.events.history, desc: labels.events.historyDesc, href: `${events}#history`, icon: History },
        { title: labels.events.caseStudies, desc: labels.events.caseStudiesDesc, href: `${events}#cases`, icon: FileSearch },
      ],
    },
    {
      key: "learning",
      label: labels.learning.label,
      href: learning,
      items: [
        { title: labels.learning.innovation, desc: labels.learning.innovationDesc, href: `${learning}#innovation`, icon: Lightbulb },
        { title: labels.learning.market, desc: labels.learning.marketDesc, href: `${learning}#market`, icon: TrendingUp },
        { title: labels.learning.responsibility, desc: labels.learning.responsibilityDesc, href: `${learning}#responsibility`, icon: Shield },
        { title: labels.learning.collaboration, desc: labels.learning.collaborationDesc, href: `${learning}#collaboration`, icon: Handshake },
        { title: labels.learning.communication, desc: labels.learning.communicationDesc, href: `${learning}#communication`, icon: MessageCircle },
        { title: labels.learning.interviews, desc: labels.learning.interviewsDesc, href: `${learning}#interviews`, icon: Mic2 },
      ],
    },
    {
      key: "consulting",
      label: labels.consulting.label,
      href: consulting,
      items: [
        { title: labels.consulting.solutions, desc: labels.consulting.solutionsDesc, href: `${consulting}#solutions`, icon: Sparkles },
        { title: labels.consulting.ngo, desc: labels.consulting.ngoDesc, href: `${consulting}#ngo`, icon: Building2 },
        { title: labels.consulting.membership, desc: labels.consulting.membershipDesc, href: `${consulting}#membership`, icon: Users },
        { title: labels.consulting.faq, desc: labels.consulting.faqDesc, href: `${consulting}#faq`, icon: HelpCircle },
        { title: labels.consulting.contact, desc: labels.consulting.contactDesc, href: `${consulting}#contact`, icon: Mail },
      ],
    },
  ]
}
