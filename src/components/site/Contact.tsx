
import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { LinkButtons } from "./LinkButtons";
import { SectionHeading } from "./SectionHeading";
import { contactSchema } from "@/lib/contact";

type Field = "name" | "email" | "subject" | "message";

const EMAILJS_SERVICE_ID = "service_8en1fls";
const EMAILJS_TEMPLATE_ID = "template_dlcsuf9";
const EMAILJS_PUBLIC_KEY = "bb1EVznHp5TlvgGkE";

const fieldClass =
  "peer w-full border-0 border-b border-input bg-transparent px-0 pb-2.5 pt-6 font-ui text-lg text-foreground placeholder-transparent outline-none transition-colors focus:border-primary focus-visible:outline-none";

const labelClass =
  "ui-label pointer-events-none absolute left-0 top-0 text-muted-foreground transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-[0.72rem] peer-focus:uppercase peer-focus:tracking-[0.14em]";

export function Contact() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const update =
    (f: Field) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [f]: e.target.value }));

      if (errors[f]) {
        setErrors((er) => ({ ...er, [f]: undefined }));
      }
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

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_name: "Mohammad",
          from_name: parsed.data.name,
          from_email: parsed.data.email,
          subject: parsed.data.subject || "No subject provided",
          message: parsed.data.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("sent");

      setValues({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      toast.success("Message received — thank you for reaching out.");
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("idle");

      toast.error(
        "Your message couldn't be sent. Please try again in a moment."
      );
    }
  }

  const input = (
    f: Exclude<Field, "message">,
    label: string,
    type = "text",
    autoComplete?: string
  ) => (
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
        <p
          id={`contact-${f}-error`}
          className="mt-2 text-sm text-destructive"
        >
          ↳ {errors[f]}
        </p>
      )}
    </div>
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-border bg-secondary px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <SectionHeading
            index="03"
            label="Contact"
            title="Get in touch"
            id="contact-title"
            intro="Happy to answer questions about my work or application. Email is the quickest way to reach me."
          />

          <a
            href="mailto:a.raqeeb2468@gmail.com"
            data-reveal
            className="mt-8 inline-block font-ui text-lg text-primary underline-offset-4 hover:underline"
          >
            a.raqeeb2468@gmail.com
          </a>

          <div data-reveal>
            <LinkButtons className="mt-6" />
          </div>
        </div>

        <form
          data-reveal
          onSubmit={onSubmit}
          noValidate
          className="space-y-6 rounded-md border border-border bg-card p-6 md:col-span-7 md:p-8"
          aria-label="Contact form"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {input("name", "Your name", "text", "name")}
            {input("email", "Email address", "email", "email")}
          </div>

          {input("subject", "Subject (optional)")}

          <div className="relative">
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder="Your message"
              value={values.message}
              onChange={update("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
              className={`${fieldClass} resize-none`}
            />

            <label htmlFor="contact-message" className={labelClass}>
              Your message
            </label>

            {errors.message && (
              <p
                id="contact-message-error"
                className="mt-2 text-sm text-destructive"
              >
                ↳ {errors.message}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-ui text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}

              {status === "sending" ? "Sending" : "Send message"}

              <ArrowUpRight className="h-4 w-4" />
            </button>

            {status === "sent" && (
              <p role="status" className="text-sm text-muted-foreground">
                ✓ Received. I'll get back to you soon.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
