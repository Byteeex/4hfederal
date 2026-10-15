import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Contact",
  "Tell 4H Federal about your business, contracting goals, and where you may need coordinated support.",
  "/contact",
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="04"
        label="CONTACT"
        title="Tell us what your team needs."
        description="Share your business, current contracting stage, and the activities where you need support."
        variant="compact"
      />
      <section className="section contact-section">
        <div className="shell contact-grid">
          <div className="contact-aside" data-reveal>
            <span className="eyebrow">START HERE</span>
            <h2>Give us the context for the work.</h2>
            <p>
              We will use the details you provide to understand the opportunity,
              your current capacity, and whether 4H can support the work.
            </p>
            <div className="contact-steps">
              <div>
                <span>01</span>
                <strong>Introduce your business</strong>
                <p>Tell us what you do and where you want to compete.</p>
              </div>
              <div>
                <span>02</span>
                <strong>Describe your needs</strong>
                <p>
                  Point to the parts of the contracting lifecycle that need
                  attention.
                </p>
              </div>
              <div>
                <span>03</span>
                <strong>Discuss fit</strong>
                <p>Explore possible scope, responsibilities, and next steps.</p>
              </div>
            </div>
            <div className="contact-aside-bottom">
              Your business / Your direction <ArrowUpRight size={16} />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
