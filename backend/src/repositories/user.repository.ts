import { prisma } from '../config/db'
import { UpdateProfileInput } from '../validators/user.validator'
import { AppError } from '../utils/AppError'

const PUBLIC_USER = { id:true, name:true, username:true, email:true, bio:true, university:true, branch:true, year:true, skills:true, interests:true, profilePicture:true, coverImage:true, socialLinks:true, createdAt:true,
  _count: { select: { followers:true, following:true, posts:true } }
}

export const findById = async (id: string) => {
  const user = await prisma.user.findUnique({ where:{id}, select: PUBLIC_USER })
  if (!user) throw new AppError('User not found', 404)
  return user
}

export const findByEmail = (email: string) =>
  prisma.user.findUnique({ where:{email} })

export const findByUsername = (username: string) =>
  prisma.user.findUnique({ where:{username}, select: PUBLIC_USER })

export const createUser = (data: any) =>
  prisma.user.create({ data, select: { id:true, name:true, email:true, username:true } })

export const updateUser = (id: string, data: UpdateProfileInput & { profilePicture?:string, coverImage?:string }) =>
  prisma.user.update({ where:{id}, data, select: PUBLIC_USER })

export const updateRefreshToken = (id: string, token: string|null) =>
  prisma.user.update({ where:{id}, data:{ refreshToken:token } })

export const searchUsers = (q: string, limit=10) =>
  prisma.user.findMany({
    where: { OR: [{ name:{contains:q,mode:'insensitive'} }, { username:{contains:q,mode:'insensitive'} }, { university:{contains:q,mode:'insensitive'} }] },
    select: { id:true, name:true, username:true, profilePicture:true, university:true, branch:true },
    take: limit
  })

export const getSuggestedUsers = (userId: string, limit=8) =>
  prisma.user.findMany({
    where: { id:{not:userId}, followers:{ none:{ followerId:userId } } },
    select: { id:true, name:true, username:true, profilePicture:true, university:true, _count:{select:{followers:true}} },
    orderBy: { followers:{ _count:'desc' } },
    take: limit
  })
