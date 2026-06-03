import { clsx } from 'clsx'

interface Props { className?: string; lines?: number }

export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx('animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800', className)} />
}

export function PostSkeleton() {
  return (
    <div className="card p-5 space-y-4">
      <div className="flex gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-2 w-1/4" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-3 w-3/5" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-7 w-16 rounded-xl" />
        <Skeleton className="h-7 w-16 rounded-xl" />
      </div>
    </div>
  )
}

export function UserCardSkeleton() {
  return (
    <div className="card p-4 flex items-center gap-3">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-2 w-1/3" />
      </div>
    </div>
  )
}
