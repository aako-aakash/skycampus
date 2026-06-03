export interface User {
  id: string; name: string; username: string; email: string
  bio?: string; university?: string; branch?: string; year?: number
  skills: string[]; interests: string[]; profilePicture?: string; coverImage?: string
  socialLinks?: { linkedin?: string; github?: string; twitter?: string; website?: string }
  createdAt: string
  _count?: { followers: number; following: number; posts: number }
}
export interface Post {
  id: string; content: string; imageUrl?: string; tags: string[]
  likesCount: number; commentsCount: number; visibility: string
  createdAt: string; isLiked?: boolean
  user: Pick<User, 'id' | 'name' | 'username' | 'profilePicture'>
}
export interface Comment {
  id: string; content: string; createdAt: string
  user: Pick<User, 'id' | 'name' | 'username' | 'profilePicture'>
  _count?: { replies: number }; parentId?: string
}
export interface Community {
  id: string; name: string; slug: string; description?: string
  avatar?: string; isPrivate: boolean; memberCount: number
  tags: string[]; createdAt: string
  creator: Pick<User, 'id' | 'name' | 'username'>
}
export interface Message {
  id: string; content: string; mediaUrl?: string; seenBy: string[]
  createdAt: string; chatId: string
  sender: Pick<User, 'id' | 'name' | 'username' | 'profilePicture'>
}
export interface Chat {
  id: string; isGroup: boolean; name?: string; avatar?: string
  lastMessage?: string; lastMessageAt?: string
  participants: Array<{ user: Pick<User, 'id' | 'name' | 'username' | 'profilePicture'> }>
  messages: Message[]
}
export interface Notification {
  id: string; type: string; isRead: boolean; resourceId?: string
  createdAt: string
  actor: Pick<User, 'id' | 'name' | 'username' | 'profilePicture'>
}
