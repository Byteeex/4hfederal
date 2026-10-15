import { z } from "zod";
import { services } from "@/content/services";
import { stages } from "@/content/site";

export const interestOptions = [
  ...services.map((service) => service.title),
  "Multiple Areas of Support",
  "Other",
];

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(120),
  companyName: z.string().trim().min(2, "Enter your company name.").max(160),
  email: z.email("Enter a valid business email.").max(254),
  phone: z.string().trim().max(40).optional().default(""),
  stage: z.enum(stages, { error: "Select your current contracting stage." }),
  interests: z
    .array(z.string())
    .min(1, "Select at least one area of interest.")
    .max(6)
    .refine(
      (values) => values.every((value) => interestOptions.includes(value)),
      "Select a listed service area.",
    ),
  message: z
    .string()
    .trim()
    .min(15, "Tell us a little more about your goals.")
    .max(3000),
  website: z.string().max(0).optional().default(""),
});
