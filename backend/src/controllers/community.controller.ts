import { Response, NextFunction } from 'express'
import { AuthRequest } from '../middleware/auth'
import * as svc from '../services/community.service'

export const getCommunities = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const r = await svc.getCommunities(req.query.cursor as string | undefined)
    res.json({ success: true, data: r })
  } catch (e) { next(e) }
}

export const getCommunity = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const community = await svc.getCommunity(req.params.slug)
    res.json({ success: true, data: { community } })
  } catch (e) { next(e) }
}

export const createCommunity = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const community = await svc.createCommunity(req.userId!, req.body)
    res.status(201).json({ success: true, data: { community } })
  } catch (e) { next(e) }
}

export const toggleMembership = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const r = await svc.toggleMembership(req.userId!, req.params.id)
    res.json({ success: true, data: r })
  } catch (e) { next(e) }
}

export const getMyCommunities = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const r = await svc.getUserCommunities(req.userId!)
    res.json({ success: true, data: { communities: r } })
  } catch (e) { next(e) }
}

export const searchCommunities = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const r = await svc.searchCommunities((req.query.q as string) || '')
    res.json({ success: true, data: { communities: r } })
  } catch (e) { next(e) }
}
