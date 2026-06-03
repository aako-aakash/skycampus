import { prisma } from '../config/db'
let _io: any = null
export const setIO = (io: any) => { _io = io }
export const sendNotification = async (payload: { type:string, actorId:string, targetUserId:string, resourceId?:string }) => {
  try {
    await prisma.notification.create({ data:{ userId:payload.targetUserId, actorId:payload.actorId, type:payload.type as any, resourceId:payload.resourceId } })
  } catch(e) { console.error('Notification DB error', e) }
  _io?.to(`user:${payload.targetUserId}`).emit('notification', payload)
}
