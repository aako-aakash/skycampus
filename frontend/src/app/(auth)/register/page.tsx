'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { authAPI } from '@/services/api'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  username: z.string().min(3).max(20).regex(/^[a-z0-9_]+$/),
  password: z.string().min(8),
  university: z.string().optional(),
  branch: z.string().optional(),
})
type Form = z.infer<typeof schema>

export default function RegisterPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) })

  const onSubmit = async (d: Form) => {
    try {
      await authAPI.register(d)
      toast.success('Account created! Please login.')
      router.push('/login')
    } catch (e: any) {
      toast.error(e.response?.data?.message || 'Registration failed')
    }
  }

  const field = (name: keyof Form, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      <input {...register(name)} type={type} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition text-sm" />
      {errors[name] && <p className="text-rose-400 text-xs mt-1">{errors[name]?.message}</p>}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-blue-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-3xl font-extrabold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent mb-2">SkyCampus</div>
          <div className="text-slate-400 text-sm">Create your account</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {field('name', 'Full Name', 'text', 'Arjun Sharma')}
            {field('email', 'Email', 'email', 'you@university.edu')}
            {field('username', 'Username', 'text', 'arjunsharma')}
            {field('password', 'Password', 'password', '••••••••')}
            <div className="grid grid-cols-2 gap-3">
              {field('university', 'University', 'text', 'MIT Pune')}
              {field('branch', 'Branch', 'text', 'Computer Engg')}
            </div>
            <button type="submit" disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 font-semibold text-white disabled:opacity-50 hover:opacity-90 transition mt-2">
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-slate-400 text-sm mt-5">
            Already have an account? <Link href="/login" className="text-sky-400 hover:text-sky-300">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
