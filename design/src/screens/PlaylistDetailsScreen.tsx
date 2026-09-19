import { useState } from 'react'
import type { Screen, Playlist } from '../types'
import { BackIcon, PlaylistIcon, PlayIcon, SaveIcon, SavedIcon, ShareIcon } from '../components/Icons'
import { VideoCard } from '../components/VideoCard'
import { playlists } from '../data/mockData'

interface Props {
  navigate: (s: Screen, p?: any) => void
  goBack: () => void
  params?: { playlist?: Playlist }
}

export default function PlaylistDetailsScreen({ navigate, goBack, params }: Props) {
  const playlist = params?.playlist || playlists[0]
  const [saved, setSaved] = useState(playlist.saved ?? false)

  return (
    <div className="flex-1 flex flex-col" style={{ background: '#0A0A0A' }}>
      {/* Hero */}
      <div className="relative">
        <div className="w-full h-52 bg-[#111]">
          <img src={playlist.thumbnail} alt={playlist.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(10,10,10,1) 100%)' }} />
        </div>

        <button onClick={goBack} className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.6)' }}>
          <BackIcon size={20} color="#fff" />
        </button>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <div className="flex items-center gap-2 mb-2">
            <PlaylistIcon size={14} color="#E03131" />
            <span className="text-[#E03131] text-xs font-display font-bold uppercase tracking-wide">Playlist</span>
          </div>
          <h1 className="font-display font-extrabold text-white text-xl leading-tight mb-1">{playlist.title}</h1>
          <p className="text-gray-400 text-sm font-display">{playlist.channel} · {playlist.videoCount} videos</p>
        </div>
      </div>

      {/* Action row */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/6">
        <button
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-display font-bold text-white text-sm"
          style={{ background: 'linear-gradient(135deg, #E03131 0%, #C92A2A 100%)', boxShadow: '0 6px 20px rgba(224,49,49,0.3)' }}>
          <PlayIcon size={18} color="#fff" />
          Play All
        </button>
        <button onClick={() => setSaved(!saved)} className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10" style={{ background: '#141414' }}>
          {saved ? <SavedIcon size={20} color="#E03131" /> : <SaveIcon size={20} color="#9CA3AF" />}
        </button>
        <button className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10" style={{ background: '#141414' }}>
          <ShareIcon size={20} color="#9CA3AF" />
        </button>
      </div>

      {/* Video list */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-white text-sm">Videos in this playlist</h2>
          <span className="text-gray-500 text-xs font-display">{playlist.videoCount} total</span>
        </div>
        <div className="flex flex-col gap-3">
          {/* Show real playlist videos + fill with more from library */}
          {[...playlist.videos, ...Array(Math.max(0, playlist.videoCount - playlist.videos.length)).fill(null)].slice(0, 8).map((v, i) =>
            v ? (
              <div key={v.id} className="flex gap-3 items-center">
                <span className="text-gray-600 text-xs font-display w-5 text-center flex-shrink-0">{i + 1}</span>
                <div className="flex-1">
                  <VideoCard video={v} variant="horizontal" onClick={() => navigate('video-details', { video: v })} />
                </div>
              </div>
            ) : (
              <div key={i} className="flex gap-3 items-center">
                <span className="text-gray-600 text-xs font-display w-5 text-center flex-shrink-0">{i + 1}</span>
                <div className="flex-1 flex gap-3 opacity-40">
                  <div className="w-28 h-16 rounded-lg bg-[#222] flex-shrink-0 flex items-center justify-center">
                    <PlaylistIcon size={16} color="#4B5563" />
                  </div>
                  <div className="flex-1 py-1">
                    <div className="h-3 bg-[#222] rounded w-3/4 mb-2" />
                    <div className="h-2.5 bg-[#1A1A1A] rounded w-1/2" />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
