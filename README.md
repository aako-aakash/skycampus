<div align="center">

<br />

```
 ███████╗██╗  ██╗██╗   ██╗ ██████╗ █████╗ ███╗   ███╗██████╗ ██╗   ██╗███████╗
 ██╔════╝██║ ██╔╝╚██╗ ██╔╝██╔════╝██╔══██╗████╗ ████║██╔══██╗██║   ██║██╔════╝
 ███████╗█████╔╝  ╚████╔╝ ██║     ███████║██╔████╔██║██████╔╝██║   ██║███████╗
 ╚════██║██╔═██╗   ╚██╔╝  ██║     ██╔══██║██║╚██╔╝██║██╔═══╝ ██║   ██║╚════██║
 ███████║██║  ██╗   ██║   ╚██████╗██║  ██║██║ ╚═╝ ██║██║     ╚██████╔╝███████║
 ╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚══════╝
```

### **Your University. Your Network. Powered by AI.**

<br />

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Node.js](https://img.shields.io/badge/Node.js_20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Python](https://img.shields.io/badge/Python_3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)

<br />

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-skycampus.vercel.app-0ea5e9?style=flat-square)](https://skycampus.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/yourname/skycampus?style=flat-square&color=yellow)](https://github.com/yourname/skycampus/stargazers)

<br />

> **SkyCampus** is a production-grade, AI-powered university social networking platform —
> built like a real startup. Think **LinkedIn × Discord × AI**, designed exclusively for students.

<br />

</div>

---

<br />

## ✦ What is SkyCampus?

SkyCampus is a full-scale university social ecosystem where students can build academic profiles, connect with peers, create and interact with posts, join interest-based communities, chat in real time, and receive intelligent AI-powered recommendations — all in one platform.

This is not a tutorial project. It is engineered like a production startup product — with a clean microservice architecture, real-time infrastructure, vector-based AI matching, and cloud-native deployment across Vercel, Railway, and Render.

<br />

---

<br />

## ✦ Feature Overview

<br />

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   🔐  Auth System        JWT • Refresh Rotation • bcrypt • HTTP-only Cookies│
│   👤  Smart Profiles     Skills • Interests • University • Social Links     │
│   📰  Social Feed        Infinite Scroll • Optimistic Updates • Hashtags    │
│   ❤️  Interactions       Likes • Threaded Comments • Follow System          │
│   🏘️  Communities        Clubs • Study Groups • Admin Moderation            │
│   💬  Real-time Chat     1-on-1 • Group • Typing • Seen Receipts            │
│   🔔  Notifications      Live • Like • Comment • Follow alerts              │
│   🤖  AI Buddy Finder    Embedding-based Student Matching                   │
│   🔍  Semantic Search    Natural Language Query over all Users               │
│   📄  Resume Analyzer    GPT-4o • ATS Score • Skill Gap Analysis            │
│   🛡️  AI Moderation      Toxicity Detection • Spam Filtering                │
│   ⚡  Redis Caching       Feed Cache • Trending • Rate Limiting             │
│   ☁️  Cloud Storage       Cloudinary CDN • Auto-optimization                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

<br />

---

<br />

## ✦ System Architecture

<br />

```
                         ┌─────────────────────┐
                         │   Next.js Frontend  │
                         │   TypeScript • SSR   │
                         │   Vercel Edge CDN    │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
               REST API        WebSocket        Direct HTTP
                    │         Socket.IO              │
                    ▼               ▼               ▼
          ┌─────────────────┐              ┌──────────────────┐
          │   Main Backend  │              │   AI Microservice│
          │  Node + Express │              │  Python + FastAPI│
          │   TypeScript    │◄────────────►│  sentence-trans  │
          │   Railway       │   HTTP       │  OpenAI GPT-4o   │
          └────────┬────────┘              │  Render          │
                   │                       └──────────────────┘
         ┌─────────┼──────────┐
         │         │          │
         ▼         ▼          ▼
  ┌────────────┐ ┌──────┐ ┌──────────────┐
  │ PostgreSQL │ │Redis │ │  Cloudinary  │
  │   Neon     │ │Upstash│ │  Image CDN  │
  │ 12 Tables  │ │Cache  │ │  Storage    │
  └────────────┘ └──────┘ └──────────────┘
```

<br />

---

<br />

## ✦ Tech Stack

<br />

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 14, React 18, TypeScript | App Router, SSR, type-safe UI |
| **Styling** | Tailwind CSS | Utility-first responsive design |
| **State** | Redux Toolkit + TanStack Query | Server + client state management |
| **Backend** | Node.js 20, Express.js, TypeScript | REST API, business logic |
| **ORM** | Prisma | Type-safe DB access, migrations |
| **Database** | PostgreSQL 16 (Neon) | Primary relational data store |
| **Cache** | Redis 7 (Upstash) | Feed cache, trending, rate limits |
| **Realtime** | Socket.IO | Chat, notifications, presence |
| **Auth** | JWT + bcryptjs | Access/refresh token rotation |
| **AI Service** | Python 3.11, FastAPI | ML inference microservice |
| **Embeddings** | sentence-transformers | User/post vector representations |
| **LLM** | OpenAI GPT-4o-mini | Resume analysis, smart insights |
| **Storage** | Cloudinary | Image upload, CDN delivery |
| **Validation** | Zod | Runtime schema validation |
| **DevOps** | Docker, GitHub Actions | CI/CD, containerisation |

<br />

---

<br />

## ✦ Database Schema

<br />

```
users ──────────────────────────────────────────────────────────────────────┐
  │                                                                          │
  ├──< posts >──< likes                                                      │
  │      └──< comments >──< comments (self-referential replies)             │
  │                                                                          │
  ├──< follows (followerId ↔ followingId)                                   │
  │                                                                          │
  ├──< community_members >──< communities                                   │
  │                                                                          │
  ├──< chat_participants >──< chats >──< messages                           │
  │                                                                          │
  ├──< notifications (actor ↔ receiver)                                     │
  │                                                                          │
  ├──< resumes                                                               │
  │                                                                          │
  └──< ai_recommendations ────────────────────────────────────────────────┘

  12 tables  •  Proper indexes  •  Cascade deletes  •  UUID primary keys
```

<br />

---

<br />

## ✦ AI System

<br />

```
┌──────────────────────────────────────────────────────────────────────────┐
│                       SkyCampus AI Microservice                          │
│                         Python 3.11 + FastAPI                            │
├──────────────┬──────────────┬───────────────┬────────────┬──────────────┤
│  Study Buddy │   Semantic   │    Resume     │    Feed    │  Moderation  │
│   Matching   │   Search     │   Analyzer    │  Ranking   │   Pipeline   │
├──────────────┼──────────────┼───────────────┼────────────┼──────────────┤
│ Embeds user  │ Natural lang │ PDF text ext  │ Ranks posts│ Toxicity +   │
│ profiles via │ query over   │ GPT-4o skill  │ by cosine  │ spam         │
│ MiniLM-L6-v2 │ all users    │ extraction +  │ similarity │ detection    │
│ cosine sim   │ vector space │ ATS scoring   │ + engage   │ + flagging   │
├──────────────┴──────────────┴───────────────┴────────────┴──────────────┤
│  Model: all-MiniLM-L6-v2  •  384-dim vectors  •  ~50ms  •  CPU-only     │
└──────────────────────────────────────────────────────────────────────────┘
```

<br />

---

<br />

## ✦ Project Structure

<br />

```
skycampus/
│
├── 📁 backend/                    Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/                db.ts • redis.ts • cloudinary.ts
│   │   ├── controllers/           auth • user • post • community • chat • notification
│   │   ├── middleware/            auth.ts • validate.ts • errorHandler.ts • rateLimiter.ts
│   │   ├── repositories/          Raw Prisma queries — one file per entity
│   │   ├── routes/                Express routers — versioned at /api/v1
│   │   ├── services/              Business logic layer — cache-aware
│   │   ├── sockets/               Socket.IO — chat events + notification emitter
│   │   ├── validators/            Zod schemas for all request bodies
│   │   └── app.ts / server.ts     Express app + HTTP server bootstrap
│   ├── prisma/
│   │   ├── schema.prisma          12-model schema with full relations
│   │   └── seed.ts                Dev seed — 3 users, communities, posts
│   ├── tests/                     auth.test.ts • post.test.ts
│   ├── railway.toml               Railway Nixpacks build config
│   └── nixpacks.toml              npm install + prisma generate + tsc
│
├── 📁 frontend/                   Next.js 14 App Router + TypeScript
│   └── src/
│       ├── app/                   11 pages — feed • profile • chat • communities
│       │   ├── (auth)/            login • register
│       │   ├── feed/              Infinite scroll social feed
│       │   ├── profile/[id]/      Dynamic user profiles
│       │   ├── chat/              Real-time Socket.IO chat
│       │   ├── communities/       Browse + create + join
│       │   ├── notifications/     Live notification centre
│       │   ├── settings/          Edit profile + skills
│       │   └── ai/                resume analyzer • buddy finder
│       ├── components/            ui • feed • chat • layout • profile
│       ├── hooks/                 useFeed • useAuth • useToggleLike • useSocket
│       ├── services/              api.ts (Axios) • socket.ts (Socket.IO)
│       ├── store/                 Redux slices — authSlice
│       └── types/                 Shared TypeScript interfaces
│
├── 📁 ai-service/                 Python 3.11 + FastAPI
│   ├── routers/                   recommend • search • resume • moderate • feed
│   ├── services/
│   │   └── embedder.py            sentence-transformers + cosine similarity
│   ├── main.py                    FastAPI app — 5 AI routers mounted
│   └── requirements.txt
│
├── 📄 docker-compose.yml          Local dev — postgres + redis + all services
├── 📄 render.yaml                 Render deployment config
├── 📄 vercel.json                 Vercel deployment config
├── 📄 setup.sh                    One-command local setup script
└── 📄 README.md                   You are here
```

<br />

---

<br />

## ✦ API Reference

<br />

```
AUTH          POST   /api/v1/auth/register        Create account
              POST   /api/v1/auth/login            JWT tokens in cookies
              POST   /api/v1/auth/logout           Clear session
              POST   /api/v1/auth/refresh          Rotate refresh token
              GET    /api/v1/auth/me               Current user

POSTS         GET    /api/v1/posts                 Cursor-paginated feed
              POST   /api/v1/posts                 Create post (multipart)
              PUT    /api/v1/posts/:id             Edit post
              DELETE /api/v1/posts/:id             Delete post
              GET    /api/v1/posts/trending         Redis sorted set top-10
              GET    /api/v1/posts/tag/:tag         Posts by hashtag
              POST   /api/v1/posts/:id/like        Toggle like (atomic)
              GET    /api/v1/posts/:id/comments    Threaded comments

USERS         GET    /api/v1/users/:id             View profile
              PUT    /api/v1/users/profile          Edit profile + avatar
              POST   /api/v1/users/:id/follow       Toggle follow
              GET    /api/v1/users/search           Full-text search
              GET    /api/v1/users/suggested        Suggested connections

COMMUNITIES   GET    /api/v1/communities            Browse all
              POST   /api/v1/communities            Create community
              POST   /api/v1/communities/:id/join   Toggle membership

CHAT          GET    /api/v1/chats                 My chat list
              POST   /api/v1/chats/dm              Start / get DM
              GET    /api/v1/chats/:id/messages    Message history

AI SERVICE    POST   /ai/v1/recommend/users        Study buddy matching
              POST   /ai/v1/search/users           Semantic user search
              POST   /ai/v1/resume/analyze         Resume analysis (PDF)
              POST   /ai/v1/moderate/content       Content moderation
              POST   /ai/v1/feed/rank              AI feed ranking
```

<br />

---

<br />

## ✦ Socket.IO Events

<br />

```
Client → Server                      Server → Client

join_room     { chatId }             new_message    message object
send_message  { chatId, content }    user_typing    { userId, chatId, typing }
typing_start  chatId                 user_online    { userId, online }
typing_stop   chatId                 notification   { type, actorId, resourceId }
mark_seen     messageId              message_seen   { messageId, userId }
```

<br />

---

<br />

## ✦ Quick Start

<br />

**Prerequisites:** Node.js 20+, Python 3.11+, Git

<br />

```bash
# 1. Clone the repository
git clone https://github.com/aako-aakash/skycampus.git
cd skycampus

# 2. One-command setup (installs deps, migrates DB, seeds data)
bash setup.sh

# 3. Start all services (three terminal tabs)

# Terminal 1 — Backend API
cd backend && npm run dev          # → http://localhost:5000

# Terminal 2 — Frontend
cd frontend && npm run dev         # → http://localhost:3000

# Terminal 3 — AI Service
cd ai-service && uvicorn main:app --reload   # → http://localhost:8000
```

<br />

**Or with Docker (zero setup):**

```bash
docker-compose up --build
# postgres + redis + backend + frontend + ai-service all start together
```

<br />

---

<br />

## ✦ Environment Variables

<br />

**`backend/.env`**

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:pass@localhost:5432/skycampus
JWT_ACCESS_SECRET=<node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
JWT_REFRESH_SECRET=<run above command again>
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

<br />

---

<br />

## ✦ Deployment

<br />

| Service | Platform | Cost |
|---|---|---|
| Frontend | Vercel | Free |
| Backend API | Railway | ~$5/month |
| AI Service | Render | Free / $7 Starter |
| Database | Neon PostgreSQL | Free |
| Redis Cache | Upstash | Free |
| Image Storage | Cloudinary | Free |

<br />

```bash
# Push to GitHub — CI/CD handles the rest
git push origin main

# Run migrations against production DB (one time only)
DATABASE_URL=<neon-url> npx prisma migrate deploy
DATABASE_URL=<neon-url> npx prisma db seed
```

> See the full deployment walkthrough in the [Deployment Guide](docs/DEPLOYMENT.md)

<br />

---

<br />

## ✦ Test Accounts

After seeding, use these to log in immediately:

<br />

| Name | Email | Password | Stack |
|---|---|---|---|
| Arjun Sharma | arjun@skycampus.edu | Password123 | React · Node.js · AI/ML |
| Priya Patel | priya@skycampus.edu | Password123 | Python · ML · NLP |
| Rohan Verma | rohan@skycampus.edu | Password123 | C++ · IoT · Embedded |

<br />

---

<br />

## ✦ Security Architecture

<br />

```
✓  bcrypt password hashing          12 salt rounds — brute force resistant
✓  JWT access tokens                15 min expiry — minimal exposure window
✓  Refresh token rotation           7 day tokens, rotated on every use
✓  Token reuse detection            Old refresh tokens invalidated immediately
✓  HTTP-only secure cookies         JWT inaccessible to JavaScript — XSS proof
✓  Helmet.js                        14 security response headers on every request
✓  CORS whitelist                   Only CLIENT_URL origin accepted
✓  Zod input validation             All request bodies sanitized before DB
✓  Prisma parameterized queries     SQL injection impossible by design
✓  Rate limiting                    10 req/15min auth  •  200 req/15min global
✓  Resource ownership checks        Every mutation verifies req.userId === owner
```

<br />

---

<br />

## ✦ Engineering Highlights

<br />

**Cursor-based pagination** — uses the last item ID as a stable anchor instead of page numbers, preventing duplicates in infinite scroll even as new content appears in real time.

**Optimistic UI** — TanStack Query's `onMutate` updates the feed instantly before the server responds. If the request fails, it automatically rolls back. Likes feel instant.

**Repository pattern** — raw DB access isolated in repository files. Controllers stay thin, services stay pure, repositories are mockable. Swapping Prisma for raw SQL requires touching zero business logic.

**Atomic like counters** — `likesCount` is incremented in the same `$transaction` as the like record insert. Impossible to get out of sync under concurrent requests.

**Graceful Redis degradation** — every cache operation wrapped in try/catch. Redis down = silent fallback to PostgreSQL. Zero downtime, zero user impact.

**CPU-only AI inference** — all-MiniLM-L6-v2 produces 384-dim embeddings in ~50ms on CPU. No GPU required. AI features run on any free-tier cloud instance.

<br />

---

<br />

## ✦ Contributing

<br />

```bash
# Fork → clone → create branch
git checkout -b feature/your-feature-name

# Make changes and write tests
npm test

# Commit with conventional commits
git commit -m "feat: add community post pinning"

# Open a pull request
git push origin feature/your-feature-name
```

All pull requests are welcome. Open an issue first for large features or breaking changes.

<br />

---

<br />

## ✦ License

MIT License — see [LICENSE](LICENSE) for full details.

Free to use, modify, and distribute for personal and commercial projects. Attribution appreciated.

<br />

---

<br />

<div align="center">

**Built with precision. Deployed with confidence.**

<br />

```
Next.js  ·  Node.js  ·  PostgreSQL  ·  Redis  ·  Socket.IO  ·  FastAPI  ·  sentence-transformers
```

<br />

*SkyCampus — Engineering a smarter campus, one commit at a time.*

<br />

⭐ **Star this repo** if it helped you learn something new

<br />

[![GitHub stars](https://img.shields.io/github/stars/yourname/skycampus?style=social)](https://github.com/yourname/skycampus)
[![GitHub forks](https://img.shields.io/github/forks/yourname/skycampus?style=social)](https://github.com/yourname/skycampus/fork)

</div>



## 👨‍💻 Author

**Akash Kumar Saw**

AI & Machine Learning Enthusiast | Software Engineer

[![LinkedIn]](https://www.linkedin.com/in/akash-kumar-saw-bb1630258/)

Feel free to connect with me on LinkedIn and explore my other projects.
