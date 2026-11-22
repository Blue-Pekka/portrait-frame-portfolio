import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { navItems } from "@/content/portfolio";
import { scrollToSection } from "@/lib/motion";

type NavProps = { variant?: "home" | "page" };

export function Nav({ variant = "home" }: NavProps) {
  const [open, setOpen] = useState(false);

  const go = (id: string) => (e: React.MouseEvent) => {
    setOpen(false);
    if (variant !== "home") return;
    e.preventDefault();
    scrollToSection(id);
    history.replaceState(null, "", id === "home" ? "/" : `#${id}`);
  };

  const renderLink = (id: string, label: string, className: string) =>
    variant === "home" ? (
      <a key={id} href={id === "home" ? "/" : `#${id}`} onClick={go(id)} className={className}>
        {label}
      </a>
    ) : (
      <Link key={id} to="/" {...(id === "home" ? {} : { hash: id })} onClick={() => setOpen(false)} className={className}>
        {label}
      </Link>
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 md:px-8 border-b border-border bg-background/90 backdrop-blur-md">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between py-3.5">
        {renderLink("home", "M. A. Raqeeb", "display text-2xl")}

        <ul className="hidden items-center gap-7 md:flex">
          {navItems.slice(1).map((item) => (
            <li key={item.id}>{renderLink(item.id, item.label, "font-ui text-sm text-muted-foreground transition-colors hover:text-foreground")}</li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="-mx-5 border-t border-border bg-background px-5 py-3 md:hidden">
          {navItems.map((item) => (
            <li key={item.id}>{renderLink(item.id, item.label, "block py-2.5 font-ui text-base")}</li>
          ))}
        </ul>
      )}
    </header>
  );
}
