import { getRedis, TTL } from '../config/redis'

const safeGet = async (key: string) => {
  const r = await getRedis(); if (!r) return null
  try { const d = await r.get(key); return d ? JSON.parse(d) : null } catch { return null }
}
const safeSet = async (key: string, data: any, ttl: number) => {
  const r = await getRedis(); if (!r) return
  try { await r.setEx(key, ttl, JSON.stringify(data)) } catch {}
}
const safeDel = async (key: string) => {
  const r = await getRedis(); if (!r) return
  try { await r.del(key) } catch {}
}

export const getCachedFeed    = (uid: string) => safeGet(`feed:${uid}`)
export const cacheFeed        = (uid: string, data: any) => safeSet(`feed:${uid}`, data, TTL.FEED)
export const invalidateFeed   = (uid: string) => safeDel(`feed:${uid}`)
export const getCachedProfile = (uid: string) => safeGet(`profile:${uid}`)
export const cacheProfile     = (uid: string, data: any) => safeSet(`profile:${uid}`, data, TTL.PROFILE)
export const invalidateProfile = (uid: string) => safeDel(`profile:${uid}`)

export const incrTrending = async (postId: string) => {
  const r = await getRedis(); if (!r) return
  try { await r.zIncrBy('trending:posts', 1, postId) } catch {}
}
export const getTrending = async (limit = 10) => {
  const r = await getRedis(); if (!r) return null
  try { return await r.zRangeWithScores('trending:posts', 0, limit-1, { REV: true }) } catch { return null }
}
