import { z } from 'zod'
export const createCommunitySchema = z.object({
  name: z.string().min(3).max(50),
  slug: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/),
  description: z.string().max(500).optional(),
  tags: z.array(z.string()).max(10).default([]),
  isPrivate: z.boolean().default(false),
})
export type CreateCommunityInput = z.infer<typeof createCommunitySchema>
