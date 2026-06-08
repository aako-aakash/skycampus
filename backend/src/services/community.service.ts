import * as commRepo from '../repositories/community.repository'

export const getCommunities     = (cursor?: string, limit = 12) => commRepo.getCommunities(cursor, limit)
export const getCommunity       = (slug: string) => commRepo.getCommunityBySlug(slug)
export const toggleMembership   = (userId: string, communityId: string) => commRepo.toggleMembership(userId, communityId)
export const getUserCommunities = (userId: string) => commRepo.getUserCommunities(userId)
export const searchCommunities  = (q: string) => commRepo.searchCommunities(q)

export const createCommunity = (userId: string, data: any) =>
  commRepo.createCommunity(userId, {
    name: data.name,
    slug: data.slug,
    description: data.description,
    tags: Array.isArray(data.tags) ? data.tags : (data.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
    isPrivate: data.isPrivate === true || data.isPrivate === 'true',
  })
