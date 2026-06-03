import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:    process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const createStorage = (folder: string) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `skycampus/${folder}`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    } as any,
  })

export const uploadAvatar  = multer({ storage: createStorage('avatars'),  limits: { fileSize: 5 * 1024 * 1024 } })
export const uploadPost    = multer({ storage: createStorage('posts'),    limits: { fileSize: 10 * 1024 * 1024 } })
export const uploadResume  = multer({ storage: multer.memoryStorage(),    limits: { fileSize: 10 * 1024 * 1024 } })
export const uploadCover   = multer({ storage: createStorage('covers'),   limits: { fileSize: 10 * 1024 * 1024 } })

export { cloudinary }
