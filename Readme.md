<div align="center">

# 🧠 Docly — AI-Powered Document Analysis

**Analyze, collaborate, and extract insights from documents using Google Gemini AI.**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk)](https://clerk.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)

[Live Demo](https://docly-one.vercel.app) · [Report Bug](https://github.com/Tusharxhub/Docly/issues) · [Request Feature](https://github.com/Tusharxhub/Docly/issues)

</div>

---

## 📋 Table of Contents

- [🧠 Docly — AI-Powered Document Analysis](#-docly--ai-powered-document-analysis)
  - [📋 Table of Contents](#-table-of-contents)
  - [📖 About](#-about)
  - [✨ Features](#-features)
  - [🛠 Tech Stack](#-tech-stack)
  - [🏗 Architecture](#-architecture)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [🔑 Environment Variables](#-environment-variables)
  - [🗄 Database Schema](#-database-schema)
  - [📡 API Routes](#-api-routes)
  - [📁 Project Structure](#-project-structure)
  - [🚢 Deployment](#-deployment)
    - [Deploy to Vercel](#deploy-to-vercel)
    - [Post-Deployment Checklist](#post-deployment-checklist)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)

---

## 📖 About

Docly is a multi-tenant SaaS application that lets teams upload documents and analyze them with AI. Built with Next.js 16 App Router and powered by Google Gemini 2.5 Flash, it supports multiple analysis types including summarization, Q&A generation, sentiment analysis, entity extraction, and key data extraction.

Organizations can invite team members, manage shared documents, and leverage AI to extract actionable insights — all within a clean, modern interface.

---

## ✨ Features

- **🤖 AI Document Analysis** — 5 analysis types powered by Google Gemini 2.5 Flash:
  - **Summary** — Concise document overview
  - **Q&A** — Auto-generated questions and answers
  - **Sentiment** — Tone and sentiment detection
  - **Entities** — Named entity recognition (people, places, orgs)
  - **Extract** — Key data and insights extraction

- **👥 Multi-Tenant Organizations** — Create and manage teams via Clerk organizations
- **📄 Document Management** — Upload, view, analyze, and delete documents
- **☁️ Cloud Storage** — Files stored securely on Vercel Blob
- **🔐 Authentication** — Full auth flow with Clerk (sign-in, sign-up, org switching)
- **📊 Dashboard** — Org-level stats, recent documents, analysis indicators
- **📱 Responsive UI** — Mobile-friendly with sheet navigation
- **🎨 Modern Design** — Radix UI primitives, Tailwind CSS, Lucide icons

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5.9 |
| **UI** | React 19, Tailwind CSS 4, Radix UI, Lucide Icons |
| **Authentication** | Clerk |
| **Database** | PostgreSQL via Prisma 7 (with `@prisma/adapter-pg`) |
| **AI** | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| **File Storage** | Vercel Blob |
| **Deployment** | Vercel |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────┐
│                   Client (React 19)             │
│  Landing Page │ Dashboard │ Documents │ Auth    │
└──────────────────────┬──────────────────────────┘
                       │
              ┌────────▼────────┐
              │  Clerk Middleware │  ← proxy.ts
              └────────┬────────┘
                       │
         ┌─────────────▼──────────────┐
         │   Next.js API Routes       │
         │  /api/documents            │
         │  /api/analyze              │
         │  /api/organizations        │
         └───┬──────────┬────────┬────┘
             │          │        │
     ┌───────▼──┐  ┌────▼───┐  ┌▼──────────┐
     │ Prisma   │  │ Gemini │  │ Vercel    │
     │ (PgSQL)  │  │ AI     │  │ Blob      │
     └──────────┘  └────────┘  └───────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** database (or [Prisma Postgres](https://www.prisma.io/postgres))
- **Clerk** account ([clerk.com](https://clerk.com))
- **Google AI** API key ([aistudio.google.com](https://aistudio.google.com))
- **Vercel Blob** store ([vercel.com](https://vercel.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/Tusharxhub/Docly.git
cd Docly

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in all required values (see Environment Variables section)

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=verify-full"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
```

| Variable | Where to Get It |
|---|---|
| `DATABASE_URL` | Your PostgreSQL provider or [Prisma Postgres](https://www.prisma.io/postgres) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | [Clerk Dashboard](https://dashboard.clerk.com) → API Keys |
| `CLERK_SECRET_KEY` | [Clerk Dashboard](https://dashboard.clerk.com) → API Keys |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) |
| `BLOB_READ_WRITE_TOKEN` | [Vercel Dashboard](https://vercel.com) → Storage → Blob |

---

## 🗄 Database Schema

```prisma
model Organization {
  id         String   @id @default(cuid())
  clerkOrgId String   @unique
  name       String
  slug       String   @unique
  createdAt  DateTime @default(now())
  members    OrganizationMember[]
  documents  Document[]
}

model OrganizationMember {
  id             String @id @default(cuid())
  organizationId String
  userId         String
  role           String @default("member")
  @@unique([organizationId, userId])
}

model User {
  id          String @id @default(cuid())
  clerkUserId String @unique
  email       String @unique
  name        String
  memberships OrganizationMember[]
  documents   Document[]
}

model Document {
  id             String   @id @default(cuid())
  name           String
  content        String?
  fileUrl        String
  fileSize       Int
  fileType       String
  aiSummary      String?
  aiKeywords     String[]
  sentiment      String?
  organizationId String
  userId         String
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

---

## 📡 API Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/documents?organizationId=` | List documents for an organization |
| `POST` | `/api/documents` | Upload a new document (FormData) |
| `DELETE` | `/api/documents/[documentId]` | Delete a document and its blob |
| `POST` | `/api/analyze` | Run AI analysis on a document |
| `POST` | `/api/organizations` | Create/sync an organization |

All API routes are protected by Clerk authentication and verify organization membership.

---

## 📁 Project Structure

```
Docly/
├── app/
│   ├── layout.tsx              # Root layout (Clerk, Header, Footer)
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles
│   ├── (auth)/                 # Auth routes (sign-in, sign-up)
│   ├── (dashboard)/            # Protected dashboard routes
│   │   ├── [orgSlug]/          # Organization-scoped pages
│   │   │   ├── page.tsx        # Org dashboard (stats, recent docs)
│   │   │   └── documents/      # Document management page
│   │   └── select-org/         # Organization selector
│   ├── api/                    # API route handlers
│   │   ├── analyze/            # AI analysis endpoint
│   │   ├── documents/          # Document CRUD endpoints
│   │   └── organizations/      # Organization sync endpoint
│   └── data/                   # Static data (features, analysis types)
├── components/
│   ├── common/                 # Header, Footer
│   ├── document/               # Document card, Upload dialog
│   └── ui/                     # Radix-based UI primitives
├── lib/
│   ├── prisma.ts               # Prisma client singleton
│   ├── gemini.ts               # Google Gemini AI integration
│   ├── blob.ts                 # Vercel Blob upload/delete
│   ├── sync-user.ts            # Clerk → DB user sync
│   └── utils.ts                # Utility functions
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Migration history
├── generated/prisma/           # Generated Prisma client
├── types/                      # TypeScript type definitions
├── proxy.ts                    # Clerk middleware
├── prisma.config.ts            # Prisma configuration
└── next.config.ts              # Next.js configuration
```

---

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repo on [vercel.com/new](https://vercel.com/new)
3. Add all [environment variables](#-environment-variables) in project settings
4. Deploy

> **Important:** Add a `postinstall` script to your `package.json` if Prisma client isn't generating during build:
> ```json
> "scripts": {
>   "postinstall": "prisma generate"
> }
> ```

### Post-Deployment Checklist

- [ ] All environment variables set in Vercel dashboard
- [ ] Database is accessible from Vercel's network
- [ ] Clerk webhook URLs updated for production domain
- [ ] Vercel Blob store created and token added

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Tushar](https://github.com/Tusharxhub)**

⭐ Star this repo if you found it helpful!

</div>