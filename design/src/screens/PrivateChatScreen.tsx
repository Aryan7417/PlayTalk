import { useState, useRef, useEffect } from 'react'
import type { Screen, Video } from '../types'
import { BackIcon, SendIcon, AttachIcon, MoreIcon, PlayIcon } from '../components/Icons'
import { VideoCard, PlaylistCard } from '../components/VideoCard'
import { chats } from '../data/mockData'
import Avatar from '../components/Avatar'

interface Props {
  navigate: (s: Screen, p?: any) => void
  goBack: () => void
  params?: { chatId?: string; shareVideo?: Video }
}

export default function PrivateChatScreen({ navigate, goBack, params }: Props) {
  const chat = chats.find(c => c.id === (params?.chatId || 'c1')) || chats[0]
  const [text, setText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState(() => {
    if (params?.shareVideo) {
      return [...chat.messages, {
        id: 'new1',
        senderId: 'me',
        video: params.shareVideo,
        timestamp: 'now',
        read: true,
      }]
    }
    return chat.messages
  })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { id: Date.now().toString(), senderId: 'me', text: text.trim(), timestamp: 'now', read: true }])
    setText('')
  }

  return (
    <div className="flex-1 flex flex-col" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-3 border-b border-white/6 flex-shrink-0" style={{ background: '#0D0D0D' }}>
        <button onClick={goBack} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
          <BackIcon size={20} color="#9CA3AF" />
        </button>
        <button onClick={() => {}} className="flex items-center gap-2.5 flex-1 min-w-0">
          <Avatar user={chat.user} size="sm" showStatus />
          <div className="min-w-0 text-left">
            <p className="text-white font-display font-semibold text-sm truncate">{chat.user.name}</p>
            <p className={`text-xs font-display ${chat.user.online ? 'text-green-500' : 'text-gray-500'}`}>
              {chat.user.online ? 'Online now' : `Last seen ${chat.user.lastSeen}`}
            </p>
          </div>
        </button>
        <button className="w-8 h-8 rounded-full flex items-center justify-center">
          <MoreIcon size={20} color="#6B7280" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1.5">
        {messages.map((msg, i) => {
          const isMe = msg.senderId === 'me'
          const prevMsg = messages[i - 1]
          const showAvatar = !isMe && (!prevMsg || prevMsg.senderId !== msg.senderId)
          const isConsecutive = prevMsg && prevMsg.senderId === msg.senderId

          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'} ${isConsecutive ? 'mt-0.5' : 'mt-2'}`}>
              {!isMe && (
                <div className="w-7 h-7 flex-shrink-0">
                  {showAvatar && <Avatar user={chat.user} size="sm" />}
                </div>
              )}
              <div className={`max-w-[75%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                {msg.video ? (
                  <div className="w-52">
                    <VideoCard video={msg.video} variant="message" onClick={() => navigate('video-details', { video: msg.video })} />
                  </div>
                ) : msg.playlist ? (
                  <div className="w-52">
                    <PlaylistCard playlist={msg.playlist} variant="message" onClick={() => navigate('playlist-details', { playlist: msg.playlist })} />
                  </div>
                ) : (
                  <div
                    className="px-3.5 py-2.5 rounded-2xl"
                    style={{
                      background: isMe ? 'linear-gradient(135deg, #E03131 0%, #C92A2A 100%)' : '#1E1E1E',
                      borderBottomRightRadius: isMe ? '4px' : undefined,
                      borderBottomLeftRadius: !isMe ? '4px' : undefined,
                    }}>
                    <p className="text-white text-sm font-display leading-relaxed">{msg.text}</p>
                  </div>
                )}
                {!isConsecutive || i === messages.length - 1 ? (
                  <span className="text-gray-600 text-[9px] font-display mt-1 px-1">{msg.timestamp}</span>
                ) : null}
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-white/6 flex-shrink-0" style={{ background: '#0D0D0D' }}>
        <button className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#1A1A1A' }}>
          <AttachIcon size={18} color="#6B7280" />
        </button>
        <div className="flex-1 flex items-center gap-2 rounded-2xl px-4 py-2.5 border border-white/8" style={{ background: '#1A1A1A' }}>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Message…"
            className="flex-1 bg-transparent text-white text-sm font-display"
          />
        </div>
        <button
          onClick={send}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
          style={{ background: text.trim() ? '#E03131' : '#1A1A1A' }}>
          <SendIcon size={18} color={text.trim() ? '#fff' : '#4B5563'} />
        </button>
      </div>
    </div>
  )
}
