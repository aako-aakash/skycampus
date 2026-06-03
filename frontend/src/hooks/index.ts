'use client'
import { useSelector, useDispatch } from 'react-redux'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { RootState, AppDispatch } from '@/store'
import { fetchMe, logoutUser } from '@/store/slices/authSlice'
import { postAPI, userAPI } from '@/services/api'
import { getSocket } from '@/services/socket'
import type { Socket } from 'socket.io-client'

// ── AUTH ──────────────────────────────────────────────────────────────────────
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user, loading } = useSelector((s: RootState) => s.auth)
  return {
    user, loading,
    isAuthenticated: !!user,
    logout: () => dispatch(logoutUser()),
    refetch: () => dispatch(fetchMe()),
  }
}

// ── FEED ──────────────────────────────────────────────────────────────────────
export const useFeed = () =>
  useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: async ({ pageParam }) => {
      const { data } = await postAPI.getFeed(pageParam as string | undefined)
      return data.data
    },
    initialPageParam: undefined,
    getNextPageParam: (last: any) => last.hasMore ? last.nextCursor : undefined,
    staleTime: 1000 * 60 * 2,
  })

// ── TOGGLE LIKE ───────────────────────────────────────────────────────────────
export const useToggleLike = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (postId: string) => postAPI.toggleLike(postId),
    onMutate: async (postId: string) => {
      await qc.cancelQueries({ queryKey: ['feed'] })
      const prev = qc.getQueryData(['feed'])
      qc.setQueryData(['feed'], (old: any) => ({
        ...old,
        pages: old.pages.map((page: any) => ({
          ...page,
          posts: page.posts.map((p: any) =>
            p.id === postId
              ? { ...p, isLiked: !p.isLiked, likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1 }
              : p
          )
        }))
      }))
      return { prev }
    },
    onError: (_e, _v, ctx) => { if (ctx?.prev) qc.setQueryData(['feed'], ctx.prev) },
    onSettled: () => qc.invalidateQueries({ queryKey: ['feed'] }),
  })
}

// ── SOCKET ────────────────────────────────────────────────────────────────────
export const useSocket = (token?: string): Socket | null => {
  const socketRef = useRef<Socket | null>(null)
  useEffect(() => {
    if (!token) return
    socketRef.current = getSocket(token)
    return () => { socketRef.current?.disconnect() }
  }, [token])
  return socketRef.current
}

// ── PROFILE ───────────────────────────────────────────────────────────────────
export const useProfile = (userId: string) =>
  useInfiniteQuery({
    queryKey: ['profile-posts', userId],
    queryFn: async ({ pageParam }) => {
      const { data } = await postAPI.getUserPosts(userId, pageParam as string | undefined)
      return data.data
    },
    initialPageParam: undefined,
    getNextPageParam: (last: any) => last.hasMore ? last.nextCursor : undefined,
  })
