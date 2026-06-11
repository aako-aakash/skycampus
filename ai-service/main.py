from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()

from routers import recommend, search, resume, moderate, feed

app = FastAPI(title="SkyCampus AI Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommend.router, prefix="/ai/v1/recommend", tags=["Recommendations"])
app.include_router(search.router,    prefix="/ai/v1/search",    tags=["Semantic Search"])
app.include_router(resume.router,    prefix="/ai/v1/resume",    tags=["Resume Analysis"])
app.include_router(moderate.router,  prefix="/ai/v1/moderate",  tags=["Moderation"])
app.include_router(feed.router,      prefix="/ai/v1/feed",      tags=["Feed AI"])

@app.get("/")
def root():
    return {
        "name": "SkyCampus AI Service",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "health":    "GET  /health",
            "recommend": "POST /ai/v1/recommend/users",
            "search":    "POST /ai/v1/search/users",
            "resume":    "POST /ai/v1/resume/analyze",
            "moderate":  "POST /ai/v1/moderate/content",
            "feed":      "POST /ai/v1/feed/rank",
            "docs":      "GET  /docs",
        }
    }

@app.get("/health")
def health():
    return {"status": "ok", "service": "skycampus-ai", "version": "1.0.0"}
