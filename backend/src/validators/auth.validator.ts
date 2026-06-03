import { z } from 'zod'
export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  username: z.string().min(3).max(20).regex(/^[a-z0-9_]+$/, 'Lowercase, numbers and _ only'),
  password: z.string().min(8).regex(/^(?=.*[A-Z])(?=.*[0-9])/, 'Must have uppercase and number'),
  university: z.string().optional(),
  branch: z.string().optional(),
  year: z.number().min(1).max(6).optional(),
})
export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) })
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
