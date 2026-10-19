import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ClosingCta } from "@/components/closing-cta";
import { approvedExperience, experienceAreas } from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { publicAsset } from "@/lib/public-asset";

export const metadata: Metadata = pageMetadata(
  "About & Experience",
  "Learn how 4H Morocco coordinates contracting support with clear roles, client approvals, and disciplined administration.",
  "/about",
);

const principles = [
  {
    number: "01",
    title: "Defined responsibilities",
    body: "Agree on the activities being supported and the decisions each party owns.",
  },
  {
    number: "02",
    title: "Regular reporting",
    body: "Keep progress, deadlines, and open questions visible to the client team.",
  },
  {
    number: "03",
    title: "Clear approvals",
    body: "Put consequential pursuit and contract decisions in the right hands.",
  },
  {
    number: "04",
    title: "Professional coordination",
    body: "Help align contributors and deliverables around the requirement.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="03"
        label="ABOUT & EXPERIENCE"
        title="Contracting support with clear responsibilities."
        description="4H helps Small and Medium Size businesses organize pursuits, proposals, sourcing, and contract administration while clients retain decision-making authority."
        variant="light"
        image="/images/planning-desk.jpg"
        imageAlt="Illustrative planning desk with technical documents under review"
      />
      <section className="section about-intro">
        <div className="shell about-intro-grid">
          <div data-reveal>
            <span className="eyebrow">01 / WHO WE ARE</span>
            <h2 className="display-heading">
              Additional capacity for <em>contracting work.</em>
            </h2>
          </div>
          <div data-reveal>
            <p className="lead">
              4H Morocco supports Small and Medium Size businesses with defined contracting
              activities.
            </p>
            <p>
              Our role is to help organize the work around opportunities,
              proposed solutions, submissions, and contract administration.
              Clients set direction and retain authority over their businesses
              and contracts.
            </p>
            <div className="about-signature">
              <span>4H</span>
              <span>GOVERNMENT CONTRACTING ENGINE</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section work-section">
        <div className="shell">
          <div className="section-topline">
            <span className="eyebrow">02 / HOW WE WORK</span>
            <span className="micro-note">Clarity through the lifecycle</span>
          </div>
          <div className="work-heading">
            <h2 className="display-heading" data-reveal>
              Keep the work <em>visible and assigned.</em>
            </h2>
            <p>
              Coordination works best when responsibilities, status, and
              approvals stay clear.
            </p>
          </div>
          <div className="work-grid">
            {principles.map((item) => (
              <article key={item.number} data-reveal>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="authority-section">
        <div className="shell authority-grid">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">03 / BUSINESS CONTROL</span>
            <h2 className="display-heading">
              Your contract. <em>Your authority.</em>
            </h2>
          </div>
          <div data-reveal>
            <p>
              Support does not transfer contractual responsibility. The client
              retains business control, makes required approvals, and remains
              accountable for its prime contract obligations.
            </p>
            <div className="authority-line">
              <span>CLIENT</span>
              <span>Direction / approvals / accountability</span>
            </div>
            <div className="authority-line">
              <span>4H</span>
              <span>Agreed coordination and support</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section about-experience">
        <div className="shell">
          <div className="section-topline">
            <span className="eyebrow">04 / RELEVANT WORK ENVIRONMENTS</span>
            <span className="micro-note">
              Specific experience examples pending approval
            </span>
          </div>
          <div className="about-experience-grid">
            <div data-reveal>
              <h2 className="display-heading">
                Relevant service <em>environments.</em>
              </h2>
              <p>
                Whether your goal is to target one NAICS code or multiple, we
                have the experience to support your vision.
              </p>
              <ul>
                {experienceAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
            <div className="about-experience-image" data-reveal>
              <Image
                src={publicAsset("/images/structure.jpg")}
                alt="Illustrative industrial steel structure"
                fill
                sizes="(max-width: 800px) 100vw, 45vw"
              />
              <span>ILLUSTRATIVE PHOTOGRAPHY</span>
            </div>
          </div>
          {approvedExperience.length > 0 && (
            <div className="approved-cases">
              {approvedExperience
                .filter((item) => item.approved)
                .map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>
                      <strong>Requirement:</strong> {item.requirement}
                    </p>
                    <p>
                      <strong>Actual role:</strong> {item.role}
                    </p>
                    <p>
                      <strong>Verified deliverable:</strong> {item.deliverable}
                    </p>
                  </article>
                ))}
            </div>
          )}
        </div>
      </section>
      <section className="values-band">
        <div className="shell">
          <span className="eyebrow">THE FOUR Hs</span>
          <div>
            {site.values.map((value) => (
              <span key={value.name}>{value.name}</span>
            ))}
          </div>
        </div>
      </section>
      <ClosingCta
        label="05 / CONNECT"
        title="Discuss the work in front of you."
        body="Tell us about your current contracting activity and where your team needs additional capacity."
      />
    </>
  );
}
