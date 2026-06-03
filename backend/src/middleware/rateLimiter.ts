import rateLimit from 'express-rate-limit'
export const globalLimiter = rateLimit({ windowMs: 15*60*1000, max: 200, standardHeaders: true })
export const authLimiter   = rateLimit({ windowMs: 15*60*1000, max: 10,  message: { success: false, message: 'Too many attempts, try later' } })
export const uploadLimiter = rateLimit({ windowMs: 60*60*1000, max: 30,  message: { success: false, message: 'Upload limit reached' } })
