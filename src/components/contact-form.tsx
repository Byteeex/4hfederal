"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { interestOptions } from "@/lib/contact-schema";
import { stages } from "@/content/site";

export function ContactForm() {
  const [interests, setInterests] = useState<string[]>([]);

  function toggleInterest(value: string) {
    setInterests((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  return (
    <form className="contact-form">
      <div className="form-heading">
        <span className="eyebrow">INTRODUCTORY INQUIRY</span>
        <h2>Tell us about your goals.</h2>
        <p>Fields marked * are required.</p>
      </div>
      <div role="status" className="form-error-banner">
        This inquiry form is not enabled on the static GitHub Pages version of
        this site. Please check back after the 4H Morocco inquiry inbox is
        published.
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="fullName">Full Name *</label>
          <input id="fullName" name="fullName" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="companyName">Company Name *</label>
          <input
            id="companyName"
            name="companyName"
            required
            autoComplete="organization"
          />
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
          />
        </div>
        <div className="field">
          <label htmlFor="phone">
            Phone Number <span>(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="stage">Current Contracting Stage *</label>
        <select id="stage" name="stage" required defaultValue="">
          <option value="" disabled>
            Select the closest fit
          </option>
          {stages.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
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
      </fieldset>
      <div className="field">
        <label htmlFor="message">Brief Message *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your business and the support you are looking for."
        />
      </div>
      <p className="form-privacy">
        We use these details to respond to your inquiry. Please do not include
        sensitive documents or restricted information. See our{" "}
        <Link href="/privacy-policy">privacy information</Link>.
      </p>
      <button type="button" className="button button--gold form-submit" disabled>
        <span>Inquiry form unavailable</span>
        <ArrowUpRight size={17} />
      </button>
    </form>
  );
}
