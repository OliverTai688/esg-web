import type { ChapterDef } from "@/lib/chapters"

// /sustainability copy. Client text from docs/tasks/sitemap-rev1/S01–S06;
// terminology follows G01 (see scripts/check-terms.mjs).
// Page sections in page order: the single source for the navbar dropdown and the
// in-page ChapterNav. Every id must be a section id on the page (scripts/check-anchors.mjs).
// Each label is also that section's kicker. Merged in pages-v2: values → vision,
// sdgs → approach, theory → difference (docs/redesign/pages-v2/sustainability/).
const chapters: readonly ChapterDef[] = [
  { id: "who-we-are", label: "Who We Are", desc: "Our founder and credentials", icon: "UserRound" },
  { id: "vision", label: "Vision & Mission", desc: "Where we are heading, and five core values", icon: "Compass" },
  { id: "approach", label: "Our Approach", desc: "The IOOI chain of events, three pillars and the SDGs", icon: "Route" },
  { id: "difference", label: "Our Difference", desc: "Four capabilities and the Dual-Impact Leverage Model", icon: "Scale" },
  { id: "services", label: "Services", desc: "White Paper, Courses, Workshops, Supply Chain", icon: "Briefcase" },
  { id: "impact", label: "Results", desc: "A ModuLab white paper case and our results to date", icon: "BarChart3" },
  { id: "ecosystem", label: "Gung-Ho Ecosystem", desc: "CO-ESG Academy partners, our network and advisory team", icon: "Globe2" },
]

const sustainability = {
  chapters,
  meta: {
    title: "Sustainability",
    description: "Guide, connect, create impact. Gung-Ho Culture walks alongside businesses, social organisations and charities on the journey from a sustainability blueprint to genuine sustainability impact.",
  },
  label: "Sustainability",
  hero: {
    kicker: "Sustainability",
    titleParts: ["Guide", "Connect", "Create impact"],
    subtitle: "We believe sustainability should be more than a report: it should be impact that can be practised, shared and continually nurtured.",
    description:
      "Gung-Ho Culture walks alongside businesses, social organisations and charities as they move from a sustainability blueprint to genuine sustainability impact, building a cycle grounded in co-learning, co-creation and an ecosystem mindset.",
    // Toggle for the folded description
    more: "Who we work with, and how",
    primaryCta: "Book a 15-minute Coffee Chat",
    secondaryCta: "Explore our approach",
    // The four parts of the arch = the page's through-line
    // EN #25: the last label is Change (Outcome is the IOOI term, used further down)
    map: ["People", "Beliefs", "Method", "Change"],
  },
  toc: {
    title: "On this page",
  },
  whoWeAre: {
    label: "Who We Are",
    title: "Social work × Sustainability management × International certification",
    // The client's two paragraphs, split after the first sentence: `lead` is always
    // visible, `paragraphs` sit behind the read-more toggle.
    lead: "Gung-Ho Culture Ltd. was founded in 2022 by a multidisciplinary team of professionals.",
    readMore: "Read the full introduction",
    paragraphs: [
      "Our founder, Evvon Wu, brings more than 15 years of hands-on project experience across social sustainability, healthcare and the charitable sector, along with professional qualifications spanning several disciplines.",
      "Social work × sustainability management × international certification: this cross-disciplinary depth is Gung-Ho Culture's greatest strength. We do not just offer sustainability theory; we help companies turn commitments into action. From clarifying vision and shaping strategy to producing a Sustainability White Paper with real substance, we stay alongside our clients every step of the way.",
    ],
    // Rev2 section 3, partner #9: appended to the founder sentence (paragraphs[0]).
    // The EN sheet gives only the name (silverlining, all lower case); the sentence is ours.
    affiliation: { before: "She is currently an advisory expert at ", link: "silverlining", after: "." },
    credentialsTitle: "Founder’s credentials",
    // EN #27: six items in the client's order, ICF removed. Each opens its certificate.
    credentials: [
      { name: "SDG Impact Standards for Enterprises (training)", image: "sdg-impact", alt: "SDG Impact training certificate" },
      { name: "Certified Corporate Sustainability Manager (2025)", image: "taise-2025", alt: "TAISE Certified Corporate Sustainability Manager certificate" },
      { name: "BSI greenhouse gas professional: ISO 14064 / 14067 / 14068 (2026)", image: "bsi-ghg", alt: "BSI greenhouse gas professional certificate" },
      { name: "PMP, Project Management Professional (2021)", image: "pmp", alt: "PMP certificate" },
      { name: "Licensed Social Worker (2011)", image: "social-worker", alt: "Licensed Social Worker certificate, with personal details covered" },
      { name: "Professional coach training, 74 hours (2021)", image: "coaching-74h", alt: "Certificate of completion, 74 hours of professional coach training" },
    ],
    credentialOpen: "Enlarge certificate: ",
    credentialClose: "Close",
    facts: [
      { value: "2022", label: "Founded" },
      { value: "15+", label: "Years of hands-on experience" },
    ],
  },
  vision: {
    label: "Vision & Mission",
    visionLabel: "Vision",
    visionText: "To be a catalyst for the sustainability transformation of business and society. We help individuals and organisations bring their unique value to light and build a better future together.",
    missionLabel: "Mission",
    missionText:
      "To be a long-term partner for businesses and individuals in sustainable development, accelerating progress towards sustainability goals through education, advisory services and technical support. We provide not only knowledge and tools but also the drive to act, empowering every sector to lead sustainability transformation in its own field.",
  },
  values: {
    label: "Core Values",
    title: "Our partnerships rest on five shared beliefs",
    items: [
      { title: "Dialogue", description: "It starts with understanding. Every sustainability strategy is born of honest conversation." },
      { title: "Value", description: "We bring out the unique expertise of every organisation rather than applying a one-size-fits-all template." },
      { title: "Sharing", description: "Knowledge grows as it flows. We believe in the power of open, collective learning." },
      { title: "Growth", description: "We help clients build capability, so that sustainability becomes a habit grown from within." },
      { title: "Impact", description: "Everything we do aims at real change that can be seen and measured." },
    ],
  },
  approach: {
    label: "Our Approach",
    title: "From blueprint to impact",
    // EN #28: the chain of events, five boxes
    intro: "Our core framework is the IOOI model. This chain of events helps organisations carry every input all the way through to real impact:",
    steps: [
      { en: "Input", zh: "Input", description: "The resources committed to a goal: people, money, materials, time and expertise." },
      { en: "Activity", zh: "Activity", description: "For example, programmes, workshops and stakeholder engagement." },
      { en: "Output", zh: "Output", description: "The direct, countable results of activities, such as reports, products and data.", note: "It answers the question “What did we do?”" },
      { en: "Outcome", zh: "Outcome", description: "Measurable change in the people you aim to reach: in their skills, feelings, attitudes, behaviour or circumstances." },
      // The last sentence of the EN copy sits under the box, as in the client's sketch.
      { en: "Impact", zh: "Impact", description: "The broad, long-term, systemic change that outcomes lead to, such as environmental protection, health and wellbeing, or social equality.", note: "It answers the question “So what?”", accent: true },
    ],
    caption: "IOOI stands for Input, Output, Outcome and Impact. “Activity” is the process that turns inputs into outputs.",
    pillarsIntro: "Within this framework, our services are built on three pillars:",
    pillars: [
      {
        number: "Pillar 1",
        title: "Sustainability Education & Training",
        description: "Building sustainability literacy within organisations and promoting impact thinking, so that sustainability becomes a shared organisational language.",
        related: { label: "Related services", items: [{ name: "Sustainability Courses", href: "#services-course" }, { name: "In-House Workshops for Organisations", href: "#services-workshop" }] },
      },
      {
        number: "Pillar 2",
        title: "Impact Advisory Projects",
        description: "Structured guidance to help companies clarify their sustainability vision, shape strategy and produce a Sustainability White Paper aligned with ESG rating criteria and government regulations.",
        related: { label: "Related services", items: [{ name: "Sustainability White Paper", href: "#services-whitepaper" }, { name: "Sustainable Supply Chain Advisory", href: "#services-supply-chain" }] },
      },
      {
        number: "Pillar 3",
        title: "Building a Sustainability Ecosystem",
        description: "Regular CO-ESG Academy sessions and an interactive exchange platform that encourage companies to share experience, forming a mutually nourishing sustainability network.",
        related: { label: "Related services", items: [{ name: "CO-ESG Academy" }, { name: "Gung-Ho Ecosystem", href: "#ecosystem" }] },
      },
    ],
  },
  sdgs: {
    label: "Aligned with global goals",
    title: "Every service supports the UN Sustainable Development Goals",
    items: [
      { code: "4.7", goal: "4", name: "Quality Education", description: "Ensuring all learners acquire the knowledge and skills needed to promote sustainable development, including sustainable lifestyles, human rights and culture's contribution to sustainability." },
      { code: "12.6", goal: "12", name: "Responsible Consumption and Production", description: "Encouraging more companies to adopt sustainable practices and integrate sustainability information into their operations and procurement, so reporting is more than a formality." },
      { code: "17.17", goal: "17", name: "Partnerships for the Goals", description: "Building lasting partnerships with government, business and non-profit organisations to deliver joint initiatives." },
    ],
  },
  difference: {
    label: "Our Difference",
    title: "Where four capabilities meet",
    intro: "Among the many ESG consultancies, Gung-Ho Culture stands out through the meeting of four capabilities:",
    items: [
      { title: "Deep roots in social work", description: "We understand organisations and people, grounding sustainability in real people and real situations." },
      { title: "Systematic engineering thinking", description: "We use structure and logic to turn abstract sustainability ideals into actionable steps." },
      { title: "Quantitative tools and AI-driven data", description: "We make impact visible and measurable, not just a slogan." },
      { title: "Co-learning and digital collaboration", description: "We do not just deliver results; we help clients build their own sustainability capabilities." },
    ],
    closing: "This means our clients do not just have a sustainability strategy; they deliver on their sustainability commitments and create lasting social impact.",
  },
  // EN #29: the Dual-Impact Leverage Model (Dual-Benefit Theory is void), the book's
  // own text in English; "I" is the author, Evvon Wu.
  theory: {
    title: "Dual-Impact Leverage Model",
    nameEn: "",
    slogan: "When a sustainability action creates environmental and social value at the same time, economic value is bound to follow.",
    diagram: { left: "Environmental value", right: "Social value", pivot: "Leverage point", result: "Economic value" },
    // Shown folded: the first paragraph
    lead: "I often compare the environment, society and the economy to a three-legged stool. Traditional sustainability efforts struggle to last because they fall into the trap of “linear returns”. You invest in the environment or society, then hope it “might” bring an economic return. In a downturn, that link is usually the first to break.",
    readMore: "Read the full argument",
    paragraphs: [
      "The Dual-Impact Leverage Model turns that hoped-for link into a built-in one. When a sustainability action deliberately creates environmental and social value at the same time, it no longer just “might” pay off. It brings the organisation a third benefit: economic return and growth.",
      "The key is to find the leverage point: to move from single-point thinking to connected thinking, and from adding to multiplying.",
      "Take a company that makes heat-reflective coatings. It used to sell only “lower electricity bills”, and was easily beaten by cheaper alternatives. Then it asked: “Apart from the planet and our customers’ electricity bills, who else benefits directly from this coating?” It saw the truck drivers who spend all day in the sun. It changed its pitch to “a cooler, safer working environment for your drivers”, and opened up a new market in logistics and bus fleets. The investment stayed the same, but the return was multiplied several times over.",
    ],
    source: { before: "— From Evvon Wu, ", book: "The New Language of Sustainability: The Dual-Impact Revolution", after: ", Chapter 2" },
  },
  // EN #30: four tabs, no prices. Each tab has a fixed anchor, #services-<id>, that opens it.
  services: {
    label: "Services",
    title: "End-to-end sustainability solutions",
    description: "From learning to write your own white paper to working with an advisor, every service is built around business results.",
    items: [
      { id: "whitepaper", tag: "White Paper", title: "Sustainability White Paper", description: "Through in-depth interviews and data work, we turn what you are already doing into a Sustainability White Paper. It is backed by data and sources, so businesses can understand it and check it.", highlight: "Most popular" },
      { id: "course", tag: "Courses", title: "Sustainability Courses", description: "Learn to write your organisation’s Sustainability White Paper yourself. Choose from the Sustainability White Paper Workshop, the Sustainable Agri-Innovator Programme, the Sustainable Business Innovator Programme, the Online Course: ESG and Social Impact Strategy for Brands, and the CO-ESG Academy Subscription. Taught in Mandarin.", highlight: "" },
      { id: "workshop", tag: "Workshops", title: "In-House Workshops for Organisations", description: "Helping companies and brands turn sustainability ideals into practical action and market-ready language. Our courses and workshops build ESG thinking, communication skills and applied sustainability strategy.", highlight: "" },
      { id: "supply-chain", tag: "Supply Chain", title: "Sustainable Supply Chain Advisory", description: "We help you answer your buyers’ sustainability requirements and supply chain questionnaires, so sustainability is not the reason you are screened out. Annual contract.", highlight: "" },
    ],
    cta: "See Services & Pricing",
  },
  proof: {
    label: "Results",
    // EN #31
    tag: "Sustainability White Paper case | ModuLab",
    title: "One Sustainability White Paper took ModuLab, a brand that makes watches from ocean waste, onto the stage of an international youth forum.",
    lead: "Telling your own story through sustainability is the first step onto the global stage.",
    before: "Before the data, the watch was a beautiful product with a meaningful origin.",
    after: "After the data, it became evidence that buyers can cite in their reports and partners can build relationships around.",
    casesCta: "See Sustainability White Paper cases",
    totalsTitle: "Gung-Ho Culture’s results to date",
    quantTitle: "Quantitative results",
    notesLabel: "How the numbers are counted",
    qualTitle: "Qualitative results",
    qualItems: [
      { title: "Recognised internationally", description: "An ocean-waste watch brand organised its data and story in a Sustainability White Paper and took the stage at an international youth forum." },
      { title: "From reactive to proactive", description: "Taiwan Leisure Agriculture Association moved from ad hoc, reactive corporate partnerships to proactive, strategic engagement." },
      { title: "A value proposition businesses can read", description: "Selvans Social Farm completed its Sustainability White Paper and now has a value proposition it can state clearly to businesses." },
    ],
  },
  ecosystem: {
    label: "Gung-Ho Ecosystem",
    title: "Connecting advisors, supply chains, businesses and international networks",
    description: "With CO-ESG Academy at its centre, a sustainability community where every member empowers the others.",
    center: "CO-ESG Academy",
    roles: [
      { title: "Sustainability Advisory Team", description: "Senior ESG advisors and brand strategists, with advisory teams formed around each project’s needs." },
      { title: "Supply-Chain Connections", description: "A pool of high-quality suppliers, matched precisely to your needs." },
      { title: "Corporate Partners", description: "Brands and businesses across sectors building sustainable business models together." },
      { title: "International Network", description: "Links with global sustainability organisations, bringing in the latest international trends and resources." },
    ],
    // EN #32
    partnersTitle: "CO-ESG Academy partners",
    // EN #33 (conclusion first, R19)
    network: {
      title: "The partner network behind us",
      body: "When a client’s needs go beyond what a single consultancy can cover, we can find the right expertise in our network. A company’s strength lies in its team and the cross-sector resources it can draw on. Our network covers: international sustainability forums spanning 30 countries; circular materials and sustainable design; a non-profit resource platform; supply chain management questionnaires; sustainable travel; biodiversity, carbon inventories and carbon footprints; and sustainable brand management.",
    },
    // EN #34: the ten people in src/data/team.ts; the block is #team
    consultantsTitle: "Advisory Team",
    expertiseLabel: "Expertise",
  },
  cta: {
    title: "Ready for the market to notice you?",
    description: "Book a 15-minute Coffee Chat and let's talk about how to make what you do clear, visible and understood.",
    primaryLabel: "Book a 15-minute Coffee Chat",
    secondaryLabel: "See our story so far",
  },
}

export default sustainability
