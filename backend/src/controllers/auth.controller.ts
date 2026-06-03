import { Response, NextFunction } from 'express'
import { AuthRequest } from '../middleware/auth'
import * as authService from '../services/auth.service'

export const register = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { const user = await authService.register(req.body); res.status(201).json({ success:true, data:{ user } }) }
  catch(e) { next(e) }
}
export const login = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { const user = await authService.login(req.body, res); res.json({ success:true, data:{ user } }) }
  catch(e) { next(e) }
}
export const logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { await authService.logout(req.userId!, res); res.json({ success:true, message:'Logged out' }) }
  catch(e) { next(e) }
}
export const refresh = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { const result = await authService.refresh(req.cookies?.refreshToken, res); res.json({ success:true, data:result }) }
  catch(e) { next(e) }
}
export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { const user = await authService.getMe(req.userId!); res.json({ success:true, data:{ user } }) }
  catch(e) { next(e) }
}
