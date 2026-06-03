import { Router } from 'express'
import { protect } from '../middleware/auth'
import * as ctrl from '../controllers/notification.controller'
const r = Router()
r.use(protect)
r.get('/',         ctrl.getNotifications)
r.get('/unread',   ctrl.getUnreadCount)
r.put('/read-all', ctrl.markAllRead)
export default r
