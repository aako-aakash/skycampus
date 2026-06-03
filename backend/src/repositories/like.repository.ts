import { prisma } from '../config/db'
import { AppError } from '../utils/AppError'

export const toggleLike = async (userId: string, postId: string) => {
  const post = await prisma.post.findUnique({ where:{id:postId}, select:{id:true,userId:true} })
  if (!post) throw new AppError('Post not found', 404)
  const existing = await prisma.like.findFirst({ where:{userId,postId} })
  if (existing) {
    await prisma.$transaction([
      prisma.like.delete({ where:{id:existing.id} }),
      prisma.post.update({ where:{id:postId}, data:{likesCount:{decrement:1}} })
    ])
    return { liked:false, targetUserId: post.userId }
  }
  await prisma.$transaction([
    prisma.like.create({ data:{userId,postId} }),
    prisma.post.update({ where:{id:postId}, data:{likesCount:{increment:1}} })
  ])
  return { liked:true, targetUserId: post.userId }
}

export const getLikedBy = async (postId: string, cursor?: string, limit=20) => {
  const likes = await prisma.like.findMany({
    where:{postId},
    include:{ user:{select:{id:true,name:true,username:true,profilePicture:true}} },
    orderBy:{ createdAt:'desc' }, take:limit+1,
    ...(cursor ? { cursor:{id:cursor}, skip:1 } : {})
  })
  const hasMore = likes.length > limit
  const data = hasMore ? likes.slice(0,limit) : likes
  return { users: data.map(l=>l.user), nextCursor: hasMore ? data[data.length-1].id : null, hasMore }
}
