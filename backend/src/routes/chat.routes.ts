import { Router } from 'express'
import { protect } from '../middleware/auth'
import * as ctrl from '../controllers/chat.controller'
const r = Router()
r.use(protect)
r.get('/',             ctrl.getChats)
r.post('/dm',          ctrl.createDM)
r.get('/:id',          ctrl.getChat)
r.get('/:chatId/messages', ctrl.getMessages)
export default r
