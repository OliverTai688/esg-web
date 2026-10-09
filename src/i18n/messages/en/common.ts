// Shared copy: navigation, headline numbers, footer, contact form.
const common = {
  nav: {
    sustainability: {
      label: "Sustainability",
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
      { value: 10, prefix: "NT$", suffix: "M", label: "Funding Secured", note: "Government grants, angel investment and bank loans secured by a brand design firm within a year of completing its Sustainability White Paper" },
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
  },
  footer: {
    brand: "Gung-Ho ",
    brandAccent: "Culture",
    tagline: "CO-ESG | The professional bridge for sustainable brands",
    copyright: "© 2026 Gung-Ho Culture CO-ESG. All Rights Reserved.",
    lineCta: "Follow us on LINE",
    navTitle: "Site Map",
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
    topic: "What would you like to discuss?",
    // Order matters: /consulting hands a topic over by index (consulting.chooser.options[].key → data-contact-topic).
    topics: ["Sustainable brand advisory", "Sustainability White Paper", "Courses / workshops", "Non-profit partnership", "Other"],
    message: "Your needs or message",
    messagePlaceholder: "Briefly describe what you are looking for or what you would like to discuss...",
    submit: "Send request",
    // Shown after the mail client is asked to open: the form itself sends nothing.
    success: "Your email app should now be open — send the message to finish. Nothing opened? Use our official LINE or write to pt@coesg.tw.",
    mailNote: "Clicking send will open your email client with your message pre-filled; simply send it to complete your request.",
    mailSubject: "Coffee Chat booking",
    required: "Required",
  },
  common: {
    readMore: "Read more",
    learnMore: "Learn more",
    viewAll: "View all",
    backHome: "Back to home",
    external: "Opens in a new window",
    minRead: "min read",
    onThisPage: "On this page",
    comingSoon: "Coming soon",
  },
}

export default common
