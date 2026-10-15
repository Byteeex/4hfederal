import Image from "next/image";

export function PageHero({
  index,
  label,
  title,
  description,
  variant = "image",
  image,
  imageAlt,
}: {
  index: string;
  label: string;
  title: string;
  description: string;
  variant?: "image" | "light" | "compact";
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className={`page-hero page-hero--${variant}`}>
      <div className="shell page-hero-inner">
        <div className="page-hero-main">
          <span className="eyebrow eyebrow--gold">
            <span className="label-rule" /> {index} / {label}
          </span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {image && (
          <div className="page-hero-image">
            <Image
              src={image}
              alt={imageAlt || "Illustrative photography"}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 44vw"
            />
            <span>ILLUSTRATIVE PHOTOGRAPHY / NOT A 4H PROJECT</span>
          </div>
        )}
      </div>
    </section>
  );
}
