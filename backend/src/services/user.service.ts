import * as userRepo from '../repositories/user.repository'
import * as followRepo from '../repositories/follow.repository'
import * as cache from './cache.service'
import { sendNotification } from '../sockets/notification.socket'
import type { UpdateProfileInput } from '../validators/user.validator'

export const getProfile = async (id: string) => {
  const c = await cache.getCachedProfile(id)
  if (c) return c
  const user = await userRepo.findById(id)
  cache.cacheProfile(id, user)
  return user
}

export const updateProfile = async (id: string, data: UpdateProfileInput & { profilePicture?:string, coverImage?:string }) => {
  const user = await userRepo.updateUser(id, data)
  cache.invalidateProfile(id)
  return user
}

export const toggleFollow = async (followerId: string, followingId: string) => {
  const result = await followRepo.toggleFollow(followerId, followingId)
  if (result.following) sendNotification({ type:'FOLLOW', actorId:followerId, targetUserId:followingId, resourceId:followerId })
  cache.invalidateProfile(followingId)
  return result
}

export const getFollowers    = (userId: string) => followRepo.getFollowers(userId)
export const getFollowing    = (userId: string) => followRepo.getFollowing(userId)
export const searchUsers     = (q: string) => userRepo.searchUsers(q)
export const getSuggested    = (userId: string) => userRepo.getSuggestedUsers(userId)
