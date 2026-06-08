import { Response, NextFunction } from 'express'
import { AuthRequest } from '../middleware/auth'
import * as notifService from '../services/notification.service'

export const getNotifications = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const r = await notifService.getNotifications(
      req.userId!,
      req.query.cursor as string | undefined
    )
    res.json({ success: true, data: r })
  } catch (e) { next(e) }
}

export const markAllRead = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await notifService.markAllRead(req.userId!)
    res.json({ success: true })
  } catch (e) { next(e) }
}

export const getUnreadCount = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const count = await notifService.getUnreadCount(req.userId!)
    res.json({ success: true, data: { count } })
  } catch (e) { next(e) }
}
