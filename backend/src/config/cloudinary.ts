import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const memoryStorage = multer.memoryStorage()

const imageFilter = (_req: any, file: any, cb: any) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (allowed.includes(file.mimetype)) cb(null, true)
  else cb(new Error('Only jpg, png, webp images are allowed'))
}

export const uploadAvatar = multer({ storage: memoryStorage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: imageFilter })
export const uploadPost   = multer({ storage: memoryStorage, limits: { fileSize: 10 * 1024 * 1024 }, fileFilter: imageFilter })
export const uploadCover  = multer({ storage: memoryStorage, limits: { fileSize: 10 * 1024 * 1024 }, fileFilter: imageFilter })
export const uploadResume = multer({
  storage: memoryStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req: any, file: any, cb: any) => {
    if (file.mimetype === 'application/pdf') cb(null, true)
    else cb(new Error('Only PDF files allowed'))
  },
})

export const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<string> =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: `skycampus/${folder}`, transformation: [{ quality: 'auto', fetch_format: 'auto' }] },
      (error, result) => {
        if (error || !result) return reject(error || new Error('Upload failed'))
        resolve(result.secure_url)
      }
    ).end(buffer)
  })

export { cloudinary }
