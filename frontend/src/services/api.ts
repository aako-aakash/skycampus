import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
})

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const orig = err.config
    if (err.response?.status === 401 && !orig._retry) {
      orig._retry = true
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/auth/refresh`, {}, { withCredentials: true })
        return api(orig)
      } catch { if (typeof window !== 'undefined') window.location.href = '/login' }
    }
    return Promise.reject(err)
  }
)

export const authAPI = {
  register: (d: any) => api.post('/auth/register', d),
  login:    (d: any) => api.post('/auth/login', d),
  logout:   () =>      api.post('/auth/logout'),
  me:       () =>      api.get('/auth/me'),
}
export const postAPI = {
  getFeed:       (cursor?: string) => api.get('/posts', { params: { cursor } }),
  getUserPosts:  (userId: string, cursor?: string) => api.get(`/posts/user/${userId}`, { params: { cursor } }),
  getPost:       (id: string) => api.get(`/posts/${id}`),
  getTrending:   () => api.get('/posts/trending'),
  getByTag:      (tag: string, cursor?: string) => api.get(`/posts/tag/${tag}`, { params: { cursor } }),
  create:        (d: FormData) => api.post('/posts', d),
  update:        (id: string, d: any) => api.put(`/posts/${id}`, d),
  delete:        (id: string) => api.delete(`/posts/${id}`),
  toggleLike:    (postId: string) => api.post(`/posts/${postId}/like`),
  getComments:   (postId: string, cursor?: string) => api.get(`/posts/${postId}/comments`, { params: { cursor } }),
  createComment: (postId: string, d: any) => api.post(`/posts/${postId}/comments`, d),
  deleteComment: (commentId: string) => api.delete(`/posts/comments/${commentId}`),
}
export const userAPI = {
  getProfile:    (id: string) => api.get(`/users/${id}`),
  updateProfile: (d: FormData) => api.put('/users/profile', d),
  toggleFollow:  (id: string) => api.post(`/users/${id}/follow`),
  getFollowers:  (id: string) => api.get(`/users/${id}/followers`),
  getFollowing:  (id: string) => api.get(`/users/${id}/following`),
  search:        (q: string) => api.get('/users/search', { params: { q } }),
  getSuggested:  () => api.get('/users/suggested'),
}
export const communityAPI = {
  getAll:    (cursor?: string) => api.get('/communities', { params: { cursor } }),
  getMine:   () => api.get('/communities/me'),
  getBySlug: (slug: string) => api.get(`/communities/${slug}`),
  create:    (d: any) => api.post('/communities', d),
  join:      (id: string) => api.post(`/communities/${id}/join`),
  search:    (q: string) => api.get('/communities/search', { params: { q } }),
}
export const chatAPI = {
  getChats:    () => api.get('/chats'),
  getChat:     (id: string) => api.get(`/chats/${id}`),
  createDM:    (targetId: string) => api.post('/chats/dm', { targetId }),
  getMessages: (chatId: string, cursor?: string) => api.get(`/chats/${chatId}/messages`, { params: { cursor } }),
}
export const notifAPI = {
  getAll:      (cursor?: string) => api.get('/notifications', { params: { cursor } }),
  getUnread:   () => api.get('/notifications/unread'),
  markAllRead: () => api.put('/notifications/read-all'),
}
