import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/AppError'
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) return res.status(err.statusCode).json({ success: false, message: err.message })
  if (err.code === 'P2002') return res.status(409).json({ success: false, message: 'Already exists' })
  if (err.code === 'P2025') return res.status(404).json({ success: false, message: 'Not found' })
  console.error('[Error]', err)
  res.status(500).json({ success: false, message: process.env.NODE_ENV === 'production' ? 'Server error' : err.message })
}
