'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle, Share2, MoreHorizontal, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Post } from '@/types'
import { useToggleLike } from '@/hooks'
import { useAuth } from '@/hooks'
import { postAPI } from '@/services/api'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface Props { post: Post; onDelete?: (id: string) => void }

export default function PostCard({ post, onDelete }: Props) {
  const { mutate: toggleLike } = useToggleLike()
  const { user } = useAuth()
  const qc = useQueryClient()
  const [showMenu, setShowMenu] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleDelete = async () => {
    try { await postAPI.delete(post.id); qc.invalidateQueries({ queryKey: ['feed'] }); toast.success('Deleted'); onDelete?.(post.id) }
    catch { toast.error('Failed to delete') }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return
    setSubmitting(true)
    try { await postAPI.createComment(post.id, { content: comment }); setComment(''); qc.invalidateQueries({ queryKey: ['comments', post.id] }); toast.success('Comment added') }
    catch { toast.error('Failed') }
    finally { setSubmitting(false) }
  }

  return (
    <div className="card p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <Link href={`/profile/${post.user.id}`} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm overflow-hidden shrink-0">
            {post.user.profilePicture
              ? <Image src={post.user.profilePicture} alt={post.user.name} width={40} height={40} className="w-full h-full object-cover rounded-full" />
              : post.user.name[0].toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-sm text-slate-800 dark:text-slate-200 hover:text-sky-600 transition">{post.user.name}</div>
            <div className="text-xs text-slate-400">@{post.user.username} · {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</div>
          </div>
        </Link>
        {user?.id === post.user.id && (
          <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition">
              <MoreHorizontal size={16} />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-1 z-10 min-w-[140px]">
                <button onClick={handleDelete} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">{post.content}</p>

      {/* Image */}
      {post.imageUrl && (
        <div className="rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800">
          <Image src={post.imageUrl} alt="Post" width={600} height={400} className="w-full object-cover max-h-80" />
        </div>
      )}

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.map(t => (
            <Link key={t} href={`/feed?tag=${t}`} className="text-xs text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium">#{t}</Link>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button onClick={() => toggleLike(post.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition ${post.isLiked ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
          <Heart size={15} fill={post.isLiked ? 'currentColor' : 'none'} /> {post.likesCount}
        </button>
        <button onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <MessageCircle size={15} /> {post.commentsCount}
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition ml-auto">
          <Share2 size={15} />
        </button>
      </div>

      {/* Comment form */}
      {showComments && (
        <form onSubmit={handleComment} className="flex gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Write a comment..."
            className="flex-1 px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:border-sky-400 transition" />
          <button type="submit" disabled={submitting || !comment.trim()}
            className="px-4 py-2 rounded-xl bg-sky-500 text-white text-sm font-medium disabled:opacity-50 hover:bg-sky-400 transition">
            Post
          </button>
        </form>
      )}
    </div>
  )
}
