import type { ChapterDef } from "@/lib/chapters"

// /consulting copy. Client text from docs/tasks/sitemap-rev1/C01–C04.
// Prices show a single (highest) figure per C02; values await client confirmation.
// Layout and wording decisions: docs/redesign/pages-v2/consulting/.
// Every section's kicker (`label`) is also its chapter label below: keep them identical.
// Page sections in page order: the single source for the navbar dropdown and the
// in-page ChapterNav. Every id must be a section id on the page (scripts/check-anchors.mjs).
const chapters: readonly ChapterDef[] = [
  { id: "solutions", label: "Services", desc: "Pick a starting point, see the offer and price", icon: "Compass" },
  { id: "ngo", label: "Non-Profit Partnerships", desc: "Two ways to work together, and four case studies", icon: "HeartHandshake" },
  { id: "membership", label: "Membership", desc: "Free, monthly or project-based: three stages", icon: "Users" },
  { id: "faq", label: "FAQ", desc: "Five things people ask before booking", icon: "HelpCircle" },
  { id: "contact", label: "Contact", desc: "Book a Coffee Chat, or ask us on LINE", icon: "Mail" },
]

const consulting = {
  chapters,
  meta: {
    title: "Work With Us",
    description: "Book a 15-minute Coffee Chat. Corporate ESG solutions, non-profit partnerships, membership plans and FAQs.",
  },
  label: "Work With Us",
  hero: {
    kicker: "Work With Us",
    title: "Book a 15-minute Coffee Chat",
    description:
      "Let's talk about how to bring your expertise to light. Whether you are a brand owner, a supply-chain partner or part of the sustainability sector, we look forward to the conversation.",
    primaryCta: "Book a consultation slot",
    lineCta: "Ask us on LINE",
    // The page's equation: petal + block = quarter-disc. Open in the hero, answered at the form.
    equation: { petal: "Purpose-led brands", block: "Businesses seeking partners", result: "A 15-minute chat first" },
  },
  // "Where do I start?": the tabs of the solutions section. `key` picks the offers
  // shown in the panel (see page.tsx); the order matches contactForm.topics.
  chooser: {
    title: "Not sure where to start?",
    options: [
      { key: "brand", tab: "Brand positioning", label: "I want to articulate my brand's sustainability value" },
      { key: "paper", tab: "A public document", label: "I need a sustainability document for external audiences" },
      { key: "team", tab: "Team learning", label: "I want my team to learn about ESG" },
      { key: "npo", tab: "Non-profit", label: "We are a non-profit organisation" },
      { key: "small", tab: "Start small", label: "I would like to start small" },
    ],
  },
  solutions: {
    label: "Services",
    description: "From talks to training workshops, and from one-to-one advisory to Sustainability White Papers, choose the best way to begin your sustainability journey.",
    priceNote: "Prices are indicative for individual services; final quotes depend on your needs and scale.",
    cta: "Book a consultation",
    items: [
      { key: "consulting", title: "Sustainable Brand Advisory", price: "NT$6,000 / session", unit: "One-to-one", description: "One-to-one advisory to help your brand clarify its sustainability positioning, structure its ESG narrative and find the right entry point for conversations with business.", highlight: "Most popular" },
      { key: "whitepaper", title: "Sustainability White Paper (Essentials)", price: "NT$100,000", unit: "4–8 weeks", description: "A Sustainability White Paper tailored to your brand, bringing together ESG data and storytelling into a powerful document for external communication and securing resources.", highlight: "" },
      { key: "training", title: "Sustainable Business Innovator Training", price: "NT$25,000", unit: "Structured programme", description: "A structured training programme, from sustainability concepts to business practice, developing sustainable business talent with an ESG mindset.", highlight: "" },
      { key: "workshop", title: "Sustainable Brand Foundations Workshop", price: "NT$6,000", unit: "Hands-on workshop", description: "A hands-on workshop that helps brand owners quickly grasp sustainability frameworks and find where their brand connects with ESG.", highlight: "" },
    ],
  },
  ngo: {
    label: "Non-Profit Partnerships",
    title: "Partnering with Non-Profit Organisations",
    description: "Gung-Ho Culture works hand in hand with non-profit organisations, using expert advisory and resource connections to help more businesses see their social impact.",
    // One line for the chooser panel, and the link from there to this section
    summary: "Two models, the Charity Partner Programme and Cross-Sector Communication, that turn social impact into sustainability language businesses can read.",
    jump: "See the two models",
    more: "Full description",
    models: [
      {
        title: "Charity Partner Programme",
        description: "Preferential partnership terms for non-profits, helping you organise your sustainability impact data and build a communication framework for engaging corporate CSR and ESG teams.",
        features: ["Preferential partnership terms", "Sustainability impact data", "Connections with corporate ESG teams"],
      },
      {
        title: "Cross-Sector Communication",
        description: "Through the CO-ESG Academy platform and our industry network, we translate non-profits' social value into sustainability language that businesses understand, fostering long-term partnerships.",
        features: ["CO-ESG Academy platform resources", "Sustainability language translation", "Long-term partnership building"],
      },
    ],
    casesTitle: "Non-profit and charitable organisations we have worked with",
    caseMore: "Read this case",
    quoteLabel: "In their words",
    // Organisation and personal names stay in Chinese where no official English form has been supplied.
    cases: [
      {
        key: "beunen",
        name: "Beunen Foundation",
        type: "Services for people with disabilities, older people and children",
        headline: "From leadership coaching to rebranding the Jinlun workshop",
        alt: "Beunen Foundation staff around a table covered in sticky notes",
        points: [
          "Leadership coaching: a year of one-to-one sessions for the new chief executive, building trust and communication with her team.",
          "GROW alignment workshop: leaders from the head office and branch offices practised moving from goal and reality to options and a way forward.",
          "Social brand marketing: at the Jinlun workshop in Taitung, product scale-up, logo and packaging design, a refurbished space and a new shop create more jobs for local people with disabilities.",
          "Process improvement: mind maps organise administrative processes and records, passing on senior staff's experience and preparing for government reviews.",
        ],
        quote: "With the working methods Gung-Ho Culture taught us, our foundations are firmer, we have more room to meet the public sector's requirements, and both efficiency and service quality have improved greatly.",
        quoteBy: "鍾榕榕, Chief Executive, Beunen Foundation",
      },
      {
        key: "mercy",
        name: "The Garden of Mercy Foundation",
        type: "Residential care for drug-exposed infants and children with special needs",
        headline: "Retelling 25 years of care in the language of the SDGs",
        alt: "A consultant teaching staff in a meeting room at The Garden of Mercy Foundation",
        points: [
          "A course series supported cross-department communication: staff mapped their daily care work to the SDGs and wrote their own public document.",
          "In 2025 the foundation published its annual, \"Care that moves towards sustainability\", organised around SDGs 2, 3, 4, 10 and 17.",
          "Results are stated in figures: in 2024 the infant centre provided 3,147 person-days of care and arranged 125 outpatient visits.",
        ],
        quote: "Sustainable development helps people in the helping professions move beyond simply \"doing good earnestly\" to \"knowing why we do it, and doing it with meaning and value\".",
        quoteBy: "Chief Executive, The Garden of Mercy Foundation (annual publication)",
      },
      {
        key: "kangfu",
        name: "臺東縣康復之友協會",
        type: "Social participation for people recovering from mental illness",
        headline: "Four activities, traced back to one sustainability theme",
        alt: "A consultant leading a workshop in the association's activity room",
        points: [
          "A two-day workshop used the IOOI chain to break down four cases: a djembe and dance troupe, handmade soap production, a soap charity sale and a second-hand charity sale.",
          "The four groups converged on two points: helping members step out into society (SDG 10.2) and helping the community understand the association (SDG 10.3).",
          "Work and activities are the means, not the goal; when talking to businesses, explain why these inputs are needed.",
        ],
        quote: "A sustainability goal is something you reach with partners. Do not try to force it through alone.",
        quoteBy: "Evvon Wu, closing the workshop",
      },
      {
        key: "tiancheng",
        name: "天成醫院",
        type: "Healthcare provider",
        headline: "Six teams of managers map daily work back to the SDGs",
        alt: "Hospital staff and doctors working on a poster with sticky notes",
        points: [
          "In a sustainability workshop, six groups each set out a vision, stakeholders, the SDGs they map to and a one-year goal.",
          "Themes ranged from local hiring and employee well-being to energy saving, gender equality and teaching excellence.",
          "Participants set measurable targets, such as cutting the hospital's energy use by 10% in a year and keeping the gender gap in entry-level pay below 3%.",
        ],
        quote: "This course taught us to integrate: to put the sustainability practices scattered through our daily work in the right place, against the right goals.",
        quoteBy: "Superintendent, 天成醫院",
      },
    ],
  },
  membership: {
    label: "Membership",
    title: "Choose the partner plan that suits you",
    // Shown in the chooser panel that leads here
    description: "From joining our community for free to in-depth co-creation, choose according to where you are.",
    jump: "See the three plans",
    recommended: "Recommended",
    audienceLabel: "Ideal for",
    // {count} is replaced with the number of features
    includes: "{count} things included",
    tierCta: "Enquire via LINE",
    tiers: [
      {
        title: "Essential Partner",
        price: "Free",
        tagline: "Get connected and start exploring sustainability",
        features: ["Join our LINE sustainability community", "Weekly sustainability trends digest", "Priority notice of events and courses"],
        audience: "Anyone ready to get started",
        recommended: false,
      },
      {
        title: "Advanced Partner",
        price: "NT$300 / month",
        tagline: "Keep learning and build sustainability capability in-house",
        features: ["Monthly CO-ESG Academy sessions and recordings", "Speaker videos and downloadable materials", "Partner community", "Discounts on courses and workshops"],
        audience: "Sustainability practitioners and small teams building their foundations",
        recommended: true,
      },
      {
        title: "Strategic Partner",
        price: "Project-based quote",
        tagline: "Co-create in depth and build sustainability into your business",
        features: ["One-to-one advisory", "Sustainability White Paper strategy", "International alignment strategy", "Priority supply-chain connections"],
        audience: "Companies needing a white paper or supply-chain advisory, on a project basis",
        recommended: false,
      },
    ],
    comingSoon: {
      badge: "Coming soon",
      title: "Gung-Ho Ecosystem Membership",
      body: [
        "More than learning about sustainability: join a verified sustainable supply chain, gain sustainability certification, get noticed by buyers and take on projects with partners.",
        "We are preparing it now. Would you like to become a founding partner and secure early access and benefits?",
      ],
      cta: "Join the waiting list",
    },
  },
  faq: {
    label: "FAQ",
    title: "Before you book, you may want to know",
    items: [
      { question: "What is a Coffee Chat?", answer: "A free 15-minute online consultation, as relaxed as chatting over coffee. We listen to where you are now and help you find the best next step. Whether you take it is entirely up to you." },
      { question: "Who are Gung-Ho Culture's services for?", answer: "Our clients include agricultural brands, design firms, social enterprises, non-profits and large companies seeking sustainable supply chains. If you are doing meaningful work and want more people to see it, we would love to talk." },
      { question: "How long does a Sustainability White Paper take?", answer: "Typically 4 to 8 weeks, depending on the size of the brand and the completeness of its data. The process includes in-depth interviews, data organisation and writing, ensuring the white paper genuinely reflects the brand's sustainability practice." },
      { question: "How do we start working together?", answer: "The simplest way is to book a Coffee Chat so we can understand your needs. We will then provide tailored recommendations and a quote, and once confirmed, the project can begin." },
      { question: "What does a CO-ESG Academy subscription include?", answer: "CO-ESG Academy is a cross-sector platform for sustainability learning and exchange. Subscribers can join regular workshops, talks and industry networking events, and gain access to members-only sustainability resources and connections." },
    ],
    more: "Have another question?",
    moreCta: "Email us",
  },
  contact: {
    label: "Contact",
    title: "Book a Partnership Consultation",
    description: "Complete the form below and we will be in touch shortly to arrange your Coffee Chat.",
    hours: "Monday to Friday, 09:00–18:00",
    altTitle: "Need a quicker reply?",
  },
}

export default consulting
