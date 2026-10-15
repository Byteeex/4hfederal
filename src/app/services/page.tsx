import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ClosingCta } from "@/components/closing-cta";
import { PartnerOrbit } from "@/components/partner-orbit";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { publicAsset } from "@/lib/public-asset";

export const metadata: Metadata = pageMetadata(
  "Services",
  "Explore capture, sourcing, proposal development, and contract administration support for SDVOSB federal contractors.",
  "/services",
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        index="01"
        label="SERVICES"
        title="Four services. One coordinated workflow."
        description="Support for opportunity selection, sourcing, proposals, and contract administration."
        image="/images/mechanical-systems.jpg"
        imageAlt="Illustrative mechanical systems within a facility"
      />
      <section className="service-intro section">
        <div className="shell editorial-split">
          <span className="eyebrow">Choose the support you need</span>
          <p>
            Engage 4H for one defined activity or for coordinated support across
            several stages of the work.
          </p>
        </div>
      </section>
      <div className="service-detail-list">
        {services.map((service, i) => (
          <section
            id={service.slug}
            className={`service-detail service-detail--${i % 2 ? "light" : "warm"}`}
            key={service.slug}
          >
            <div className="shell service-detail-grid">
              <div className="service-detail-number" data-reveal>
                <span>{service.number}</span>
                <small>/ 04</small>
              </div>
              <div className="service-detail-content" data-reveal>
                <span className="eyebrow">{service.short.toUpperCase()}</span>
                <h2>{service.title}</h2>
                <p className="lead">{service.introduction}</p>
                <p>{service.summary}</p>
                <div className="service-detail-outcome">
                  <ArrowRight size={20} />
                  <span>{service.outcome}</span>
                </div>
              </div>
              <div className="service-detail-visual" data-reveal>
                <div className="service-visual-frame">
                  <Image
                    src={publicAsset([
                        "/images/facility-hall.jpg",
                        "/images/mechanical-systems.jpg",
                        "/images/planning-desk.jpg",
                        "/images/structure.jpg",
                      ][i])}
                    alt={`Illustrative photograph for ${service.short.toLowerCase()} support`}
                    fill
                    sizes="(max-width: 800px) 100vw, 30vw"
                  />
                </div>
                <span className="eyebrow visual-caption">
                  SUPPORT AREA / {service.number}
                </span>
              </div>
              <div className="service-detail-bottom">
                <span>ACTIVITIES MAY INCLUDE</span>
                <div>
                  {service.details.map((detail) => (
                    <span key={detail}>{detail}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
      <section className="additional-support">
        <div className="shell">
          <span className="eyebrow">ADDITIONAL SUPPORT</span>
          <p>
            Staffing coordination and bookkeeping assistance are available when
            included in the agreed service scope.
          </p>
        </div>
      </section>
      <PartnerOrbit />
      <ClosingCta
        label="03 / NEXT STEP"
        title="Where does your team need support?"
        body="Tell us about the pursuit or contract activity you need help managing."
        button="Discuss Your Goals"
      />
    </>
  );
}
