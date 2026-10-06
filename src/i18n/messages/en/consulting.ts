// /consulting copy. Client text from docs/tasks/sitemap-rev1/C01–C04.
// Prices show a single (highest) figure per C02; values await client confirmation.
const consulting = {
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
    secondaryCta: "View plans first",
    lineCta: "Ask us on LINE",
    promise: ["Free", "15 minutes online", "No sales pitch, just clear next steps"],
  },
  chooser: {
    title: "Not sure where to start?",
    options: [
      { label: "I want to articulate my brand's sustainability value", target: "solutions", hint: "Sustainable Brand Advisory" },
      { label: "I need a sustainability document for external audiences", target: "solutions", hint: "Sustainability White Paper" },
      { label: "I want my team to learn about ESG", target: "solutions", hint: "Courses and workshops" },
      { label: "We are a non-profit organisation", target: "ngo", hint: "Non-profit partnerships" },
      { label: "I would like to start small", target: "membership", hint: "Membership plans" },
    ],
  },
  solutions: {
    label: "Services",
    title: "Corporate ESG Solutions",
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
    label: "NPO Partnerships",
    title: "Partnering with Non-Profit Organisations",
    description: "Gung-Ho Culture works hand in hand with non-profit organisations, using expert advisory and resource connections to help more businesses see their social impact.",
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
    casesNote: "Case studies are being prepared and will be published progressively.",
    cases: [
      { name: "Aici Foundation", type: "Social welfare foundation", focus: "Workshops and Sustainability White Paper case study" },
      { name: "Taitung Friends of Rehabilitation", type: "Disability services", focus: "Sustainability advisory outcomes" },
      { name: "Tian Cheng Hospital", type: "Healthcare provider", focus: "Workshops and feedback" },
    ],
  },
  membership: {
    label: "Membership",
    title: "Choose the partner plan that suits you",
    description: "From joining our community for free to in-depth co-creation, choose according to where you are.",
    recommended: "Recommended",
    audienceLabel: "Ideal for",
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
    title: "Frequently Asked Questions",
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
    altBody: "Follow us on LINE and message us directly.",
  },
}

export default consulting
