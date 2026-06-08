import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from '../utils/AppError'

export type AuthRequest = Request & { userId?: string }

export const protect = (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = (req as any).cookies?.accessToken
      ?? req.headers.authorization?.replace('Bearer ', '')
    if (!token) throw new AppError('Not authenticated', 401)
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { userId: string }
    req.userId = decoded.userId
    next()
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') return next(new AppError('Token expired', 401))
    if (err.name === 'JsonWebTokenError') return next(new AppError('Invalid token', 401))
    next(err)
  }
}

export const generateTokens = (userId: string) => ({
  accessToken: jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, { expiresIn: '15m' as any }),
  refreshToken: jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' as any }),
})

export const setTokenCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const isProd = process.env.NODE_ENV === 'production'
  res.cookie('accessToken', accessToken, { httpOnly: true, secure: isProd, sameSite: 'strict', maxAge: 15 * 60 * 1000 })
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: isProd, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 })
}
