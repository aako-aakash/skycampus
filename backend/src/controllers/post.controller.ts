import { Request, Response, NextFunction } from 'express'
import { AuthRequest } from '../middleware/auth'
import * as postService from '../services/post.service'
import { uploadToCloudinary } from '../config/cloudinary'

export const getFeed = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const cursor = req.query.cursor as string | undefined
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10
    const r = await postService.getFeed(req.userId!, cursor, limit)
    res.json({ success: true, data: r })
  } catch (e) { next(e) }
}

export const getUserPosts = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const cursor = req.query.cursor as string | undefined
    const r = await postService.getUserPosts(req.params.userId, req.userId!, cursor)
    res.json({ success: true, data: r })
  } catch (e) { next(e) }
}

export const getPost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const post = await postService.getPost(req.params.id, req.userId)
    res.json({ success: true, data: { post } })
  } catch (e) { next(e) }
}

export const getTrending = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await postService.getTrending()
    res.json({ success: true, data: { posts } })
  } catch (e) { next(e) }
}

export const getByTag = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const cursor = req.query.cursor as string | undefined
    const r = await postService.getByTag(req.params.tag, cursor)
    res.json({ success: true, data: r })
  } catch (e) { next(e) }
}

export const createPost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let imageUrl: string | undefined
    const file = (req as any).file
    if (file?.buffer) {
      imageUrl = await uploadToCloudinary(file.buffer, 'posts')
    }
    const post = await postService.createPost(req.userId!, {
      content: req.body.content,
      tags: req.body.tags,
      visibility: req.body.visibility,
      imageUrl,
    })
    res.status(201).json({ success: true, data: { post } })
  } catch (e) { next(e) }
}

export const updatePost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const post = await postService.updatePost(req.params.id, req.userId!, req.body)
    res.json({ success: true, data: { post } })
  } catch (e) { next(e) }
}

export const deletePost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await postService.deletePost(req.params.id, req.userId!)
    res.json({ success: true, message: 'Deleted' })
  } catch (e) { next(e) }
}

export const toggleLike = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const r = await postService.toggleLike(req.userId!, req.params.postId)
    res.json({ success: true, data: r })
  } catch (e) { next(e) }
}

export const getLikedBy = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const r = await postService.getLikedBy(req.params.postId)
    res.json({ success: true, data: r })
  } catch (e) { next(e) }
}

export const getComments = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const cursor = req.query.cursor as string | undefined
    const r = await postService.getComments(req.params.postId, cursor)
    res.json({ success: true, data: r })
  } catch (e) { next(e) }
}

export const createComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const comment = await postService.createComment(req.userId!, req.params.postId, req.body)
    res.status(201).json({ success: true, data: { comment } })
  } catch (e) { next(e) }
}

export const deleteComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await postService.deleteComment(req.params.commentId, req.userId!)
    res.json({ success: true, message: 'Deleted' })
  } catch (e) { next(e) }
}

export const getReplies = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const replies = await postService.getReplies(req.params.commentId)
    res.json({ success: true, data: { replies } })
  } catch (e) { next(e) }
}
