# 4H Federal website

A five-page Next.js website for the 4H Federal Government Contracting Engine, with a working inquiry endpoint, privacy review draft, metadata, sitemap, and responsive design.

## Start locally

Requires Node.js 20.9 or newer.

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The public pages render without email credentials. The inquiry form returns a clear configuration error until delivery is set up.

## Enable inquiries

1. Verify the advisory service's legal entity and the inbox that should receive inquiries.
2. Verify a sending domain with [Resend](https://resend.com/docs/dashboard/domains/introduction).
3. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in `.env.local` or your hosting provider's server-side environment.
4. Submit a real test inquiry and confirm receipt before launch.

The API validates all fields on the server, checks the request origin, includes a honeypot, limits requests per server instance, and reports success only after Resend accepts the message. For sustained public traffic, add shared rate limiting at the edge or in a durable store; the included in-memory limit is best effort on serverless hosts. The application does not persist submissions in its own database. Avoid logging submitted personal data.

## Commands

```powershell
npm run dev
npm run typecheck
npm run lint
npm run build
npm run start
```

## Content and design

- Company, navigation, values, and outstanding confirmations: `src/content/site.ts`
- Service descriptions and approved case study model: `src/content/services.ts`
- Design tokens and layouts: `src/app/globals.css`, `extra.css`, `responsive.css`, `refinement.css`
- Design decisions and component rules: `DESIGN_SYSTEM.md`
- Images: `public/images/`. Active page imagery uses locally stored facility, technical, planning, and workplace photography; none depict 4H projects or imply agency endorsement.

The shared brand uses the approved red-and-green 4H logo artwork at `public/brand/4h-logo.png`. Derived browser icons and the social-sharing image are generated with `node scripts/generate-brand-assets.mjs`. Case studies remain unpublished until verified details are added with `approved: true`.

## Deployment

Deploy to a host that supports Next.js App Router route handlers, such as Vercel or a compatible Node hosting environment. Set `NEXT_PUBLIC_SITE_URL` to the final origin for canonical links, sitemap, and social metadata. Configure the three server-side email values above. Build with `npm run build` and start with `npm run start`, or use your host's standard Next.js deployment process.

The site is provided locally for review and has not replaced the live `4hfederal.com` website. Do not point the domain or publish the draft privacy page until the owner completes the approvals below.

## Owner approvals before launch

- Confirm the advisory-service legal entity and its relationship to the existing direct contracting business, Healing Hands Healing Hearts.
- Approve the logo, visual identity, and any formal brand guidelines.
- Confirm inquiry recipient, sending identity, phone, and address. The current live site's contact details are deliberately absent from this site until their relevance is confirmed.
- Approve all experience examples, images of actual work, results, customer names, and work products before adding them.
- Review the privacy draft against the final hosting, email retention, and business practices. Replace the review label when approved.
- Verify final domain, title snippets, and form delivery on production.

## Visual assets

The primary page visuals are locally stored photographs selected for their
facility, technical, planning, and professional context. They do not depict 4H
projects, agency endorsements, or government customers. Captions identify them
as illustrative wherever a project association could be inferred.
