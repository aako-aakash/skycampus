'use client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { notifAPI } from '@/services/api'
import Navbar from '@/components/layout/Navbar'
import { Bell, Heart, MessageCircle, UserPlus, Check } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'
import type { Notification } from '@/types'

const icons: Record<string, any> = {
  LIKE:    { icon: Heart,       color: 'text-rose-500',  bg: 'bg-rose-50 dark:bg-rose-900/20' },
  COMMENT: { icon: MessageCircle, color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-900/20' },
  FOLLOW:  { icon: UserPlus,    color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
}
const messages: Record<string, string> = {
  LIKE: 'liked your post', COMMENT: 'commented on your post', FOLLOW: 'started following you',
}

export default function NotificationsPage() {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => { const { data } = await notifAPI.getAll(); return data.data as { data: Notification[] } },
  })

  const markRead = async () => {
    try { await notifAPI.markAllRead(); qc.invalidateQueries({ queryKey: ['notifications'] }); toast.success('All marked as read') }
    catch { toast.error('Failed') }
  }

  const notifs = data?.data ?? []
  const unread = notifs.filter(n => !n.isRead).length

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-2xl mx-auto pt-14 px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bell size={22} /> Notifications
              {unread > 0 && <span className="px-2 py-0.5 text-xs rounded-full bg-rose-500 text-white font-bold">{unread}</span>}
            </h1>
          </div>
          {unread > 0 && (
            <button onClick={markRead} className="flex items-center gap-2 text-sm text-sky-500 hover:text-sky-400 font-medium transition">
              <Check size={14} /> Mark all read
            </button>
          )}
        </div>

        <div className="card overflow-hidden">
          {isLoading && (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex items-center gap-3 p-4 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="flex-1 space-y-2"><div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4" /><div className="h-2 bg-slate-100 dark:bg-slate-700 rounded w-1/4" /></div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && notifs.length === 0 && (
            <div className="py-16 text-center text-slate-400">
              <Bell size={40} strokeWidth={1} className="mx-auto mb-3 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          )}

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {notifs.map(n => {
              const cfg = icons[n.type] || icons.LIKE
              const Icon = cfg.icon
              return (
                <div key={n.id} className={`flex items-start gap-3 p-4 transition hover:bg-slate-50 dark:hover:bg-slate-800/50 ${!n.isRead ? 'bg-sky-50/50 dark:bg-sky-900/10' : ''}`}>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                      {n.actor.profilePicture
                        ? <img src={n.actor.profilePicture} alt={n.actor.name} className="w-full h-full rounded-full object-cover" />
                        : n.actor.name[0]}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${cfg.bg} flex items-center justify-center`}>
                      <Icon size={10} className={cfg.color} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-semibold">{n.actor.name}</span> {messages[n.type] || 'interacted with your content'}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}</p>
                  </div>
                  {!n.isRead && <div className="w-2 h-2 rounded-full bg-sky-500 shrink-0 mt-2" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
