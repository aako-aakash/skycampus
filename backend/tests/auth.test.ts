import request from 'supertest'
import app from '../src/app'
import { prisma } from '../src/config/db'

beforeAll(async () => {
  await prisma.$connect()
  await prisma.user.deleteMany({ where: { email: { contains: 'jest-test' } } })
})

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email: { contains: 'jest-test' } } })
  await prisma.$disconnect()
})

describe('POST /api/v1/auth/register', () => {
  it('registers a new user', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Jest Tester', email: 'jest-test@skycampus.edu',
      username: 'jest_test_user', password: 'Password123',
      university: 'Test University', branch: 'CS',
    })
    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.user.email).toBe('jest-test@skycampus.edu')
  })

  it('rejects duplicate email', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Jest Tester 2', email: 'jest-test@skycampus.edu',
      username: 'jest_test_user2', password: 'Password123',
    })
    expect(res.status).toBe(409)
  })

  it('validates weak password', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Bad Pass', email: 'bad@skycampus.edu',
      username: 'badpass', password: '123',
    })
    expect(res.status).toBe(400)
    expect(res.body.errors).toBeDefined()
  })
})

describe('POST /api/v1/auth/login', () => {
  it('logs in with valid credentials', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'jest-test@skycampus.edu', password: 'Password123',
    })
    expect(res.status).toBe(200)
    expect(res.body.data.user).toBeDefined()
    expect(res.headers['set-cookie']).toBeDefined()
  })

  it('rejects wrong password', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'jest-test@skycampus.edu', password: 'WrongPassword1',
    })
    expect(res.status).toBe(401)
  })
})

describe('GET /health', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})
