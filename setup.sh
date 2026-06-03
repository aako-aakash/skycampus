#!/bin/bash
# SkyCampus Quick Start Script
set -e

echo "🚀 SkyCampus Setup Starting..."

# Backend
echo "📦 Installing backend dependencies..."
cd backend
npm install
cp .env.example .env
echo "✅ Backend deps installed"

# Database
echo "🗄️  Setting up database..."
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
echo "✅ Database ready with seed data"

cd ..

# Frontend
echo "🌐 Installing frontend dependencies..."
cd frontend
npm install
cp .env.example .env.local
echo "✅ Frontend deps installed"

cd ..

# AI Service
echo "🤖 Setting up AI service..."
cd ai-service
python3 -m venv venv 2>/dev/null || true
source venv/bin/activate 2>/dev/null || true
pip install -r requirements.txt --quiet
cp .env.example .env
echo "✅ AI service ready"

cd ..

echo ""
echo "✅ SkyCampus is ready!"
echo ""
echo "Start services:"
echo "  Backend:    cd backend && npm run dev"
echo "  Frontend:   cd frontend && npm run dev"
echo "  AI Service: cd ai-service && uvicorn main:app --reload"
echo ""
echo "Test accounts:"
echo "  arjun@skycampus.edu / Password123"
echo "  priya@skycampus.edu / Password123"
