export type Service = {
  number: string;
  slug: string;
  short: string;
  title: string;
  summary: string;
  introduction: string;
  details: string[];
  outcome: string;
};

export const services: Service[] = [
  {
    number: "01",
    slug: "capture",
    short: "Capture",
    title: "Capture and Opportunity Selection",
    summary:
      "Identify and assess opportunities aligned with business goals, qualifications, and available resources.",
    introduction:
      "A focused pipeline begins with a clear view of where your business is equipped to compete. We support the review and prioritization of relevant federal opportunities.",
    details: [
      "Opportunity identification",
      "Requirement review",
      "Pursuit prioritization",
    ],
    outcome:
      "A more deliberate view of which opportunities merit your team’s attention.",
  },
  {
    number: "02",
    slug: "sourcing",
    short: "Sourcing",
    title: "Subcontractor Sourcing and Pricing",
    summary:
      "Coordinate provider outreach, review scope coverage, and support development of a complete proposed price.",
    introduction:
      "When a pursuit calls for outside capabilities, we help organize provider outreach and bring clarity to scope, inputs, and proposed pricing.",
    details: [
      "Provider coordination",
      "Scope coverage review",
      "Pricing support",
    ],
    outcome:
      "Better organized inputs for decisions your business retains authority to make.",
  },
  {
    number: "03",
    slug: "proposals",
    short: "Proposals",
    title: "Proposal Development and Submission",
    summary:
      "Prepare organized responses to solicitation requirements and coordinate deadlines, amendments, and submissions.",
    introduction:
      "A credible response depends on attention to the solicitation and a disciplined submission process. We help structure the response and coordinate the moving pieces.",
    details: [
      "Response organization",
      "Amendment and deadline tracking",
      "Submission coordination",
    ],
    outcome: "A proposal process with clearer ownership, timing, and review.",
  },
  {
    number: "04",
    slug: "administration",
    short: "Administration",
    title: "Contract Administration",
    summary:
      "Support award review, subcontract preparation, performance coordination, deliverables, invoicing, and closeout.",
    introduction:
      "After award, coordinated administration helps keep obligations visible. We can support the activities around performance while the client remains responsible for its contract.",
    details: [
      "Award and subcontract support",
      "Deliverable coordination",
      "Invoicing and closeout support",
    ],
    outcome:
      "A more organized view of the administrative work surrounding performance.",
  },
];

export const experienceAreas = [
  "Mechanical maintenance",
  "Testing and calibration",
  "Fire and life safety",
  "Equipment repair",
  "Facility services",
];

export type ApprovedExperience = {
  title: string;
  requirement: string;
  role: string;
  deliverable: string;
  image?: string;
  approved: boolean;
};
export const approvedExperience: ApprovedExperience[] = [];
