import { prisma } from '../config/db'
import { AppError } from '../utils/AppError'

export const toggleFollow = async (followerId: string, followingId: string) => {
  if (followerId === followingId) throw new AppError("Can't follow yourself", 400)
  const existing = await prisma.follow.findFirst({ where:{followerId,followingId} })
  if (existing) {
    await prisma.follow.delete({ where:{id:existing.id} })
    return { following:false }
  }
  await prisma.follow.create({ data:{followerId,followingId} })
  return { following:true }
}

export const getFollowers = (userId: string) =>
  prisma.follow.findMany({ where:{followingId:userId}, include:{follower:{select:{id:true,name:true,username:true,profilePicture:true}}}, orderBy:{createdAt:'desc'} })

export const getFollowing = (userId: string) =>
  prisma.follow.findMany({ where:{followerId:userId}, include:{following:{select:{id:true,name:true,username:true,profilePicture:true}}}, orderBy:{createdAt:'desc'} })

export const isFollowing = async (followerId: string, followingId: string) =>
  !!(await prisma.follow.findFirst({ where:{followerId,followingId} }))
