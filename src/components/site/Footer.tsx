import { ArrowUp } from "lucide-react";
import { scrollToSection } from "@/lib/motion";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>Mohammad Abdul Raqeeb · Hyderabad, India · © 2026</p>
        <button
          type="button"
          onClick={() => (document.getElementById("home") ? scrollToSection("home") : window.scrollTo({ top: 0, behavior: "smooth" }))}
          className="inline-flex items-center gap-2 hover:text-primary"
        >
          Back to top <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
}
