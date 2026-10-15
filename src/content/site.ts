export const site = {
  name: "4H Federal",
  serviceIdentity: "Government Contracting Engine",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.4hfederal.com",
  description:
    "Coordinated capture, sourcing, proposal, and administration support for service-disabled veteran-owned small businesses pursuing federal work.",
  // These belong to the existing direct-contracting site and are deliberately not published here.
  pendingApproval: {
    legalEntity:
      "Confirm the advisory service's legal entity and relationship to Healing Hands Healing Hearts.",
    contactRecipient:
      "Confirm the inbox for advisory-service inquiries and configure CONTACT_TO_EMAIL.",
    senderIdentity: "Verify a sending domain and configure CONTACT_FROM_EMAIL.",
    phone:
      "Confirm whether +1 (210) 964-2027 is the advisory-service phone number.",
    address:
      "Confirm whether 216 Lake Vista Drive, Loganville, GA 30052 is the correct advisory-service address.",
    logo: "Confirm whether additional horizontal or monochrome logo files are available.",
    experience:
      "Approve any named case studies, client references, work products, and results before publication.",
    privacy:
      "Have counsel or the site owner approve the privacy notice before public launch.",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Who We Support", href: "/who-we-support" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  cta: {
    primary: "Discuss Your Goals",
    short: "Discuss Your Goals",
    secondary: "View Services",
  },
  values: [
    {
      name: "Honesty",
      detail: "Straightforward communication and clear expectations.",
    },
    {
      name: "Hardwork",
      detail: "The steady effort that complex pursuits demand.",
    },
    {
      name: "Honor",
      detail: "Respect for commitments, people, and client authority.",
    },
    {
      name: "High Standards",
      detail:
        "Careful work, thoughtful review, and disciplined follow-through.",
    },
  ],
} as const;

export const stages = [
  "Exploring federal contracting",
  "Preparing to bid",
  "Actively submitting proposals",
  "Performing federal contracts",
  "Expanding into new markets",
  "Other",
] as const;
