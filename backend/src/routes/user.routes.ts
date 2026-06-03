import { Router } from 'express'
import { protect } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { updateProfileSchema } from '../validators/user.validator'
import { uploadAvatar } from '../config/cloudinary'
import * as ctrl from '../controllers/user.controller'
const r = Router()
r.use(protect)
r.get('/search',                ctrl.searchUsers)
r.get('/suggested',             ctrl.getSuggested)
r.get('/:id',                   ctrl.getProfile)
r.put('/profile', uploadAvatar.single('avatar'), validate(updateProfileSchema), ctrl.updateProfile)
r.post('/:id/follow',           ctrl.toggleFollow)
r.get('/:id/followers',         ctrl.getFollowers)
r.get('/:id/following',         ctrl.getFollowing)
export default r
