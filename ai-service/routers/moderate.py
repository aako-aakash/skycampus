from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import re

router = APIRouter()

TOXIC_PATTERNS = [
    r'\b(hate|kill|die|stupid|idiot|moron|loser|trash|garbage|worthless)\b',
    r'\b(spam|buy now|click here|free money|earn \$|guaranteed)\b',
]
SPAM_PATTERNS = [r'(.)\1{4,}', r'(http|www\.)[^\s]+', r'\b\d{10,}\b']

class ModerationRequest(BaseModel):
    content: str
    userId: str

class ModerationResult(BaseModel):
    allowed: bool
    toxicityScore: float
    spamScore: float
    flags: List[str]
    reason: str

@router.post("/content", response_model=ModerationResult)
async def moderate_content(req: ModerationRequest):
    text = req.content.lower()
    flags = []
    tox_score = 0.0
    spam_score = 0.0

    for p in TOXIC_PATTERNS:
        if re.search(p, text):
            flags.append("toxic_language")
            tox_score = min(1.0, tox_score + 0.4)

    for p in SPAM_PATTERNS:
        if re.search(p, text):
            flags.append("spam")
            spam_score = min(1.0, spam_score + 0.3)

    if len(req.content) > 1800:
        flags.append("excessive_length")

    allowed = tox_score < 0.7 and spam_score < 0.6
    reason = "Content approved" if allowed else f"Blocked: {', '.join(set(flags))}"

    return ModerationResult(allowed=allowed, toxicityScore=round(tox_score, 2), spamScore=round(spam_score, 2), flags=list(set(flags)), reason=reason)
