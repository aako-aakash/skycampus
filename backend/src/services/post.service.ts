import * as postRepo from '../repositories/post.repository'
import * as likeRepo from '../repositories/like.repository'
import * as commentRepo from '../repositories/comment.repository'
import * as cache from './cache.service'
import { sendNotification } from '../sockets/notification.socket'
import { incrTrending } from './cache.service'
import type { CreatePostInput, UpdatePostInput, CreateCommentInput } from '../validators/post.validator'

export const getFeed = async (userId: string, cursor?: string, limit=10) => {
  if (!cursor) { const c = await cache.getCachedFeed(userId); if (c) return c }
  const result = await postRepo.getFeedPosts(userId, cursor, limit)
  if (!cursor) cache.cacheFeed(userId, result)
  return result
}

export const getUserPosts = (targetId: string, viewerId: string, cursor?: string, limit=10) =>
  postRepo.getUserPosts(targetId, viewerId, cursor, limit)

export const getPost = (id: string, viewerId?: string) => postRepo.getPostById(id, viewerId)

export const createPost = async (userId: string, data: CreatePostInput) => {
  const post = await postRepo.createPost(userId, data)
  cache.invalidateFeed(userId)
  return post
}

export const updatePost = async (id: string, userId: string, data: UpdatePostInput) => {
  const post = await postRepo.updatePost(id, userId, data)
  cache.invalidateFeed(userId)
  return post
}

export const deletePost = async (id: string, userId: string) => {
  await postRepo.deletePost(id, userId)
  cache.invalidateFeed(userId)
}

export const toggleLike = async (userId: string, postId: string) => {
  const result = await likeRepo.toggleLike(userId, postId)
  if (result.liked && result.targetUserId !== userId) {
    incrTrending(postId)
    sendNotification({ type:'LIKE', actorId:userId, targetUserId:result.targetUserId, resourceId:postId })
  }
  return { liked: result.liked }
}

export const getLikedBy  = (postId: string, cursor?: string, limit=20) => likeRepo.getLikedBy(postId, cursor, limit)
export const getComments = (postId: string, cursor?: string, limit=20) => commentRepo.getComments(postId, cursor, limit)
export const getReplies  = (parentId: string) => commentRepo.getReplies(parentId)

export const createComment = async (userId: string, postId: string, data: CreateCommentInput) => {
  const { comment, postOwnerId } = await commentRepo.createComment(userId, postId, data)
  if (postOwnerId !== userId) sendNotification({ type:'COMMENT', actorId:userId, targetUserId:postOwnerId, resourceId:postId })
  return comment
}

export const deleteComment = (id: string, userId: string) => commentRepo.deleteComment(id, userId)
export const getTrending  = () => postRepo.getTrending(10)
export const getByTag     = (tag: string, cursor?: string, limit=10) => postRepo.getByTag(tag, cursor, limit)
