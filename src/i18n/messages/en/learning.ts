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
  { id: "insights", label: "Latest Articles", desc: "All articles, newest first", icon: "Newspaper", route: "/insights" },
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
    all: "All",
    filterLabel: "Filter by topic",
    // {n} is the number of articles in the current filter
    showAll: "Show all {n} articles",
    toInsights: "See the latest by date",
  },
  // `short` is the name on the topic's petal; keep it to one or two short lines
  sections: {
    innovation: { title: "Innovation Strategy", short: "Innovation", description: "Explore innovative approaches to sustainability transformation, from business models to product design, and redefine your brand's sustainable competitiveness." },
    market: { title: "Market Competitiveness", short: "Market Edge", description: "Raise your brand's visibility in the sustainability market and stay on top of consumer trends and corporate procurement standards." },
    responsibility: { title: "Corporate Responsibility", short: "ESG & CSR", description: "Understand how corporate social responsibility works in practice, from ESG reporting to stakeholder communication." },
    collaboration: { title: "Collaboration Models", short: "Partnership", description: "Discover the many forms of industry partnership, from supply-chain integration to cross-sector co-branding, and find the path that suits you best." },
    communication: { title: "Communication & Empathy", short: "Communication", description: "Develop the skills for cross-sector dialogue and learn to convey sustainability value in the language of different industries." },
    interviews: { title: "Interviews", short: "Interviews", description: "First-hand stories from sustainability practitioners: hear how pioneers in different fields turn ideas into action." },
  },
  cta: {
    title: "Finished reading? What next?",
    body: "Want to apply these ideas in your own organisation? Find the right topic on the Learning Map, or follow us on LINE for new articles and course updates.",
    primary: "Open the Sustainability Learning Map",
    secondary: "Follow us on LINE",
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
    endBody: "Still exploring? Follow us on LINE for new articles. Have a specific question? Book a 15-minute Coffee Chat.",
    endPrimary: "Book a 15-minute Coffee Chat",
    endSecondary: "Follow us on LINE",
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
    mediaBody: "For interviews, talks and forum partnerships, fill in the contact form or message our official LINE account.",
    mediaPrimary: "Send an enquiry",
    mediaSecondary: "Follow us on LINE",
  },
}

export default learning
