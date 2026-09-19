import type { Screen } from '../types'
import { SearchIcon, PlusIconSolid } from '../components/Icons'
import { chats } from '../data/mockData'
import Avatar from '../components/Avatar'

interface Props {
  navigate: (s: Screen, p?: any) => void
}

export default function ChatListScreen({ navigate }: Props) {
  const totalUnread = chats.reduce((n, c) => n + c.unreadCount, 0)

  const lastMessage = (chat: typeof chats[0]) => {
    const last = chat.messages[chat.messages.length - 1]
    if (last.video) return '🎬 Shared a video'
    if (last.playlist) return '📋 Shared a playlist'
    return last.text || ''
  }

  return (
    <div className="flex-1 flex flex-col" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 sticky top-0 z-10" style={{ background: '#0A0A0A' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display font-extrabold text-white text-xl">Messages</h1>
            {totalUnread > 0 && (
              <p className="text-gray-500 text-xs font-display mt-0.5">{totalUnread} unread</p>
            )}
          </div>
          <button onClick={() => navigate('search')} className="w-9 h-9 rounded-full flex items-center justify-center border border-white/8" style={{ background: '#141414' }}>
            <PlusIconSolid size={18} color="#9CA3AF" />
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 rounded-xl px-4 py-3 border border-white/6" style={{ background: '#141414' }}>
          <SearchIcon size={16} color="#6B7280" />
          <input placeholder="Search conversations…" className="flex-1 bg-transparent text-white text-sm font-display" />
        </div>
      </div>

      {/* Online friends strip */}
      <div className="px-4 mb-4">
        <div className="flex gap-4 overflow-x-auto pb-1">
          {chats.filter(c => c.user.online).map(c => (
            <button key={c.id} onClick={() => navigate('private-chat', { chatId: c.id })} className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <Avatar user={c.user} size="md" showStatus />
              <span className="text-gray-400 text-[10px] font-display max-w-[44px] truncate">{c.user.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="px-4 mb-1">
        <p className="text-gray-600 text-xs font-display uppercase tracking-wider">All messages</p>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {chats.map(chat => {
          const lastMsg = chat.messages[chat.messages.length - 1]
          return (
            <button
              key={chat.id}
              onClick={() => navigate('private-chat', { chatId: chat.id })}
              className="w-full flex items-center gap-3 px-4 py-3.5 transition-all active:bg-white/4">
              <Avatar user={chat.user} size="md" showStatus />
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`font-display font-semibold text-sm ${chat.unreadCount > 0 ? 'text-white' : 'text-gray-300'}`}>
                    {chat.user.name}
                  </span>
                  <span className={`text-[10px] font-display ${chat.unreadCount > 0 ? 'text-[#E03131]' : 'text-gray-600'}`}>
                    {lastMsg.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs truncate font-display ${chat.unreadCount > 0 ? 'text-gray-300' : 'text-gray-600'}`}>
                    {lastMsg.senderId === 'me' ? 'You: ' : ''}{lastMessage(chat)}
                  </span>
                  {chat.unreadCount > 0 && (
                    <span className="flex-shrink-0 min-w-[20px] h-5 bg-[#E03131] rounded-full flex items-center justify-center text-white text-[10px] font-bold px-1 font-display">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
