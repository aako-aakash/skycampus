import { prisma } from '../config/db'
import { AppError } from '../utils/AppError'

export const getUserChats = (userId: string) =>
  prisma.chat.findMany({
    where:{ participants:{ some:{ userId } } },
    include:{ participants:{ include:{ user:{select:{id:true,name:true,username:true,profilePicture:true}} } }, messages:{ orderBy:{createdAt:'desc'}, take:1 } },
    orderBy:{ lastMessageAt:'desc' }
  })

export const getChatById = async (chatId: string, userId: string) => {
  const chat = await prisma.chat.findFirst({ where:{id:chatId, participants:{some:{userId}}}, include:{participants:{include:{user:{select:{id:true,name:true,username:true,profilePicture:true}}}}} })
  if (!chat) throw new AppError('Chat not found', 404)
  return chat
}

export const createOrGetDM = async (userId: string, targetId: string) => {
  const existing = await prisma.chat.findFirst({
    where:{ isGroup:false, participants:{ every:{ userId:{in:[userId,targetId]} } }, AND:[{ participants:{ some:{userId} } }, { participants:{some:{userId:targetId}} }] },
    include:{ participants:{ include:{user:{select:{id:true,name:true,username:true,profilePicture:true}}} } }
  })
  if (existing) return existing
  return prisma.chat.create({ data:{ isGroup:false, participants:{create:[{userId},{userId:targetId}]} }, include:{ participants:{ include:{user:{select:{id:true,name:true,username:true,profilePicture:true}}} } } })
}

export const getMessages = async (chatId: string, cursor?: string, limit=30) => {
  const msgs = await prisma.message.findMany({
    where:{ chatId },
    include:{ sender:{select:{id:true,name:true,username:true,profilePicture:true}} },
    orderBy:{ createdAt:'desc' }, take:limit+1,
    ...(cursor ? { cursor:{id:cursor}, skip:1 } : {})
  })
  const hasMore = msgs.length > limit
  const data = hasMore ? msgs.slice(0,limit) : msgs
  return { messages: data.reverse(), nextCursor: hasMore ? data[0].id : null, hasMore }
}

export const createMessage = async (chatId: string, senderId: string, content: string, mediaUrl?: string) => {
  const [msg] = await prisma.$transaction([
    prisma.message.create({ data:{chatId,senderId,content,mediaUrl,seenBy:[senderId]}, include:{sender:{select:{id:true,name:true,username:true,profilePicture:true}}} }),
    prisma.chat.update({ where:{id:chatId}, data:{lastMessage:content,lastMessageAt:new Date()} })
  ])
  return msg
}

export const markSeen = (messageId: string, userId: string) =>
  prisma.message.update({ where:{id:messageId}, data:{seenBy:{push:userId}} })
