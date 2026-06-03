import { prisma } from '../config/db'

export const createNotification = (data: { userId:string, actorId:string, type:string, resourceId?:string, message?:string }) =>
  prisma.notification.create({ data:data as any })

export const getUserNotifications = (userId: string, cursor?: string, limit=20) =>
  prisma.notification.findMany({
    where:{ userId },
    include:{ actor:{select:{id:true,name:true,username:true,profilePicture:true}} },
    orderBy:{ createdAt:'desc' }, take:limit+1,
    ...(cursor ? { cursor:{id:cursor}, skip:1 } : {})
  })

export const markAllRead = (userId: string) =>
  prisma.notification.updateMany({ where:{userId,isRead:false}, data:{isRead:true} })

export const getUnreadCount = async (userId: string) => {
  const count = await prisma.notification.count({ where:{userId,isRead:false} })
  return count
}
