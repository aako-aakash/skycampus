import { z } from 'zod'
export const updateProfileSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  bio: z.string().max(300).optional(),
  university: z.string().optional(),
  branch: z.string().optional(),
  year: z.number().min(1).max(6).optional(),
  skills: z.array(z.string()).max(30).optional(),
  interests: z.array(z.string()).max(20).optional(),
  socialLinks: z.object({
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    twitter: z.string().url().optional(),
    website: z.string().url().optional(),
  }).optional(),
})
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
