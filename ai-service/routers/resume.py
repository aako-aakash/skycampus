from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import pdfplumber
import io
import os
from openai import OpenAI

router = APIRouter()

class ResumeAnalysis(BaseModel):
    score: float
    skills: List[str]
    strengths: List[str]
    improvements: List[str]
    missingKeywords: List[str]
    suggestedCommunities: List[str]
    atsScore: float
    summary: str

def extract_pdf_text(content: bytes) -> str:
    with pdfplumber.open(io.BytesIO(content)) as pdf:
        return "\n".join(page.extract_text() or "" for page in pdf.pages)

def analyze_with_llm(resume_text: str) -> dict:
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    prompt = f"""Analyze this student resume and respond ONLY with a JSON object (no markdown):
{{
  "score": <0-100 float>,
  "atsScore": <0-100 float>,
  "skills": ["skill1", ...],
  "strengths": ["strength1", ...],
  "improvements": ["improvement1", ...],
  "missingKeywords": ["keyword1", ...],
  "suggestedCommunities": ["community1", ...],
  "summary": "2-sentence summary"
}}

Resume:
{resume_text[:4000]}"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
        max_tokens=1000,
    )
    import json
    text = response.choices[0].message.content or "{}"
    text = text.replace("```json", "").replace("```", "").strip()
    return json.loads(text)

def analyze_without_llm(resume_text: str) -> dict:
    """Fallback analysis when no OpenAI key is set"""
    text_lower = resume_text.lower()
    tech_skills = ['python','javascript','typescript','react','node','java','c++','sql','docker','kubernetes','aws','git','machine learning','deep learning','fastapi','django','flask','mongodb','postgresql','redis']
    found_skills = [s for s in tech_skills if s in text_lower]

    score = min(95, 50 + len(found_skills) * 3 + (10 if 'project' in text_lower else 0) + (10 if 'github' in text_lower else 0))
    missing = [s for s in ['docker','kubernetes','aws','ci/cd','testing'] if s not in text_lower]

    return {
        "score": float(score), "atsScore": float(score * 0.9),
        "skills": found_skills,
        "strengths": ["Strong technical background", "Multiple projects listed" if 'project' in text_lower else "Clear work experience"],
        "improvements": ["Quantify achievements with metrics", "Add GitHub profile link", "Include measurable impact statements"],
        "missingKeywords": missing[:5],
        "suggestedCommunities": ["Open Source Hub", "AI/ML Club" if 'machine learning' in text_lower else "Coding Club", "Placement Prep"],
        "summary": f"Resume shows {len(found_skills)} technical skills. Improve by quantifying achievements and adding cloud/DevOps keywords.",
    }

@router.post("/analyze", response_model=ResumeAnalysis)
async def analyze_resume(file: UploadFile = File(...)):
    if not file.filename or not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    try:
        content = await file.read()
        resume_text = extract_pdf_text(content)
        if len(resume_text.strip()) < 50:
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")

        if os.environ.get("OPENAI_API_KEY"):
            result = analyze_with_llm(resume_text)
        else:
            result = analyze_without_llm(resume_text)

        return ResumeAnalysis(**result)
    except HTTPException: raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
