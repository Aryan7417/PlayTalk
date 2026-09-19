import { useState } from 'react'
import type { Screen } from '../types'
import { BackIcon, SearchIcon, PersonPlusIcon, CheckIcon } from '../components/Icons'
import { friends, videos } from '../data/mockData'
import Avatar from '../components/Avatar'
import { VideoCard } from '../components/VideoCard'

interface Props {
  navigate: (s: Screen, p?: any) => void
  goBack: () => void
}

type Tab = 'people' | 'videos'

export default function SearchScreen({ navigate, goBack }: Props) {
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<Tab>('people')
  const [sentRequests, setSentRequests] = useState<string[]>([])

  const peopleResults = query.length > 1
    ? friends.filter(f => f.name.toLowerCase().includes(query.toLowerCase()) || f.playTalkId.toLowerCase().includes(query.toLowerCase()))
    : []

  const videoResults = query.length > 1
    ? videos.filter(v => v.title.toLowerCase().includes(query.toLowerCase()) || v.channel.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div className="flex-1 flex flex-col" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <button onClick={goBack} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#1A1A1A' }}>
          <BackIcon size={20} color="#9CA3AF" />
        </button>
        <div className="flex-1 flex items-center gap-2.5 rounded-xl px-4 py-3 border border-white/8" style={{ background: '#1A1A1A' }}>
          <SearchIcon size={16} color="#6B7280" />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search people, videos…"
            className="flex-1 bg-transparent text-white text-sm font-display"
          />
          {query && <button onClick={() => setQuery('')} className="text-gray-500 text-xs font-display">Clear</button>}
        </div>
      </div>

      {/* PlayTalk ID banner */}
      {!query && (
        <div className="px-4 mb-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl border border-[#E03131]/20" style={{ background: '#1A0000' }}>
            <div className="w-10 h-10 rounded-full bg-[#E03131]/20 flex items-center justify-center flex-shrink-0">
              <SearchIcon size={18} color="#E03131" />
            </div>
            <div>
              <p className="text-white font-display font-semibold text-sm">Find by PlayTalk ID</p>
              <p className="text-gray-500 text-xs font-display mt-0.5">Search using format: PT-XXXX0000</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      {query.length > 1 && (
        <div className="flex gap-1 px-4 mb-4">
          {(['people', 'videos'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full font-display font-semibold text-xs capitalize transition-all ${tab === t ? 'text-white' : 'text-gray-500'}`}
              style={{ background: tab === t ? '#E03131' : '#1A1A1A' }}>
              {t} {t === 'people' ? `(${peopleResults.length})` : `(${videoResults.length})`}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {query.length > 1 && tab === 'people' && (
          <div className="flex flex-col gap-3">
            {peopleResults.length === 0 ? (
              <div className="py-10 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <SearchIcon size={20} color="#4B5563" />
                </div>
                <p className="text-gray-500 text-sm font-display">No people found for "{query}"</p>
                <p className="text-gray-600 text-xs font-display">Try searching by PlayTalk ID</p>
              </div>
            ) : (
              peopleResults.map(user => {
                const isFriend = true
                const sent = sentRequests.includes(user.id)
                return (
                  <div key={user.id} className="flex items-center gap-3 p-4 rounded-2xl border border-white/6" style={{ background: '#141414' }}>
                    <Avatar user={user} size="md" showStatus />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-display font-semibold text-sm">{user.name}</p>
                      <p className="text-gray-500 text-xs font-display mt-0.5">{user.playTalkId}</p>
                    </div>
                    {isFriend ? (
                      <button onClick={() => navigate('private-chat', { chatId: 'c1' })} className="px-3 py-1.5 rounded-lg font-display font-semibold text-xs text-white" style={{ background: '#E03131' }}>
                        Message
                      </button>
                    ) : sent ? (
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10" style={{ background: '#1A1A1A' }}>
                        <CheckIcon size={12} color="#9CA3AF" />
                        <span className="text-gray-400 text-xs font-display">Sent</span>
                      </div>
                    ) : (
                      <button onClick={() => setSentRequests(prev => [...prev, user.id])} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#E03131' }}>
                        <PersonPlusIcon size={16} color="#fff" />
                      </button>
                    )}
                  </div>
                )
              })
            )}
          </div>
        )}

        {query.length > 1 && tab === 'videos' && (
          <div className="flex flex-col gap-3">
            {videoResults.length === 0 ? (
              <div className="py-10 flex flex-col items-center gap-2">
                <p className="text-gray-500 text-sm font-display">No videos found for "{query}"</p>
              </div>
            ) : (
              videoResults.map(v => (
                <VideoCard key={v.id} video={v} variant="row" onClick={() => navigate('video-details', { video: v })} />
              ))
            )}
          </div>
        )}

        {!query && (
          <div className="flex flex-col gap-2">
            <p className="text-gray-600 text-xs font-display uppercase tracking-wider mb-2">Recent searches</p>
            {['PT-ALEX2941', 'JavaScript tutorial', 'Fireship'].map(s => (
              <button key={s} onClick={() => setQuery(s)} className="flex items-center gap-3 py-2.5 px-1 text-left">
                <div className="w-7 h-7 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                  <SearchIcon size={13} color="#6B7280" />
                </div>
                <span className="text-gray-300 text-sm font-display">{s}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
