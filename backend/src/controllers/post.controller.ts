import { Response, NextFunction } from 'express'
import { AuthRequest } from '../middleware/auth'
import * as postService from '../services/post.service'
import { uploadToCloudinary } from '../config/cloudinary'

export const getFeed      = async (req: AuthRequest, res: Response, next: NextFunction) => { try { const r = await postService.getFeed(req.userId!, req.query.cursor as string, req.query.limit ? +req.query.limit : 10); res.json({ success:true, data:r }) } catch(e) { next(e) } }
export const getUserPosts = async (req: AuthRequest, res: Response, next: NextFunction) => { try { const r = await postService.getUserPosts(req.params.userId, req.userId!, req.query.cursor as string); res.json({ success:true, data:r }) } catch(e) { next(e) } }
export const getPost      = async (req: AuthRequest, res: Response, next: NextFunction) => { try { const post = await postService.getPost(req.params.id, req.userId); res.json({ success:true, data:{ post } }) } catch(e) { next(e) } }
export const getTrending  = async (_req: AuthRequest, res: Response, next: NextFunction) => { try { const posts = await postService.getTrending(); res.json({ success:true, data:{ posts } }) } catch(e) { next(e) } }
export const getByTag     = async (req: AuthRequest, res: Response, next: NextFunction) => { try { const r = await postService.getByTag(req.params.tag, req.query.cursor as string); res.json({ success:true, data:r }) } catch(e) { next(e) } }

export const createPost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let imageUrl: string | undefined
    if (req.file?.buffer) {
      imageUrl = await uploadToCloudinary(req.file.buffer, 'posts')
    }
    const post = await postService.createPost(req.userId!, { ...req.body, imageUrl })
    res.status(201).json({ success: true, data: { post } })
  } catch(e) { next(e) }
}

export const updatePost   = async (req: AuthRequest, res: Response, next: NextFunction) => { try { const post = await postService.updatePost(req.params.id, req.userId!, req.body); res.json({ success:true, data:{ post } }) } catch(e) { next(e) } }
export const deletePost   = async (req: AuthRequest, res: Response, next: NextFunction) => { try { await postService.deletePost(req.params.id, req.userId!); res.json({ success:true, message:'Deleted' }) } catch(e) { next(e) } }
export const toggleLike   = async (req: AuthRequest, res: Response, next: NextFunction) => { try { const r = await postService.toggleLike(req.userId!, req.params.postId); res.json({ success:true, data:r }) } catch(e) { next(e) } }
export const getLikedBy   = async (req: AuthRequest, res: Response, next: NextFunction) => { try { const r = await postService.getLikedBy(req.params.postId); res.json({ success:true, data:r }) } catch(e) { next(e) } }
export const getComments  = async (req: AuthRequest, res: Response, next: NextFunction) => { try { const r = await postService.getComments(req.params.postId, req.query.cursor as string); res.json({ success:true, data:r }) } catch(e) { next(e) } }
export const createComment = async (req: AuthRequest, res: Response, next: NextFunction) => { try { const comment = await postService.createComment(req.userId!, req.params.postId, req.body); res.status(201).json({ success:true, data:{ comment } }) } catch(e) { next(e) } }
export const deleteComment = async (req: AuthRequest, res: Response, next: NextFunction) => { try { await postService.deleteComment(req.params.commentId, req.userId!); res.json({ success:true, message:'Deleted' }) } catch(e) { next(e) } }
export const getReplies   = async (req: AuthRequest, res: Response, next: NextFunction) => { try { const replies = await postService.getReplies(req.params.commentId); res.json({ success:true, data:{ replies } }) } catch(e) { next(e) } }
