import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="shell">
        <span className="eyebrow eyebrow--gold">404 / Page not found</span>
        <h1>We could not find that page.</h1>
        <p>The page may have moved. Return to the 4H Morocco homepage.</p>
        <Link href="/" className="button button--gold">
          <span>Back to Home</span>
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
