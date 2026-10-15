import { ButtonLink } from "@/components/button-link";

export function ClosingCta({
  label = "08 / START A CONVERSATION",
  title = "Tell us what your team needs.",
  body = "Share your business, the work in front of you, and where additional support would help.",
  button = "Discuss Your Goals",
}: {
  label?: string;
  title?: string;
  body?: string;
  button?: string;
}) {
  return (
    <section className="closing-cta">
      <div className="shell closing-grid" data-reveal>
        <div>
          <span className="eyebrow eyebrow--gold">{label}</span>
          <h2>{title}</h2>
        </div>
        <div>
          <p>{body}</p>
          <ButtonLink href="/contact">{button}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
