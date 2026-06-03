import { Response, NextFunction } from 'express'
import { AuthRequest } from '../middleware/auth'
import * as userService from '../services/user.service'

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { const user = await userService.getProfile(req.params.id); res.json({ success:true, data:{ user } }) }
  catch(e) { next(e) }
}
export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = { ...req.body, ...(req.file ? { profilePicture:(req.file as any).path } : {}) }
    const user = await userService.updateProfile(req.userId!, data)
    res.json({ success:true, data:{ user } })
  } catch(e) { next(e) }
}
export const toggleFollow = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { const result = await userService.toggleFollow(req.userId!, req.params.id); res.json({ success:true, data:result }) }
  catch(e) { next(e) }
}
export const getFollowers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { const followers = await userService.getFollowers(req.params.id); res.json({ success:true, data:{ followers } }) }
  catch(e) { next(e) }
}
export const getFollowing = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { const following = await userService.getFollowing(req.params.id); res.json({ success:true, data:{ following } }) }
  catch(e) { next(e) }
}
export const searchUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { const users = await userService.searchUsers(req.query.q as string); res.json({ success:true, data:{ users } }) }
  catch(e) { next(e) }
}
export const getSuggested = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { const users = await userService.getSuggested(req.userId!); res.json({ success:true, data:{ users } }) }
  catch(e) { next(e) }
}
