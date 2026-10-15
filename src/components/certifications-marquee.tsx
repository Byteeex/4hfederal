import Image from "next/image";
import { publicAsset } from "@/lib/public-asset";

const certifications = [
  { name: "SBA 8(a) Business Development", src: "/certifications/sba-8a.svg" },
  { name: "ISO 17100", src: "/certifications/iso-17100.svg" },
  {
    name: "Service-Disabled Veteran-Owned Small Business",
    src: "/certifications/sdvosb.svg",
  },
  { name: "Women-Owned Small Business", src: "/certifications/wosb.svg" },
  { name: "HUBZone", src: "/certifications/hubzone.svg" },
] as const;

function CertificationSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="certification-set" aria-hidden={hidden || undefined}>
      {certifications.map((certification) => (
        <div className="certification-card" key={certification.name}>
          <Image
            src={publicAsset(certification.src)}
            alt={hidden ? "" : certification.name}
            width={190}
            height={110}
          />
        </div>
      ))}
    </div>
  );
}

export function CertificationsMarquee() {
  return (
    <section
      className="certifications-section"
      aria-labelledby="certifications-heading"
    >
      <div className="shell certifications-heading">
        <span className="eyebrow eyebrow--gold">
          04 / PROGRAMS &amp; DESIGNATIONS
        </span>
        <h2 id="certifications-heading">
          Identifiers found across federal contracting.
        </h2>
        <p>
          Set aside programs and professional designations shape how businesses
          enter and compete in the federal market.
        </p>
      </div>
      <div
        className="certification-marquee"
        aria-label="Federal contracting programs and designations"
      >
        <div className="certification-track">
          <CertificationSet />
          <CertificationSet hidden />
        </div>
      </div>
      <p className="shell certification-note">
        Market context only. Display does not state that 4H holds every
        designation shown.
      </p>
    </section>
  );
}
