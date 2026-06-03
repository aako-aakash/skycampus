import { prisma } from '../config/db'
import { AppError } from '../utils/AppError'
import { CreatePostInput, UpdatePostInput } from '../validators/post.validator'

const POST_SELECT = (viewerId?: string) => ({
  id:true, content:true, imageUrl:true, tags:true, likesCount:true, commentsCount:true, visibility:true, createdAt:true,
  user:{ select:{ id:true, name:true, username:true, profilePicture:true } },
  ...(viewerId ? { likes:{ where:{ userId:viewerId }, select:{ id:true }, take:1 } } : {})
})

const paginate = (items: any[], limit: number) => {
  const hasMore = items.length > limit
  const data = hasMore ? items.slice(0, limit) : items
  return { data, nextCursor: hasMore ? data[data.length-1].id : null, hasMore }
}

export const getFeedPosts = async (userId: string, cursor?: string, limit=10) => {
  const following = await prisma.follow.findMany({ where:{followerId:userId}, select:{followingId:true} })
  const ids = [userId, ...following.map(f => f.followingId)]
  const posts = await prisma.post.findMany({
    where:{ userId:{in:ids}, visibility:'PUBLIC' },
    select: POST_SELECT(userId),
    orderBy:{ createdAt:'desc' },
    take: limit+1,
    ...(cursor ? { cursor:{id:cursor}, skip:1 } : {})
  })
  const { data, nextCursor, hasMore } = paginate(posts, limit)
  return { posts: data.map(({likes,...p}:any) => ({...p, isLiked: likes?.length > 0})), nextCursor, hasMore }
}

export const getUserPosts = async (targetId: string, viewerId: string, cursor?: string, limit=10) => {
  const posts = await prisma.post.findMany({
    where:{ userId:targetId, ...(targetId !== viewerId ? { visibility:'PUBLIC' } : {}) },
    select: POST_SELECT(viewerId),
    orderBy:{ createdAt:'desc' }, take:limit+1,
    ...(cursor ? { cursor:{id:cursor}, skip:1 } : {})
  })
  const { data, nextCursor, hasMore } = paginate(posts, limit)
  return { posts: data.map(({likes,...p}:any) => ({...p, isLiked: likes?.length > 0})), nextCursor, hasMore }
}

export const getPostById = async (id: string, viewerId?: string) => {
  const post = await prisma.post.findUnique({ where:{id}, select: POST_SELECT(viewerId) })
  if (!post) throw new AppError('Post not found', 404)
  return post
}

export const createPost = (userId: string, data: CreatePostInput) =>
  prisma.post.create({ data:{userId,...data}, select: POST_SELECT() })

export const updatePost = async (id: string, userId: string, data: UpdatePostInput) => {
  const post = await prisma.post.findUnique({ where:{id} })
  if (!post) throw new AppError('Post not found', 404)
  if (post.userId !== userId) throw new AppError('Not authorized', 403)
  return prisma.post.update({ where:{id}, data, select: POST_SELECT() })
}

export const deletePost = async (id: string, userId: string) => {
  const post = await prisma.post.findUnique({ where:{id} })
  if (!post) throw new AppError('Post not found', 404)
  if (post.userId !== userId) throw new AppError('Not authorized', 403)
  await prisma.post.delete({ where:{id} })
}

export const getTrending = (limit=10) =>
  prisma.post.findMany({ where:{visibility:'PUBLIC'}, select: POST_SELECT(), orderBy:[{likesCount:'desc'},{commentsCount:'desc'}], take:limit })

export const getByTag = async (tag: string, cursor?: string, limit=10) => {
  const posts = await prisma.post.findMany({
    where:{ tags:{has:tag}, visibility:'PUBLIC' },
    select: POST_SELECT(), orderBy:{ createdAt:'desc' }, take:limit+1,
    ...(cursor ? { cursor:{id:cursor}, skip:1 } : {})
  })
  const { data, nextCursor, hasMore } = paginate(posts, limit)
  return { posts:data, nextCursor, hasMore }
}
