import rateLimit from 'express-rate-limit'

const base = {
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false, xForwardedForHeader: false },
}

export const globalLimiter = rateLimit({ ...base, windowMs: 15*60*1000, max: 200 })
export const authLimiter   = rateLimit({ ...base, windowMs: 15*60*1000, max: 20, message: { success:false, message:'Too many attempts' } })
export const uploadLimiter = rateLimit({ ...base, windowMs: 60*60*1000, max: 30,  message: { success:false, message:'Upload limit reached' } })
