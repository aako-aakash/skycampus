import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const getSocket = (token?: string): Socket => {
  if (typeof window === 'undefined') {
    // Return a mock for SSR
    return {} as Socket
  }
  if (!socket || !socket.connected) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000', {
      withCredentials: true,
      auth: { token },
      transports: ['websocket', 'polling'],
    })
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) { socket.disconnect(); socket = null }
}
