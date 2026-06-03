import { prisma } from '../config/db'
import { AppError } from '../utils/AppError'
import { CreateCommunityInput } from '../validators/community.validator'

const COMM_SEL = { id:true, name:true, slug:true, description:true, avatar:true, coverImage:true, isPrivate:true, memberCount:true, tags:true, createdAt:true, creator:{select:{id:true,name:true,username:true}} }

export const getCommunities = (cursor?: string, limit=12) =>
  prisma.community.findMany({ select:COMM_SEL, orderBy:{memberCount:'desc'}, take:limit, ...(cursor ? {cursor:{id:cursor},skip:1} : {}) })

export const getCommunityBySlug = async (slug: string) => {
  const c = await prisma.community.findUnique({ where:{slug}, select:{...COMM_SEL, _count:{select:{members:true}}} })
  if (!c) throw new AppError('Community not found', 404)
  return c
}

export const createCommunity = async (userId: string, data: CreateCommunityInput) => {
  const c = await prisma.community.create({ data:{...data, creatorId:userId, memberCount:1}, select:COMM_SEL })
  await prisma.communityMember.create({ data:{userId, communityId:c.id, role:'ADMIN'} })
  return c
}

export const toggleMembership = async (userId: string, communityId: string) => {
  const existing = await prisma.communityMember.findFirst({ where:{userId,communityId} })
  if (existing) {
    if (existing.role === 'ADMIN') throw new AppError('Admin cannot leave', 400)
    await prisma.$transaction([
      prisma.communityMember.delete({ where:{id:existing.id} }),
      prisma.community.update({ where:{id:communityId}, data:{memberCount:{decrement:1}} })
    ])
    return { joined:false }
  }
  await prisma.$transaction([
    prisma.communityMember.create({ data:{userId,communityId,role:'MEMBER'} }),
    prisma.community.update({ where:{id:communityId}, data:{memberCount:{increment:1}} })
  ])
  return { joined:true }
}

export const getUserCommunities = (userId: string) =>
  prisma.communityMember.findMany({ where:{userId}, include:{community:{select:COMM_SEL}}, orderBy:{joinedAt:'desc'} })

export const searchCommunities = (q: string) =>
  prisma.community.findMany({ where:{OR:[{name:{contains:q,mode:'insensitive'}},{description:{contains:q,mode:'insensitive'}}]}, select:COMM_SEL, take:10 })
