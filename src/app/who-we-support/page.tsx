import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ClosingCta } from "@/components/closing-cta";
import { pageMetadata } from "@/lib/metadata";
import { publicAsset } from "@/lib/public-asset";

export const metadata: Metadata = pageMetadata(
  "Who We Support",
  "Support for Small and Medium Size businesses entering federal contracting, adding bidding capacity, or exploring new markets.",
  "/who-we-support",
);

const audiences = [
  {
    number: "01",
    title: "Entering federal contracting",
    intro: "Build a more deliberate start.",
    body: "For businesses beginning to pursue federal work, we help assess suitable opportunities and organize the activity around a potential pursuit. The aim is a clearer starting point, grounded in actual capabilities and requirements.",
    tags: ["Opportunity fit", "Pursuit organization"],
  },
  {
    number: "02",
    title: "Seeking additional bidding support",
    intro: "Add capacity where it counts.",
    body: "Established contractors may have a strong delivery team but limited room for capture, sourcing, proposal, or administrative work. We provide coordinated support around the activities that need attention.",
    tags: ["Capture capacity", "Proposal support"],
  },
  {
    number: "03",
    title: "Expanding into new markets",
    intro: "Explore with judgment.",
    body: "A broader pipeline should still reflect what a business can responsibly pursue. We can help examine related service categories and organize exploration, with every opportunity assessed individually.",
    tags: ["Market exploration", "Individual assessment"],
  },
];

export default function WhoWeSupportPage() {
  return (
    <>
      <PageHero
        index="02"
        label="WHO WE SUPPORT"
        title="Support for the work you need done."
        description="For Small and Medium Size businesses entering federal contracting, adding bid capacity, or evaluating new markets."
        image="/images/technical-team.jpg"
        imageAlt="Illustrative technical team reviewing work plans"
      />
      <section className="section audience-section">
        <div className="shell">
          <div className="section-topline">
            <span className="eyebrow">01 / BUILT FOR YOUR STAGE</span>
            <span className="micro-note">Focused support, adaptable scope</span>
          </div>
          <h2 className="display-heading audience-heading" data-reveal>
            Start with your <em>current contracting need.</em>
          </h2>
          <div className="audience-list">
            {audiences.map((item) => (
              <article className="audience-item" key={item.number} data-reveal>
                <span className="audience-number">{item.number} / 03</span>
                <div>
                  <h3>{item.title}</h3>
                  <strong>{item.intro}</strong>
                </div>
                <div>
                  <p>{item.body}</p>
                  <div className="tag-list">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  size={20}
                  className="audience-arrow"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="delivery-section">
        <div className="shell delivery-grid">
          <div className="delivery-photo" data-reveal>
            <Image
              src={publicAsset("/images/federal-meeting.jpg")}
              alt="Professional team meeting representing federal contracting coordination"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
          <div className="delivery-copy" data-reveal>
            <span className="eyebrow eyebrow--gold">
              02 / DELIVERY APPROACH
            </span>
            <h2 className="display-heading">
              Support that respects <em>how you deliver.</em>
            </h2>
            <p>
              Some clients perform with their own teams. Others combine internal
              capabilities with qualified subcontractors. The appropriate
              approach depends on the requirement and applicable obligations.
            </p>
            <div className="delivery-principles">
              <div>
                <span>01</span>
                <p>Define the work and responsibilities clearly.</p>
              </div>
              <div>
                <span>02</span>
                <p>Keep approvals and oversight with the client.</p>
              </div>
              <div>
                <span>03</span>
                <p>Coordinate support around actual contract needs.</p>
              </div>
            </div>
            <p className="delivery-note">
              Clients retain business authority and prime-contractor
              accountability throughout.
            </p>
          </div>
        </div>
      </section>
      <ClosingCta
        label="03 / YOUR NEXT PURSUIT"
        title="Tell us what you are preparing for."
        body="Share your current capabilities, the opportunity, and the support your team needs."
        button="Discuss Your Goals"
      />
    </>
  );
}
