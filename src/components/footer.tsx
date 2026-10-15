import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-main">
        <div className="footer-intro">
          <Brand light />
          <p>Contracting support for SDVOSB businesses.</p>
          <span className="footer-values">
            Honesty / Hardwork / Honor / High Standards
          </span>
        </div>
        <div className="footer-column">
          <span className="eyebrow">Explore</span>
          {site.navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
              <ArrowUpRight size={13} />
            </Link>
          ))}
        </div>
        <div className="footer-column">
          <span className="eyebrow">Start a conversation</span>
          <p>Tell us about the work your team needs help managing.</p>
          <Link className="footer-contact" href="/contact">
            Discuss Your Goals <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} 4H Federal</span>
        <span>Government Contracting Engine</span>
        <Link href="/privacy-policy">Privacy information</Link>
      </div>
    </footer>
  );
}
