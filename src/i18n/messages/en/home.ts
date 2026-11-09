// Home page copy. Section order follows docs/redesign/03-decisions.md.
const home = {
  meta: {
    title: "Gung-Ho Culture CO-ESG | Your Bridge to Sustainable Value",
  },
  hero: {
    label: "Bring your value to light.",
    title: "So many are doing meaningful work, yet struggle to get the market to notice",
    titleLead: "So many are doing meaningful work,",
    titleEmphasis: "yet struggle to get the market to notice",
    lead: "We help small and medium-sized businesses, brands and non-profits respond to ESG requests from customers or corporate sponsors. We also help them write a Sustainability White Paper to share.",
    subTitle: "We help businesses understand, and markets recognise, sustainability value across every sector.",
    description:
      "Brands, farms, social enterprises and non-profits often have solid sustainability principles and are already putting them into practice, yet find it hard to explain to businesses what they can offer. Sustainability is the common language for that conversation. Gung-Ho Culture aims to be the bridge, making sure like-minded partners find each other.",
    primaryCta: "Book a 15-minute Coffee Chat",
    secondaryCta: "Find out who we are",
    bridgeLeft: "Purpose-led brands, small farmers, social enterprises and NPOs",
    bridgeRight: "Businesses seeking sustainable partners",
    bridgeCenter: "Gung-Ho Culture",
  },
  partners: {
    label: "Partners and organisations we have worked with",
    groups: [
      { key: "client", title: "Clients" },
      { key: "partner", title: "Partners" },
    ],
  },
  problem: {
    label: "The challenge we address",
    title: "Where are you stuck right now?",
    situations: [
      {
        title: "“A major customer just sent me an ESG questionnaire.”",
        description:
          "We help you understand what each question is really asking and match it to what you are already doing. Where you don’t yet meet a requirement, we answer honestly and set out what to strengthen first.",
        cta: "See Sustainable Supply Chain Advisory",
        link: "supplyChain",
      },
      {
        title: "“I want to act on sustainability, but I’m worried it will cost a fortune.”",
        description: "We start by mapping what you are already doing. Then we decide together where the money should go.",
        cta: "Book a 15-minute Coffee Chat",
        link: "contact",
      },
      {
        title: "“We’re a small business or organisation. We want to pitch to companies, or report on what our partnership achieved.”",
        description:
          "We translate your products or services into the sustainability language companies understand. We then put this into a Sustainability White Paper you can use in your pitch. You can learn to write it yourself, or have an advisor write it with you.",
        cta: "See Services & Pricing",
        link: "solutions",
      },
    ],
    solutionLabel: "Our answer",
    solutionTitle: "Your bridge to sustainable value",
    solutionClaim:
      "Much of what you believe in and do every day is already good for people and the planet. That’s sustainability. It just hasn’t been put into words, or brought to light, yet.",
    solutionDescription:
      "We help businesses see the sustainability value created in every sector, help markets recognise it, and help like-minded partners find each other. We do this through the four services below, with CO-ESG Academy connecting our partners.",
    solutionTagline: "Say it clearly, and you will be seen.",
    services: [
      { label: "Sustainability White Paper", anchor: "services-whitepaper" },
      { label: "Sustainability Courses", anchor: "services-course" },
      { label: "In-House Workshops for Organisations", anchor: "services-workshop" },
      { label: "Sustainable Supply Chain Advisory", anchor: "services-supply-chain" },
    ],
  },
  story: {
    label: "Our Story",
    title: "It began with an Atayal name",
    founderName: "Evvon (Sayun)",
    founderTitle: "Founder, Gung-Ho Culture",
    headline: "Sayun means “bridge”.",
    nameMeaning: "Sayun means “Bridge”",
    summary:
      "While working as a social worker, founder Evvon was given the name “Sayun” by an Atayal pastor from Nan’ao, Yilan, in the hope that she would connect different communities and cultures. Years later, as the sustainability wave swept in, she saw a gap: businesses had resources but lacked effective strategy, while NPOs had the expertise to tackle social problems but lacked a bridge to business. So she set out to build that bridge herself, extending her impact from a single organisation to an entire industry.",
    bullets: [
      "From social worker to bridge-builder, connecting businesses that have resources but lack strategy with social organisations that have expertise but lack connections.",
      "Sustainability must grow from the inside out: embed values in governance and build trust between people first, so that environmental efforts are never a one-off.",
      "Close trust between people is the deepest root of sustainability and the starting point of social resilience.",
      "Sustainability is not a choice between profit and responsibility. When you create environmental and social value at the same time, economic value follows. That is Dual-Impact.",
    ],
    readMore: "Read the full story",
    readLess: "Show less",
    // Wrap a phrase in **double asterisks** to render it bold, _underscores_ for italics.
    fullStory: [
      "While working as a social worker, founder Evvon Wu met **Rev. Nolay Piho**, an Atayal pastor from Nan’ao, Yilan, known for his leading role in the film **_Warriors of the Rainbow: Seediq Bale_**.",
      "Rev. Nolay Piho gave Evvon an Atayal name, Sayun, meaning “bridge”. Between those who have resources and those who do not, there needs to be a bridge for communication.",
      "That name later became the core philosophy of Gung-Ho Culture.",
      "From social work to entrepreneurship, Evvon has always sought her own way of engaging with the world around her. One organisation can only reach so many people, but if its influence can spread across an entire industry, real change becomes possible.",
      "As our name suggests, “Gung-Ho” means working together, so that everyone who joins can thrive together.",
      "Gung-Ho Culture’s value proposition is simple: sustainability is a system built on three shared benefits, environmental, social and economic.",
      "When relationships between people are strong, society is resilient; when society is resilient, business can endure; and when business is viable, we have the capacity to care for the environment.",
      "That is why Gung-Ho Culture puts society first: people are at the heart of sustainability, and only when people thrive together can real impact follow.",
    ],
    chain: ["A resilient society", "Enduring business", "The capacity to care for the environment"],
    moreLink: "About Gung-Ho Culture",
  },
  evidence: {
    label: "Evidence of impact",
    title: "Measurable impact, real partnership results",
    description: "Every number has a story behind it.",
    sourceNote: "Source: Gung-Ho Culture project records, updated regularly.",
    cards: [
      {
        title: "Funding unlocked by a Sustainability White Paper",
        description:
          "A technology company wrote a Sustainability White Paper with Gung-Ho Culture. Within a year, it secured government grants, angel investment and bank loans totalling nearly NT$10 million.",
      },
      {
        title: "Cross-sector sustainability partnerships",
        description:
          "From international forums to corporate procurement lists, and from global sustainability conferences to co-branded products, Gung-Ho Culture continues to broker cross-sector partnerships through the CO-ESG Academy speaker platform.",
      },
      {
        title: "On the international stage",
        description:
          "A single Sustainability White Paper took a brand that makes watches from ocean waste onto the stage of an international youth forum. To date we have helped 8 companies reach international forums, showing the world Taiwan’s sustainability pioneers.",
      },
    ],
    moreLink: "See our story so far",
  },
  audiences: {
    label: "Who we serve",
    title: "What kind of partner are you?",
    description:
      "Gung-Ho Culture serves three groups: purpose-led brand owners and non-profits; small and medium-sized suppliers whose customers ask them to respond on ESG; and large companies looking for a sustainable supply chain. CO-ESG Academy, meanwhile, brings learners and speakers together in one space.",
    items: [
      {
        key: "brand",
        title: "Purpose-led brand owners and non-profits",
        description:
          "You are already practising sustainability, or your business inherently creates social and environmental value. Whether you work in agriculture, design, wellbeing, the creative industries or the non-profit sector, we help you articulate that value clearly.",
        cta: "See Sustainability White Paper plans",
      },
      {
        key: "enterprise",
        title: "Large companies seeking sustainable supply chains",
        description:
          "Beyond compliant suppliers, large companies need partners who genuinely reflect their brand values and map to ESG indicators. We have built a network of partners with proven sustainability credentials.",
        cta: "Discover the Gung-Ho Ecosystem",
      },
      {
        key: "learner",
        title: "Individuals and teams keen to learn",
        description:
          "CO-ESG Academy connects sustainability practitioners from every field, bringing speakers, brands and businesses together to exchange ideas and spark new partnerships and possibilities.",
        cta: "See courses and plans",
      },
      {
        key: "supplier",
        title: "Small and medium-sized suppliers asked to respond on ESG",
        description:
          "Has a major customer sent you an ESG questionnaire or sustainability requirements? Not sure where to start? We help you understand the questions and match them to what you are already doing.",
        cta: "See Sustainable Supply Chain Advisory",
      },
    ],
    roadmapTitle: "Where we are heading next",
    roadmap: [
      { period: "2026", title: "Strengthen the foundations", description: "Develop a standardised Sustainability White Paper template, diversify our client base and refresh our website and brand identity." },
      { period: "2027–2028", title: "Make the model replicable", description: "Build a replicable sustainability disclosure process, deepen sustainable agricultural supply chains and develop AI-assisted advisory tools." },
      { period: "2029 onwards", title: "Become a hub of the ecosystem", description: "Take the Sustainability White Paper and the IOOI framework to Asia-Pacific and the Chinese-speaking world through a model of co-learning, co-creation and coexistence." },
    ],
    roadmapLink: "View the full roadmap",
  },
  trust: {
    label: "What our partners say",
    title: "Client Testimonials",
    description: "Genuine feedback from brand owners, social enterprises and industry partners. Select a partner’s logo to read their full testimonial.",
    openLabel: "Read testimonial",
    closeLabel: "Close",
    testimonials: [
      {
        highlight: "At its core, ESG is still about people, and the value Gung-Ho Culture brings fits that perfectly.",
        quote: "They start from the founder’s perspective and help you see how your work connects to sustainability. While preparing the report, they also reawaken your original motivation for doing it.",
        name: "Selvans Social Farm",
        client: "sifan-farm",
        title: "Owner, natural farm",
        tag: "ESG Report",
      },
      {
        highlight: "Professional, warm and dependable. The whole collaboration felt reassuring.",
        quote: "They make complex sustainability topics feel far less daunting. People from different backgrounds can meet and exchange ideas, opening up new partnerships and possibilities.",
        name: "Tour Life",
        client: "tuer-life",
        title: "Brand Founder",
        tag: "Brand Sustainability",
      },
      {
        highlight: "We moved from ad hoc, reactive corporate partnerships to proactive, strategic engagement.",
        quote: "True to its name, Gung-Ho Culture is a partner that helps everyone thrive together, integrating and translating knowledge.",
        name: "Taiwan Leisure Agriculture Association",
        client: "tlaa",
        title: "Industry Partner",
        tag: "Supply Chain",
      },
      {
        highlight: "Gung-Ho Culture are experts in strengthening corporate ESG.",
        quote: "They offer perspectives clients would never have thought of, while building further on what clients already have, bringing together environmental, social and economic value.",
        name: "Chihe Design",
        client: "chihe",
        title: "Co-founder",
        tag: "Advisory",
      },
      {
        highlight: "I finally understood what value I can create for businesses.",
        quote:
          "I kept wondering what sustainability and ESG actually had to do with me. Before the course, I thought it was something big corporations talked about, with no connection to my own work. Once the course laid out the framework and the context, I finally understood what value I can create for businesses. I also learned what language to use when I talk to them. Hearing someone else explain it a hundred times is no substitute for experiencing it yourself.",
        name: "Wellbeing industry | Event organiser",
        client: "",
        title: "",
        tag: "",
        outcomeLabel: "Outcome",
        outcome:
          "Helped a learner from another field find where their industry connects with sustainability, and build the language and direction to communicate with businesses.",
      },
    ],
  },
  cta: {
    label: "Next step",
    title: "Ready for the market to notice you?",
    description:
      "Book a 15-minute Coffee Chat and let’s talk about how to make what you do clear, visible and understood.",
    primaryLabel: "Book a 15-minute Coffee Chat",
    secondaryLabel: "Follow us on LinkedIn",
    steps: ["Leave your details", "A 15-minute online chat", "Receive tailored next steps"],
  },
  book: {
    title: "The New Language of Sustainability: The Dual-Impact Revolution",
    coverAlt: "Cover of The New Language of Sustainability: The Dual-Impact Revolution",
    meta: ["Author: Evvon Wu", "Publisher: Sbooker Publications", "Price: NT$380", "In Traditional Chinese"],
    tagline: "You have done so much for sustainability. But has that effort really been seen?",
    description:
      "Evvon Wu draws on years of experience as a social worker, corporate advisor and social innovator. She helps you rethink sustainability: from responsibility to thriving together, from activities to real outcomes, and from measuring impact to scaling up resources. Business value and social value no longer have to be a trade-off.",
    cta: "Buy the book",
  },
}

export default home
