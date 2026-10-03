# Design System — Typography

This document specifies the font families, scale, weights, and line heights for the **SE-OS** interface.

---

## 🔠 Font Families

| Role | Font Family | Fallbacks | Source |
|---|---|---|---|
| **Primary Sans** | **Inter** | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` | Next/Font Google |
| **Code / Monospace** | **JetBrains Mono** | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` | Next/Font Google |

---

## 📐 Type Scale

| Level | Size (rem / px) | Line Height | Weight | Tailwind Class | Application |
|---|---|---|---|---|---|
| **Display** | `2.5rem` / 40px | `1.1` | 800 (Bold) | `text-4xl font-extrabold tracking-tight` | Landing heroes, large milestones |
| **Heading 1**| `2.0rem` / 32px | `1.2` | 700 (Bold) | `text-3xl font-bold tracking-tight` | Page titles (Dashboard, Roadmap) |
| **Heading 2**| `1.5rem` / 24px | `1.25` | 600 (Semibold) | `text-2xl font-semibold` | Section headers, modal titles |
| **Heading 3**| `1.25rem` / 20px | `1.3` | 600 (Semibold) | `text-xl font-semibold` | Card titles, drawer headers |
| **Heading 4**| `1.0rem` / 16px | `1.4` | 600 (Semibold) | `text-base font-semibold` | Task titles, node labels |
| **Body Large**| `1.125rem` / 18px| `1.5` | 400 (Regular) | `text-lg font-normal` | Intro summaries, AI mentor messages |
| **Body Base** | `1.0rem` / 16px | `1.5` | 400 (Regular) | `text-base font-normal` | Standard body text, descriptions |
| **Body Small**| `0.875rem` / 14px| `1.4` | 400 / 500 | `text-sm font-medium` | Form labels, table cells, hints |
| **Caption** | `0.75rem` / 12px | `1.3` | 500 / 600 | `text-xs font-semibold tracking-wide` | Badges, pills, metadata tags |
| **Code** | `0.875rem` / 14px| `1.5` | 400 / 500 | `font-mono text-sm` | Code snippets, compiler outputs |

---

## ✍️ Usage Guidelines

- Always set line heights proportionally to ensure readability in dark mode.
- Use `tracking-tight` on large headers (`text-2xl` and above) to create compact modern headings.
- Restrict monospace fonts (`JetBrains Mono`) to actual code blocks, terminal outputs, mathematical complexity annotations ($O(N \log N)$), and keyboard shortcut tags (`<kbd>`).
