from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from services.embedder import embed_user_profile, embed_post, batch_similarities

router = APIRouter()

class PostItem(BaseModel):
    id: str
    content: str
    tags: List[str] = []
    likesCount: int = 0
    commentsCount: int = 0
    createdAt: str = ""

class FeedRankRequest(BaseModel):
    userProfile: dict
    posts: List[PostItem]
    limit: int = 20

class RankedPost(BaseModel):
    id: str
    score: float

@router.post("/rank", response_model=List[RankedPost])
async def rank_feed(req: FeedRankRequest):
    if not req.posts:
        return []
    user_emb = embed_user_profile(req.userProfile)
    candidates = []
    for p in req.posts:
        post_emb = embed_post(p.dict())
        engagement_boost = min(0.2, (p.likesCount * 0.01 + p.commentsCount * 0.02))
        candidates.append({'id': p.id, 'embedding': post_emb, 'engagement_boost': engagement_boost})

    ranked = batch_similarities(user_emb, candidates)
    return [RankedPost(id=r['id'], score=round(r['score'] + r.get('engagement_boost', 0), 4)) for r in ranked][:req.limit]
