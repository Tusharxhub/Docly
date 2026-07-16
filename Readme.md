<div align="center">

# 🧠 Docly

### AI-Powered Document Analysis Platform

Analyze, organize, and collaborate on documents using the power of **Google Gemini AI**. Built with **Next.js 16**, **TypeScript**, **Prisma**, **Clerk**, and **Vercel Blob**, Docly helps teams extract meaningful insights from documents in seconds.

<p>
  <a href="https://docly-one.vercel.app">
    <strong>🌐 Live Demo</strong>
  </a>
</p>

</div>

---

## ✨ Features

### 🤖 AI Document Analysis

Analyze uploaded documents using **Google Gemini 2.5 Flash** with multiple AI-powered analysis modes:

- 📝 Document Summarization
- ❓ Automatic Question & Answer Generation
- 😊 Sentiment Analysis
- 🏢 Named Entity Recognition
- 📊 Key Information Extraction

### 👥 Organization Management

- Multi-tenant workspace support
- Clerk Organizations
- Team collaboration
- Organization switching

### 📄 Document Management

- Upload PDF and text documents
- View document metadata
- Delete documents
- Cloud file storage
- AI analysis history

### 🔐 Authentication

- Secure authentication with Clerk
- Social sign-in support
- Protected routes
- Organization-based authorization

### 📊 Dashboard

- Organization overview
- Recent uploads
- Analysis indicators
- Clean and responsive interface

### 🎨 Modern UI

- Responsive design
- Radix UI components
- Tailwind CSS 4
- Dark & Light mode ready
- Mobile-friendly experience

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Components | Radix UI |
| Authentication | Clerk |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| AI | Google Gemini 2.5 Flash |
| Storage | Vercel Blob |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🏗️ Architecture

```text
                   Client (React 19)
                           │
                           ▼
               Next.js App Router
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
     Clerk Auth      API Routes       Dashboard
          │                │
          ▼                ▼
    Organization      Google Gemini AI
     Management             │
          │                 ▼
          ▼            AI Analysis
          │
          ▼
      Prisma ORM
          │
          ▼
   PostgreSQL Database
          │
          ▼
     Vercel Blob Storage
```

---

## 📂 Project Structure

```text
Docly/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── api/
│   ├── data/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── common/
│   ├── document/
│   └── ui/
│
├── generated/
│   └── prisma/
│
├── lib/
│   ├── blob.ts
│   ├── gemini.ts
│   ├── prisma.ts
│   ├── sync-user.ts
│   └── utils.ts
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── types/
├── public/
├── proxy.ts
├── prisma.config.ts
├── next.config.ts
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Install the following before starting:

- Node.js 18+
- PostgreSQL
- npm
- Git

You'll also need accounts for:

- Clerk
- Google AI Studio
- Vercel

---

## Clone Repository

```bash
git clone https://github.com/tushardevx01/Docly.git
```

```bash
cd Docly
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file.

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

GEMINI_API_KEY=

BLOB_READ_WRITE_TOKEN=
```

---

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Run Database Migration

```bash
npx prisma migrate dev --name init
```

---

## Start Development Server

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

## 🌐 Live Demo

**https://docly-one.vercel.app**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/api/documents` | List documents |
| POST | `/api/documents` | Upload document |
| DELETE | `/api/documents/[id]` | Delete document |
| POST | `/api/analyze` | Analyze document |
| POST | `/api/organizations` | Sync organization |

---

## 🔑 Environment Variables

| Variable | Purpose |
|------------|----------|
| DATABASE_URL | PostgreSQL Database |
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Clerk Public Key |
| CLERK_SECRET_KEY | Clerk Secret |
| GEMINI_API_KEY | Google Gemini API |
| BLOB_READ_WRITE_TOKEN | Vercel Blob |

---

## 📦 Deployment

Deploy easily using **Vercel**.

```bash
npm run build
```

Import the repository into Vercel, configure the environment variables, and deploy.

If Prisma isn't generated during deployment, add:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

---

## 🔒 Security

- Clerk Authentication
- Organization-based authorization
- Protected API routes
- Secure cloud storage
- Server-side validation
- Environment variable protection

---

## 📈 Roadmap

- [ ] AI Chat with uploaded documents
- [ ] OCR support
- [ ] PDF annotations
- [ ] Version history
- [ ] Real-time collaboration
- [ ] AI document comparison
- [ ] Export AI reports
- [ ] Role-based permissions
- [ ] Document tags
- [ ] Search using embeddings

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new feature branch.

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes.

```bash
git commit -m "Add amazing feature"
```

4. Push the branch.

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📬 Connect With Me

- **GitHub:** https://github.com/tushardevx01
- **Portfolio:** https://tushardevx01.tech
- **LinkedIn:** https://www.linkedin.com/in/tushardevx01
- **Instagram:** https://www.instagram.com/tushardevx01/
- **Email:** t.k.d.dey2033929837@gmail.com

---

<div align="center">

### Built with ❤️ by **Tushar Kanti Dey**

⭐ If you found this project useful, consider giving it a star.

</div>
