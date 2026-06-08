import { Response, NextFunction } from 'express'
import { AuthRequest } from '../middleware/auth'
import * as chatService from '../services/chat.service'

export const getChats    = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { const chats = await chatService.getUserChats(req.userId!); res.json({ success: true, data: { chats } }) }
  catch (e) { next(e) }
}
export const getChat     = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { const chat = await chatService.getChatById(req.params.id, req.userId!); res.json({ success: true, data: { chat } }) }
  catch (e) { next(e) }
}
export const createDM    = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { const chat = await chatService.createOrGetDM(req.userId!, req.body.targetId); res.json({ success: true, data: { chat } }) }
  catch (e) { next(e) }
}
export const getMessages = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const cursor = req.query.cursor as string | undefined
    const r = await chatService.getMessages(req.params.chatId, req.userId!, cursor)
    res.json({ success: true, data: r })
  } catch (e) { next(e) }
}
