import Image from "next/image";
import Link from "next/link";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "brand--light" : ""}`}
      aria-label="4H Federal, home"
    >
      <Image
        className="brand-mark"
        src="/brand/4h-logo.png"
        alt=""
        width={50}
        height={50}
        priority
      />
      <span className="brand-name">
        <strong>4H Federal</strong>
        <span>Government Contracting Engine</span>
      </span>
    </Link>
  );
}
