"use client";

import { FormEvent, useRef, useState } from "react";
import { Container, LinkButton as Button, MarketingCard as Card, MarketingBadge as Badge } from "@parishbooks-ui/site-ui";
import { Reveal } from "../_components/Reveal";

type Field = "name" | "organization" | "email" | "country" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.organization.trim()) errors.organization = "Enter your church or organization name.";
  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.message.trim()) errors.message = "Tell us a bit about what you need.";
  return errors;
}

const labelClass = "block text-sm font-medium";
const inputClass =
  "mt-2 w-full min-h-11 rounded-lg border px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2";

export function GetStarted() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    organization: "",
    email: "",
    country: "US",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const fieldStyle = {
    borderColor: "var(--color-border)",
    background: "var(--color-card)",
    color: "var(--color-card-foreground)",
    outlineColor: "var(--color-ring)",
  };

  function update(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field: Field) {
    const fieldErrors = validate(values);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      summaryRef.current?.focus();
      return;
    }
    setSubmitted(true);
  }

  const errorEntries = Object.entries(errors).filter(([, message]) => message);

  return (
    <section
      id="get-started"
      className="scroll-mt-24 py-16 sm:py-24"
      style={{ background: "var(--color-inverse-background)" }}
    >
      <Container className="max-w-xl">
        <Reveal>
          <div className="flex justify-center">
            <Badge>Early access</Badge>
          </div>
          <h2
            className="mt-4 text-center text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ color: "var(--color-inverse-foreground)" }}
          >
            Get started with ParishBooks
          </h2>
          <p className="mt-4 text-center text-base" style={{ color: "var(--color-inverse-muted)" }}>
            Self-serve signup is coming soon. Tell us about your parish and we&apos;ll reach out
            directly.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {submitted ? (
            <Card className="p-8 text-center" role="status">
              <h3 className="text-xl font-semibold" style={{ color: "var(--color-foreground)" }}>
                Thanks — we&apos;ll be in touch
              </h3>
              <p className="mt-2 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                Someone from our team will reach out within 1-2 business days.
              </p>
            </Card>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
              {errorEntries.length > 0 && (
                <div
                  ref={summaryRef}
                  tabIndex={-1}
                  role="alert"
                  className="rounded-lg border p-4"
                  style={{ borderColor: "var(--color-destructive)" }}
                >
                  <p className="text-sm font-semibold" style={{ color: "var(--color-destructive)" }}>
                    Please fix the following:
                  </p>
                  <ul className="mt-2 flex flex-col gap-1">
                    {errorEntries.map(([field, message]) => (
                      <li key={field}>
                        <a
                          href={`#field-${field}`}
                          className="text-sm underline"
                          style={{ color: "var(--color-destructive)" }}
                        >
                          {message}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="field-name" className={labelClass} style={{ color: "var(--color-inverse-foreground)" }}>
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="field-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "field-name-error" : undefined}
                    className={inputClass}
                    style={fieldStyle}
                  />
                  {errors.name && (
                    <p id="field-name-error" className="mt-1 text-sm" style={{ color: "var(--color-destructive)" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="field-organization"
                    className={labelClass}
                    style={{ color: "var(--color-inverse-foreground)" }}
                  >
                    Church / organization <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="field-organization"
                    name="organization"
                    type="text"
                    autoComplete="organization"
                    value={values.organization}
                    onChange={(e) => update("organization", e.target.value)}
                    onBlur={() => handleBlur("organization")}
                    aria-invalid={Boolean(errors.organization)}
                    aria-describedby={errors.organization ? "field-organization-error" : undefined}
                    className={inputClass}
                    style={fieldStyle}
                  />
                  {errors.organization && (
                    <p
                      id="field-organization-error"
                      className="mt-1 text-sm"
                      style={{ color: "var(--color-destructive)" }}
                    >
                      {errors.organization}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="field-email" className={labelClass} style={{ color: "var(--color-inverse-foreground)" }}>
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="field-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "field-email-error" : undefined}
                    className={inputClass}
                    style={fieldStyle}
                  />
                  {errors.email && (
                    <p id="field-email-error" className="mt-1 text-sm" style={{ color: "var(--color-destructive)" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="field-country" className={labelClass} style={{ color: "var(--color-inverse-foreground)" }}>
                    Country
                  </label>
                  <select
                    id="field-country"
                    name="country"
                    value={values.country}
                    onChange={(e) => update("country", e.target.value)}
                    className={inputClass}
                    style={fieldStyle}
                  >
                    <option value="US">United States</option>
                    <option value="IN">India</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="field-message" className={labelClass} style={{ color: "var(--color-inverse-foreground)" }}>
                  Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="field-message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "field-message-error" : undefined}
                  className={inputClass}
                  style={fieldStyle}
                />
                {errors.message && (
                  <p id="field-message-error" className="mt-1 text-sm" style={{ color: "var(--color-destructive)" }}>
                    {errors.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="self-start">
                Request early access
              </Button>
            </form>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
