import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "gold",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "gold" | "outline" | "dark" | "text";
  className?: string;
}) {
  return (
    <Link href={href} className={`button button--${variant} ${className}`}>
      <span>{children}</span>
      <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
    </Link>
  );
}
