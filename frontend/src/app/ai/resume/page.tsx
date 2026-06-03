'use client'
import { useState, useRef } from 'react'
import Navbar from '@/components/layout/Navbar'
import { Upload, FileText, CheckCircle, AlertCircle, XCircle, Loader2, Sparkles, Target } from 'lucide-react'
import axios from 'axios'

interface Analysis {
  score: number; atsScore: number; skills: string[]
  strengths: string[]; improvements: string[]; missingKeywords: string[]
  suggestedCommunities: string[]; summary: string
}

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Analysis | null>(null)
  const [error, setError]   = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    if (!f.name.endsWith('.pdf')) { setError('Only PDF files supported'); return }
    setFile(f); setError(null); setResult(null)
  }

  const analyze = async () => {
    if (!file) return
    setLoading(true); setError(null)
    try {
      const fd = new FormData(); fd.append('file', file)
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:8000'}/ai/v1/resume/analyze`, fd,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      setResult(data)
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Analysis failed. Make sure the AI service is running.')
    } finally { setLoading(false) }
  }

  const ScoreRing = ({ value, label, color }: { value: number; label: string; color: string }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" className="dark:stroke-slate-700" />
          <circle cx="18" cy="18" r="15" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
            strokeDasharray={`${(value / 100) * 94.2} 94.2`} className="transition-all duration-1000" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-800 dark:text-white">{Math.round(value)}</span>
      </div>
      <span className="text-xs text-slate-500 font-medium">{label}</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-3xl mx-auto pt-14 px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-4">
            <Sparkles size={12} /> AI-Powered
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Resume Analyzer</h1>
          <p className="text-slate-500 text-sm">Upload your PDF resume and get instant AI feedback, ATS score, and improvement suggestions</p>
        </div>

        {/* Upload zone */}
        <div
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          className="card p-10 text-center cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 transition-colors mb-4"
        >
          <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => { const f = e.target.files?.[0]; if(f) handleFile(f) }} />
          {file ? (
            <div className="flex flex-col items-center gap-3">
              <FileText size={40} className="text-sky-500" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{file.name}</p>
                <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(0)} KB · Ready to analyze</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <Upload size={40} strokeWidth={1.5} />
              <div>
                <p className="font-medium text-slate-600 dark:text-slate-400">Drop your PDF resume here</p>
                <p className="text-sm">or click to browse files</p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm mb-4">
            <XCircle size={16} /> {error}
          </div>
        )}

        <button onClick={analyze} disabled={!file || loading}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 hover:opacity-90 transition mb-8">
          {loading ? <><Loader2 size={16} className="animate-spin" /> Analyzing with AI...</> : <><Sparkles size={16} /> Analyze Resume</>}
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-5">
            {/* Scores */}
            <div className="card p-6">
              <h2 className="font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-2"><Target size={18} className="text-sky-500" /> Resume Scores</h2>
              <div className="flex justify-around">
                <ScoreRing value={result.score}    label="Overall Score" color="#0ea5e9" />
                <ScoreRing value={result.atsScore} label="ATS Score"      color="#6366f1" />
                <ScoreRing value={Math.min(100, result.skills.length * 8)} label="Skill Density" color="#10b981" />
              </div>
              <p className="mt-5 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded-xl p-3 leading-relaxed">{result.summary}</p>
            </div>

            {/* Skills */}
            <div className="card p-6">
              <h2 className="font-bold text-slate-800 dark:text-white mb-4">✅ Detected Skills</h2>
              <div className="flex flex-wrap gap-2">
                {result.skills.map(s => (
                  <span key={s} className="px-3 py-1 rounded-full text-xs font-medium bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">{s}</span>
                ))}
              </div>
            </div>

            {/* Strengths + Improvements side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-5">
                <h2 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> Strengths</h2>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <span className="text-emerald-500 mt-0.5">▸</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-5">
                <h2 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><AlertCircle size={16} className="text-amber-500" /> Improvements</h2>
                <ul className="space-y-2">
                  {result.improvements.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <span className="text-amber-500 mt-0.5">▸</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Missing Keywords */}
            {result.missingKeywords.length > 0 && (
              <div className="card p-5">
                <h2 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><XCircle size={16} className="text-rose-500" /> Missing Keywords</h2>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.map(k => (
                    <span key={k} className="px-3 py-1 rounded-full text-xs font-medium bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">{k}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Community recs */}
            {result.suggestedCommunities.length > 0 && (
              <div className="card p-5">
                <h2 className="font-bold text-slate-800 dark:text-white mb-4">🏘️ Suggested Communities</h2>
                <div className="space-y-2">
                  {result.suggestedCommunities.map(c => (
                    <div key={c} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{c}</span>
                      <a href="/communities" className="text-xs text-sky-500 hover:text-sky-400 font-medium">Join →</a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
