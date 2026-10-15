import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

// Best-effort protection per server instance. Add a shared rate limit store before heavy public traffic.
const attempts = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function limit(ip: string) {
  const now = Date.now();
  if (attempts.size > 1000)
    for (const [key, value] of attempts)
      if (value.reset <= now) attempts.delete(key);
  const current = attempts.get(ip);
  if (!current || current.reset <= now) {
    attempts.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin)
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 },
    );
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limit(ip))
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  if (Number(request.headers.get("content-length") || 0) > 12000)
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 413 },
    );

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success)
    return NextResponse.json(
      {
        error: "Please review the highlighted fields.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  if (parsed.data.website)
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const key = process.env.RESEND_API_KEY;
  if (!to || !from || !key)
    return NextResponse.json(
      {
        error:
          "Online inquiries are not configured yet. Please try again once the site owner has enabled email delivery.",
      },
      { status: 503 },
    );

  const data = parsed.data;
  const text = [
    "New 4H Federal website inquiry",
    "",
    `Name: ${data.fullName}`,
    `Company: ${data.companyName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Stage: ${data.stage}`,
    `Interests: ${data.interests.join(", ")}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `4H Federal inquiry — ${data.companyName}`,
        text,
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Contact email delivery failed", response.status);
      return NextResponse.json(
        {
          error:
            "Your message could not be delivered right now. Please try again later.",
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email delivery error", error);
    return NextResponse.json(
      {
        error:
          "Your message could not be delivered right now. Please try again later.",
      },
      { status: 502 },
    );
  }
}
