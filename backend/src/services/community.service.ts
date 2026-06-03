import * as commRepo from '../repositories/community.repository'
import type { CreateCommunityInput } from '../validators/community.validator'

export const getCommunities  = (cursor?: string, limit=12) => commRepo.getCommunities(cursor, limit)
export const getCommunity    = (slug: string) => commRepo.getCommunityBySlug(slug)
export const createCommunity = (userId: string, data: CreateCommunityInput) => commRepo.createCommunity(userId, data)
export const toggleMembership = (userId: string, communityId: string) => commRepo.toggleMembership(userId, communityId)
export const getUserCommunities = (userId: string) => commRepo.getUserCommunities(userId)
export const searchCommunities  = (q: string) => commRepo.searchCommunities(q)
