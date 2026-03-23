# LABSENSE AI

AI-Powered Lab Report Interpreter for translating medical test results into plain language, structured health insights, recommendations, and next-step guidance.

## Context Files

Read te following to get the full context of the project

- @context/project-overview.md
- @context/coding-standard.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

```bash
npm run dev      # Start dev server (Next.js)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Stack

- **Next.js 16** with App Router (`src/app/`)
- **React 19** with React Compiler (`babel-plugin-react-compiler`)
- **TypeScript**
- **Tailwind CSS v4** via PostCSS (`@tailwindcss/postcss`)
- Fonts: Geist Sans and Geist Mono loaded via `next/font/google`, exposed as CSS variables `--font-geist-sans` / `--font-geist-mono`

