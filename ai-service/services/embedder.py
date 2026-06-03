from sentence_transformers import SentenceTransformer
from functools import lru_cache
import numpy as np
from typing import List

@lru_cache(maxsize=1)
def get_model() -> SentenceTransformer:
    return SentenceTransformer('all-MiniLM-L6-v2')

def embed_text(text: str) -> List[float]:
    return get_model().encode(text.strip(), normalize_embeddings=True).tolist()

def embed_user_profile(user: dict) -> List[float]:
    text = f"""
    {user.get('name', '')} studies {user.get('branch', '')}.
    Skills: {', '.join(user.get('skills', []))}.
    Interests: {', '.join(user.get('interests', []))}.
    University: {user.get('university', '')}, Year {user.get('year', '')}.
    Bio: {user.get('bio', '')}.
    """.strip()
    return embed_text(text)

def embed_post(post: dict) -> List[float]:
    text = f"{post.get('content', '')} Tags: {' '.join(post.get('tags', []))}"
    return embed_text(text)

def cosine_similarity(a: List[float], b: List[float]) -> float:
    va, vb = np.array(a), np.array(b)
    denom = np.linalg.norm(va) * np.linalg.norm(vb)
    if denom == 0:
        return 0.0
    return float(np.dot(va, vb) / denom)

def batch_similarities(query_emb: List[float], candidates: List[dict]) -> List[dict]:
    q = np.array(query_emb)
    results = []
    for c in candidates:
        emb = np.array(c.get('embedding', []))
        if len(emb) == 0:
            continue
        score = float(np.dot(q, emb) / (np.linalg.norm(q) * np.linalg.norm(emb) + 1e-9))
        results.append({**c, 'score': round(score, 4)})
    return sorted(results, key=lambda x: x['score'], reverse=True)
