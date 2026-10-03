# Design System — Component Guidelines

This document details the core UI primitives, interaction states, and accessibility conventions used across the **SE-OS** web frontend.

---

## 🧩 Component Architecture

All UI components are built using React Server Components where possible, client-side React where interaction is required, styled with Tailwind CSS, and structured around accessible primitives (Radix UI / shadcn).

---

## 🔘 Button Component

### Variants

| Variant | Tailwind Classes | Usage |
|---|---|---|
| **Primary** | `bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg px-4 py-2` | Main page actions, "Start Plan", "Submit Code" |
| **Secondary** | `bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2` | Filter toggles, modal cancels, secondary actions |
| **Destructive**| `bg-red-600 hover:bg-red-500 text-white font-medium px-4 py-2` | Reset progress, delete account, abort session |
| **Ghost** | `hover:bg-slate-800 text-slate-400 hover:text-white px-3 py-1.5` | Icon buttons, toolbar controls, table row actions |

---

## 🗂️ Card Component

Cards are the foundational content surfaces in SE-OS.

```tsx
export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("bg-slate-800 border border-slate-700/80 rounded-xl p-6 shadow-sm", className)}>
      {children}
    </div>
  );
}
```

---

## 🏷️ Badge Component

Badges display statuses, tags, difficulties, and streak indicators.

| Badge Type | Appearance | Usage |
|---|---|---|
| **Easy** | `bg-emerald-950/80 text-emerald-400 border border-emerald-800` | Easy LeetCode problem, beginner topic |
| **Medium** | `bg-amber-950/80 text-amber-400 border border-amber-800` | Medium problem, intermediate topic |
| **Hard** | `bg-red-950/80 text-red-400 border border-red-800` | Hard problem, advanced distributed system |
| **Streak** | `bg-orange-950/80 text-orange-400 border border-orange-800` | Active streak count badge |
| **Milestone**| `bg-indigo-950/80 text-indigo-400 border border-indigo-800`| Completed milestone indicator |

---

## 🪟 Modal / Dialog Component

- Overlay: `fixed inset-0 bg-black/70 backdrop-blur-sm z-50`
- Surface: Centered `bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-lg w-full`
- Accessibility: Focus trapped within modal, closes on `Escape` key and outside backdrop click, manages `aria-modal="true"`.
