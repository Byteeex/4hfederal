"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { site } from "@/content/site";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const solid =
    scrolled || open || pathname === "/privacy-policy" || pathname === "/about";
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables =
      menuRef.current?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab" && focusables?.length) {
        const first = focusables[0],
          last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`site-header ${solid ? "site-header--solid" : ""}`}>
      <div className="header-inner shell">
        <Brand light={!solid} />
        <nav className="desktop-nav" aria-label="Main navigation">
          {site.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="header-cta">
          Discuss Your Goals <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${open ? "mobile-menu--open" : ""}`}
        inert={!open}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile navigation" className="shell">
          {site.navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>
              {item.label}
              <ArrowUpRight size={20} />
            </Link>
          ))}
          <Link
            className="mobile-menu-cta"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Discuss Your Contracting Goals <ArrowUpRight size={18} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
