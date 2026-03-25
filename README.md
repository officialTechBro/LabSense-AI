# 🧬 LabSense AI

> AI-Powered Lab Report Interpreter — translates medical test results into plain language, structured health insights, recommendations, and next-step guidance.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

---

## The Problem

Millions of people receive lab test results they can't understand. Medical jargon, reference ranges, and clinical abbreviations create a barrier between patients and their own health data. Misinterpretation leads to unnecessary anxiety or, worse, missed warning signs.

## The Solution

**LabSense AI** uses artificial intelligence to parse lab reports and deliver clear, structured health insights in plain language — empowering users to understand their results, spot trends, and know when to seek medical attention.

---

## Features

- **📄 Lab Report Upload & Parsing** — Upload lab results and get instant AI-powered interpretation
- **💡 Plain-Language Explanations** — Medical values translated into easy-to-understand summaries
- **📊 Visual Health Dashboard** — Interactive charts (Recharts) to track biomarkers over time
- **⚠️ Flag Abnormal Results** — Automatically highlights out-of-range values with severity indicators
- **📋 Actionable Recommendations** — Personalized next-step guidance based on results
- **🔐 Secure Data Handling** — Prisma ORM with PostgreSQL for reliable, secure storage

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, SSR) |
| **Frontend** | React 19, React Compiler, Tailwind CSS v4 |
| **Language** | TypeScript 5 |
| **Database** | PostgreSQL via Prisma 7 |
| **UI Components** | Shadcn/ui, Lucide Icons, Base UI |
| **Data Viz** | Recharts |
| **Styling** | Tailwind CSS v4 + tw-animate-css |

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/officialTechBro/LabSense-AI.git
cd LabSense-AI

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your DATABASE_URL and API keys

# Run database migrations
npx prisma migrate dev

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

```
src/
├── app/           # Next.js App Router pages & API routes
├── components/    # Reusable UI components
├── lib/           # Utility functions & configurations
prisma/
├── schema.prisma  # Database schema
├── seed.ts        # Seed data
context/           # Project documentation & AI interaction guides
scripts/           # Database testing & utility scripts
```

---

## Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:seed` | Seed the database |
| `npm run db:test` | Test database connection |

---

## Roadmap

- [ ] PDF lab report upload with OCR parsing
- [ ] Multi-language support for international users
- [ ] Historical trend analysis across multiple reports
- [ ] Doctor sharing — generate shareable summary links
- [ ] Mobile-responsive PWA

---

## Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## Contact

**Taiwo Oladosu** — Full Stack Engineer

- Portfolio: [oladosutaiwo.vercel.app](https://oladosutaiwo.vercel.app/)
- LinkedIn: [linkedin.com/in/oladosu-taiwo](https://www.linkedin.com/in/oladosu-taiwo)
- GitHub: [@officialTechBro](https://github.com/officialTechBro)
- Email: taiwooladosu1@gmail.com

---

## License

This project is open source and available under the [MIT License](LICENSE).
