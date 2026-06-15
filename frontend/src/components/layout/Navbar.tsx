'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Bell, Home, MessageSquare, Users, LogOut, User } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/slices/authSlice'
import { useAuth } from '@/hooks'
import type { AppDispatch } from '@/store'
import toast from 'react-hot-toast'

const links = [
  { href: '/feed',          icon: Home,          label: 'Feed' },
  { href: '/communities',   icon: Users,         label: 'Communities' },
  { href: '/chat',          icon: MessageSquare, label: 'Chat' },
  { href: '/notifications', icon: Bell,          label: 'Notifications' },
]

export default function Navbar() {
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { user } = useAuth()

  const handleLogout = async () => {
    await dispatch(logoutUser())
    toast.success('Logged out')
    router.push('/login')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center px-4 md:px-6 gap-4">
      <Link href="/feed" className="text-lg font-extrabold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent shrink-0 mr-2">
        SkyCampus
      </Link>
      <div className="flex items-center gap-1 ml-auto">
        {links.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} title={label}
            className={`p-2 rounded-xl transition ${pathname.startsWith(href) ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            <Icon size={18} />
          </Link>
        ))}
        {user && (
          <Link href={`/profile/${user.id}`} title="Profile"
            className={`p-2 rounded-xl transition ${pathname.startsWith('/profile') ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            <User size={18} />
          </Link>
        )}
        <button onClick={handleLogout} title="Logout"
          className="p-2 rounded-xl text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-500 transition">
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  )
}
