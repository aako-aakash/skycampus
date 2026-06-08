import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/db'
import { generateTokens, setTokenCookies } from '../middleware/auth'
import { AppError } from '../utils/AppError'
import type { Response } from 'express'

export const register = async (data: {
  name: string
  email: string
  username: string
  password: string
  university?: string
  branch?: string
  year?: number
}) => {
  const exists = await prisma.user.findFirst({
    where: { OR: [{ email: data.email }, { username: data.username }] },
  })
  if (exists) {
    throw new AppError(exists.email === data.email ? 'Email already registered' : 'Username taken', 409)
  }
  const password = await bcrypt.hash(data.password, 12)
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      username: data.username,
      password,
      university: data.university,
      branch: data.branch,
      year: data.year,
    },
  })
  const { password: _, refreshToken: __, ...safeUser } = user
  return safeUser
}

export const login = async (data: { email: string; password: string }, res: Response) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } })
  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new AppError('Invalid credentials', 401)
  }
  const tokens = generateTokens(user.id)
  await prisma.user.update({ where: { id: user.id }, data: { refreshToken: tokens.refreshToken } })
  setTokenCookies(res, tokens.accessToken, tokens.refreshToken)
  const { password: _, refreshToken: __, ...safeUser } = user
  return safeUser
}

export const logout = async (userId: string, res: Response) => {
  await prisma.user.update({ where: { id: userId }, data: { refreshToken: null } })
  res.clearCookie('accessToken').clearCookie('refreshToken')
}

export const refresh = async (token: string, res: Response) => {
  if (!token) throw new AppError('No refresh token', 401)
  let decoded: any
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!)
  } catch {
    throw new AppError('Invalid refresh token', 401)
  }
  const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
  if (!user || user.refreshToken !== token) throw new AppError('Token reuse detected', 401)
  const tokens = generateTokens(user.id)
  await prisma.user.update({ where: { id: user.id }, data: { refreshToken: tokens.refreshToken } })
  setTokenCookies(res, tokens.accessToken, tokens.refreshToken)
  return { message: 'Tokens refreshed' }
}

export const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true, name: true, email: true, username: true,
      bio: true, university: true, branch: true, year: true,
      skills: true, interests: true, profilePicture: true,
      coverImage: true, socialLinks: true, createdAt: true,
      _count: { select: { followers: true, following: true, posts: true } },
    },
  })
  if (!user) throw new AppError('User not found', 404)
  return user
}
