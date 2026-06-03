from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from services.embedder import embed_text, batch_similarities

router = APIRouter()

class SearchItem(BaseModel):
    id: str
    text: str
    metadata: dict = {}

class SearchRequest(BaseModel):
    query: str
    items: List[SearchItem]
    limit: int = 10
    threshold: float = 0.3

class SearchResult(BaseModel):
    id: str
    score: float
    metadata: dict

@router.post("/users", response_model=List[SearchResult])
async def semantic_search(req: SearchRequest):
    """Natural language search: 'students interested in machine learning and DSA'"""
    if not req.items:
        return []
    try:
        query_emb = embed_text(req.query)
        candidates = []
        for item in req.items:
            emb = embed_text(item.text)
            candidates.append({'id': item.id, 'embedding': emb, 'metadata': item.metadata})

        ranked = batch_similarities(query_emb, candidates)
        return [
            SearchResult(id=r['id'], score=r['score'], metadata=r['metadata'])
            for r in ranked if r['score'] >= req.threshold
        ][:req.limit]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/posts", response_model=List[SearchResult])
async def semantic_search_posts(req: SearchRequest):
    """Semantic search over posts by content similarity"""
    return await semantic_search(req)
