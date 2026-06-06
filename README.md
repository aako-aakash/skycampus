<div align="center">

<!-- HERO BANNER SVG LOGO -->
<svg width="900" height="200" viewBox="0 0 900 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0f1e"/>
      <stop offset="100%" style="stop-color:#0d1b3e"/>
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#38bdf8"/>
      <stop offset="50%" style="stop-color:#818cf8"/>
      <stop offset="100%" style="stop-color:#c084fc"/>
    </linearGradient>
    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#38bdf8;stop-opacity:0"/>
      <stop offset="50%" style="stop-color:#818cf8;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#c084fc;stop-opacity:0"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softglow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="900" height="200" rx="16" fill="url(#bgGrad)"/>
  <!-- Grid lines -->
  <g opacity="0.06" stroke="#38bdf8" stroke-width="0.5">
    <line x1="0" y1="40" x2="900" y2="40"/>
    <line x1="0" y1="80" x2="900" y2="80"/>
    <line x1="0" y1="120" x2="900" y2="120"/>
    <line x1="0" y1="160" x2="900" y2="160"/>
    <line x1="100" y1="0" x2="100" y2="200"/>
    <line x1="200" y1="0" x2="200" y2="200"/>
    <line x1="300" y1="0" x2="300" y2="200"/>
    <line x1="400" y1="0" x2="400" y2="200"/>
    <line x1="500" y1="0" x2="500" y2="200"/>
    <line x1="600" y1="0" x2="600" y2="200"/>
    <line x1="700" y1="0" x2="700" y2="200"/>
    <line x1="800" y1="0" x2="800" y2="200"/>
  </g>
  <!-- Glowing orbs -->
  <circle cx="120" cy="100" r="60" fill="#38bdf8" opacity="0.04" filter="url(#softglow)"/>
  <circle cx="780" cy="100" r="60" fill="#c084fc" opacity="0.04" filter="url(#softglow)"/>
  <circle cx="450" cy="100" r="80" fill="#818cf8" opacity="0.03" filter="url(#softglow)"/>
  <!-- Decorative dots -->
  <circle cx="50" cy="50" r="2" fill="#38bdf8" opacity="0.6" filter="url(#glow)"/>
  <circle cx="850" cy="50" r="2" fill="#c084fc" opacity="0.6" filter="url(#glow)"/>
  <circle cx="50" cy="150" r="2" fill="#c084fc" opacity="0.6" filter="url(#glow)"/>
  <circle cx="850" cy="150" r="2" fill="#38bdf8" opacity="0.6" filter="url(#glow)"/>
  <circle cx="150" cy="30" r="1.5" fill="#818cf8" opacity="0.8"/>
  <circle cx="750" cy="170" r="1.5" fill="#818cf8" opacity="0.8"/>
  <circle cx="300" cy="170" r="1.5" fill="#38bdf8" opacity="0.5"/>
  <circle cx="620" cy="30" r="1.5" fill="#c084fc" opacity="0.5"/>
  <!-- Corner brackets -->
  <g stroke="#38bdf8" stroke-width="1.5" fill="none" opacity="0.5">
    <path d="M 20 20 L 20 10 L 30 10"/>
    <path d="M 870 10 L 880 10 L 880 20"/>
    <path d="M 20 180 L 20 190 L 30 190"/>
    <path d="M 870 190 L 880 190 L 880 180"/>
  </g>
  <!-- Top separator line -->
  <rect x="200" y="68" width="500" height="1" fill="url(#lineGrad)" opacity="0.4"/>
  <!-- Main title -->
  <text x="450" y="115" font-family="'Courier New', monospace" font-size="58" font-weight="900"
    text-anchor="middle" fill="url(#textGrad)" filter="url(#glow)" letter-spacing="8">
    SKYCAMPUS
  </text>
  <!-- Subtitle -->
  <text x="450" y="148" font-family="'Courier New', monospace" font-size="13"
    text-anchor="middle" fill="#94a3b8" letter-spacing="5">
    YOUR UNIVERSITY · YOUR NETWORK · POWERED BY AI
  </text>
  <!-- Bottom separator line -->
  <rect x="200" y="162" width="500" height="1" fill="url(#lineGrad)" opacity="0.4"/>
  <!-- Version badge left -->
  <rect x="30" y="90" width="60" height="20" rx="4" fill="#38bdf8" opacity="0.1" stroke="#38bdf8" stroke-width="0.5" stroke-opacity="0.4"/>
  <text x="60" y="104" font-family="'Courier New', monospace" font-size="9" text-anchor="middle" fill="#38bdf8" opacity="0.8">v1.0.0</text>
  <!-- Badge right -->
  <rect x="810" y="90" width="60" height="20" rx="4" fill="#c084fc" opacity="0.1" stroke="#c084fc" stroke-width="0.5" stroke-opacity="0.4"/>
  <text x="840" y="104" font-family="'Courier New', monospace" font-size="9" text-anchor="middle" fill="#c084fc" opacity="0.8">MIT</text>
</svg>

<br />
<br />

<!-- TECH BADGES -->
[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js_20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Python](https://img.shields.io/badge/Python_3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)

<br />

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-skycampus.vercel.app-0ea5e9?style=flat-square&labelColor=0a0f1e)](https://skycampus.vercel.app)
[![License MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square&labelColor=0a0f1e)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-818cf8?style=flat-square&labelColor=0a0f1e)](CONTRIBUTING.md)
[![Made with ❤️](https://img.shields.io/badge/Made_with-❤️-f43f5e?style=flat-square&labelColor=0a0f1e)](https://github.com/yourname/skycampus)

<br />

> ### *"Not another todo app. A production-grade AI-powered university social platform*
> ### *engineered like a real startup — from schema design to cloud deployment."*

<br />

</div>

---

<br />

## 🌌 &nbsp;What is SkyCampus?

SkyCampus is a **full-stack, AI-powered social network built exclusively for university students.** It combines the professional networking of LinkedIn, the community culture of Discord, and the intelligence of modern AI systems — all tailored for campus life.

Students can build rich academic profiles, publish posts, follow each other, join interest-based communities, chat in real time, discover study partners through AI matching, and get their resumes analyzed — all from a single, unified platform.

This is **not a learning exercise**. Every engineering decision was made with production in mind: cursor-based pagination, atomic database transactions, JWT refresh rotation, Redis graceful degradation, microservice AI separation, and zero-trust API security.

<br />

---

<br />

## ✨ &nbsp;Platform Capabilities

<br />

<table>
<tr>
<td width="50%" valign="top">

### 🔐 &nbsp;Authentication & Security
- JWT Access + Refresh Token rotation
- bcrypt password hashing (12 rounds)
- HTTP-only secure cookies (XSS-proof)
- Helmet.js — 14 security headers
- Rate limiting on all auth routes
- Token reuse detection & invalidation

### 📰 &nbsp;Social Feed
- Cursor-based infinite scroll
- Optimistic UI updates with rollback
- Image uploads via Cloudinary CDN
- Hashtag system with tag search
- Trending posts via Redis sorted sets
- Post visibility controls

### 💬 &nbsp;Real-time Chat
- 1-on-1 and group conversations
- Typing indicators with debounce
- Online/offline presence tracking
- Message seen receipts
- Socket.IO with JWT auth handshake

### 🔔 &nbsp;Live Notifications
- Like, comment, follow alerts
- Real-time push via Socket.IO
- Unread badge counter
- Mark all as read

</td>
<td width="50%" valign="top">

### 🤖 &nbsp;AI Buddy Finder
- sentence-transformers embeddings
- Cosine similarity matching
- Profile-based vector search
- Ranked results with match reasons
- CPU-only inference (~50ms)

### 🔍 &nbsp;Semantic Search
- Natural language user queries
- Vector space search over all profiles
- Beyond keyword — finds by meaning
- e.g. *"ML students interested in DSA"*

### 📄 &nbsp;Resume Analyzer
- PDF text extraction (pdfplumber)
- GPT-4o skill extraction
- ATS compatibility scoring
- Keyword gap analysis
- Community recommendations

### 🏘️ &nbsp;Communities
- Create and join interest groups
- AI Club · Coding Club · Placement Prep
- Admin moderation tools
- Member count and discovery

</td>
</tr>
</table>

<br />

---

<br />

## 🏗️ &nbsp;System Architecture

<br />

```
╔══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                  ║
║                    ┌────────────────────────────────┐                           ║
║                    │       Next.js 14 Frontend       │                           ║
║                    │  React · TypeScript · Tailwind  │                           ║
║                    │       Vercel Edge Network        │                           ║
║                    └───────────────┬────────────────┘                           ║
║                                    │                                              ║
║              ┌─────────────────────┼─────────────────────┐                      ║
║              │                     │                     │                       ║
║         REST /api/v1          WebSocket              Direct HTTP                 ║
║              │              Socket.IO                     │                       ║
║              ▼                     ▼                     ▼                       ║
║    ┌──────────────────┐                     ┌────────────────────┐               ║
║    │   Node.js API    │                     │   AI Microservice  │               ║
║    │  Express · TS    │◄────── HTTP ────────│  Python · FastAPI  │               ║
║    │  Railway Cloud   │                     │  Render Cloud      │               ║
║    └────────┬─────────┘                     │  sentence-trans    │               ║
║             │                               │  OpenAI GPT-4o     │               ║
║    ┌────────┴──────────────────────┐        └────────────────────┘               ║
║    │                               │                                              ║
║    ▼             ▼                 ▼                                              ║
║ ┌──────────┐  ┌───────┐   ┌────────────────┐                                    ║
║ │PostgreSQL│  │ Redis │   │   Cloudinary   │                                    ║
║ │  Neon    │  │Upstash│   │   Image CDN    │                                    ║
║ │12 Tables │  │ Cache │   │   Storage      │                                    ║
║ └──────────┘  └───────┘   └────────────────┘                                    ║
║                                                                                  ║
╚══════════════════════════════════════════════════════════════════════════════════╝
```

<br />

---

<br />

## ⚡ &nbsp;Tech Stack

<br />

| Layer | Technology | Why It Was Chosen |
|:---|:---|:---|
| **Frontend** | Next.js 14 · React 18 · TypeScript | App Router SSR, edge CDN, type safety across all components |
| **Styling** | Tailwind CSS | Zero-runtime CSS, utility-first, dark mode, responsive by default |
| **Server State** | TanStack Query v5 | Infinite queries, optimistic mutations, background refetch, stale-while-revalidate |
| **Client State** | Redux Toolkit | Predictable auth state, DevTools support, middleware composition |
| **Backend** | Node.js 20 · Express.js · TypeScript | Non-blocking I/O for real-time, familiar ecosystem, type-safe across layers |
| **Architecture** | Repository Pattern | Thin controllers → pure services → isolated DB queries → testable at every layer |
| **ORM** | Prisma | Type-safe queries, schema-as-code, migration history, auto-generated client |
| **Database** | PostgreSQL 16 (Neon) | ACID compliance, complex joins, serverless scaling, branching |
| **Cache** | Redis 7 (Upstash) | Feed cache, trending sorted sets, rate limiting, pub/sub |
| **Realtime** | Socket.IO | Rooms, auto-reconnect, JWT auth handshake, fallback transports |
| **Auth** | JWT + bcryptjs | Stateless, scalable, refresh rotation, HTTP-only cookie storage |
| **AI Runtime** | Python 3.11 · FastAPI | Best ML ecosystem, async endpoints, Pydantic validation, OpenAPI docs |
| **Embeddings** | sentence-transformers | 384-dim vectors, CPU-only, 22MB model, 50ms inference, free |
| **LLM** | OpenAI GPT-4o-mini | Structured JSON resume analysis, cost-effective, fallback built-in |
| **Storage** | Cloudinary | Auto image optimization, CDN delivery, transformation pipeline |
| **Validation** | Zod | Schema = TypeScript type, works in Node + browser, composable |
| **Testing** | Jest · Supertest | Integration tests with real DB, mocked repositories, CI-ready |
| **DevOps** | Docker · GitHub Actions | Containerized dev, automated test → build → deploy pipeline |

<br />

---

<br />

## 🧠 &nbsp;AI System — Deep Dive

<br />

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         SkyCampus AI Microservice                            │
│                    Python 3.11  +  FastAPI  +  Uvicorn                       │
├────────────────┬───────────────┬──────────────┬────────────┬─────────────────┤
│  Study Buddy   │   Semantic    │    Resume    │    Feed    │   Moderation    │
│   Matching     │    Search     │   Analyzer   │  Ranking   │   Pipeline      │
│ /recommend     │  /search      │  /resume     │  /feed     │  /moderate      │
├────────────────┼───────────────┼──────────────┼────────────┼─────────────────┤
│  Embeds user   │ NL query over │ pdfplumber   │ Embeds     │ Regex + pattern │
│  profiles with │ all profiles  │ text extract │ posts and  │ toxicity scan   │
│  MiniLM-L6-v2  │ → embed →     │ → GPT-4o     │ ranks by   │ spam detection  │
│  → cosine sim  │ cosine rank   │ structured   │ user cosine│ confidence      │
│  → top-K match │ → semantic    │ JSON: score  │ similarity │ threshold gate  │
│  → reason gen  │ retrieval     │ gaps, skills │ + engage   │ + audit log     │
├────────────────┴───────────────┴──────────────┴────────────┴─────────────────┤
│  all-MiniLM-L6-v2  ·  384 dimensions  ·  22MB  ·  ~50ms  ·  CPU-only        │
│  Graceful fallback on all 5 endpoints — works without any API keys           │
└──────────────────────────────────────────────────────────────────────────────┘
```

<br />

**How study buddy matching works under the hood:**

```
1. User profile text is composed:
   "{name} studies {branch}. Skills: {skills}. Interests: {interests}."

2. Encoded to 384-dim float vector via all-MiniLM-L6-v2

3. Cosine similarity computed against ALL candidate embeddings:
   similarity = dot(A, B) / (‖A‖ × ‖B‖)

4. Results ranked by score, reason generated from shared attributes

5. Returns: [ { userId, score: 0.94, reason: "Shares: React, Node.js" } ]
```

<br />

---

<br />

## 🗄️ &nbsp;Database Schema

<br />

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SkyCampus · PostgreSQL                             │
│                    12 tables · UUID PKs · Cascade deletes                   │
└─────────────────────────────────────────────────────────────────────────────┘

users ─────────────────────────────────────────────────────────────────────┐
  │  id · email · username · password(bcrypt) · name · bio                  │
  │  university · branch · year · skills[] · interests[]                    │
  │  profilePicture · coverImage · refreshToken · createdAt                 │
  │                                                                          │
  ├──< posts ─────────────────────────────────────────────────────────────┐  │
  │     id · content · imageUrl · tags[] · likesCount(denorm)             │  │
  │     commentsCount(denorm) · visibility(enum) · createdAt              │  │
  │         ├──< likes       id · userId(FK) · postId(FK)                 │  │
  │         └──< comments    id · content · parentId(self-ref) ──< replies│  │
  │                                                                         │  │
  ├──< follows        followerId(FK) · followingId(FK) · UNIQUE constraint │  │
  │                                                                          │  │
  ├──< community_members ──< communities                                    │  │
  │     role(enum: ADMIN·MOD·MEMBER)    name · slug · description · tags[] │  │
  │                                                                          │  │
  ├──< chat_participants ──< chats ──< messages                             │  │
  │                           isGroup · name    content · seenBy[]         │  │
  │                                                                          │  │
  ├──< notifications   type(LIKE·COMMENT·FOLLOW·MENTION) · isRead           │  │
  │                    actorId(FK) → users ────────────────────────────────┘  │
  │                                                                             │
  ├──< resumes         fileUrl · analysis(JSON) · score · skills[]             │
  │                                                                             │
  └──< ai_recommendations   type · targetId · score · reason ─────────────────┘
```

<br />

---

<br />

## 📂 &nbsp;Project Structure

<br />

```
skycampus/                          ← monorepo root
│
├── 📁 backend/                     Node.js · Express · TypeScript
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts               Prisma client singleton (globalThis pattern)
│   │   │   ├── redis.ts            Redis client with graceful fallback
│   │   │   └── cloudinary.ts       Multer + Cloudinary storage engine
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts             JWT verify guard · generateTokens · setTokenCookies
│   │   │   ├── validate.ts         Zod middleware (body · query · params)
│   │   │   ├── errorHandler.ts     Global error handler + Prisma error mapping
│   │   │   └── rateLimiter.ts      Global · auth · upload limiters
│   │   │
│   │   ├── validators/             Zod schemas (type inference = TypeScript types)
│   │   │   ├── auth.validator.ts
│   │   │   ├── post.validator.ts
│   │   │   ├── user.validator.ts
│   │   │   └── community.validator.ts
│   │   │
│   │   ├── repositories/           Raw DB layer — one file per entity
│   │   │   ├── user.repository.ts
│   │   │   ├── post.repository.ts
│   │   │   ├── like.repository.ts
│   │   │   ├── comment.repository.ts
│   │   │   ├── follow.repository.ts
│   │   │   ├── community.repository.ts
│   │   │   ├── chat.repository.ts
│   │   │   └── notification.repository.ts
│   │   │
│   │   ├── services/               Business logic — cache-aware, notification-aware
│   │   │   ├── auth.service.ts
│   │   │   ├── post.service.ts
│   │   │   ├── user.service.ts
│   │   │   ├── community.service.ts
│   │   │   ├── chat.service.ts
│   │   │   ├── notification.service.ts
│   │   │   └── cache.service.ts    Redis read-through with silent fallback
│   │   │
│   │   ├── controllers/            HTTP layer — request parsing, response shaping
│   │   │   ├── auth.controller.ts
│   │   │   ├── post.controller.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── community.controller.ts
│   │   │   ├── chat.controller.ts
│   │   │   └── notification.controller.ts
│   │   │
│   │   ├── routes/                 Express routers — versioned at /api/v1
│   │   ├── sockets/
│   │   │   ├── index.ts            Socket.IO init + JWT auth middleware
│   │   │   └── notification.socket.ts  Emit real-time + persist to DB
│   │   │
│   │   ├── utils/
│   │   │   ├── AppError.ts         Operational error class
│   │   │   └── asyncHandler.ts     Wraps async route handlers
│   │   │
│   │   ├── app.ts                  Express app (middleware stack)
│   │   └── server.ts               HTTP server + Socket.IO + DB connect
│   │
│   ├── prisma/
│   │   ├── schema.prisma           12 models · enums · relations · indexes
│   │   └── seed.ts                 3 users · 3 communities · 3 posts
│   │
│   ├── tests/
│   │   ├── auth.test.ts            Register · Login · JWT · refresh
│   │   └── post.test.ts            CRUD · like toggle · pagination
│   │
│   ├── railway.toml                Nixpacks builder config
│   ├── nixpacks.toml               npm install → prisma generate → tsc
│   ├── Dockerfile                  Production container
│   └── tsconfig.json
│
├── 📁 frontend/                    Next.js 14 · App Router · TypeScript
│   └── src/
│       ├── app/
│       │   ├── (auth)/login/       Login page with JWT cookie auth
│       │   ├── (auth)/register/    Registration with Zod validation
│       │   ├── feed/               Infinite scroll · CreatePost · PostCard
│       │   ├── profile/[id]/       Dynamic profile · follow · post history
│       │   ├── chat/               Socket.IO chat · typing · seen receipts
│       │   ├── communities/        Browse · create · join communities
│       │   ├── notifications/      Live notifications · mark all read
│       │   ├── settings/           Edit profile · skills manager
│       │   └── ai/
│       │       ├── resume/         PDF upload · ATS score · gap analysis
│       │       └── recommend/      AI buddy matching with score display
│       │
│       ├── components/
│       │   ├── ui/                 Button · Avatar · Skeleton
│       │   ├── feed/               PostCard (likes, comments, delete) · CreatePost
│       │   └── layout/             Navbar (auth-aware, mobile-responsive)
│       │
│       ├── hooks/
│       │   └── index.ts            useAuth · useFeed · useToggleLike · useSocket · useProfile
│       │
│       ├── services/
│       │   ├── api.ts              Axios instance + 401 auto-refresh interceptor
│       │   └── socket.ts           Socket.IO singleton with token auth
│       │
│       ├── store/
│       │   ├── index.ts            Redux store
│       │   └── slices/authSlice.ts fetchMe · loginUser · logoutUser async thunks
│       │
│       └── middleware.ts           Route guard — redirect unauthenticated users
│
├── 📁 ai-service/                  Python 3.11 · FastAPI · Uvicorn
│   ├── main.py                     FastAPI app · CORS · 5 routers mounted
│   ├── routers/
│   │   ├── recommend.py            Study buddy matching endpoint
│   │   ├── search.py               Semantic search endpoint
│   │   ├── resume.py               PDF upload + GPT-4o analysis
│   │   ├── moderate.py             Toxicity + spam detection
│   │   └── feed.py                 AI feed ranking by cosine similarity
│   ├── services/
│   │   └── embedder.py             MiniLM-L6-v2 · embed_user · cosine_similarity · batch
│   └── requirements.txt
│
├── 📄 docker-compose.yml           Local dev: postgres + redis + all 3 services
├── 📄 render.yaml                  Render AI service deployment config
├── 📄 vercel.json                  Vercel frontend deployment config
├── 📄 setup.sh                     One-command automated local setup
├── 📄 .gitignore
├── 📄 LICENSE
└── 📄 README.md                    You are here
```

<br />

---

<br />

## 🔌 &nbsp;API Reference

<br />

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  BASE URL: https://your-api.up.railway.app/api/v1                           │
└─────────────────────────────────────────────────────────────────────────────┘

  AUTH
  ─────────────────────────────────────────────────────────────────────────────
  POST   /auth/register          Register · returns user object
  POST   /auth/login             Login · sets accessToken + refreshToken cookies
  POST   /auth/logout            Clears cookies · nullifies refreshToken in DB
  POST   /auth/refresh           Rotates refresh token · issues new access token
  GET    /auth/me                Returns current authenticated user

  POSTS
  ─────────────────────────────────────────────────────────────────────────────
  GET    /posts                  Feed (cursor-paginated, follows + self)
  POST   /posts                  Create post (multipart/form-data with image)
  GET    /posts/:id              Single post with isLiked flag
  PUT    /posts/:id              Edit post (owner only)
  DELETE /posts/:id              Delete post (owner only, cascade)
  GET    /posts/trending         Top-10 from Redis sorted set
  GET    /posts/tag/:tag         Posts filtered by hashtag
  GET    /posts/user/:userId     User's posts (paginated)
  POST   /posts/:id/like         Toggle like — atomic $transaction
  GET    /posts/:id/likes        Who liked (paginated)
  GET    /posts/:id/comments     Top-level comments with reply counts
  POST   /posts/:id/comments     Add comment / reply (parentId optional)
  DELETE /comments/:id           Delete comment (owner only)

  USERS
  ─────────────────────────────────────────────────────────────────────────────
  GET    /users/:id              Profile with follower/following counts
  PUT    /users/profile          Update profile + avatar upload
  POST   /users/:id/follow       Toggle follow relationship
  GET    /users/:id/followers    Follower list
  GET    /users/:id/following    Following list
  GET    /users/search           Full-text search (name · username · university)
  GET    /users/suggested        Suggested connections (not yet following)

  COMMUNITIES
  ─────────────────────────────────────────────────────────────────────────────
  GET    /communities            Browse all (sorted by memberCount)
  GET    /communities/me         My joined communities
  GET    /communities/search     Search by name/description
  GET    /communities/:slug      Community detail
  POST   /communities            Create (auto-joins as ADMIN)
  POST   /communities/:id/join   Toggle membership

  CHAT
  ─────────────────────────────────────────────────────────────────────────────
  GET    /chats                  My conversations (ordered by lastMessageAt)
  POST   /chats/dm               Get or create DM with user
  GET    /chats/:id              Chat detail with participants
  GET    /chats/:id/messages     Message history (cursor-paginated, reversed)

  NOTIFICATIONS
  ─────────────────────────────────────────────────────────────────────────────
  GET    /notifications          All notifications (cursor-paginated)
  GET    /notifications/unread   Unread count for badge
  PUT    /notifications/read-all Mark all as read

  AI SERVICE  (https://your-ai.onrender.com)
  ─────────────────────────────────────────────────────────────────────────────
  POST   /ai/v1/recommend/users  Study buddy matching (JSON: targetUser + candidates)
  POST   /ai/v1/search/users     Semantic search (JSON: query + items[])
  POST   /ai/v1/resume/analyze   Resume analysis (multipart: file=PDF)
  POST   /ai/v1/moderate/content Content moderation (JSON: content + userId)
  POST   /ai/v1/feed/rank        AI feed ranking (JSON: userProfile + posts[])
  GET    /health                 Health check
```

<br />

---

<br />

## 📡 &nbsp;Socket.IO Protocol

<br />

```
  AUTHENTICATION
  Connection handshake must include JWT:
  socket = io(URL, { auth: { token: "your-access-token" } })

  CLIENT → SERVER                          SERVER → CLIENT
  ────────────────────────────────────     ────────────────────────────────────
  join_room      { chatId }                new_message      { message object }
  leave_room     { chatId }                user_typing      { userId, chatId, typing }
  send_message   { chatId, content }       user_online      { userId, online: bool }
  typing_start   chatId                    notification     { type, actorId, resourceId }
  typing_stop    chatId                    message_seen     { messageId, userId }
  mark_seen      messageId                 error            string

  ROOMS
  user:{userId}     Personal room — receives notifications
  chat:{chatId}     Chat room — receives messages + typing events
```

<br />

---

<br />

## 🚀 &nbsp;Quick Start — Local Development

<br />

**Prerequisites:** `Node.js 20+` · `Python 3.11+` · `Git`

<br />

```bash
# ── 1. Clone ──────────────────────────────────────────────────────────────
git clone https://github.com/yourname/skycampus.git
cd skycampus

# ── 2. Automated setup ─────────────────────────────────────────────────────
bash setup.sh
# → installs all deps
# → runs prisma migrate dev
# → seeds 3 users + 3 communities + 3 posts

# ── 3. Start all services ──────────────────────────────────────────────────

# Tab 1 — Backend
cd backend && npm run dev          # http://localhost:5000

# Tab 2 — Frontend
cd frontend && npm run dev         # http://localhost:3000

# Tab 3 — AI Service
cd ai-service && uvicorn main:app --reload --port 8000

# ── Or, one command with Docker ───────────────────────────────────────────
docker-compose up --build
```

<br />

**Login immediately with seeded accounts:**

| Name | Email | Password | Skills |
|:---|:---|:---|:---|
| Arjun Sharma | arjun@skycampus.edu | Password123 | React · Node.js · TypeScript |
| Priya Patel | priya@skycampus.edu | Password123 | Python · ML · NLP |
| Rohan Verma | rohan@skycampus.edu | Password123 | C++ · IoT · Embedded |

<br />

---

<br />

## 🔑 &nbsp;Environment Variables

<br />

**`backend/.env`**
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:pass@localhost:5432/skycampus
JWT_ACCESS_SECRET=<node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
JWT_REFRESH_SECRET=<run above command again — must be different>
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
REDIS_URL=redis://localhost:6379
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLIENT_URL=http://localhost:3000
AI_SERVICE_URL=http://localhost:8000
```

**`frontend/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_AI_URL=http://localhost:8000
```

**`ai-service/.env`**
```env
OPENAI_API_KEY=sk-proj-...   # optional — rule-based fallback works without it
```

<br />

---

<br />

## ☁️ &nbsp;Deployment

<br />

```
┌──────────────────┬─────────────────┬────────────────────────────┐
│ Service          │ Platform        │ Cost                       │
├──────────────────┼─────────────────┼────────────────────────────┤
│ Frontend         │ Vercel          │ Free                       │
│ Backend API      │ Railway         │ ~$5/month                  │
│ AI Microservice  │ Render          │ Free (cold start) / $7/mo  │
│ PostgreSQL       │ Neon            │ Free                       │
│ Redis Cache      │ Upstash         │ Free                       │
│ Image Storage    │ Cloudinary      │ Free                       │
└──────────────────┴─────────────────┴────────────────────────────┘
  Total minimum cost: $0/month on free tiers
```

```bash
# Deploy backend (Railway auto-deploys on push — configured via railway.toml)
git push origin main

# One-time DB migration against production
DATABASE_URL=<neon-url> npx prisma migrate deploy
DATABASE_URL=<neon-url> npx prisma db seed
```

> **Critical:** After deploying to Vercel, update Railway's `CLIENT_URL`
> to your Vercel domain — otherwise CORS will block all API calls.

<br />

---

<br />

## 🛡️ &nbsp;Security Architecture

<br />

```
Layer 1 — Transport
  ✓  HTTPS everywhere (Vercel · Railway · Render all enforce TLS)
  ✓  HTTP Strict Transport Security (HSTS) via Helmet.js

Layer 2 — Authentication
  ✓  bcrypt (12 salt rounds) — 250ms+ hash time, brute-force resistant
  ✓  JWT access tokens (15 min) — short window limits exposure
  ✓  Refresh token rotation — new token on every refresh
  ✓  Token reuse detection — replayed token = session invalidated
  ✓  HTTP-only cookies — JavaScript cannot read tokens (XSS-proof)
  ✓  Secure + SameSite=Strict flags in production

Layer 3 — Request Handling
  ✓  CORS whitelist — only CLIENT_URL origin accepted
  ✓  Helmet.js — Content-Security-Policy, X-Frame-Options, and 12 more
  ✓  Rate limiting — 10 req/15min (auth), 200 req/15min (global)
  ✓  Zod validation — all inputs sanitized before business logic
  ✓  Multer file type checks — only jpg/png/webp/pdf accepted

Layer 4 — Database
  ✓  Prisma parameterized queries — SQL injection impossible by design
  ✓  UUID primary keys — not enumerable, not sequential
  ✓  Ownership checks on every mutation — req.userId === resource.userId
  ✓  Cascade deletes — no orphaned data, no information leaks
```

<br />

---

<br />

## ⚙️ &nbsp;Engineering Decisions

<br />

**Why cursor pagination instead of offset?**
Offset pagination skips N rows on every query — at `OFFSET 100`, it scans 100 rows to discard. Cursor pagination uses a `WHERE id > last_id` index seek — O(log n) regardless of depth. Also prevents duplicates when new posts appear mid-scroll.

**Why denormalize `likesCount` on the post?**
`SELECT COUNT(*) FROM likes WHERE postId = ?` is fast on small tables — but at 10k users each loading a 10-post feed, that's 100k COUNT queries per minute. A denormalized column updated atomically in a `$transaction` costs 4 bytes per post and eliminates the N+1 problem entirely.

**Why a separate Python AI service instead of a Node.js module?**
Python owns the ML ecosystem. Running sentence-transformers, pdfplumber, and numpy in Node via ONNX is possible but fragile. Isolation means the AI service can be scaled, restarted, or upgraded independently without touching the API server.

**Why TanStack Query over SWR or plain useEffect?**
Infinite query support, optimistic mutations with automatic rollback, devtools, background refetch, stale-while-revalidate, deduplication, and TypeScript generics — all built in. SWR lacks infinite scroll support and optimistic mutations out of the box.

**Why Redis sorted sets for trending?**
`ZINCRBY trending:posts 1 postId` is an O(log n) atomic increment. `ZREVRANGE trending:posts 0 9` returns the top 10 in O(log n + 10). Compared to a DB query with ORDER BY + COUNT, this scales to millions of operations per second with microsecond latency.

<br />

---

<br />

## 🤝 &nbsp;Contributing

<br />

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/skycampus.git

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Install dependencies
cd backend && npm install
cd frontend && npm install

# 4. Make your changes and write tests
npm test

# 5. Commit using conventional commits
git commit -m "feat: add event-based community posts"
git commit -m "fix: resolve race condition in like toggle"
git commit -m "docs: update API reference for chat endpoints"

# 6. Push and open a pull request
git push origin feature/your-feature-name
```

> Please open an issue before starting work on large features.
> All PRs must pass the CI pipeline (lint → test → build) before merging.

<br />

---

<br />

## 📄 &nbsp;License

<br />

```
MIT License — Copyright (c) 2026 SkyCampus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

Full license text: **[LICENSE](LICENSE)**

<br />

---

<br />

<div align="center">

<!-- FOOTER SVG -->
<svg width="700" height="80" viewBox="0 0 700 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#38bdf8;stop-opacity:0"/>
      <stop offset="50%" style="stop-color:#818cf8;stop-opacity:0.6"/>
      <stop offset="100%" style="stop-color:#c084fc;stop-opacity:0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="700" height="1" fill="url(#fGrad)"/>
  <text x="350" y="30" font-family="'Courier New', monospace" font-size="11"
    text-anchor="middle" fill="#475569" letter-spacing="3">
    BUILT WITH PRECISION · DEPLOYED WITH CONFIDENCE
  </text>
  <text x="350" y="52" font-family="'Courier New', monospace" font-size="10"
    text-anchor="middle" fill="#334155" letter-spacing="2">
    Next.js · Node.js · PostgreSQL · Redis · Socket.IO · FastAPI · sentence-transformers
  </text>
  <rect x="0" y="69" width="700" height="1" fill="url(#fGrad)"/>
</svg>

<br />

*SkyCampus — Engineering a smarter campus, one commit at a time.*

<br />

[![GitHub stars](https://img.shields.io/github/stars/yourname/skycampus?style=social)](https://github.com/yourname/skycampus)
&nbsp;&nbsp;
[![GitHub forks](https://img.shields.io/github/forks/yourname/skycampus?style=social)](https://github.com/yourname/skycampus/fork)
&nbsp;&nbsp;
[![GitHub watchers](https://img.shields.io/github/watchers/yourname/skycampus?style=social)](https://github.com/yourname/skycampus)

<br />

⭐ **Star this repo** if it helped you learn something new

</div>
