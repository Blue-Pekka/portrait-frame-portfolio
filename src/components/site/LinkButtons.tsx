import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { contactLinks } from "@/content/portfolio";

const icons: Record<string, typeof Mail> = { Email: Mail, LinkedIn: Linkedin, GitHub: Github, "Research paper": FileText };

/** Row of outlined link buttons for email, LinkedIn, GitHub and the paper. */
export function LinkButtons({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {contactLinks.map((l) => {
        const Icon = icons[l.label] ?? ArrowUpRight;
        const external = !l.href.startsWith("mailto:");
        return (
          <li key={l.label}>
            <a
              href={l.href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-3.5 py-2 font-ui text-sm transition-colors hover:border-primary hover:text-primary"
            >
              <Icon className="h-4 w-4" aria-hidden />
              {l.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
