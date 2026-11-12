import type { ChapterDef } from "@/lib/chapters"

// /learning (topic hub), /insights (chronological newsroom), the article page
// and the topic listing pages.
// Page sections of /learning in page order: the single source for the navbar
// dropdown and the in-page ChapterNav. Every id must be a section id on the page
// (scripts/check-anchors.mjs); each label is that section's kicker.
const chapters: readonly ChapterDef[] = [
  { id: "topics", label: "Six Topics", desc: "Pick a petal to see that topic's articles", icon: "Compass" },
  { id: "featured", label: "Featured", desc: "Not sure where to start? Read this one", icon: "Sparkles" },
  { id: "articles", label: "All Articles", desc: "Every article, filtered by topic", icon: "BookOpen" },
  // No "Latest Articles" entry: /en/insights redirects to /en/learning (EN7)
]

const learning = {
  chapters,
  meta: {
    title: "Insights",
    description: "From corporate collaboration models to innovation strategy, and from interviews to CO-ESG Academy announcements, keep learning about every dimension of sustainability.",
  },
  label: "Insights",
  title: "Sustainability Knowledge & Case Studies",
  description: "From corporate collaboration models to innovation strategy, and from interviews to CO-ESG Academy announcements, keep learning about every dimension of sustainability.",
  back: "Back to Insights",
  articlesCount: "articles",
  // Short reading time for list rows; the article header uses article.readingTime
  minutes: "min",
  announcementsTitle: "CO-ESG Academy announcements",
  hero: {
    cta: "Pick a topic",
    byline: "Written by Gung-Ho Culture and CO-ESG Academy",
    topicsCount: "topics",
  },
  topics: {
    label: "Six Topics",
    title: "Pick a petal and start with one topic",
    viewTopic: "View all articles on this topic",
    back: "Back to the six topics",
    others: "Other topics",
  },
  featured: {
    label: "Featured",
    cta: "Start reading",
  },
  articles: {
    label: "All Articles",
    title: "Filter by topic, or just keep reading",
    // EN6: the article list's heading on the English site
    titleInChinese: "More articles (in Chinese)",
    all: "All",
    filterLabel: "Filter by topic",
    // {n} is the number of articles in the current filter
    showAll: "Show all {n} articles",
    toInsights: "See the latest by date",
  },
  // EN6: every article is in Chinese. The English site lists each one by its English
  // title only (client copy), marked [in Chinese], linking to /zh/learning/<slug>.
  inChinese: "[in Chinese]",
  postTitles: {
    "business-model-canvas-innovation": "A core strategy guide: using the Business Model Canvas for innovation and problem-solving",
    "unilever-sustainability-strategy": "Scaling impact: Unilever’s sustainability success strategy",
    "data-driven-sustainability-strategy": "Data-driven decisions: the first step towards delivering a sustainability strategy",
    "market-data-sustainable-competitiveness": "Using market data to spot trends and make sustainable products more competitive",
    "materiality-assessment-esg": "Focusing on material issues: the best choices with limited resources",
    "sdgs-competitive-advantage": "Building a sustainable competitive advantage with the SDGs",
    "sustainability-report-insights": "Reading sustainability reports for companies’ future commitments",
    "public-good-corporate-win-win": "When charities and companies both win: creating social and economic value",
    "sponsorship-to-partnership": "From sponsorship to partnership: a win-win strategy for companies and non-profits",
    "dialogue-creates-value": "Creating value through dialogue: building bridges between business and society",
    "empathy-in-survey-design": "Seeing it from their side: making surveys more effective",
    "internal-external-sustainability-communication": "From internal practice to external communication: spreading the sustainability message",
    "peng-hsin-hui-sustainability-revolution": "From my father’s plastic building materials to my own sustainability revolution: Peng Hsin-hui on succession and renewal",
    "subscription-3-steps": "Subscribe in 3 steps",
    "esg-practitioners-survey-2024": "ESG practitioners’ needs and challenges: 2024 survey results",
    "carbon-footprint-to-handprint": "From carbon footprint to carbon handprint: shaping a more sustainable tomorrow",
  } as Record<string, string>,
  // `short` is the name on the topic's petal; keep it to one or two short lines
  sections: {
    innovation: { title: "Innovation Strategy", short: "Innovation", description: "Explore innovative approaches to sustainability transformation, from business models to product design, and redefine your brand's sustainable competitiveness." },
    market: { title: "Market Competitiveness", short: "Market Edge", description: "Raise your brand's visibility in the sustainability market and stay on top of consumer trends and corporate procurement standards." },
    responsibility: { title: "Corporate Responsibility", short: "ESG & CSR", description: "Understand how corporate social responsibility works in practice, from ESG reporting to stakeholder communication." },
    collaboration: { title: "Collaboration Models", short: "Partnership", description: "Discover the many forms of industry partnership, from supply-chain integration to cross-sector co-branding, and find the path that suits you best." },
    communication: { title: "Communication & Empathy", short: "Communication", description: "Develop the skills for cross-sector dialogue and learn to convey sustainability value in the language of different industries." },
    interviews: { title: "Interviews", short: "Interviews", description: "First-hand stories from sustainability practitioners: hear how pioneers in different fields turn ideas into action." },
  },
  // rev2 #41 #42 #43: the CO-ESG Academy block at the bottom of /learning (src/components/site/CoesgBand.tsx).
  // No LINE or LinkedIn button here (#41③).
  academy: {
    kicker: "CO-ESG Academy",
    title: "Visit the CO-ESG Store",
    intro: "Want a single course? Visit the CO-ESG Store. Want to keep learning every week? Subscribe to CO-ESG Academy for weekly online classes and recordings. Want to try it yourself first? Use our online tools.",
    store: {
      title: "CO-ESG Store",
      // 待客戶確認 (D5, rev2 #41②): placeholder until the client sends the English
      // for the confirmed Chinese wording.
      body: "CO-ESG Academy courses are in the CO-ESG Store. Pick the one you need and buy it on its own. Taught in Mandarin.",
      cta: "Go to the CO-ESG Store",
      logo: "CO-ESG CLASS",
    },
    subscription: {
      title: "CO-ESG Academy Subscription",
      body: "Weekly online classes, recordings, speaker slides, a peer community and course discounts. Taught in Mandarin.",
      cta: "Go to the CO-ESG Store",
    },
    tools: {
      title: "Online tools",
      body: "Try our self-service tools. In Chinese.",
      cta: "Open the tools",
    },
  },
  cta: {
    title: "Finished reading? What next?",
    body: "Want to apply these ideas in your own organisation? Find the right course in Services & Pricing, or email us with your questions.",
    primary: "See courses and plans",
    secondary: "Email us",
  },
  article: {
    by: "Author",
    published: "Published",
    readingTime: "min read",
    tags: "Tags",
    toc: "In this article",
    next: "Next on this topic",
    nextOther: "Read next",
    endTitle: "Finished reading? What next?",
    endBody: "Still exploring? Follow us on LinkedIn for new articles. Have a specific question? Book a 15-minute Coffee Chat.",
    endPrimary: "Book a 15-minute Coffee Chat",
    endSecondary: "Follow us on LinkedIn",
  },
  insights: {
    meta: {
      title: "Latest Articles",
      description: "The latest articles and news from Gung-Ho Culture, newest first.",
    },
    label: "Latest Articles",
    title: "Sustainability Perspectives & Industry Insights",
    description: "From trend analysis to partnership case studies, we share first-hand observations and reflections on sustainability in practice.",
    cta: "Read the latest",
    byTopic: "Read by topic",
    latestUpdate: "Last updated",
    types: { announcement: "Announcement", interview: "Interview", article: "Perspective" },
    latest: { label: "Latest" },
    archive: {
      label: "By Month",
      // {n} is the total number of articles
      title: "All {n} articles, filed by month",
      count: "articles",
      rss: "RSS feed",
    },
    topics: {
      label: "Explore by Topic",
      title: "The same articles, arranged by topic",
    },
    mediaTitle: "Media and partnership enquiries",
    mediaBody: "For interviews, talks and forum partnerships, fill in the contact form or email us.",
    mediaPrimary: "Send an enquiry",
    mediaSecondary: "Email us",
  },
}

export default learning
