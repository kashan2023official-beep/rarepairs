# Brand Guidelines — RarePairs

## Identity

Name: RarePairs (one word, capital R and P)
Tagline: Rare pairs, second chances.
Positioning: Curated thrifted sneakers. Authenticated. Cleaned. Ready for their next miles.

## Colors — Light Mode

| Name | Hex | RGB | Usage |
|---|---|---|---|
| Warm Oatmeal | #F4F1EA | 244, 241, 234 | Page background, canvas |
| Dark Navy | #1A2B42 | 26, 43, 66 | Text, line art, primary buttons, footer bg |
| White | #FFFFFF | 255, 255, 255 | Product card backgrounds |
| Available Green | #2D6A4F | 45, 106, 79 | "Available" badge text |
| Sold Red | #9B2226 | 155, 34, 38 | "SOLD" badge + stamp |
| Rare Amber | #B45309 | 180, 83, 9 | "Rare Find" badge |

Opacity scale for navy (light mode):
- 100% — headings, primary text
- 70% — body text, secondary
- 40% — labels, meta, disabled
- 10% — borders, dividers
- 5% — subtle fills

## Colors — Dark Mode

The rule: **the primary color becomes the text, the text color becomes the
primary.** Navy and cream swap roles. Badge colors lighten so they stay
readable on navy.

| Element | Light | Dark |
|---|---|---|
| Page background | Cream `#F4F1EA` | Navy `#1A2B42` |
| Primary text | Navy `#1A2B42` | Cream `#F4F1EA` |
| Product card bg | White `#FFFFFF` | Lighter navy `#23364F` |
| Card border | `rgba(26,43,66,0.05)` | `rgba(244,241,234,0.10)` |
| Header bg | `rgba(244,241,234,0.92)` | `rgba(26,43,66,0.92)` |
| Footer bg | Navy `#1A2B42` | Cream `#F4F1EA` |
| Footer text | Cream `#F4F1EA` | Navy `#1A2B42` |
| Line-art logo strokes | Navy `#1A2B42` | Cream `#F4F1EA` |
| Skeleton shimmer | `rgba(26,43,66,0.05)` | `rgba(244,241,234,0.05)` |

### Badges — Dark Mode (lightened for contrast)

| Badge | Light text | Dark text | Dark bg |
|---|---|---|---|
| Available | `#2D6A4F` | `#6EE7B7` (mint) | `rgba(110,231,183,0.12)` |
| Sold | `#9B2226` | `#FCA5A5` (soft coral) | `rgba(252,165,165,0.12)` |
| Rare | `#B45309` | `#FCD34D` (gold) | `rgba(252,211,77,0.12)` |

**Important:** In dark mode, "Sold" overlay uses `rgba(26,43,66,0.55)`
instead of `rgba(244,241,234,0.55)` — the overlay dims toward navy, not cream.

## Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Logo | Pacifico | 400 | Script, matches the hand-drawn logo |
| Headings | Playfair Display | 600–800 | Editorial serif, tight tracking (-0.5 to -1.5px) |
| Body | Inter | 400–500 | Clean sans, 1.6–1.8 line height |
| Labels | Inter | 600–700 | Uppercase, 1–1.5px letter-spacing, 11–12px |

Scale:
- Hero h1: 64px / 42px tablet / 34px mobile
- Section title: 32px / 24px mobile
- Product detail h2: 38px / 28px mobile
- Body: 15–17px / 15px mobile
- Meta/labels: 11–13px

## Logo

The logo is a hand-drawn line-art collage of sneakers, with "RarePairs" in a
bold script at the center.

Usage:
- Minimum clear space: 1x the height of the "R" on all sides
- Minimum size: 80px wide (digital)
- Do not recolor, outline, add effects, or rotate
- Light mode: navy strokes on cream
- Dark mode: cream strokes on navy

Favicon: use a single sneaker from the collage, cropped tight.

## Voice & Tone

- Warm, not salesy. "Second chances" not "limited time offer."
- Confident, not arrogant. We know sneakers but we're not gatekeeping.
- Honest about condition. "Minor creasing on toe box" builds trust.
- Short sentences. Editorial, not marketing copy.

Do: "Worn twice indoors. Original box included."
Don't: "GENTLY USED!! MUST GO!! 🔥🔥"

## Imagery

- Product photos: shot on cream/white, soft natural light, no harsh shadows
- Product photos stay on cream/white in BOTH themes — do NOT invert them
- Line-art illustrations: navy strokes on cream (light) / cream strokes on navy (dark)
- No stock photos, no lifestyle imagery of people wearing shoes (yet)

## Iconography

- Stroke icons, 1.5–2px, rounded caps
- Match the line-art aesthetic of the logo
- Lucide or Phosphor icon set preferred
- Icons inherit `currentColor` so they flip with the theme automatically
