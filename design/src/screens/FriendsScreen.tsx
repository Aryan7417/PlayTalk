import type { Screen } from '../types'
import { PersonPlusIcon, SearchIcon } from '../components/Icons'
import { friends, friendRequests } from '../data/mockData'
import Avatar from '../components/Avatar'

interface Props {
  navigate: (s: Screen, p?: any) => void
}

export default function FriendsScreen({ navigate }: Props) {
  const online = friends.filter(f => f.online)
  const offline = friends.filter(f => !f.online)
  const incoming = friendRequests.filter(r => r.direction === 'incoming')

  return (
    <div className="flex-1 flex flex-col" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 sticky top-0 z-10" style={{ background: '#0A0A0A' }}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display font-extrabold text-white text-xl">Friends</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('search')} className="w-9 h-9 rounded-full flex items-center justify-center border border-white/8" style={{ background: '#141414' }}>
              <SearchIcon size={18} color="#9CA3AF" />
            </button>
            <button onClick={() => navigate('friend-requests')} className="w-9 h-9 rounded-full flex items-center justify-center relative border border-white/8" style={{ background: '#141414' }}>
              <PersonPlusIcon size={18} color="#9CA3AF" />
              {incoming.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#E03131] rounded-full flex items-center justify-center text-white text-[9px] font-bold font-display">
                  {incoming.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-3 rounded-xl px-4 py-3 border border-white/6" style={{ background: '#141414' }}>
          <SearchIcon size={16} color="#6B7280" />
          <input placeholder="Search friends…" className="flex-1 bg-transparent text-white text-sm font-display" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-6">
        {/* Friend requests banner */}
        {incoming.length > 0 && (
          <button onClick={() => navigate('friend-requests')} className="w-full flex items-center gap-3 p-4 rounded-2xl border border-[#E03131]/30 text-left" style={{ background: '#1A0000' }}>
            <div className="w-10 h-10 rounded-full bg-[#E03131]/20 flex items-center justify-center flex-shrink-0">
              <PersonPlusIcon size={20} color="#E03131" />
            </div>
            <div className="flex-1">
              <p className="text-white font-display font-semibold text-sm">{incoming.length} Friend {incoming.length === 1 ? 'Request' : 'Requests'}</p>
              <p className="text-gray-500 text-xs font-display mt-0.5">
                {incoming.map(r => r.user.name.split(' ')[0]).join(', ')} sent you a request
              </p>
            </div>
            <span className="text-[#E03131] text-xs font-display font-semibold">View →</span>
          </button>
        )}

        {/* Online */}
        {online.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <h2 className="font-display font-semibold text-white text-sm">Online now</h2>
              <span className="text-gray-600 text-xs font-display">({online.length})</span>
            </div>
            <div className="flex flex-col gap-0.5">
              {online.map(f => <FriendRow key={f.id} user={f} onChat={() => navigate('private-chat', { chatId: 'c' + (friends.indexOf(f) + 1) })} />)}
            </div>
          </section>
        )}

        {/* Offline */}
        {offline.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-gray-600" />
              <h2 className="font-display font-semibold text-white text-sm">Offline</h2>
              <span className="text-gray-600 text-xs font-display">({offline.length})</span>
            </div>
            <div className="flex flex-col gap-0.5">
              {offline.map(f => <FriendRow key={f.id} user={f} onChat={() => navigate('private-chat', { chatId: 'c' + (friends.indexOf(f) + 1) })} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function FriendRow({ user, onChat }: { user: typeof friends[0]; onChat: () => void }) {
  return (
    <div className="flex items-center gap-3 px-1 py-3 rounded-xl transition-all active:bg-white/4">
      <Avatar user={user} size="md" showStatus />
      <div className="flex-1 min-w-0">
        <p className="text-white font-display font-semibold text-sm">{user.name}</p>
        <p className="text-gray-600 text-xs font-display mt-0.5">
          {user.online ? <span className="text-green-500">Active now</span> : `Last seen ${user.lastSeen}`}
        </p>
      </div>
      <button onClick={onChat} className="px-4 py-1.5 rounded-lg font-display font-semibold text-xs border border-white/8 text-gray-300" style={{ background: '#1A1A1A' }}>
        Message
      </button>
    </div>
  )
}
