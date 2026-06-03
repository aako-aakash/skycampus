import { Router } from 'express'
import { protect } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { createPostSchema, updatePostSchema, createCommentSchema } from '../validators/post.validator'
import { uploadPost } from '../config/cloudinary'
import * as ctrl from '../controllers/post.controller'
const r = Router()
r.use(protect)
r.get('/',                    ctrl.getFeed)
r.get('/trending',            ctrl.getTrending)
r.get('/tag/:tag',            ctrl.getByTag)
r.get('/user/:userId',        ctrl.getUserPosts)
r.get('/:id',                 ctrl.getPost)
r.post('/',   uploadPost.single('image'), validate(createPostSchema), ctrl.createPost)
r.put('/:id', validate(updatePostSchema), ctrl.updatePost)
r.delete('/:id',              ctrl.deletePost)
r.post('/:postId/like',       ctrl.toggleLike)
r.get('/:postId/likes',       ctrl.getLikedBy)
r.get('/:postId/comments',    ctrl.getComments)
r.post('/:postId/comments',   validate(createCommentSchema), ctrl.createComment)
r.delete('/comments/:commentId', ctrl.deleteComment)
r.get('/comments/:commentId/replies', ctrl.getReplies)
export default r
