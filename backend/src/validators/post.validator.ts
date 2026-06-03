import { z } from 'zod'
export const createPostSchema = z.object({
  content: z.string().min(1).max(2000),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string().max(30)).max(10).default([]),
  visibility: z.enum(['PUBLIC','PRIVATE','CONNECTIONS']).default('PUBLIC'),
})
export const updatePostSchema = createPostSchema.partial()
export const createCommentSchema = z.object({
  content: z.string().min(1).max(500),
  parentId: z.string().uuid().optional(),
})
export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
export type CreateCommentInput = z.infer<typeof createCommentSchema>
