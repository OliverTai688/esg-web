import type { ChapterDef } from "@/lib/chapters"

// /events copy. Client text from docs/tasks/sitemap-rev1/E01–E04.
// Terminology follows G01; "CO-ESG Academy" is the English name for ESG共學坊.
// Page sections in page order: the single source for the navbar dropdown, the
// in-page ChapterNav and each section's kicker (the page reads the label from here).
// Every id must be a section id on the page (scripts/check-anchors.mjs).
const chapters: readonly ChapterDef[] = [
  { id: "upcoming", label: "Next Cohort", desc: "Sustainability White Paper Workshop in planning", icon: "CalendarDays" },
  { id: "workshops", label: "Learning Map", desc: "Eight topics for in-house workshops", icon: "Map" },
  { id: "history", label: "Road So Far", desc: "From our founding in 2022, year by year", icon: "Footprints" },
  { id: "roadmap", label: "Roadmap", desc: "Short-, medium- and long-term goals and our commitment", icon: "Flag" },
  { id: "cases", label: "Case Stories", desc: "Four stories of cross-sector partnership", icon: "Handshake" },
]

const events = {
  chapters,
  meta: {
    title: "Our Journey",
    description: "From community talks to an international stage bringing together 30 countries: Gung-Ho Culture's courses, learning map, milestones and roadmap.",
  },
  label: "Our Journey",
  hero: {
    kicker: "Our Journey",
    title: "Every step is a real footprint of sustainability in action",
    description: "From cross-sector connections at CO-ESG Academy to international forums, Gung-Ho Culture continues to host high-quality sustainability events that bring like-minded partners together.",
    primaryCta: "Email us for course dates",
    // rev2 #35: goes to the consulting page's solutions table (self-learn row)
    secondaryCta: "See courses and plans",
    // Labels under the footprint trail: where it starts, and the step not taken yet
    trailStart: "2022",
    trailNext: "Next step",
  },
  upcoming: {
    title: "Be the first to know when dates are set",
    description: "Our next cohort is being planned. Email us and we will tell you when registration opens. Courses are taught in Mandarin.",
    notifyCta: "Email us for course dates",
    viewDetails: "See course details",
    // rev2 #35: one card, no price; the course page is /events/whitepaper-workshop
    course: {
      title: "Sustainability White Paper Workshop",
      meta: "2 days, in person · Taipei",
      language: "Taught in Mandarin",
      status: "Next cohort in planning",
    },
  },
  learningMap: {
    title: "Find the right starting point for your sustainability journey",
    levelsLine: "Explore → Apply → Integrate",
    introLabel: "About the Learning Map",
    intro:
      "These eight topics are options for our In-House Workshops for Organisations. Companies and organisations can choose and combine them for in-house training or workshops, quoted per project. They are not open to individual sign-up.",
    levels: [
      { key: "explore", name: "Explore", description: "Modules 1–3: build alignment, understand sustainability, articulate impact" },
      { key: "practice", name: "Apply", description: "Modules 4–7: brand strategy, business models, carbon management, certification and market access" },
      { key: "integrate", name: "Integrate", description: "Module 8: bring the results together in your own sustainability impact document" },
    ],
    audienceLabel: "Ideal for",
    modules: [
      { stage: "explore", theme: "Module 1", title: "Sustainability Alignment & Organisational Dialogue", subtitle: "Cross-departmental sustainability alignment workshop", description: "Sustainability transformation starts inside the organisation. This workshop helps colleagues across departments build a common language, so sustainability is no longer one team's job alone.", audience: "Organisations just getting started, managers driving cultural change, and teams that need cross-departmental collaboration" },
      { stage: "explore", theme: "Module 2", title: "Understanding Sustainability and Key Trends", subtitle: "Sustainability literacy and ESG management fundamentals", description: "From climate change to regulatory trends, learn how ESG affects your industry and identify your own entry point and risk-response strategy.", audience: "Professionals in any sector, managers and business owners seeking a solid grounding in sustainability" },
      { stage: "explore", theme: "Module 3", title: "Articulating Your Impact", subtitle: "Sustainability reporting and SROI measurement", description: "Learn to describe your organisation's impact in internationally recognised terms (GRI, SROI), so stakeholders see your value. Not just storytelling, but evidence-based communication.", audience: "Anyone preparing a sustainability report, impact report or proposal" },
      { stage: "practice", theme: "Module 4", title: "Sustainable Brand Strategy", subtitle: "Brand positioning × SDGs × user-centred design", description: "Turn sustainability into a competitive brand advantage. From market positioning to service design, learn how to make your brand seen and chosen in the sustainability era.", audience: "Brand managers, marketers and business owners looking to sharpen their brand's differentiation" },
      { stage: "practice", theme: "Module 5", title: "Business Model Innovation", subtitle: "Circular economy × servitisation × monetising sustainability", description: "Doing good should also be good business. This module helps you redesign your business model, from resource circularity to service innovation, to find a profitable path to sustainability.", audience: "Entrepreneurs, business owners upgrading their business models, and product developers" },
      { stage: "practice", theme: "Module 6", title: "Carbon Management & Environmental Resilience", subtitle: "Carbon inventory × decarbonisation strategy × climate risk", description: "From inventory to action, build your organisation's carbon management capability while using nature-based solutions to strengthen resilience against climate impacts.", audience: "Organisations with decarbonisation targets or supply-chain pressure, and businesses planning a carbon footprint assessment" },
      { stage: "practice", theme: "Module 7", title: "Certification & Market Access", subtitle: "Sustainability certification × green supply chains × corporate partnership proposals", description: "Understand the routes to different sustainability certifications, respond to corporate ESG procurement needs and design partnership proposals that bring your brand into the supply chain.", audience: "Businesses looking to expand B2B partnerships and enter green procurement markets" },
      { stage: "integrate", theme: "Module 8", title: "Integrating & Showcasing Impact", subtitle: "Data collection × impact reporting × Sustainability White Paper", description: "Bring together what you have learned across the modules and, through survey design, data analysis and report writing, produce your organisation's own sustainability impact document.", audience: "Learners with a solid sustainability foundation who want to produce tangible results" },
    ],
    externalTitle: "Further Courses",
    // Course names follow the EN glossary (items 29 and 31)
    externalLinks: [
      { label: "Online Course: ESG and Social Impact Strategy for Brands (Taught in Mandarin)", href: "https://shanyun.havppen.com/course/esg", note: "Online course being updated" },
    ],
    farmCourse: {
      label: "2026 Sustainable Agri-Innovator Programme content",
      title: "Sustainable Agri-Innovator Programme | Summer 2026",
      meta: "With Taiwan Leisure Agriculture Association · 7 sessions · 7 July to 29 September 2026, every other Tuesday",
      focus: "This year's focus is biodiversity and nature-friendly farming. Each session produces one chapter of a site sustainability white paper, and the final session is a pitch to businesses.",
      modules: [
        { name: "Module 1 | Sustainability literacy and reporting", items: ["Leisure farming and ESG management", "Sustainability reports and impact measurement"] },
        { name: "Module 2 | Brand and business model", items: ["Building a sustainable leisure-farm brand", "Putting the business model into practice"] },
        { name: "Module 3 | Ecological resources and green supply chains", items: ["Ecological capital and climate resilience", "Sustainability certification and green supply chain opportunities"] },
        { name: "Module 4 | Impact in action", items: ["Final presentations"] },
      ],
    },
    inquire: "Want to design a module combination for your team?",
    inquireCta: "Ask about In-House Workshops for Organisations",
  },
  history: {
    title: "A road built one step at a time",
    intro: "From talk after talk in local communities to an international stage bringing together 30 countries: this is the path Gung-Ho Culture has built, step by step.",
    yearsLabel: "Year",
    // One short note per year for the year tabs (ours, not client copy)
    yearNotes: { "2022": "Founded", "2023": "Into communities", "2024": "Platform live", "2025": "Across Taiwan", "2026": "World stage" } as Record<string, string>,
    phases: [
      {
        name: "Exploration & Foundations",
        period: "2022–2023",
        tagline: "Into communities, sowing seeds",
        intro: "Drawing on our founder's decade-plus of social work and non-profit management, we began by going into communities and sowing seeds, prioritising brand awareness and a community base while resources were limited.",
        entries: [
          { date: "May 2022", text: "Gung-Ho Culture is founded to drive social impact through sustainability and ESG knowledge." },
          { date: "May 2023", text: "Launches civic-week sustainability talks at Sanying and Nangang Community Colleges." },
          { date: "Oct 2023", text: "Completes its first Sustainability White Paper, partnering with Chihe Design to produce a white paper on eggshell-paper egg trays for Chinyi Eggs Technology Co., Ltd." },
          { date: "Nov 2023", text: "Launches CO-ESG Academy as an in-person club at Wanhua Community College. Completed its first capital increase." },
        ],
      },
      {
        name: "Growth & Expansion",
        period: "2024–present",
        tagline: "Beyond borders, onto the world stage",
        intro: "CO-ESG Academy moved from in-person to an online platform, our services extended into agriculture and business, and our impact began to reach from Taiwan to the wider world.",
        entries: [
          { date: "Mar 2024", text: "The CO-ESG Academy platform launches, taking the in-person club online as a learning platform." },
          { date: "Jun 2024", text: "Enters agricultural sustainability with courses at Greenunion Agricultural, training more than 30 small-farm brands and generating over NT$500,000 in single-day market sales." },
          { date: "Nov 2024", text: "Invited as Strategy Director by 13+ start-up programmes to lead sustainable brand development workshops; Sustainability White Paper services scale up in parallel." },
          { date: "2025", text: "Surpasses 100 talks, 30+ workshops and 500+ participants trained, serving more than 10 cities and counties across Taiwan, including the country's three largest leisure farms." },
          { date: "Spring–Summer 2025", text: "Partners with the Taiwan Leisure Agriculture Association to launch Taiwan's first ESG Sustainable Agri-Innovator certification course." },
          { date: "May 2025", text: "Co-organises a talk on strengthening charitable impact, and exhibits as a sustainability advisor at Secutech Taipei." },
          { date: "Jul 2025", text: "Completed its second capital increase." },
          { date: "Aug 2025", text: "Invited for the first time to an international SDGs forum (Global Youth Leadership Programme SDGs Forum, Taipei).", href: "https://www.youthsdgs.org/" },
          { date: "Aug–Oct 2025", text: "Invited by the Taipei City Government to teach the Taipei Friendly Stores course series (beginner and advanced)." },
          { date: "Apr 2026", text: "Joins the SDGs Impact Developers Conference in Penghu as a co-organising partner, alongside young changemakers from 30 countries, stepping onto the international stage as a co-host.", href: "https://www.youthsdgs.org/" },
          { date: "May–Jun 2026", text: "Takes part as a co-organising partner in the UN-SDGs Impact Developers Conference in Bangkok (29 May–1 June), held at Southeast Asia University and the UN ESCAP Conference Centre. More than 140 youth leaders, business representatives and international experts from over 30 countries gathered, extending Gung-Ho Culture's international reach to the United Nations.", href: "https://www.youthsdgs.org/" },
        ],
      },
    ],
    linkLabel: "Forum website",
    pastLabel: "Past events",
    ended: "Ended",
  },
  roadmap: {
    title: "Our Roadmap",
    horizonsLabel: "Horizon",
    intro: "Sustainability is a long road. We hold ourselves to the same standards we ask of others, turning our commitments into milestones that can be reviewed.",
    horizons: [
      {
        name: "Short term",
        period: "2026",
        title: "Strengthen the foundations",
        items: [
          "Develop a standardised Sustainability White Paper template and build a portfolio of 5–8 complete case studies.",
          "Diversify our client base, from charities and agricultural brands to SMEs, and deepen strategic partnerships.",
          "Refresh our website and brand identity to strengthen transparency and trust.",
          "Roll out CO-ESG Academy and workshops, and pilot a sustainable marketplace ecosystem model.",
        ],
      },
      {
        name: "Medium term",
        period: "2027–2028",
        title: "Make the model replicable",
        items: [
          "Build a replicable sustainability disclosure process with standardised SOPs to serve SMEs at scale.",
          "Deepen our sustainable agricultural supply-chain services, linking farms, brands and retail channels into an agricultural ESG solution.",
          "Develop AI-assisted sustainability advisory tools that combine quantitative analysis and data technology to make strategy work more efficient.",
          "Help companies align with international standards such as GRI, the SDGs and SASB, laying the documentary groundwork for external applications and awards.",
          "Expand the sustainable marketplace ecosystem and build long-term strategic partnerships with listed companies.",
        ],
      },
      {
        name: "Long term",
        period: "2029 onwards",
        title: "Become a hub of the ecosystem",
        items: [
          "Become Taiwan's most influential sustainability advisory and ecosystem platform, widely recognised by industry for our model of co-learning, co-creation and coexistence.",
          "Grow a cross-sector Gung-Ho Ecosystem connecting government, business, non-profits, agriculture, healthcare and more into a mutually nourishing sustainability network.",
          "Take Gung-Ho Culture's Sustainability White Paper model and IOOI framework to Asia-Pacific and the Chinese-speaking world, helping more companies build sustainability competitiveness.",
          "Become a key hub for social innovation education, making impact thinking part of the everyday language of businesses and organisations.",
        ],
      },
    ],
    // Marks the horizon that is in progress today
    currentLabel: "In progress",
  },
  commitment: {
    label: "Our Sustainability Commitment",
    lead: "As advisors who guide companies through sustainability disclosure, we believe we must practise what we preach.",
    body: "Gung-Ho Culture is committed to embedding sustainability in its own operations and, through co-learning and co-creation, working with every partner to make impact the key to shaping the future.",
    readMore: "Read the full commitment",
  },
  cases: {
    title: "Real partnership results",
    description: "Behind every case lies a meeting of ideas and the realisation of shared value.",
    partnersLabel: "Partners",
    readStory: "Read this story",
    prev: "Previous story",
    next: "Next story",
    items: [
      {
        title: "Sustainable products on corporate procurement lists",
        partners: "Jooin Now × Selvans Social Farm",
        logos: ["jooin-now", "sifan-farm"],
        photo: "jooin-sifan",
        photoAlt: "Jooin Now’s Lunar New Year grain gift box, which includes Selvans Social Farm’s puffed Job’s tears",
        description: "Through the CO-ESG Academy speaker platform, Gung-Ho Culture connected Jooin Now with Selvans Social Farm, bringing high-quality sustainable products and gifts with genuine social value into corporate gift procurement.",
      },
      {
        title: "A story of functional socks and prints",
        partners: "RAFAC SOCKS × Showy Pattern Art",
        logos: ["rafac", "showy-pattern"],
        photo: "rafac-showy",
        photoAlt: "A gift box of RAFAC SOCKS functional socks with a Showy Pattern Art print",
        description: "Two brands with shared values began a conversation: RAFAC's functional craftsmanship met Showy Pattern Art's print aesthetics. Gung-Ho Culture brokered a co-branded product, showing that everyday items can carry the spirit of design, nature and sustainability.",
      },
      {
        title: "One small island, one conversation across borders",
        partners: "Youthbud × Bliss Travel",
        logos: ["youthbud", "bliss-travel"],
        photo: "youthbud-bliss",
        photoAlt: "Group photo of youth delegates from 30 countries at the 2026 SDGs Impact Developers Conference – Penghu",
        description: "Connected through the CO-ESG Academy speaker platform, the 2026 SDGs Impact Developers Conference – Penghu was hosted by Jay Wei, Chair of Youthbud, with Bliss Travel as co-organiser. It turned connections made on the platform into action with international resonance.",
      },
      {
        title: "Bringing Taiwan’s sustainability to the world",
        partners: "",
        logos: ["gsa"],
        photo: "gsa-forum",
        photoAlt: "CO-ESG Academy speakers in front of the backdrop at the 2025 Global Youth Leadership Programme SDGs Bootcamp & Forum in Taipei",
        description: "Gung-Ho Culture helped three CO-ESG Academy speakers take the stage at the 2025 Global Youth Leadership Programme SDGs Bootcamp & Forum in Taipei. The forum brought together young people and social innovators from around the world. Our speakers brought local sustainability action into an international conversation, and exchanged ideas with young representatives from many countries.",
      },
    ],
  },
  cta: {
    title: "The next footprint is yours",
    description: "Email us and we will tell you as soon as course dates are set. Want your whole team to learn together? Talk to us about In-House Workshops for Organisations.",
    primaryLabel: "Email us for course dates",
    secondaryLabel: "Ask about In-House Workshops for Organisations",
  },
  // The /events/<slug> inner pages and the white paper case pages (rev2 EN #51–#53).
  detail: {
    // Followed by where the link goes: Back to Services & Pricing (EN #51), or Back to Our Journey for past events
    backTo: "Back to",
    backToSolutions: "Services & Pricing",
    instructor: "Instructor",
    duration: "Duration",
    // An advisory service shows Advisor / Timeline instead of Trainer / Hours (EN #51)
    advisor: "Advisor",
    timeline: "Timeline",
    date: "Date",
    location: "Location",
    capacity: "Places",
    price: "Fee",
    highlights: "Course highlights",
    services: "What’s included",
    // Email is the next step (the English site has no LINE, R17)
    waitlist: "Email us for updates",
    notify: "Email us for course dates",
    consult: "Book a consultation",
    dateTbd: "Next cohort in planning",
    related: "Other services",
    // Instructor cards (EN #52)
    instructorsTitle: "Instructors",
    advisorsTitle: "Advisor",
    meetInstructor: "Meet the team",
    // *…* is set in italics (book titles, R10)
    bios: {
      "evvon-wu":
        "Founder of Gung-Ho Culture, with 15 years of social work experience. Author of *The New Language of Sustainability: The Dual-Impact Revolution*. Certified Corporate Sustainability Manager, BSI greenhouse gas professional (ISO 14064 / 14067 / 14068) and Project Management Professional (PMP).",
    } as Record<string, string>,
    // White paper cases and download on /events/impact-whitepaper (EN #53)
    cases: {
      label: "Cases",
      title: "Sustainability White Paper cases",
      readCase: "Read the case",
      backToCases: "Sustainability White Paper cases",
      industry: "Industry",
      challenge: "Challenge",
      approach: "What we did",
      results: "Results",
      furtherReading: "Further reading",
      others: "More Sustainability White Paper cases",
      metaSuffix: "Sustainability White Paper case",
    },
    download: {
      label: "Download",
      title: "Download a white paper [in Chinese]",
      // Founder line beside the form (EN #53), verbatim; *…* in italics
      founder:
        "Founder Evvon Wu is the author of *The New Language of Sustainability: The Dual-Impact Revolution*. She uses the Dual-Impact Leverage Model and the IOOI model to help companies and organisations go beyond reports and compliance, and turn sustainability into a competitive edge.",
      cta: "Download [in Chinese]",
    },
  },
}

export default events
