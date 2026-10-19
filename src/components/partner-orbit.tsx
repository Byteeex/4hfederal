import Image from "next/image";
import { publicAsset } from "@/lib/public-asset";

const agencies = [
  { label: "Department of the Interior", src: "/agency-seals/interior.svg" },
  { label: "Department of Homeland Security", src: "/agency-seals/dhs.svg" },
  { label: "Department of Veterans Affairs", src: "/agency-seals/va.svg" },
  { label: "Department of Energy", src: "/agency-seals/energy.svg" },
  {
    label: "Department of Transportation",
    src: "/agency-seals/transportation.svg",
  },
  { label: "Environmental Protection Agency", src: "/agency-seals/epa.svg" },
] as const;

export function PartnerOrbit() {
  return (
    <section className="partner-orbit-section">
      <div className="shell partner-orbit-layout">
        <div className="partner-orbit-copy">
          <span className="eyebrow eyebrow--gold">
            02 / FEDERAL MARKET CONTEXT
          </span>
          <h2>Agency missions shape the requirement.</h2>
          <p>
            Federal opportunities span departments with different missions,
            acquisition offices, and technical needs. Each pursuit should be
            evaluated against its actual solicitation and scope.
          </p>
          <span className="partner-orbit-note">
            REFERENCE SET / NO CLIENT OR AGENCY RELATIONSHIP IMPLIED
          </span>
        </div>
        <div
          className="partner-orbit"
          aria-label="Examples of United States federal agencies"
        >
          <div className="partner-orbit-ring partner-orbit-ring--outer" />
          <div className="partner-orbit-ring partner-orbit-ring--inner" />
          <div className="partner-orbit-center">
            <Image
              src={publicAsset("/brand/4h-logo.png")}
              alt="4H Morocco"
              width={96}
              height={96}
            />
          </div>
          <div className="partner-orbit-track">
            {agencies.map(({ label, src }, index) => (
              <div
                className="partner-orbit-node"
                key={label}
                style={{ "--orbit-index": index } as React.CSSProperties}
              >
                <span className="partner-orbit-seal">
                  <Image src={publicAsset(src)} alt="" width={66} height={66} />
                </span>
                <span className="sr-only">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
