# Design System

## Overview

Fran Ruiz Arquitectos is presented as a precise, sunlit architectural practice rooted in the Costa del Sol. The physical reference is a gallery-like coastal villa at midday: pure white planes, deep shadow, warm metal details, stone, olive foliage, and uninterrupted blue sky. The interface is image-led and spacious, with purposeful motion inspired by sliding architectural planes.

## Color

Strategy: restrained. Pure white is the primary field; near-black ink provides definition; solar gold appears sparingly as a navigational and interaction signal; deep olive supports secondary contrast.

```css
--color-bg: oklch(1 0 0);
--color-surface: oklch(0.965 0.006 80);
--color-ink: oklch(0.17 0.012 80);
--color-muted: oklch(0.43 0.016 80);
--color-line: oklch(0.87 0.008 80);
--color-primary: oklch(0.74 0.14 80);
--color-primary-deep: oklch(0.50 0.12 80);
--color-accent: oklch(0.28 0.06 130);
--color-on-dark: oklch(0.98 0.004 80);
```

Solar gold is limited to roughly 8% of visible UI. Do not tint the page background beige. Use solid fields, never gradient text.

## Typography

- Display: Tenor Sans, regular. Architectural proportions, calm presence, no decorative italics.
- Body and UI: Manrope, weights 400–700.
- Display sizes use `clamp()` and never exceed 6rem.
- Headings balance line breaks; body copy is capped at 70ch.
- Labels may use uppercase only when shorter than four words.

## Layout

- 12-column desktop grid, 6-column tablet grid, 4-column mobile grid.
- Maximum content width: 1440px.
- Primary horizontal gutter: `clamp(1.25rem, 4vw, 5rem)`.
- Section spacing: `clamp(5rem, 11vw, 10rem)`.
- Image compositions alternate between full bleed, offset portrait, and paired landscape.
- Border radii remain between 0 and 12px. Photography is mostly square-edged to preserve architectural precision.

## Components

### Header

Fixed white navigation with the untouched original logo, compact bilingual switch, and an enquiry action. It gains a fine lower rule after scroll. Mobile navigation opens as a full-height white plane.

### Buttons and links

Primary actions use near-black fills with white text. Secondary actions are text links with animated horizontal rules. All controls have visible focus rings and 44px minimum targets.

### Project index

Large image-led entries with title, location, type, and year. Project details open in an accessible overlay inspired by an architectural presentation board.

### Services

A typographic index, not a repeated card grid. Each service reveals its description through spacing, rule movement, and text shift.

### Team

Editorial portrait strip with restrained captions. Portraits remain documentary and are never stylized by filters that alter identity.

### Contact

A high-contrast closing field with direct office details and a concise enquiry form. Submission feedback is announced with an ARIA live region.

## Motion

- Master easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Page load: white architectural planes translate away, then headline lines rise through a mask.
- Image reveal: clip-path opens vertically with a subtle scale from 1.035 to 1.
- Text reveal: 24px upward travel plus blur reduction, staggered 70–110ms inside a single group.
- Section layers: background plane, image, caption, and rule enter at different speeds to create depth.
- Hover: images scale no more than 1.025; rules extend; arrows translate 4px.
- Overlay: background dims, presentation plane slides from the right, content fades after the plane settles.
- No bounce or elastic easing.
- Under `prefers-reduced-motion: reduce`, transforms, clip paths, smooth scrolling, parallax, and stagger delays are removed; content remains visible by default.

## Responsive Behavior

- Hero moves from asymmetric split to stacked image and copy below 900px.
- Navigation changes to a menu button below 820px.
- Project pairs become a single vertical stream below 760px.
- Service descriptions are always visible on touch layouts.
- Forms move from two columns to one below 680px.
- Display type is tuned at 360px, 768px, 1024px, and wide desktop widths to prevent overflow.

## Content Guidelines

- Spanish is the default; English is always one action away.
- Preserve factual project and team information from the source.
- Prefer specific verbs and concrete outcomes over architecture buzzwords.
- Calls to action state the result: “Cuéntanos tu proyecto” and “Start your project”.
- No em dashes, all-caps paragraphs, or generic luxury claims.
