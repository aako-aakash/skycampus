# SkyCampus 🎓
### AI-Powered University Social Network Platform

> Your University. Your Network. Powered by AI.

---

## 🏗️ Architecture

```
Frontend (Next.js 14)          ──▶  Vercel CDN
        │
   REST + WebSockets
        │
┌───────┴────────┐
│                │
Backend          AI Service
(Node+Express)   (FastAPI)
│                │
PostgreSQL    Sentence-Transformers
Redis Cache   OpenAI Embeddings
Cloudinary    Pinecone Vector DB
```

## 📦 Project Structure

```
skycampus/
├── backend/          # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/       # DB, Redis, Cloudinary
│   │   ├── controllers/  # Route handlers
│   │   ├── middleware/   # Auth, validate, rate limit
│   │   ├── repositories/ # DB queries (Prisma)
│   │   ├── routes/       # Express routers
│   │   ├── services/     # Business logic
│   │   ├── sockets/      # Socket.IO
│   │   ├── validators/   # Zod schemas
│   │   └── app.ts
│   └── prisma/
│       ├── schema.prisma
│       └── seed.ts
├── frontend/         # Next.js 14 + TypeScript
│   └── src/
│       ├── app/          # App Router pages
│       ├── components/   # React components
│       ├── hooks/        # Custom hooks
│       ├── services/     # API + Socket
│       ├── store/        # Redux Toolkit
│       └── types/
├── ai-service/       # Python + FastAPI
│   ├── routers/      # recommend, search, resume, moderate, feed
│   ├── services/     # embedder
│   └── main.py
├── docker-compose.yml
└── .github/workflows/ci.yml
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+, Python 3.11+, Docker (optional)

### 1. Clone & Setup

```bash
git clone https://github.com/yourname/skycampus.git
cd skycampus
```

### 2. Backend

```bash
cd backend
cp .env.example .env          # Fill in your values
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev                    # http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
# NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
npm install
npm run dev                    # http://localhost:3000
```

### 4. AI Service

```bash
cd ai-service
cp .env.example .env
pip install -r requirements.txt
uvicorn main:app --reload      # http://localhost:8000
```

### 5. Or with Docker

```bash
cp backend/.env.example backend/.env
docker-compose up --build
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register user |
| POST | `/api/v1/auth/login` | Login |
| GET  | `/api/v1/posts` | Get feed (paginated) |
| POST | `/api/v1/posts` | Create post |
| POST | `/api/v1/posts/:id/like` | Like/unlike |
| GET  | `/api/v1/users/suggested` | Suggested users |
| POST | `/api/v1/users/:id/follow` | Follow/unfollow |
| GET  | `/api/v1/communities` | All communities |
| POST | `/api/v1/chats/dm` | Start DM chat |
| POST | `/ai/v1/recommend/users` | AI study buddy matching |
| POST | `/ai/v1/search/users` | Semantic search |
| POST | `/ai/v1/resume/analyze` | Resume AI analysis |
| POST | `/ai/v1/moderate/content` | Content moderation |

## ⚡ Socket.IO Events

**Client → Server:** `join_room`, `send_message`, `typing_start`, `typing_stop`, `mark_seen`

**Server → Client:** `new_message`, `user_typing`, `user_online`, `notification`, `message_seen`

## 🚢 Deployment

| Service | Platform | Notes |
|---------|----------|-------|
| Frontend | Vercel | Auto-deploy on push |
| Backend | Railway | Node.js runtime |
| AI Service | Render | Python runtime |
| Database | Neon PostgreSQL | Serverless |
| Cache | Upstash Redis | Serverless |
| Storage | Cloudinary | Image CDN |

### Environment Variables (Backend)

```env
DATABASE_URL=postgresql://...
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
REDIS_URL=redis://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
AI_SERVICE_URL=https://skycampus-ai.onrender.com
```

## 🛠️ Tech Stack

**Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS, TanStack Query, Redux Toolkit, Socket.IO Client

**Backend:** Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL, Redis, Socket.IO, JWT, bcryptjs

**AI Service:** Python 3.11, FastAPI, sentence-transformers, OpenAI, pdfplumber

**DevOps:** Docker, GitHub Actions, Vercel, Railway, Render

## 📊 Database Schema

12 tables: `users`, `posts`, `comments`, `likes`, `follows`, `communities`, `community_members`, `chats`, `chat_participants`, `messages`, `notifications`, `resumes`

## 👥 Test Accounts (after seed)

| Email | Password | Profile |
|-------|----------|---------|
| arjun@skycampus.edu | Password123 | CS Engineer, MIT Pune |
| priya@skycampus.edu | Password123 | ML Researcher, BITS |
| rohan@skycampus.edu | Password123 | IoT Engineer, IIT |

---
SkyCampus © 2025


## 👨‍💻 Author

**Akash Kumar Saw**

AI & Machine Learning Enthusiast | Software Engineer

[![LinkedIn]](https://www.linkedin.com/in/akash-kumar-saw-bb1630258/)

Feel free to connect with me on LinkedIn and explore my other projects.
