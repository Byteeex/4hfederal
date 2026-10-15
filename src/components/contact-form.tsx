"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { interestOptions } from "@/lib/contact-schema";
import { stages } from "@/content/site";

type FieldErrors = Record<string, string[] | undefined>;

export function ContactForm() {
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<FieldErrors>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = {
      fullName: values.get("fullName"),
      companyName: values.get("companyName"),
      email: values.get("email"),
      phone: values.get("phone"),
      stage: values.get("stage"),
      interests,
      message: values.get("message"),
      website: values.get("website"),
    };
    setFields({});
    setError("");
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        setFields(result.fields || {});
        setError(
          result.error || "Your message could not be sent. Please try again.",
        );
        setStatus("idle");
        return;
      }
      setStatus("sent");
      form.reset();
      setInterests([]);
    } catch {
      setError(
        "We could not connect to the inquiry service. Please try again later.",
      );
      setStatus("idle");
    }
  }

  function toggleInterest(value: string) {
    setInterests((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  if (status === "sent")
    return (
      <div className="form-success" role="status">
        <span>
          <Check size={28} />
        </span>
        <h2>Thank you for reaching out.</h2>
        <p>
          Your inquiry was sent successfully. The 4H Federal team can now review
          the details you provided.
        </p>
        <button
          type="button"
          className="text-link"
          onClick={() => setStatus("idle")}
        >
          Send another message <ArrowUpRight size={17} />
        </button>
      </div>
    );

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-heading">
        <span className="eyebrow">INTRODUCTORY INQUIRY</span>
        <h2>Tell us about your goals.</h2>
        <p>Fields marked * are required.</p>
      </div>
      {error && (
        <div role="alert" className="form-error-banner">
          {error}
        </div>
      )}
      <div className="form-row">
        <div className="field">
          <label htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            name="fullName"
            required
            autoComplete="name"
            aria-invalid={!!fields.fullName}
            aria-describedby={fields.fullName ? "fullName-error" : undefined}
          />
          <FieldError id="fullName-error" errors={fields.fullName} />
        </div>
        <div className="field">
          <label htmlFor="companyName">Company Name *</label>
          <input
            id="companyName"
            name="companyName"
            required
            autoComplete="organization"
            aria-invalid={!!fields.companyName}
            aria-describedby={
              fields.companyName ? "companyName-error" : undefined
            }
          />
          <FieldError id="companyName-error" errors={fields.companyName} />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="email">Business Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={!!fields.email}
            aria-describedby={fields.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" errors={fields.email} />
        </div>
        <div className="field">
          <label htmlFor="phone">
            Phone Number <span>(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!fields.phone}
            aria-describedby={fields.phone ? "phone-error" : undefined}
          />
          <FieldError id="phone-error" errors={fields.phone} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="stage">Current Contracting Stage *</label>
        <select
          id="stage"
          name="stage"
          required
          defaultValue=""
          aria-invalid={!!fields.stage}
          aria-describedby={fields.stage ? "stage-error" : undefined}
        >
          <option value="" disabled>
            Select the closest fit
          </option>
          {stages.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
        <FieldError id="stage-error" errors={fields.stage} />
      </div>
      <fieldset className="interest-field">
        <legend>Services or Markets of Interest *</legend>
        <p>Select all that apply.</p>
        <div className="interest-options">
          {interestOptions.map((option) => (
            <label
              key={option}
              className={interests.includes(option) ? "checked" : ""}
            >
              <input
                type="checkbox"
                checked={interests.includes(option)}
                onChange={() => toggleInterest(option)}
                value={option}
              />
              <span className="checkbox-art" aria-hidden="true">
                <Check size={13} />
              </span>
              {option}
            </label>
          ))}
        </div>
        <FieldError id="interests-error" errors={fields.interests} />
      </fieldset>
      <div className="field">
        <label htmlFor="message">Brief Message *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your business and the support you are looking for."
          aria-invalid={!!fields.message}
          aria-describedby={fields.message ? "message-error" : undefined}
        />
        <FieldError id="message-error" errors={fields.message} />
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <p className="form-privacy">
        We use these details to respond to your inquiry. Please do not include
        sensitive documents or restricted information. See our{" "}
        <a href="/privacy-policy">privacy information</a>.
      </p>
      <button
        type="submit"
        className="button button--gold form-submit"
        disabled={status === "sending"}
      >
        <span>
          {status === "sending"
            ? "Sending your inquiry…"
            : "Request an Introductory Call"}
        </span>
        <ArrowUpRight size={17} />
      </button>
    </form>
  );
}

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return errors?.length ? (
    <p className="field-error" id={id} role="alert">
      {errors[0]}
    </p>
  ) : null;
}
