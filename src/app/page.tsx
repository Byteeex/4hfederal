import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CertificationsMarquee } from "@/components/certifications-marquee";
import { ClosingCta } from "@/components/closing-cta";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { publicAsset } from "@/lib/public-asset";

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-photo">
          <Image
            src={publicAsset("/images/facility-hall.jpg")}
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-grid" aria-hidden="true" />
        <div className="shell home-hero-content">
          <span className="eyebrow hero-eyebrow">
            <span className="label-rule" /> GOVERNMENT CONTRACTING ENGINE{" "}
            <span className="eyebrow-index">/ 01</span>
          </span>
          <h1>
            <span>Federal contracting</span>
            <span>support for SDVOSBs.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              We support opportunity selection, subcontractor sourcing, proposal
              development, and contract administration.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/contact">{site.cta.primary}</ButtonLink>
              <ButtonLink href="/services" variant="outline">
                {site.cta.secondary}
              </ButtonLink>
            </div>
          </div>
          <a className="hero-scroll" href="#approach">
            Explore services <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="hero-side-note" aria-hidden="true">
          CAPTURE / SOURCING / PROPOSALS / ADMINISTRATION
        </div>
      </section>

      <section className="section services-section">
        <div className="shell">
          <div className="section-topline">
            <span className="eyebrow">02 / SERVICES</span>
            <Link href="/services" className="micro-link">
              View all services <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="section-heading-row">
            <h2 className="display-heading" data-reveal>
              Four services around the <em>contracting lifecycle.</em>
            </h2>
            <p>
              Select the support your team needs for a pursuit or active
              contract.
            </p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <Link
                href={`/services#${service.slug}`}
                className="service-row"
                key={service.slug}
                data-reveal
              >
                <span className="service-number">{service.number} / 04</span>
                <span className="service-title">{service.title}</span>
                <span className="service-summary">{service.summary}</span>
                <span className="service-arrow">
                  <ArrowUpRight size={23} strokeWidth={1.4} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="engine-section">
        <div className="shell">
          <div className="section-topline section-topline--dark">
            <span className="eyebrow eyebrow--gold">03 / HOW IT CONNECTS</span>
            <span className="micro-note">One coordinated view</span>
          </div>
          <div className="engine-heading">
            <h2 className="display-heading" data-reveal>
              Connected support from <em>pursuit through performance.</em>
            </h2>
            <p>
              Each service addresses a specific part of the work. Scope can
              focus on one activity or connect several when the requirement
              calls for it.
            </p>
          </div>
          <div
            className="engine-diagram"
            aria-label="The four support areas in sequence"
          >
            {services.map((service, i) => (
              <div className="engine-step" key={service.slug} data-reveal>
                <div className="engine-step-top">
                  <span>0{i + 1}</span>
                  <span className="engine-node" />
                </div>
                <strong>{service.short}</strong>
                <small>{service.title}</small>
              </div>
            ))}
          </div>
          <div className="engine-foot">
            <span>The client sets direction</span>
            <span>4H supports the agreed work</span>
          </div>
        </div>
      </section>

      <CertificationsMarquee />

      <section className="values-section">
        <div className="shell">
          <div className="section-topline">
            <span className="eyebrow">05 / WORKING PRINCIPLES</span>
            <span className="micro-note">The four Hs</span>
          </div>
          <h2 className="display-heading" data-reveal>
            Clear standards for <em>how we work.</em>
          </h2>
          <div className="values-grid">
            {site.values.map((value, i) => (
              <div className="value-item" key={value.name} data-reveal>
                <span className="value-index">0{i + 1} / 04</span>
                <h3>{value.name}</h3>
                <p>{value.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ClosingCta label="06 / START A CONVERSATION" />
    </>
  );
}
