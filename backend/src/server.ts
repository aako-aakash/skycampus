import 'dotenv/config'
import http from 'http'
import app from './app'
import { initSocket } from './sockets'
import { getRedis } from './config/redis'
import { prisma } from './config/db'

const PORT = process.env.PORT || 5000

const server = http.createServer(app)
initSocket(server)

const start = async () => {
  try {
    await prisma.$connect()
    console.log('[DB] PostgreSQL connected')
    await getRedis()
    server.listen(PORT, () => console.log(`[Server] Running on http://localhost:${PORT}`))
  } catch (err) {
    console.error('[Server] Failed to start:', err)
    process.exit(1)
  }
}

process.on('SIGTERM', async () => { await prisma.$disconnect(); server.close(); process.exit(0) })
process.on('SIGINT',  async () => { await prisma.$disconnect(); server.close(); process.exit(0) })

start()
