import Image from 'next/image'
import { clsx } from 'clsx'

interface Props {
  src?: string | null
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = { xs: 'w-6 h-6 text-xs', sm: 'w-8 h-8 text-sm', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg', xl: 'w-24 h-24 text-3xl' }
const px    = { xs: 24, sm: 32, md: 40, lg: 56, xl: 96 }

export default function Avatar({ src, name, size = 'md', className }: Props) {
  return (
    <div className={clsx('rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold overflow-hidden shrink-0', sizes[size], className)}>
      {src
        ? <Image src={src} alt={name} width={px[size]} height={px[size]} className="w-full h-full object-cover" />
        : name[0]?.toUpperCase()}
    </div>
  )
}
