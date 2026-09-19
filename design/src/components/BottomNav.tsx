import type { TabScreen } from '../types'
import { HomeIcon, HomeOutlineIcon, ChatIcon, ChatOutlineIcon, UsersIcon, ProfileIcon } from './Icons'
import { chats } from '../data/mockData'
import { friendRequests } from '../data/mockData'

interface BottomNavProps {
  active: TabScreen
  onNavigate: (tab: TabScreen) => void
}

const totalUnread = chats.reduce((n, c) => n + c.unreadCount, 0)
const pendingRequests = friendRequests.filter(r => r.direction === 'incoming').length

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  const tabs: Array<{ id: TabScreen; label: string; badge?: number }> = [
    { id: 'home', label: 'Home' },
    { id: 'chat-list', label: 'Chat', badge: totalUnread },
    { id: 'friends', label: 'Friends', badge: pendingRequests },
    { id: 'profile', label: 'Profile' },
  ]

  return (
    <div className="flex items-center px-2 pt-2 pb-1 border-t" style={{ background: '#0D0D0D', borderColor: '#1E1E1E' }}>
      {tabs.map(tab => {
        const isActive = active === tab.id
        return (
          <button key={tab.id} onClick={() => onNavigate(tab.id)} className="flex-1 flex flex-col items-center gap-1 py-1 relative">
            <div className="relative">
              <TabIcon id={tab.id} active={isActive} />
              {tab.badge ? (
                <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 bg-[#E03131] rounded-full flex items-center justify-center text-white text-[9px] font-bold px-0.5 font-display">
                  {tab.badge}
                </span>
              ) : null}
            </div>
            <span className={`text-[10px] font-medium font-display ${isActive ? 'text-[#E03131]' : 'text-gray-600'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function TabIcon({ id, active }: { id: TabScreen; active: boolean }) {
  const color = active ? '#E03131' : '#4B5563'
  if (id === 'home') return active ? <HomeIcon size={22} color={color} /> : <HomeOutlineIcon size={22} color={color} />
  if (id === 'chat-list') return active ? <ChatIcon size={22} color={color} /> : <ChatOutlineIcon size={22} color={color} />
  if (id === 'friends') return <UsersIcon size={22} color={color} />
  return <ProfileIcon size={22} color={color} />
}
