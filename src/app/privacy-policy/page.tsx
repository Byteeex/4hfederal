import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata(
    "Privacy Information",
    "How the 4H Morocco website handles introductory inquiry information. Draft for owner review.",
    "/privacy-policy",
  ),
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="privacy-page">
      <div className="shell privacy-layout">
        <div>
          <span className="eyebrow eyebrow--gold">WEBSITE INFORMATION</span>
          <h1>Privacy information.</h1>
          <p className="privacy-draft">
            Draft for owner and legal review before public launch.
          </p>
        </div>
        <div className="privacy-content">
          <p>
            This page describes how this website is currently built to handle an
            introductory inquiry. It is a review draft and should be approved
            against the final hosting and email configuration before launch.
          </p>
          <h2>Information you provide</h2>
          <p>
            The inquiry form asks for your name, company, business email,
            optional phone number, contracting stage, areas of interest, and
            message. Please do not submit sensitive documents or restricted
            information.
          </p>
          <h2>How an inquiry is handled</h2>
          <p>
            When email delivery is configured, the website sends your inquiry to
            the recipient designated by the site owner through an email delivery
            provider. The application does not intentionally save inquiries in
            its own database. The email provider and recipient mailbox may
            retain copies under their own settings and policies.
          </p>
          <h2>Technical information</h2>
          <p>
            The website uses basic request information temporarily for abuse
            prevention. The site owner&apos;s hosting service may process
            routine server logs. This implementation does not include analytics
            cookies or advertising trackers.
          </p>
          <h2>Questions and updates</h2>
          <p>
            The site owner must confirm the legal entity, contact details,
            retention practices, email provider, hosting, and any applicable
            rights or notices before approving this page. To ask about this
            draft, use the <Link href="/contact">contact form</Link> once
            inquiry delivery is enabled.
          </p>
        </div>
      </div>
    </section>
  );
}
