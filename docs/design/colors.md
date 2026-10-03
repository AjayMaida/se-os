# Design System — Color Palette

This document defines the color tokens, functional color mappings, and contrast accessibility guidelines for the **SE-OS** design system.

---

## 🎨 Core Brand Palette

SE-OS adopts a focused, dark-first aesthetic tailored for software engineers.

| Token Name | Hex Code | Tailwind Token | Role | Usage |
|---|---|---|---|---|
| **Background Dark** | `#0f172a` | `bg-slate-900` | Surface Root | Default background for screens and pages |
| **Surface Card** | `#1e293b` | `bg-slate-800` | Surface Card | Containers, cards, dialogs, drawers |
| **Surface Elevated** | `#334155` | `bg-slate-700` | Surface Element | Popovers, hover states, sub-cards |
| **Border Subtle** | `#334155` | `border-slate-700` | Divider | Card borders, dividers, list separators |
| **Brand Primary** | `#6366f1` | `indigo-500` | Primary Accent | Main CTAs, active links, key highlights |
| **Brand Primary Hover**| `#4f46e5`| `indigo-600` | State Accent | Primary button hover and pressed states |
| **Brand Primary Light**| `#818cf8`| `indigo-400` | Text Accent | Highlighted headers, badge backgrounds |

---

## 📊 Semantic & Status Colors

Used for communicating progress, state, alerts, and feedback.

| Semantic Role | Hex Code | Tailwind Token | Application |
|---|---|---|---|
| **Success** | `#10b981` | `emerald-500` | Completed tasks, passed test cases, unlocked milestones |
| **Warning** | `#f59e0b` | `amber-500` | Streak at risk, deadline warnings, degraded status |
| **Destructive / Error** | `#ef4444` | `red-500` | Test failure, validation errors, destructive actions |
| **Info / Focus** | `#38bdf8` | `sky-400` | Active roadmap node, tips, documentation callouts |
| **Streak Flame** | `#f97316` | `orange-500` | Active learning streak counters and flame badges |

---

## 🔤 Text Hierarchy Colors

| Text Token | Hex Code | Tailwind Token | Usage |
|---|---|---|---|
| **Text Primary** | `#f8fafc` | `text-slate-50` | Primary headers, body titles, active labels |
| **Text Secondary**| `#cbd5e1` | `text-slate-300` | Standard body paragraphs, form inputs |
| **Text Muted** | `#94a3b8` | `text-slate-400` | Timestamps, subtitles, helper hints |
| **Text Subtle** | `#64748b` | `text-slate-500` | Disabled inputs, placeholder text, footers |

---

## 👁️ Accessibility & Contrast

- All body text against `#0f172a` or `#1e293b` maintains a minimum contrast ratio of **4.5:1** conforming to **WCAG 2.1 Level AA**.
- Large headings (18px bold / 24px regular) maintain at least **3.0:1** contrast.
- Interactive controls maintain a minimum **3:1** contrast with adjacent background colors.
