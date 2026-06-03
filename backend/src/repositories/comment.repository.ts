import { prisma } from '../config/db'
import { AppError } from '../utils/AppError'
import { CreateCommentInput } from '../validators/post.validator'

const USER_SEL = { id:true, name:true, username:true, profilePicture:true }

export const getComments = async (postId: string, cursor?: string, limit=20) => {
  const items = await prisma.comment.findMany({
    where:{ postId, parentId:null },
    include:{ user:{select:USER_SEL}, _count:{select:{replies:true}} },
    orderBy:{ createdAt:'asc' }, take:limit+1,
    ...(cursor ? { cursor:{id:cursor}, skip:1 } : {})
  })
  const hasMore = items.length > limit
  const data = hasMore ? items.slice(0,limit) : items
  return { comments:data, nextCursor: hasMore ? data[data.length-1].id : null, hasMore }
}

export const getReplies = (parentId: string) =>
  prisma.comment.findMany({ where:{parentId}, include:{user:{select:USER_SEL}}, orderBy:{createdAt:'asc'} })

export const createComment = async (userId: string, postId: string, data: CreateCommentInput) => {
  const post = await prisma.post.findUnique({ where:{id:postId}, select:{id:true,userId:true} })
  if (!post) throw new AppError('Post not found', 404)
  const [comment] = await prisma.$transaction([
    prisma.comment.create({ data:{userId,postId,content:data.content,parentId:data.parentId??null}, include:{user:{select:USER_SEL}} }),
    prisma.post.update({ where:{id:postId}, data:{commentsCount:{increment:1}} })
  ])
  return { comment, postOwnerId: post.userId }
}

export const deleteComment = async (id: string, userId: string) => {
  const c = await prisma.comment.findUnique({ where:{id} })
  if (!c) throw new AppError('Comment not found', 404)
  if (c.userId !== userId) throw new AppError('Not authorized', 403)
  await prisma.$transaction([
    prisma.comment.delete({ where:{id} }),
    prisma.post.update({ where:{id:c.postId}, data:{commentsCount:{decrement:1}} })
  ])
}
