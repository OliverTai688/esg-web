import type { ChapterDef } from "@/lib/chapters"

// /consulting copy (rev2 EN #44–#47, the client's final English, verbatim).
// Services, prices and buttons of Services & Pricing live in src/data/solutions.ts.
// Every section's kicker (`label`) is also its chapter label below: keep them identical.
// Page sections in page order: the single source for the navbar dropdown and the
// in-page ChapterNav. Every id must be a section id on the page (scripts/check-anchors.mjs).
// Page nav (EN #44): 01 Services & Pricing / 02 Our Work / 03 FAQ / 04 Contact
const chapters: readonly ChapterDef[] = [
  { id: "solutions", label: "Services & Pricing", desc: "Five groups of services, prices and next steps", icon: "Wallet" },
  { id: "cases", label: "Our Work", desc: "Recent projects, in photos", icon: "Briefcase" },
  { id: "faq", label: "FAQ", desc: "What people ask before booking", icon: "HelpCircle" },
  { id: "contact", label: "Contact", desc: "Book a Coffee Chat, or email us", icon: "Mail" },
]

const consulting = {
  chapters,
  meta: {
    title: "Work With Us",
    description:
      "Book a 15-minute Coffee Chat. See prices for Sustainability White Papers, courses, in-house workshops and supply chain advisory, with recent projects and FAQs.",
  },
  label: "Work With Us",
  hero: {
    kicker: "Work With Us",
    title: "Book a 15-minute Coffee Chat",
    description:
      "Let’s talk about how to bring your value to light. Whether you are a brand owner, a supply-chain partner or part of the sustainability sector, we look forward to the conversation.",
    primaryCta: "Book a 15-minute Coffee Chat",
    lineCta: "Email us",
    // The page's equation (a labelled diagram, kept by #4): open in the hero.
    equation: { petal: "Purpose-led brands", block: "Businesses seeking partners", result: "A 15-minute chat first" },
  },
  // Services & Pricing (EN #44). The items are in src/data/solutions.ts.
  solutions: {
    label: "Services & Pricing",
    title: "Services & Pricing",
    // 開場說明 (EN #44)
    description: "Choose how to start: join a free info session, learn to write your own Sustainability White Paper, or work with an advisor to produce one.",
    popular: "Most popular",
    columns: { item: "Service", description: "Description", price: "Price", action: "Next step" },
  },
  // 02 Our Work (EN #46)
  cases: {
    label: "Our Work",
    title: "Our Work",
    filterLabel: "Filter by type of client",
    filters: [
      { key: "all", label: "All" },
      { key: "business", label: "Business" },
      { key: "care", label: "Healthcare and social welfare" },
      { key: "local", label: "Agriculture and local communities" },
      { key: "school", label: "Schools" },
      { key: "global", label: "International and community" },
    ],
    openCase: "Read this case",
    close: "Close",
    quoteLabel: "In their words",
    // 16 tiles, verbatim (EN #46②); photos, order and which tiles open as in zh #46.
    tiles: [
      { photo: "01", category: "business", org: "True Roll", activity: "Writing a sustainability report in practice (Sep–Oct 2026, two sessions)", text: "We helped the True Roll team map their daily work against GRI cards, and rank priority actions by goals and cost. This prepares them for their next sustainability report.", alt: "True Roll team members sorting cards on a table" },
      { photo: "02", category: "business", org: "silverlining", activity: "Outcome review workshop: corporate volunteers and older people in the community (Sep 2026)", text: "We helped the silverlining team describe the changes for corporate volunteers, older community members and community centres, across five dimensions: skills, attitudes, behaviour, feelings and circumstances.", alt: "The silverlining team discussing around a table with sticky notes" },
      { photo: "03", category: "business", org: "Chuangmou Co., Ltd.", activity: "Teachers’ Day charity gift box: ESG business-matching course for micro and small businesses (Aug 2026, online)", text: "An online course with a dedicated learner workspace, helping small businesses describe their products as “outcomes” companies understand.", alt: "The learner workspace used in the online course" },
      { photo: "04", category: "business", org: "Chinese Television System (CTS)", activity: "Corporate sustainability drivers course (Jun 2024)", text: "Starting from the ESG risks common in the media industry, we helped staff connect the company’s vision and core values with sustainability.", alt: "The trainer guiding CTS staff through a card exercise" },
      { photo: "05", category: "care", org: "The Association for the Mentally Ill, Taitung", activity: "Sustainability workshops using the IOOI model (from Dec 2025)", text: "We used the IOOI model to break down four groups of activities and trace them back to one sustainability theme.", alt: "Members working in groups at a workshop in the association’s activity room", caseKey: "kangfu" },
      { photo: "06", category: "care", org: "Ten-Chen General Hospital (Zhongli)", activity: "Staff sustainability alignment retreat (Oct 2025)", text: "Six management teams linked their daily work to the SDGs. They set measurable goals for the year ahead, such as cutting the hospital’s energy use by 10%.", alt: "Hospital managers working in groups with sticky notes", caseKey: "tiancheng" },
      { photo: "07", category: "care", org: "The Garden of Mercy Foundation", activity: "Staff sustainability alignment retreat (Jan 2025)", text: "Staff retold 25 years of care work in the language of the SDGs, and wrote it up themselves as the foundation’s annual special issue.", alt: "A consultant teaching staff in the foundation’s meeting room", caseKey: "mercy" },
      { photo: "08", category: "care", org: "Beunen Foundation", activity: "Leadership coaching and GROW alignment workshops (since 2023)", text: "We supported the foundation from leadership coaching and GROW alignment workshops to rebranding its Jinlun sheltered workshop.", alt: "Beunen Foundation staff presenting a workshop poster", caseKey: "beunen" },
      { photo: "09", category: "local", org: "Hui Wei Leisure Agriculture Area", activity: "Alignment workshops (Sep–Oct 2026, five sessions)", text: "Over five workshops, we helped local partners map their resources, choose SDG targets and design an open day on 4 Oct. Visitors’ feedback cards became first-hand evidence of the results.", alt: "Local partners seated around tables during a workshop" },
      { photo: "10", category: "local", org: "Taiwan Leisure Agriculture Association", activity: "Sustainable Agri-Innovator Programme (2026, completed in September)", text: "We took leisure farm owners through four stages: building knowledge, expressing their brand, connecting with markets, and measuring and acting. They turned their farms’ sustainability work into proposals companies understand.", alt: "The trainer presenting at the front of the programme classroom" },
      { photo: "11", category: "local", org: "Taipei City Office of Commerce", activity: "Taipei Friendly Stores course (Aug 2025, introductory session)", text: "We introduced the basics of the SDGs and sustainable development, and helped shop owners find sustainability practices in their own business that they can talk about.", alt: "Evvon Wu presenting on stage" },
      { photo: "12", category: "school", org: "Chihlee University of Technology", activity: "“Diverse Narratives” course (Oct 2026)", text: "Using the founder’s own education and career as an example, we talked about being measured against someone else’s yardstick. With anonymous live polls and group discussion, students learned to spot who is defining them, and to see their own stories in a new light.", alt: "Chihlee students in a group discussion in class" },
      { photo: "13", category: "school", org: "Huatan Junior High School", activity: "Resilient campus: teacher alignment retreat and teacher–student workshops (May–Jun 2026)", text: "With a resilient campus as the theme, we first helped teachers set the school’s positioning and annual goals. We then took teachers and students out to study the campus’s water flows and carry out their own carbon inventory.", alt: "Huatan Junior High School teachers in a group photo at the retreat" },
      { photo: "14", category: "global", org: "Global SDGs Alliance (GSA)", activity: "UN-SDGs Impact Developers Conference 2026 (Bangkok)", text: "Gung-Ho Culture took part in the conference. ModuLab, a Sustainability White Paper client, received the SDGs Impact Developers Award as an Impact Partner of the conference.", alt: "Group photo at the UN-SDGs Impact Developers Conference Demo Day" },
      { photo: "15", category: "global", org: "Global SDGs Alliance (GSA)", activity: "Keynote at SDGs Impact Developers Conference – Penghu 2026 (Apr 2026, National Penghu University of Science and Technology)", text: "Evvon Wu was invited as a keynote speaker, and received a certificate of appreciation from GSA.", alt: "GSA’s certificate of recognition for Evvon Wu’s keynote" },
      { photo: "16", category: "global", org: "Gung-Ho Culture × Duofu Care & Service", activity: "CO-ESG Academy speakers’ thank-you tea (7 Sep 2025)", text: "We brought CO-ESG Academy speakers together and put each speaker’s profile up on one wall. They learned about each other’s expertise and explored ways to work together.", alt: "CO-ESG Academy speakers holding signs in a group photo" },
    ] as { photo: string; category: string; org: string; activity: string; text: string; alt: string; caseKey?: string }[],
    // The four non-profit cases, opened from their tile (EN #46②, #47).
    // Personal names stay as supplied until an English form is confirmed.
    npo: [
      {
        key: "beunen",
        title: "Beunen Foundation",
        caption: "Beunen Foundation",
        type: "Services for people with disabilities, older people and children",
        headline: "From leadership coaching to rebranding the Jinlun workshop",
        points: [
          "Leadership coaching: a year of one-to-one sessions for the new chief executive, building trust and communication with her team.",
          "GROW alignment workshop: leaders from the head office and branch offices practised moving from goal and reality to options and a way forward.",
          "Social brand marketing: at the Jinlun workshop in Taitung, product scale-up, logo and packaging design, a refurbished space and a new shop create more jobs for local people with disabilities.",
          "Process improvement: mind maps organise administrative processes and records, passing on senior staff’s experience and preparing for government reviews.",
        ],
        quote: "With the working methods Gung-Ho Culture taught us, our foundations are firmer, we have more room to meet the public sector’s requirements, and both efficiency and service quality have improved greatly.",
        // English name from EN section 五 F2
        quoteBy: "Chung Jung-Jung, Chief Executive, Beunen Foundation",
      },
      {
        key: "mercy",
        title: "The Garden of Mercy Foundation",
        caption: "The Garden of Mercy Foundation",
        // EN #46: case subtitle
        type: "Residential care for children and young people with special needs",
        headline: "Retelling 25 years of care in the language of the SDGs",
        points: [
          "A course series supported cross-department communication: staff mapped their daily care work to the SDGs and wrote their own public document.",
          "In 2025 the foundation published its annual, “Care that moves towards sustainability”, organised around SDGs 2, 3, 4, 10 and 17.",
          "Results are stated in figures: in 2024 the infant centre provided 3,147 person-days of care and arranged 125 outpatient visits.",
        ],
        quote: "Sustainable development helps people in the helping professions move beyond simply “doing good earnestly” to “knowing why we do it, and doing it with meaning and value”.",
        quoteBy: "Chief Executive, The Garden of Mercy Foundation (annual publication)",
      },
      {
        key: "kangfu",
        title: "The Association for the Mentally Ill, Taitung",
        caption: "The Association for the Mentally Ill, Taitung",
        type: "Social participation for people recovering from mental illness",
        headline: "Four activities, traced back to one sustainability theme",
        points: [
          "A two-day workshop used the IOOI model to break down four cases: a djembe and dance troupe, handmade soap production, a soap charity sale and a second-hand charity sale.",
          "The four groups converged on two points: helping members step out into society (SDG 10.2) and helping the community understand the association (SDG 10.3).",
          "Work and activities are the means, not the goal; when talking to businesses, explain why these inputs are needed.",
        ],
        quote: "A sustainability goal is something you reach with partners. Do not try to force it through alone.",
        quoteBy: "Evvon Wu, closing the workshop",
      },
      {
        key: "tiancheng",
        // EN #47
        title: "Ten-Chen General Hospital, Zhongli (Ten-Chen Medical Group)",
        caption: "Ten-Chen General Hospital (Zhongli)",
        type: "Healthcare provider",
        headline: "Six teams of managers map daily work back to the SDGs",
        points: [
          "The course was held at Ten-Chen General Hospital in Zhongli, and staff from other hospitals in the Ten-Chen Medical Group also took part.",
          "In a sustainability workshop, six groups each set out a vision, stakeholders, the SDGs they map to and a one-year goal.",
          "Themes ranged from local hiring and employee well-being to energy saving, gender equality and teaching excellence.",
          "Participants set measurable targets, such as cutting the hospital’s energy use by 10% in a year and keeping the gender gap in entry-level pay below 3%.",
        ],
        quote: "This course taught us to integrate: to put the sustainability practices scattered through our daily work in the right place, against the right goals.",
        quoteBy: "Superintendent, Ten-Chen General Hospital",
      },
    ],
  },
  faq: {
    label: "FAQ",
    title: "Before you book, you may want to know",
    items: [
      { question: "What is a Coffee Chat?", answer: "A free 15-minute online consultation, as relaxed as chatting over coffee. We listen to where you are now and help you find the best next step. Whether you take it is entirely up to you." },
      { question: "Who are Gung-Ho Culture’s services for?", answer: "Our clients include agricultural brands, design firms, social enterprises, non-profits and large companies seeking sustainable supply chains. If you are doing meaningful work and want more people to see it, we would love to talk." },
      // EN #44 new
      { question: "What is ESG, and why are my customers asking me about it?", answer: "ESG stands for Environmental, Social and Governance. It is the shared language companies use to explain their sustainability performance. Listed companies in Taiwan must disclose sustainability information regularly, and they are starting to ask suppliers what they do in these three areas. That is why small and medium-sized businesses receive ESG questionnaires from customers. Many companies already do relevant work. They just have not yet put it in terms customers understand." },
      // EN #44 new
      { question: "How is a Sustainability White Paper different from a sustainability report?", answer: "A sustainability report is a formal, regular report that discloses a whole company’s sustainability performance under international standards such as GRI. Listed companies in Taiwan are required to publish one. A Sustainability White Paper focuses on your brand, product or service. It brings your values, practices, data and results together in one document for external communication, so customers, partners and funders can see your value. It is more flexible in length and format, and suits SMEs, brands and non-profits that do not yet need a sustainability report." },
      // EN #10
      { question: "How long does a Sustainability White Paper take?", answer: "Usually 6 to 12 weeks, depending on the size of your organisation and how complete your data is. This assumes the work follows the schedule agreed with your advisor, and that all the information we need has been provided. Along the way, we carry out in-depth interviews, organise your data and write the content. This makes sure the white paper truly reflects your sustainability practice." },
      { question: "How do we start working together?", answer: "The simplest way is to book a Coffee Chat so we can understand your needs. We will then provide tailored recommendations and a quote, and once confirmed, the project can begin." },
      // EN #44
      { question: "What does a CO-ESG Academy Subscription include?", answer: "CO-ESG Academy is a cross-sector platform for learning about sustainability and sharing ideas. Subscribers join weekly online classes, watch recordings, download speaker slides, join a peer community and get discounts on courses. You can subscribe at the CO-ESG Store." },
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
