import { useState } from 'react'
import type { Screen } from '../types'
import { BackIcon, LinkIcon, YouTubeIcon, PlaylistIcon, PlayIcon } from '../components/Icons'
import { videos, playlists } from '../data/mockData'

interface Props {
  navigate: (s: Screen, p?: any) => void
  goBack: () => void
}

type State = 'idle' | 'loading' | 'video' | 'playlist' | 'saved'

export default function AddContentScreen({ navigate, goBack }: Props) {
  const [url, setUrl] = useState('')
  const [state, setState] = useState<State>('idle')
  const [isPlaylist, setIsPlaylist] = useState(false)

  const detect = () => {
    if (!url.trim()) return
    setState('loading')
    setTimeout(() => {
      const pl = url.includes('list=') || url.includes('playlist')
      setIsPlaylist(pl)
      setState(pl ? 'playlist' : 'video')
    }, 1400)
  }

  const mockResult = isPlaylist ? playlists[0] : videos[0]

  return (
    <div className="flex-1 flex flex-col" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-white/6">
        <button onClick={goBack} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#1A1A1A' }}>
          <BackIcon size={20} color="#9CA3AF" />
        </button>
        <h1 className="font-display font-bold text-white text-lg">Add Content</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-8">
        {/* URL Input */}
        <div className="mb-5">
          <label className="text-gray-400 text-xs font-display font-medium mb-2 block">YouTube URL</label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3.5 border border-white/8" style={{ background: '#1A1A1A' }}>
              <LinkIcon size={18} color="#6B7280" />
              <input
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="Paste a YouTube video or playlist URL…"
                className="flex-1 bg-transparent text-white text-sm font-display"
                style={{ minWidth: 0 }}
              />
            </div>
            <button
              onClick={detect}
              className="px-4 rounded-xl font-display font-bold text-white text-sm transition-all active:scale-95 flex-shrink-0"
              style={{ background: url.trim() ? '#E03131' : '#2A2A2A', color: url.trim() ? '#fff' : '#4B5563' }}>
              Fetch
            </button>
          </div>
          <p className="text-gray-600 text-xs font-display mt-2">Works with videos, shorts, playlists and channels</p>
        </div>

        {/* Quick examples */}
        {state === 'idle' && (
          <div className="flex flex-col gap-3">
            <p className="text-gray-500 text-xs font-display uppercase tracking-wider">Try an example</p>
            {[
              { label: 'YouTube Video', url: 'https://youtube.com/watch?v=BRRolKTlF6Q', icon: <PlayIcon size={14} color="#E03131" /> },
              { label: 'YouTube Playlist', url: 'https://youtube.com/playlist?list=PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU', icon: <PlaylistIcon size={14} color="#E03131" /> },
            ].map(e => (
              <button key={e.url} onClick={() => setUrl(e.url)} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/6 text-left" style={{ background: '#141414' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#2A0000' }}>
                  {e.icon}
                </div>
                <div>
                  <p className="text-white text-xs font-display font-semibold">{e.label}</p>
                  <p className="text-gray-600 text-[10px] font-display truncate max-w-[220px]">{e.url}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {state === 'loading' && (
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="w-16 h-16 rounded-2xl bg-[#E03131]/10 flex items-center justify-center">
              <YouTubeIcon size={32} />
            </div>
            <div className="text-center">
              <p className="text-white font-display font-semibold">Fetching content…</p>
              <p className="text-gray-500 text-sm mt-1">Detecting type and loading metadata</p>
            </div>
            <div className="flex gap-1.5 mt-2">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#E03131] animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
          </div>
        )}

        {/* Result - Video */}
        {state === 'video' && (
          <div className="flex flex-col gap-4 animate-[fadeUp_0.4s_ease_forwards]">
            <div className="flex items-center gap-2 p-2.5 rounded-lg" style={{ background: '#E03131' + '20' }}>
              <PlayIcon size={14} color="#E03131" />
              <span className="text-[#E03131] text-xs font-display font-semibold">Video detected</span>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <img src={(mockResult as any).thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#E03131]/90 flex items-center justify-center">
                  <PlayIcon size={24} color="#fff" />
                </div>
              </div>
              <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded font-display">{(mockResult as any).duration}</span>
            </div>
            <div className="p-4 rounded-xl border border-white/8" style={{ background: '#141414' }}>
              <p className="text-white font-display font-bold text-base leading-snug">{(mockResult as any).title}</p>
              <p className="text-gray-400 text-sm mt-1">{(mockResult as any).channel}</p>
              <div className="flex gap-4 mt-3">
                <span className="text-gray-500 text-xs font-display">{(mockResult as any).views} views</span>
                <span className="text-gray-500 text-xs font-display">{(mockResult as any).publishedAt}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setState('saved'); setTimeout(() => navigate('video-details', { video: mockResult }), 500) }}
                className="flex-1 py-3.5 rounded-2xl font-display font-bold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #E03131 0%, #C92A2A 100%)', boxShadow: '0 6px 20px rgba(224,49,49,0.3)' }}>
                Save Video
              </button>
              <button onClick={() => navigate('video-details', { video: mockResult })} className="flex-1 py-3.5 rounded-2xl font-display font-bold text-sm border border-white/10" style={{ color: '#9CA3AF', background: '#1A1A1A' }}>
                Preview
              </button>
            </div>
          </div>
        )}

        {/* Result - Playlist */}
        {state === 'playlist' && (
          <div className="flex flex-col gap-4 animate-[fadeUp_0.4s_ease_forwards]">
            <div className="flex items-center gap-2 p-2.5 rounded-lg" style={{ background: '#E03131' + '20' }}>
              <PlaylistIcon size={14} color="#E03131" />
              <span className="text-[#E03131] text-xs font-display font-semibold">Playlist detected — {(mockResult as any).videoCount} videos</span>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-40">
              <img src={(mockResult as any).thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3">
                <PlaylistIcon size={28} color="#fff" />
                <span className="text-white font-display font-bold text-xl">{(mockResult as any).videoCount} videos</span>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-white/8" style={{ background: '#141414' }}>
              <p className="text-white font-display font-bold text-base leading-snug">{(mockResult as any).title}</p>
              <p className="text-gray-400 text-sm mt-1">{(mockResult as any).channel}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('playlist-details', { playlist: mockResult })}
                className="flex-1 py-3.5 rounded-2xl font-display font-bold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #E03131 0%, #C92A2A 100%)', boxShadow: '0 6px 20px rgba(224,49,49,0.3)' }}>
                Save Playlist
              </button>
              <button onClick={() => navigate('playlist-details', { playlist: mockResult })} className="flex-1 py-3.5 rounded-2xl font-display font-bold text-sm border border-white/10" style={{ color: '#9CA3AF', background: '#1A1A1A' }}>
                Preview
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  )
}
