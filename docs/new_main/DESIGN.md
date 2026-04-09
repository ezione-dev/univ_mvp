# Design System Strategy: High-End Academic Dashboard

## 1. Overview & Creative North Star
This design system is engineered to transform academic data from a standard administrative utility into an authoritative editorial experience. Inspired by the legacy and precision of high-level university institutional research, our Creative North Star is **"The Academic Curator."**

Unlike typical dashboards that rely on cluttered grids and heavy borders, this system utilizes "Atmospheric Depth." We achieve clarity through vast white space (breathing room), intentional asymmetry, and a tonal hierarchy that guides the eye toward institutional strengths. The look is premium, scholarly, and undeniably modern—moving away from "software" and toward "digital publication."

## 2. Colors: Tonal Architecture
The palette is a sophisticated "Blue-Centric" ecosystem. Instead of using lines to separate ideas, we use light.

### Primary Palette (Authority & Action)
*   **Primary (`#002c5a`):** Use for high-level branding and primary navigation headers.
*   **Secondary (`#006492`):** Reserved for interactive elements and key data highlights.
*   **On-Primary Fixed Variant (`#0a4687`):** Use for specialized sub-headers to maintain tonal consistency without the weight of pure Navy.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off dashboard areas. 
*   **How to define boundaries:** Use background color shifts. Place a `surface-container-low` (`#f1f4f7`) card against the main `background` (`#f7fafd`).
*   **Signature Textures:** For primary call-to-action cards or the main "Institutional Summary," apply a subtle linear gradient from `primary` (`#002c5a`) to `primary-container` (`#004282`) at a 135-degree angle.

### Surface Hierarchy & Nesting
Treat the UI as layered sheets of fine vellum.
1.  **Level 0 (Base):** `surface` (`#f7fafd`)
2.  **Level 1 (Sections):** `surface-container-low` (`#f1f4f7`)
3.  **Level 2 (Active Cards):** `surface-container-lowest` (`#ffffff`) 
4.  **Floating Elements:** Use semi-transparent white with a 20px Backdrop Blur (Glassmorphism) to create a sense of elite modernity.

## 3. Typography: Editorial Authority
We utilize a pairing of **Manrope** (Display/Headlines) and **Inter** (Body/Labels) to balance character with readability.

*   **Display-LG (Manrope, 3.5rem):** Reserved for "The Big Number" (e.g., Total Enrollment, Overall Rank).
*   **Headline-SM (Manrope, 1.5rem):** Used for card titles. The geometric nature of Manrope provides an "Architectural" feel.
*   **Body-MD (Inter, 0.875rem):** The workhorse for data tables and descriptions. Inter’s tall x-height ensures clarity at small scales.
*   **Label-SM (Inter, 0.6875rem):** All-caps with +5% letter spacing for "Status" or "Category" tags to provide a premium, metadata-heavy feel.

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "app-like." We use **Ambient Shadows** and **Tonal Stacking**.

*   **The Layering Principle:** Depth is achieved by placing a `surface-container-lowest` card on a `surface-container-low` background. The contrast is enough to define the edge without a line.
*   **Shadow Specification:** If an element must float (e.g., a hover state), use a shadow of `on-surface` (`#181c1e`) at 4% opacity, with a 32px blur and 8px Y-offset. This mimics natural light falling in a library.
*   **The "Ghost Border" Fallback:** For interactive inputs or table cells where high accessibility is required, use the `outline-variant` (`#c3c6d2`) at **15% opacity**. It should be felt, not seen.

## 5. Components

### Modern Data Cards
*   **Structure:** No borders. Use `roundedness-lg` (1rem). 
*   **Header:** Title-SM in `primary`.
*   **Value:** Headline-LG in `secondary`.
*   **Comparison:** Use `tertiary` (`#003509`) for positive trends and `error` (`#ba1a1a`) for negative, but keep the text weights medium to avoid a "stoplight" appearance.

### Status Indicators (Indicators, not Dots)
*   **Positive:** A pill shape using `tertiary-fixed` (`#94f990`) background with `on-tertiary-fixed` (`#002204`) text.
*   **Neutral:** `secondary-fixed` (`#cae6ff`) background with `on-secondary-fixed` (`#001e2f`) text.
*   **Negative:** `error-container` (`#ffdad6`) background with `on-error-container` (`#93000a`) text.

### Professional Data Tables
*   **Header:** `surface-container-highest` background, no vertical lines.
*   **Rows:** Subtle background shift on hover.
*   **Dividers:** Use horizontal whitespace instead of lines. If a divider is required, use a 1px "Ghost Border" (10% opacity).

### High-End Inputs
*   **Styling:** Use `surface-container-low` as the field fill. On focus, transition the background to `surface-container-lowest` and apply a 2px `secondary` bottom-border only. This mimics bespoke stationery.

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts. A 2/3 and 1/3 split for dashboard columns feels more custom than a 50/50 split.
*   **Do** use "Micro-copy" labels (Label-SM) to explain data sources, keeping the dashboard scholarly.
*   **Do** utilize `primary-fixed-dim` for inactive tab states to maintain the blue-centric theme without cluttering the visual field.

### Don't:
*   **Don't** use pure black (`#000000`). Always use `on-surface` (`#181c1e`) for text to maintain the premium navy undertone.
*   **Don't** use standard 4px corners. Use `roundedness-lg` (1rem) for containers and `roundedness-full` for status chips.
*   **Don't** use high-contrast dividers between table rows. Let the typography and `surface-container` tiers do the heavy lifting.