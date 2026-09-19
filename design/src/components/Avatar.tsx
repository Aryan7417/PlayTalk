import type { User } from '../types'

interface AvatarProps {
  user: User
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showStatus?: boolean
}

const sizes = {
  sm: { outer: 'w-8 h-8', text: 'text-xs', dot: 'w-2.5 h-2.5 -bottom-0.5 -right-0.5' },
  md: { outer: 'w-10 h-10', text: 'text-sm', dot: 'w-3 h-3 -bottom-0.5 -right-0.5' },
  lg: { outer: 'w-14 h-14', text: 'text-base', dot: 'w-3.5 h-3.5 bottom-0 right-0' },
  xl: { outer: 'w-20 h-20', text: 'text-xl', dot: 'w-4 h-4 bottom-0.5 right-0.5' },
}

export default function Avatar({ user, size = 'md', showStatus = false }: AvatarProps) {
  const s = sizes[size]
  return (
    <div className={`relative flex-shrink-0 ${s.outer} rounded-full flex items-center justify-center font-display font-bold ${s.text}`}
      style={{ background: user.avatarColor + '30', color: user.avatarColor, border: `1.5px solid ${user.avatarColor}40` }}>
      {user.initials}
      {showStatus && (
        <span className={`absolute ${s.dot} rounded-full border-2 border-[#0A0A0A] ${user.online ? 'bg-green-500' : 'bg-gray-600'}`} />
      )}
    </div>
  )
}
