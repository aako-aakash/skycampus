import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authAPI } from '@/services/api'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}
const initialState: AuthState = { user: null, loading: false, error: null }

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
  try { const { data } = await authAPI.me(); return data.data.user }
  catch (e: any) { return rejectWithValue(e.response?.data?.message || 'Failed') }
})
export const loginUser = createAsyncThunk('auth/login', async (creds: any, { rejectWithValue }) => {
  try { const { data } = await authAPI.login(creds); return data.data.user }
  catch (e: any) { return rejectWithValue(e.response?.data?.message || 'Login failed') }
})
export const logoutUser = createAsyncThunk('auth/logout', async () => { await authAPI.logout() })

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => { state.user = action.payload },
    clearUser: (state) => { state.user = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending,    (s) => { s.loading = true; s.error = null })
      .addCase(fetchMe.fulfilled,  (s, a) => { s.loading = false; s.user = a.payload })
      .addCase(fetchMe.rejected,   (s) => { s.loading = false; s.user = null })
      .addCase(loginUser.pending,  (s) => { s.loading = true; s.error = null })
      .addCase(loginUser.fulfilled,(s, a) => { s.loading = false; s.user = a.payload })
      .addCase(loginUser.rejected, (s, a) => { s.loading = false; s.error = a.payload as string })
      .addCase(logoutUser.fulfilled,(s) => { s.user = null })
  },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
