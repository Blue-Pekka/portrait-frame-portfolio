import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { navItems } from "@/content/portfolio";
import { scrollToSection } from "@/lib/motion";

type NavProps = { variant?: "home" | "page" };

export function Nav({ variant = "home" }: NavProps) {
  const [solid, setSolid] = useState(variant === "page");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (variant === "page") return;
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    if (variant !== "home") return;
    e.preventDefault();
    setOpen(false);
    scrollToSection(id);
    history.replaceState(null, "", id === "home" ? "/" : `#${id}`);
  };

  const tone = solid || open ? "text-paper" : "text-ink";

  const renderLink = (id: string, label: string, className: string) =>
    variant === "home" ? (
      <a key={id} href={`#${id}`} onClick={go(id)} className={className}>
        {label}
      </a>
    ) : (
      <Link key={id} to="/" {...(id === "home" ? {} : { hash: id })} onClick={() => setOpen(false)} className={className}>
        {label}
      </Link>
    );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid && !open ? "bg-ink/85 backdrop-blur-md" : "bg-transparent"} ${tone}`}
    >
      <nav aria-label="Primary" className="flex items-center justify-between px-5 py-4 md:px-8">
        {renderLink("home", "M.A.R.", "display text-2xl tracking-wide")}

        <ul className="hidden items-center gap-7 md:flex">
          {navItems.slice(1).map((item, i) => (
            <li key={item.id}>
              {renderLink(
                item.id,
                item.label,
                "ui-label group relative inline-flex gap-1.5 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100",
              )}
              <span className="sr-only">section {i + 2}</span>
            </li>
          ))}
        </ul>

        <span className="ui-label hidden lg:inline">[ 2026 ]</span>

        <button
          type="button"
          className="ui-label md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "[ Close ]" : "[ Menu ]"}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-0 -z-10 flex flex-col justify-end bg-ink px-5 pb-10 pt-24 text-paper transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"}`}
      >
        <ul className="space-y-1">
          {navItems.map((item, i) => (
            <li key={item.id} className="flex items-baseline gap-3">
              <span className="ui-label text-vermilion">0{i + 1}</span>
              {renderLink(item.id, item.label, "display text-[15vw] leading-[0.95] hover:text-vermilion")}
            </li>
          ))}
        </ul>
        <p className="ui-label mt-8 text-muted-foreground">Hyderabad, India — Exploring what's next.</p>
      </div>
    </header>
  );
}
