'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { userAPI } from '@/services/api'
import { useAuth, useProfile } from '@/hooks'
import PostCard from '@/components/feed/PostCard'
import Navbar from '@/components/layout/Navbar'
import { GraduationCap, Github, Linkedin, Link2, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Post } from '@/types'

export default function ProfilePage() {
  const params = useParams()
  const id = params?.id as string
  const { user: me } = useAuth()
  const qc = useQueryClient()
  const [isFollowing, setIsFollowing] = useState(false)

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      const { data } = await userAPI.getProfile(id)
      return data.data.user
    },
    enabled: !!id,
  })

  const { data: postsData, fetchNextPage, hasNextPage } = useProfile(id)
  const posts: Post[] = postsData?.pages.flatMap((p: any) => p.posts ?? []) ?? []

  const handleFollow = async () => {
    try {
      await userAPI.toggleFollow(id)
      setIsFollowing((prev) => !prev)
      qc.invalidateQueries({ queryKey: ['profile', id] })
    } catch { toast.error('Failed') }
  }

  if (isLoading) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
      <Navbar />
      <Loader2 className="animate-spin text-sky-500" size={32} />
    </div>
  )

  const profile = profileData
  if (!profile) return null
  const isMe = me?.id === id
  const links = profile.socialLinks as any

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-3xl mx-auto pt-14 px-4 pb-12">
        <div className="h-40 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 rounded-b-2xl overflow-hidden relative">
          {profile.coverImage && <img src={profile.coverImage} alt="cover" className="w-full h-full object-cover" />}
        </div>
        <div className="flex items-end justify-between px-4 -mt-12 mb-4">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 border-4 border-white dark:border-slate-950 overflow-hidden flex items-center justify-center text-white text-3xl font-bold shadow-xl">
            {profile.profilePicture
              ? <img src={profile.profilePicture} alt={profile.name} className="object-cover w-full h-full" />
              : profile.name[0]}
          </div>
          <div className="flex gap-2 pb-1">
            {isMe ? (
              <a href="/settings" className="px-5 py-2 rounded-xl text-sm font-medium border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition">Edit Profile</a>
            ) : (
              <button onClick={handleFollow}
                className={`px-6 py-2 rounded-xl text-sm font-semibold transition ${isFollowing ? 'border border-slate-300 dark:border-slate-700 hover:bg-red-50 hover:text-red-500' : 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:opacity-90'}`}>
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>
        <div className="card p-5 mb-6">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{profile.name}</h1>
          <p className="text-slate-500 text-sm mb-2">@{profile.username}</p>
          {profile.bio && <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">{profile.bio}</p>}
          {profile.university && (
            <div className="flex items-center gap-1 text-sm text-slate-500 mb-4">
              <GraduationCap size={14} />
              <span>{profile.university}{profile.branch ? ` · ${profile.branch}` : ''}{profile.year ? ` · Year ${profile.year}` : ''}</span>
            </div>
          )}
          <div className="flex gap-6 text-sm mb-4">
            <span><strong className="text-slate-900 dark:text-white">{profile._count?.followers ?? 0}</strong> <span className="text-slate-500">Followers</span></span>
            <span><strong className="text-slate-900 dark:text-white">{profile._count?.following ?? 0}</strong> <span className="text-slate-500">Following</span></span>
            <span><strong className="text-slate-900 dark:text-white">{profile._count?.posts ?? 0}</strong> <span className="text-slate-500">Posts</span></span>
          </div>
          {profile.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.skills.map((s: string) => (
                <span key={s} className="px-3 py-1 text-xs font-medium rounded-full bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">{s}</span>
              ))}
            </div>
          )}
          <div className="flex gap-3 mt-2">
            {links?.github   && <a href={links.github}   target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"><Github size={18} /></a>}
            {links?.linkedin && <a href={links.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-sky-600 transition"><Linkedin size={18} /></a>}
            {links?.website  && <a href={links.website}  target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"><Link2 size={18} /></a>}
          </div>
        </div>
        <div className="space-y-4">
          {posts.map((post: Post) => <PostCard key={post.id} post={post} />)}
          {hasNextPage && (
            <button onClick={() => fetchNextPage()} className="w-full py-3 text-sm text-sky-500 hover:text-sky-400 transition font-medium">Load more</button>
          )}
          {posts.length === 0 && <div className="card p-8 text-center text-slate-400 text-sm">No posts yet</div>}
        </div>
      </div>
    </div>
  )
}
