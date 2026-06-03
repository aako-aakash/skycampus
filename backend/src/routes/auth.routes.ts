import { Router } from 'express'
import { protect } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { authLimiter } from '../middleware/rateLimiter'
import { registerSchema, loginSchema } from '../validators/auth.validator'
import * as ctrl from '../controllers/auth.controller'
const r = Router()
r.post('/register', authLimiter, validate(registerSchema), ctrl.register)
r.post('/login',    authLimiter, validate(loginSchema),    ctrl.login)
r.post('/logout',   protect, ctrl.logout)
r.post('/refresh',  ctrl.refresh)
r.get('/me',        protect, ctrl.getMe)
export default r
