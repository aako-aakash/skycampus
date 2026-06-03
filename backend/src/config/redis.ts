import { createClient, RedisClientType } from 'redis'

let _redis: RedisClientType | null = null

export const getRedis = async (): Promise<RedisClientType | null> => {
  if (_redis?.isOpen) return _redis
  try {
    _redis = createClient({ url: process.env.REDIS_URL }) as RedisClientType
    _redis.on('error', (err) => {
      console.error('[Redis] Connection error:', err.message)
      _redis = null
    })
    await _redis.connect()
    console.log('[Redis] Connected')
    return _redis
  } catch (err) {
    console.warn('[Redis] Unavailable — running without cache')
    return null
  }
}

export const TTL = {
  FEED: 60 * 5,       // 5 min
  PROFILE: 60 * 10,   // 10 min
  TRENDING: 60 * 15,  // 15 min
  SESSION: 60 * 60,   // 1 hr
}
