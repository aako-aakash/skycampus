import * as chatRepo from '../repositories/chat.repository'

export const getUserChats    = (userId: string) => chatRepo.getUserChats(userId)
export const getChatById     = (chatId: string, userId: string) => chatRepo.getChatById(chatId, userId)
export const createOrGetDM   = (userId: string, targetId: string) => chatRepo.createOrGetDM(userId, targetId)
export const getMessages     = (chatId: string, userId: string, cursor?: string, limit=30) => chatRepo.getMessages(chatId, cursor, limit)
export const createMessage   = (chatId: string, senderId: string, content: string, mediaUrl?: string) => chatRepo.createMessage(chatId, senderId, content, mediaUrl)
