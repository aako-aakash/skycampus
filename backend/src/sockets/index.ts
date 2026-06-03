import { Server } from 'socket.io'
import { Server as HttpServer } from 'http'
import jwt from 'jsonwebtoken'
import { setIO } from './notification.socket'
import { prisma } from '../config/db'

const onlineUsers = new Map<string, string>()

export const initSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, { cors:{ origin: process.env.CLIENT_URL, credentials:true } })

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token
    if (!token) return next(new Error('Unauthorized'))
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { userId:string }
      socket.data.userId = decoded.userId
      next()
    } catch { next(new Error('Invalid token')) }
  })

  setIO(io)

  io.on('connection', (socket) => {
    const userId: string = socket.data.userId
    onlineUsers.set(userId, socket.id)
    socket.join(`user:${userId}`)
    io.emit('user_online', { userId, online:true })

    // ── CHAT EVENTS ──────────────────────────────────────────────────────────
    socket.on('join_room', (chatId: string) => socket.join(`chat:${chatId}`))
    socket.on('leave_room', (chatId: string) => socket.leave(`chat:${chatId}`))

    socket.on('send_message', async (data: { chatId:string, content:string, mediaUrl?:string }) => {
      try {
        const msg = await prisma.message.create({
          data:{ chatId:data.chatId, senderId:userId, content:data.content, mediaUrl:data.mediaUrl, seenBy:[userId] },
          include:{ sender:{select:{id:true,name:true,username:true,profilePicture:true}} }
        })
        await prisma.chat.update({ where:{id:data.chatId}, data:{lastMessage:data.content,lastMessageAt:new Date()} })
        io.to(`chat:${data.chatId}`).emit('new_message', msg)
      } catch(e) { socket.emit('error', 'Message failed') }
    })

    socket.on('typing_start', (chatId: string) => socket.to(`chat:${chatId}`).emit('user_typing', { userId, chatId, typing:true }))
    socket.on('typing_stop',  (chatId: string) => socket.to(`chat:${chatId}`).emit('user_typing', { userId, chatId, typing:false }))

    socket.on('mark_seen', async (messageId: string) => {
      try {
        const msg = await prisma.message.update({ where:{id:messageId}, data:{seenBy:{push:userId}} })
        io.to(`chat:${msg.chatId}`).emit('message_seen', { messageId, userId })
      } catch {}
    })

    socket.on('disconnect', () => {
      onlineUsers.delete(userId)
      io.emit('user_online', { userId, online:false })
    })
  })

  return io
}
