'use client'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { chatAPI } from '@/services/api'
import { getSocket } from '@/services/socket'
import { useAuth } from '@/hooks'
import Navbar from '@/components/layout/Navbar'
import { Send, MessageCircle, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Chat, Message } from '@/types'

export default function ChatPage() {
  const { user } = useAuth()
  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { data: chatsData, isLoading } = useQuery({
    queryKey: ['chats'],
    queryFn: async () => { const { data } = await chatAPI.getChats(); return data.data.chats as Chat[] },
  })

  useEffect(() => {
    if (!user) return
    const socket = getSocket()
    socket.on('new_message', (msg: Message) => {
      if (msg.chatId === activeChat?.id) setMessages(prev => [...prev, msg])
    })
    socket.on('user_typing', ({ userId, typing: t }: any) => {
      if (userId !== user.id) setTyping(t ? userId : null)
    })
    return () => { socket.off('new_message'); socket.off('user_typing') }
  }, [user, activeChat?.id])

  const openChat = async (chat: Chat) => {
    setActiveChat(chat)
    const socket = getSocket()
    if (activeChat) socket.emit('leave_room', activeChat.id)
    socket.emit('join_room', chat.id)
    const { data } = await chatAPI.getMessages(chat.id)
    setMessages(data.data.messages)
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !activeChat) return
    const socket = getSocket()
    socket.emit('send_message', { chatId: activeChat.id, content: input })
    socket.emit('typing_stop', activeChat.id)
    setInput('')
  }

  const handleTyping = (v: string) => {
    setInput(v)
    if (!activeChat) return
    const socket = getSocket()
    socket.emit('typing_start', activeChat.id)
    if (typingTimer.current) clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => socket.emit('typing_stop', activeChat.id), 1500)
  }

  const getChatName = (chat: Chat) => {
    if (chat.isGroup) return chat.name || 'Group'
    const other = chat.participants.find(p => p.user.id !== user?.id)
    return other?.user.name || 'Unknown'
  }
  const getChatAvatar = (chat: Chat) => {
    if (chat.isGroup) return null
    const other = chat.participants.find(p => p.user.id !== user?.id)
    return other?.user.profilePicture
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-5xl mx-auto pt-14 h-screen flex gap-0">

        {/* Chat list */}
        <div className="w-72 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><MessageCircle size={18} /> Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {isLoading && <div className="flex justify-center p-8"><Loader2 className="animate-spin text-sky-500" /></div>}
            {chatsData?.map(chat => (
              <button key={chat.id} onClick={() => openChat(chat)}
                className={`w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition border-b border-slate-100 dark:border-slate-800 ${activeChat?.id === chat.id ? 'bg-sky-50 dark:bg-sky-900/20' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {getChatAvatar(chat) ? <img src={getChatAvatar(chat)!} alt="" className="w-full h-full rounded-full object-cover" /> : getChatName(chat)[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-slate-800 dark:text-slate-200 truncate">{getChatName(chat)}</div>
                  <div className="text-xs text-slate-400 truncate">{chat.lastMessage || 'Start a conversation'}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950">
          {activeChat ? (
            <>
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                  {getChatName(activeChat)[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-white">{getChatName(activeChat)}</div>
                  {typing && <div className="text-xs text-sky-500 animate-pulse">typing...</div>}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map(msg => {
                  const isMe = msg.sender.id === user?.id
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} gap-2`}>
                      {!isMe && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {msg.sender.name[0]}
                        </div>
                      )}
                      <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${isMe ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-br-sm' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm border border-slate-200 dark:border-slate-700'}`}>
                        {msg.content}
                        <div className={`text-xs mt-1 ${isMe ? 'text-sky-200' : 'text-slate-400'}`}>
                          {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={sendMessage} className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2">
                <input value={input} onChange={e => handleTyping(e.target.value)} placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 text-sm outline-none focus:ring-2 focus:ring-sky-400 transition" />
                <button type="submit" disabled={!input.trim()}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white disabled:opacity-50 hover:opacity-90 transition">
                  <Send size={16} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3">
              <MessageCircle size={48} strokeWidth={1} />
              <p className="text-sm">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
