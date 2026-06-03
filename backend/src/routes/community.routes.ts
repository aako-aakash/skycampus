import { Router } from 'express'
import { protect } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { createCommunitySchema } from '../validators/community.validator'
import * as ctrl from '../controllers/community.controller'
const r = Router()
r.use(protect)
r.get('/',            ctrl.getCommunities)
r.get('/me',          ctrl.getMyCommunities)
r.get('/search',      ctrl.searchCommunities)
r.get('/:slug',       ctrl.getCommunity)
r.post('/', validate(createCommunitySchema), ctrl.createCommunity)
r.post('/:id/join',   ctrl.toggleMembership)
export default r
