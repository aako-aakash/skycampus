import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { globalLimiter } from './middleware/rateLimiter'
import { errorHandler } from './middleware/errorHandler'
import authRoutes         from './routes/auth.routes'
import userRoutes         from './routes/user.routes'
import postRoutes         from './routes/post.routes'
import communityRoutes    from './routes/community.routes'
import chatRoutes         from './routes/chat.routes'
import notificationRoutes from './routes/notification.routes'

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials:true }))
app.use(globalLimiter)
app.use(express.json({ limit:'10mb' }))
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser())
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))

app.get('/health', (_req, res) => res.json({ status:'ok', version:'1.0.0', service:'skycampus-api' }))

app.use('/api/v1/auth',          authRoutes)
app.use('/api/v1/users',         userRoutes)
app.use('/api/v1/posts',         postRoutes)
app.use('/api/v1/communities',   communityRoutes)
app.use('/api/v1/chats',         chatRoutes)
app.use('/api/v1/notifications', notificationRoutes)

app.use((_req, res) => res.status(404).json({ success:false, message:'Route not found' }))
app.use(errorHandler)

export default app
