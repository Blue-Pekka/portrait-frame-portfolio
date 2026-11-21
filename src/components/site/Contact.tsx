import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { contactLinks } from "@/content/portfolio";
import { contactSchema } from "@/lib/contact";
import { supabase } from "@/integrations/supabase/client";

type Field = "name" | "email" | "subject" | "message";

const fieldClass =
  "peer w-full border-0 border-b-2 border-ink/40 bg-transparent px-0 pb-3 pt-6 font-ui text-xl text-ink placeholder-transparent outline-none transition-colors focus:border-ink focus-visible:outline-none md:text-2xl";
const labelClass =
  "ui-label pointer-events-none absolute left-0 top-0 text-ink/70 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-[0.72rem] peer-focus:uppercase peer-focus:tracking-[0.14em]";

export function Contact() {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const update = (f: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [f]: e.target.value }));
    if (errors[f]) setErrors((er) => ({ ...er, [f]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as Field;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    if (error) {
      setStatus("idle");
      toast.error("Your message couldn't be sent. Please try again in a moment.");
      return;
    }
    setStatus("sent");
    setValues({ name: "", email: "", subject: "", message: "" });
    toast.success("Message received — thank you for reaching out.");
  }

  const input = (f: Exclude<Field, "message">, label: string, type = "text", autoComplete?: string) => (
    <div className="relative">
      <input
        id={`contact-${f}`}
        name={f}
        type={type}
        placeholder={label}
        autoComplete={autoComplete}
        value={values[f]}
        onChange={update(f)}
        aria-invalid={Boolean(errors[f])}
        aria-describedby={errors[f] ? `contact-${f}-error` : undefined}
        className={fieldClass}
      />
      <label htmlFor={`contact-${f}`} className={labelClass}>
        {label}
      </label>
      {errors[f] && (
        <p id={`contact-${f}-error`} className="ui-label mt-2 text-ink">
          ↳ {errors[f]}
        </p>
      )}
    </div>
  );

  return (
    <section id="contact" aria-labelledby="contact-title" className="grain bg-hero relative overflow-hidden px-5 py-28 text-ink md:px-8 md:py-40">
      <SectionHeading
        index="06"
        label="Contact"
        id="contact-title"
        lines={[
          { text: "Let's build" },
          { text: "something", className: "md:pl-[12vw]" },
          { text: "meaningful.", className: "text-outline-ink" },
        ]}
      />

      <div className="mt-20 grid gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <p data-reveal className="font-ui text-xl leading-snug md:text-2xl">
            Interested in engineering, research or building something ambitious together? Let's connect.
          </p>
          <ul data-reveal className="mt-12 border-t-2 border-ink">
            {contactLinks.map((l) => (
              <li key={l.label} className="border-b border-ink/40">
                {l.href ? (
                  <a
                    href={l.href}
                    {...(l.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}
                    className="group flex min-w-0 items-center justify-between gap-4 py-4"
                  >
                    <span className="ui-label">{l.label}</span>
                    <span className="flex min-w-0 items-center gap-2 font-ui">
                      <span className="truncate">{l.display}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center justify-between py-4">
                    <span className="ui-label">{l.label}</span>
                    <span className="font-ui text-ink/55">{l.display}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <form data-reveal onSubmit={onSubmit} noValidate className="space-y-8 md:col-span-7 md:col-start-6" aria-label="Contact form">
          <div className="grid gap-8 md:grid-cols-2">
            {input("name", "Your name", "text", "name")}
            {input("email", "Email address", "email", "email")}
          </div>
          {input("subject", "Subject (optional)")}
          <div className="relative">
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Your message"
              value={values.message}
              onChange={update("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className={`${fieldClass} resize-none`}
            />
            <label htmlFor="contact-message" className={labelClass}>
              Your message
            </label>
            {errors.message && (
              <p id="contact-message-error" className="ui-label mt-2 text-ink">
                ↳ {errors.message}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="submit"
              disabled={status === "sending"}
              data-cursor="Send"
              className="display group inline-flex items-center gap-4 bg-ink px-8 py-5 text-3xl text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-60 md:text-4xl"
            >
              {status === "sending" ? <Loader2 className="h-7 w-7 animate-spin" /> : null}
              {status === "sending" ? "Sending" : "Send message"}
              <ArrowUpRight className="h-7 w-7 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>
            {status === "sent" && (
              <p role="status" className="ui-label">
                ✓ Received. I'll get back to you soon.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
