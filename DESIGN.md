# Design System

## Overview

Fran Ruiz Arquitectos is presented as a precise, sunlit architectural practice rooted in the Costa del Sol. The physical reference is a gallery-like coastal villa at midday: pure white planes, deep shadow, warm metal details, stone, olive foliage, and uninterrupted blue sky. The interface is image-led and spacious, with purposeful motion inspired by sliding architectural planes.

## Color

Strategy: strictly monochrome. Pure white is the primary field and neutral gray 900 provides all definition. Hierarchy is created through scale, spacing, photography, and opacity rather than additional hues.

```css
--color-bg: oklch(1 0 0);
--color-surface: oklch(1 0 0);
--color-ink: oklch(0.205 0 0);
--color-muted: oklch(0.205 0 0 / 0.62);
--color-line: oklch(0.205 0 0 / 0.16);
--color-on-dark: oklch(1 0 0);
```

Do not introduce beige, green, gold, or cool gray. Secondary values must be derived from neutral gray 900 with opacity. Use solid fields and never gradient text.

## Typography

- Display: Tenor Sans, regular. Architectural proportions, calm presence, no decorative italics.
- Body and UI: Manrope, weights 400–700.
- Display sizes use `clamp()` and never exceed 6rem.
- Headings balance line breaks; body copy is capped at 70ch.
- Labels may use uppercase only when shorter than four words.

## Layout

- 12-column desktop grid, 6-column tablet grid, 4-column mobile grid.
- Shared section shell: all page content expands fluidly to a maximum width of 1920px (`120rem`). Standard desktop screens remain full width, while 2K and larger displays gain centered breathing room.
- Global header and navigation content, plus bounded horizontal carousels, use this same shared shell; carousel scrolling occurs within the shell.
- Primary horizontal gutter: `clamp(1.25rem, 4vw, 5rem)`.
- Section spacing: `clamp(5rem, 11vw, 10rem)`.
- Inset hero images span the viewport at every screen size, preserving the one-rem outer margin. Hero copy and controls align to the centered 1920px content grid rather than stretching with the photograph. Section backgrounds and surface planes may remain full bleed, but all non-hero content must return to the same shell.
- Every route opens with the same homepage-style hero frame: a 1rem inset, rounded canvas with a minimum height of `calc(100svh - 2rem)`. On compact screens, content may extend the frame beyond one viewport rather than being clipped.
- Within that constraint, image compositions alternate between offset portrait, paired landscape, and broad editorial formats.
- Above 1800px, major gallery media uses composition-specific aspect ratios instead of legacy fixed-height ceilings, allowing imagery to scale with the wider canvas without becoming shallow strips.
- Images remain unframed and sit directly on the page without grey backing surfaces; corner radii define the crop without adding a card-like container.
- Large surfaces use a fluid outer radius of 28–48px. Nested media uses the parent radius minus the physical inset, so concentric corners remain mathematically aligned.
- Controls and calls to action use a fully pill-shaped `999px` radius. Smaller utility surfaces use 11–16px radii.
- Hero and closing sections may round only the edge that meets the next page layer, preserving full-bleed impact while making the transition tactile.

### Estudio route composition

The Estudio route is a paced architectural story within the same image-led visual world as the home and project pages. Preserve this sequence and its changes of scale rather than flattening the page into interchangeable content bands:

- Open with a dark, full-frame architectural photograph beneath oversized white copy, restrained supporting text, and a single outlined action. A spacious typographic data rail presents founding year, project count, and studio locations as distinct facts, followed by one quiet architectural caption. The image supplies the atmosphere; do not split the hero into separate copy and media panels.
- Open the lower page with a broad editorial project panorama and a compact caption group that keeps the architectural proposition and quiet project metadata visibly connected.
- Follow with a white editorial origin plane that composes an oversized statement, real architectural photography, lead copy, and a concise timeline as one narrative unit.
- Present the method as a desktop split between a sticky drawing image and oversized, sequentially numbered steps. The image returns to normal document flow on mobile.
- Present the multidisciplinary structure on the same calm white field as a sticky, image-led introduction beside a spacious typographic index; it is not a card grid.
- Compose the Estudio team statement with one documentary portrait of Fran Ruiz, placed asymmetrically opposite the copy; supporting team portraits belong on the dedicated Equipo page.
- End with a dedicated dark contact close containing direct details and a clear route to the standalone Contacto surface.

At tablet width these compositions contract from the 12-column grid to six columns. Below 760px they become a deliberate single-column reading order, sticky media is released, and indexed rows stack without losing their typographic hierarchy.

## Components

### Header

Fixed white navigation with the untouched original logo, compact bilingual switch, and an enquiry action. Scrolled state is communicated through contrast rather than a dividing line. Mobile navigation opens as a full-height white plane.

### Buttons and links

Primary and secondary actions use pill geometry, clear contrast, and concise labels. Subtle fills or translucent white may distinguish CTAs without adding color. All controls have visible focus rings and 44px minimum targets.

Directional CTAs use the single authored SVG arrow component; do not substitute text glyphs, font icons, or separately drawn arrow variants. On dark surfaces, `:focus-visible` rings use the light on-dark value so the keyboard state remains unmistakable.

### Nested radius rule

- Outer surface radius: `--radius-xl`.
- Physical inset between surfaces: `--radius-inset`.
- Inner surface radius: `calc(var(--radius-xl) - var(--radius-inset))`.
- Never give inner and outer layers the same radius.
- Mobile uses smaller fixed values while preserving the same subtraction relationship.

### Project index

Large image-led entries with title, location, type, and year. Project details open in an accessible overlay inspired by an architectural presentation board.

### Services

A typographic index, not a repeated card grid. Each service reveals its description through spacing and text shift.

### Team

Editorial portrait strip with restrained captions. Portraits remain documentary and are never stylized by filters that alter identity.
Francisco J. Ruiz Palomo is the founder and CEO: he appears first and receives modestly greater visual weight, while remaining grouped with colleagues rather than isolated as a standalone profile.

### Contact

Contacto is a standalone Persuade route, not an embedded page anchor. It opens with an oversized invitation to begin a conversation and transitions into a rounded dark enquiry plane with direct office details and a concise form. Other surfaces may end with a dedicated contact close that routes there. Submission feedback is announced with an ARIA live region.

## Motion

- Master easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Page load: white architectural planes translate away, then headline lines rise through a mask.
- Image reveal: clip-path opens vertically with a subtle scale from 1.035 to 1.
- Text reveal: 24px upward travel plus blur reduction, staggered 70–110ms inside a single group.
- Section layers: background plane, image, caption, and metadata enter at different speeds to create depth.
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
