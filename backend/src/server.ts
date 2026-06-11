import 'dotenv/config'
import http from 'http'
import { execSync } from 'child_process'
import app from './app'
import { initSocket } from './sockets'
import { getRedis } from './config/redis'
import { prisma } from './config/db'

const PORT = process.env.PORT || 5000
const server = http.createServer(app)
initSocket(server)

const runMigrations = () => {
  try {
    console.log('[DB] Running migrations...')
    execSync('npx prisma migrate deploy', { stdio: 'inherit' })
    console.log('[DB] Migrations complete')
  } catch (e: any) {
    console.warn('[DB] Migration note:', e.message?.slice(0, 150))
  }
}

const start = async () => {
  try {
    // Auto-run migrations — creates all tables in Neon automatically
    runMigrations()

    await prisma.$connect()
    console.log('[DB] PostgreSQL connected')

    getRedis().catch(() => console.warn('[Redis] Unavailable — running without cache'))

    server.listen(PORT, () => {
      console.log(`[Server] SkyCampus API running on port ${PORT}`)
    })
  } catch (err) {
    console.error('[Server] Startup failed:', err)
    process.exit(1)
  }
}

process.on('SIGTERM', async () => { await prisma.$disconnect(); server.close(); process.exit(0) })
process.on('SIGINT',  async () => { await prisma.$disconnect(); server.close(); process.exit(0) })

start()
