import * as notifRepo from '../repositories/notification.repository'

export const getNotifications = (userId: string, cursor?: string) => notifRepo.getUserNotifications(userId, cursor)
export const markAllRead      = (userId: string) => notifRepo.markAllRead(userId)
export const getUnreadCount   = (userId: string) => notifRepo.getUnreadCount(userId)
