import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">SkyCampus</div>
        <div className="flex gap-3">
          <Link href="/login" className="px-5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition">Login</Link>
          <Link href="/register" className="px-5 py-2 rounded-xl text-sm font-medium bg-sky-500 hover:bg-sky-400 transition">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium mb-8 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" /> AI-Powered University Network
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-none">
          <span className="bg-gradient-to-r from-white via-sky-200 to-indigo-300 bg-clip-text text-transparent">Sky</span>
          <span className="text-white">Campus</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-lg mb-10 leading-relaxed">
          Your University. Your Network. Powered by AI. — Connect, collaborate, and grow with students across universities.
        </p>
        <div className="flex gap-4">
          <Link href="/register" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 font-semibold text-lg shadow-2xl shadow-sky-500/30 hover:shadow-sky-500/50 transition-all hover:-translate-y-0.5">
            Join SkyCampus →
          </Link>
          <Link href="/feed" className="px-8 py-4 rounded-2xl border border-white/20 font-medium text-slate-300 hover:bg-white/10 transition">
            Browse Feed
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 pb-16 max-w-4xl mx-auto w-full">
        {[
          { icon:'🤖', title:'AI Matching', desc:'Find study buddies using embeddings' },
          { icon:'💬', title:'Real-time Chat', desc:'Socket.IO powered messaging' },
          { icon:'🏘️', title:'Communities', desc:'Join clubs and groups' },
          { icon:'📄', title:'Resume AI', desc:'AI-powered resume analysis' },
        ].map(f => (
          <div key={f.title} className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <div className="text-3xl mb-3">{f.icon}</div>
            <div className="font-semibold mb-1">{f.title}</div>
            <div className="text-sm text-slate-400">{f.desc}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
