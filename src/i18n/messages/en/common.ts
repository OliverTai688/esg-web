// Shared copy: navigation, headline numbers, footer, contact form.
const common = {
  nav: {
    sustainability: {
      label: "Sustainability",
      testimonials: { label: "Testimonials", desc: "What our clients and learners say" },
    },
    events: {
      label: "Our Journey",
    },
    learning: {
      label: "Insights",
      insights: "Latest Articles",
    },
    consulting: {
      label: "Work With Us",
    },
    overview: "Overview",
    join: "Join Us",
    cta: "Book a Consultation",
    skipToContent: "Skip to main content",
    menu: "Menu",
    language: "Language",
  },
  // Headline impact numbers — the only place these figures live (G06).
  impact: {
    metrics: [
      { value: 10, prefix: "NT$", suffix: "M", label: "Funding Secured", note: "Government grants, angel investment and bank loans secured by a technology company within a year of completing its Sustainability White Paper" },
      { value: 130, prefix: "", suffix: "+", label: "Cross-Sector Partnerships", note: "Partnerships brokered through our advisory work and the CO-ESG Academy speaker platform" },
      { value: 8, prefix: "", suffix: "+", label: "International Forums", note: "International forum stages our clients and partners have reached with our support" },
    ],
    // Cumulative track record through 2025, from the client's timeline (E03)
    track: [
      { value: "100+", label: "talks" },
      { value: "30+", label: "workshops" },
      { value: "500+", label: "participants trained" },
      { value: "10+", label: "cities and counties" },
    ],
    trackNote: "Cumulative to 2025",
    reach: [
      { value: "150+", label: "events" },
      { value: "50+", label: "partner brands" },
    ],
  },
  footer: {
    brand: "Gung-Ho ",
    brandAccent: "Culture",
    tagline: "CO-ESG | Bring your value to light.",
    copyright: "© 2026 Gung-Ho Culture CO-ESG. All Rights Reserved.",
    lineCta: "Follow us on LinkedIn",
    social: "Social media",
    newWindow: " (opens in a new window)",
    navTitle: "Site Map",
    store: "CO-ESG Store",
    tools: "Online tools",
    // rev2 #7 (EN2)
    terms: "Terms of Use",
    privacy: "Privacy Policy",
    contactTitle: "Contact Us",
    supportEmail: "Support email",
    company: {
      title: "Company Information",
      name: "Company name",
      taxId: "Tax ID",
      founder: "Founder",
      founded: "Founded",
      address: "Address",
      website: "Website",
      email: "Email",
    },
  },
  notFound: {
    kicker: "404",
    title: "The bridge doesn't reach this page yet",
    body: "The page you are looking for may have moved, or the address may be incomplete.",
    home: "Back to home",
    linksLabel: "Or continue from here",
  },
  contactForm: {
    name: "Your name",
    namePlaceholder: "Enter your name",
    email: "Email",
    emailPlaceholder: "example@email.com",
    org: "Organisation",
    orgPlaceholder: "Company or organisation name",
    topic: "What would you like to talk about?",
    // rev2 #44 (EN D): seven options, same order as the Chinese list. Order matters: /consulting
    // hands a topic over by index (data-contact-topic), and /api/forms maps it to the Chinese option.
    topics: [
      "Not sure yet – let’s talk",
      "Sustainability White Paper",
      "Sustainability Courses",
      "In-House Workshops for Organisations",
      "Sustainable Supply Chain Advisory",
      "Non-profit partnership",
      "Other",
    ],
    message: "Your needs or message",
    messagePlaceholder: "Briefly describe what you are looking for or what you would like to discuss...",
    submit: "Send request",
    // rev2 #48: shown after /api/forms has emailed gho001@coesg.tw
    success: "Thank you. We have received your message and will reply by email.",
    required: "Required",
  },
  common: {
    readMore: "Read more",
    learnMore: "Learn more",
    viewAll: "View all",
    backHome: "Back to home",
    external: "Opens in a new window",
    externalParen: " (opens in a new window)",
    minRead: "min read",
    onThisPage: "On this page",
    comingSoon: "Coming soon",
  },
}

export default common
