import request from 'supertest'
import app from '../src/app'
import { prisma } from '../src/config/db'
import bcrypt from 'bcryptjs'

let cookies: string[] = []
let postId: string

beforeAll(async () => {
  await prisma.$connect()
  await prisma.user.upsert({
    where: { email: 'post-test@skycampus.edu' },
    update: {},
    create: { name: 'Post Tester', email: 'post-test@skycampus.edu', username: 'post_tester_jest', password: await bcrypt.hash('Password123', 12) },
  })
  const res = await request(app).post('/api/v1/auth/login').send({ email: 'post-test@skycampus.edu', password: 'Password123' })
  cookies = res.headers['set-cookie']
})

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email: 'post-test@skycampus.edu' } })
  await prisma.$disconnect()
})

describe('POST /api/v1/posts', () => {
  it('creates a post', async () => {
    const res = await request(app).post('/api/v1/posts').set('Cookie', cookies)
      .send({ content: 'Hello SkyCampus! This is a test post.', tags: ['test', 'jest'], visibility: 'PUBLIC' })
    expect(res.status).toBe(201)
    expect(res.body.data.post.content).toBe('Hello SkyCampus! This is a test post.')
    postId = res.body.data.post.id
  })

  it('rejects empty content', async () => {
    const res = await request(app).post('/api/v1/posts').set('Cookie', cookies).send({ content: '' })
    expect(res.status).toBe(400)
  })
})

describe('GET /api/v1/posts', () => {
  it('returns feed with pagination', async () => {
    const res = await request(app).get('/api/v1/posts').set('Cookie', cookies)
    expect(res.status).toBe(200)
    expect(res.body.data.posts).toBeDefined()
    expect(res.body.data).toHaveProperty('hasMore')
    expect(res.body.data).toHaveProperty('nextCursor')
  })
})

describe('POST /api/v1/posts/:postId/like', () => {
  it('toggles like on a post', async () => {
    if (!postId) return
    const res = await request(app).post(`/api/v1/posts/${postId}/like`).set('Cookie', cookies)
    expect(res.status).toBe(200)
    expect(res.body.data).toHaveProperty('liked')
  })
})

describe('DELETE /api/v1/posts/:id', () => {
  it('deletes own post', async () => {
    if (!postId) return
    const res = await request(app).delete(`/api/v1/posts/${postId}`).set('Cookie', cookies)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Deleted')
  })
})
