'use client'
import { useEffect, useRef } from 'react'
import { useFeed } from '@/hooks'
import PostCard from '@/components/feed/PostCard'
import CreatePost from '@/components/feed/CreatePost'
import Navbar from '@/components/layout/Navbar'
import { Loader2, Sparkles } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { fetchMe } from '@/store/slices/authSlice'
import type { AppDispatch } from '@/store'

export default function FeedPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFeed()
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => { dispatch(fetchMe()) }, [dispatch])

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const el = loaderRef.current
    if (!el) return
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage()
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const posts = data?.pages.flatMap(p => p.posts) ?? []

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-6xl mx-auto pt-14 flex gap-6 px-4 py-6">

        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col gap-3 w-56 shrink-0 pt-1">
          {[
            { emoji: '🏠', label: 'Home Feed', href: '/feed' },
            { emoji: '🏘️', label: 'Communities', href: '/communities' },
            { emoji: '💬', label: 'Messages', href: '/chat' },
            { emoji: '🔔', label: 'Notifications', href: '/notifications' },
            { emoji: '🤖', label: 'AI Matching', href: '/ai/recommend' },
            { emoji: '📄', label: 'Resume AI', href: '/ai/resume' },
            { emoji: '⚙️', label: 'Settings', href: '/settings' },
          ].map(l => (
            <a key={l.href} href={l.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition border border-transparent hover:border-slate-200 dark:hover:border-slate-800">
              <span>{l.emoji}</span>{l.label}
            </a>
          ))}
        </aside>

        {/* Main Feed */}
        <main className="flex-1 max-w-xl mx-auto w-full space-y-4">
          <CreatePost />

          {isLoading && (
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="card p-5 animate-pulse">
                  <div className="flex gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="flex-1 space-y-2"><div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" /><div className="h-2 bg-slate-100 dark:bg-slate-700 rounded w-1/4" /></div>
                  </div>
                  <div className="space-y-2"><div className="h-3 bg-slate-200 dark:bg-slate-800 rounded" /><div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-4/5" /></div>
                </div>
              ))}
            </div>
          )}

          {posts.map(post => <PostCard key={post.id} post={post} />)}

          <div ref={loaderRef} className="py-4 flex justify-center">
            {isFetchingNextPage && <Loader2 size={20} className="animate-spin text-sky-500" />}
            {!hasNextPage && posts.length > 0 && (
              <p className="text-sm text-slate-400 flex items-center gap-2"><Sparkles size={14} /> You&apos;re all caught up!</p>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-64 shrink-0 space-y-4 pt-1">
          <div className="card p-4">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <span>🔥</span> Trending Tags
            </div>
            {['ai','nextjs','placement','opensource','machinelearning','devops','react','python'].map(tag => (
              <a key={tag} href={`/feed?tag=${tag}`} className="block py-1.5 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 transition">#{tag}</a>
            ))}
          </div>
          <div className="card p-4">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <span>✨</span> Suggested for You
            </div>
            <p className="text-xs text-slate-400">Connect your profile to see AI-powered suggestions</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
