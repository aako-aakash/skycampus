from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from services.embedder import embed_user_profile, batch_similarities

router = APIRouter()

class UserProfile(BaseModel):
    id: str
    name: str
    username: str
    bio: Optional[str] = ""
    university: Optional[str] = ""
    branch: Optional[str] = ""
    year: Optional[int] = None
    skills: List[str] = []
    interests: List[str] = []
    profilePicture: Optional[str] = None

class RecommendRequest(BaseModel):
    targetUser: UserProfile
    candidates: List[UserProfile]
    limit: int = 10

class RecommendResult(BaseModel):
    userId: str
    name: str
    username: str
    university: Optional[str]
    branch: Optional[str]
    profilePicture: Optional[str]
    score: float
    reason: str

@router.post("/users", response_model=List[RecommendResult])
async def recommend_study_buddies(req: RecommendRequest):
    if not req.candidates:
        return []
    try:
        target_emb = embed_user_profile(req.targetUser.dict())
        candidates_with_emb = []
        for c in req.candidates:
            emb = embed_user_profile(c.dict())
            candidates_with_emb.append({**c.dict(), 'embedding': emb})

        ranked = batch_similarities(target_emb, candidates_with_emb)[:req.limit]

        results = []
        for r in ranked:
            shared_skills    = set(req.targetUser.skills)    & set(r.get('skills', []))
            shared_interests = set(req.targetUser.interests) & set(r.get('interests', []))
            reason_parts = []
            if shared_skills:    reason_parts.append(f"Shares skills: {', '.join(list(shared_skills)[:3])}")
            if shared_interests: reason_parts.append(f"Common interests: {', '.join(list(shared_interests)[:2])}")
            if r.get('university') == req.targetUser.university: reason_parts.append("Same university")
            reason = ". ".join(reason_parts) if reason_parts else "Similar academic profile"

            results.append(RecommendResult(
                userId=r['id'], name=r['name'], username=r['username'],
                university=r.get('university'), branch=r.get('branch'),
                profilePicture=r.get('profilePicture'), score=r['score'], reason=reason
            ))
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
