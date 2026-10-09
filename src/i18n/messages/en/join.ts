// /join copy. Single goal: add the official LINE account.
// The page has no chapters (it is a plain navbar link). Its numbers come from
// `impact.track` in common.ts, never from this file (G06).
// Layout decisions: docs/redesign/pages-v2/join/.
const join = {
  meta: {
    title: "Join Us",
    description: "Follow Gung-Ho Culture's official LINE account for first-hand news on sustainability trends, courses and partnership opportunities.",
  },
  label: "Join Us",
  hero: {
    kicker: "Official LINE Account",
    title: "Be part of the change",
    description: "Join Gung-Ho Culture's sustainability community and, alongside practitioners from every field, help good work get seen, understood and connected.",
    lineBtn: "Add our official LINE account",
    // Accessible name of the QR code
    qrLabel: "Scan the QR code with your phone to join",
    lineId: "LINE ID",
    seconds: "Takes less than a minute",
  },
  benefits: {
    label: "Member benefits",
    title: "What will you receive?",
    items: [
      { title: "Weekly sustainability trends digest", description: "A weekly selection of ESG policy updates, industry news and market trends from Taiwan and around the world." },
      { title: "Priority notice of events and courses", description: "Early registration for CO-ESG Academy workshops, international forums and more, so you never miss a chance to learn and connect." },
      { title: "Cross-sector partnership opportunities", description: "Connect with sustainability practitioners in agriculture, design, technology, social enterprise and beyond, and open up new cross-sector possibilities." },
      { title: "Exclusive resources and offers", description: "Members-only Sustainability White Paper summaries, advisory discounts and exclusive offers from our partners." },
    ],
  },
  steps: {
    label: "How to join",
    title: "Three steps to becoming a Gung-Ho partner",
    items: [
      { title: "Scan to join", description: "Scan the QR code or tap the button to add Gung-Ho Culture's official LINE account." },
      { title: "Stay informed", description: "Start receiving first-hand updates on sustainability trends, events and partnership opportunities." },
      { title: "Get involved", description: "Sign up for events, reply to messages and join the discussion as part of the sustainability ecosystem." },
    ],
  },
  // The one secondary way out, under the closing LINE card
  alt: {
    title: "Still deciding?",
    link: "See the events we have run",
  },
}

export default join
