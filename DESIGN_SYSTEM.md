# 4H Federal design system

## Direction

A corporate editorial system derived from the approved square 4H mark. Forest green provides structure and authority; red is reserved for actions, section indices, and small directional details. Imagery is illustrative and never used to imply an unverified 4H project.

## Tokens

| Role             | Value     | Use                                       |
| ---------------- | --------- | ----------------------------------------- |
| Deep forest      | `#003D2A` | Heroes, footer, and contrast sections     |
| Brand green      | `#016133` | Brand structure, links, and active states |
| Forest surface   | `#0C5138` | Dark interaction state                    |
| Brand red        | `#DB0F1A` | Primary actions and small accents         |
| Paper            | `#F8F8F4` | Main light background                     |
| Warm neutral     | `#EEF1EC` | Alternating sections                      |
| Charcoal         | `#17201B` | Primary text                              |
| Muted green-gray | `#4F6259` | Secondary text on light backgrounds       |
| White            | `#FFFFFF` | Contrast and content surfaces             |

These values and border colors are centralized in `src/app/globals.css`. Red is deliberately limited to actions and short accents. Most surfaces remain white or neutral, with forest green used for the primary structural areas.

## Typography

- **Manrope:** headings, navigation, and buttons. Weights 500–800. Large headings use tight letter spacing and approximately `1.07–1.13` line height.
- **DM Sans:** paragraphs and form text. Body copy stays near 14–16px with generous line height.
- **IBM Plex Mono:** section labels, numbers, and technical notes. Uppercase is limited to short labels.
- Fluid scales use `clamp()` across viewport widths. Headings reflow naturally on mobile.
- Fonts load through `next/font`.

## Layout and spacing

- Container: `min(100% - 104px, 1440px)` on desktop, with reduced side clearance at narrower breakpoints.
- Section rhythm: `--section: clamp(88px, 9vw, 132px)`, reduced at tablet and mobile breakpoints.
- Structure: editorial two-column compositions, numbered rows, and thin dividers.
- Corners remain square. Large shadows and decorative gradients are avoided.

## Components

- **Primary button:** brand-red fill and white text, 57px minimum height, and restrained arrow movement on hover.
- **Secondary button:** light outline over dark hero backgrounds.
- **Dark button:** deep-forest fill for light sections.
- **Text link:** underlined action with a directional arrow.
- **Navigation:** transparent over dark heroes; solid paper on scroll and over the light About and privacy pages. Mobile navigation locks background scrolling, traps focus, and closes with Escape.
- **Service rows:** numbered links with summary and arrow. On mobile, the summary sits beneath the title.
- **Form fields:** 48px minimum height, visible focus ring, inline errors, and clear loading and delivery states.

## Motion

- Timing is usually `0.3–0.9s` with the shared `--ease` curve.
- Hero content reveals in a short sequence. Scroll content shifts lightly into place while remaining readable before animation.
- Image scaling and directional-arrow movement remain subtle.
- `prefers-reduced-motion` removes decorative motion and smooth scrolling.

## Imagery

Use licensed, high-resolution photos of facilities and technical environments with a consistent desaturated treatment and deliberate cropping. Real case-study photography must be approved and identified by actual role before publishing. `next/image` supplies responsive sizing and lazy loading below the hero.
