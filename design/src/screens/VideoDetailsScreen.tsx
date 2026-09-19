import { useState } from 'react'
import type { Screen, Video } from '../types'
import { BackIcon, PlayIcon, SavedIcon, SaveIcon, ShareIcon, DownloadIcon, EyeIcon, ClockIcon, YouTubeIcon } from '../components/Icons'
import { VideoCard } from '../components/VideoCard'
import { videos, chats } from '../data/mockData'
import Avatar from '../components/Avatar'

interface Props {
  navigate: (s: Screen, p?: any) => void
  goBack: () => void
  params?: { video?: Video }
}

export default function VideoDetailsScreen({ navigate, goBack, params }: Props) {
  const video = params?.video || videos[0]
  const [saved, setSaved] = useState(video.saved ?? false)
  const [offline, setOffline] = useState(video.offline ?? false)
  const [showShareSheet, setShowShareSheet] = useState(false)

  const related = videos.filter(v => v.id !== video.id).slice(0, 4)

  return (
    <div className="flex-1 flex flex-col relative" style={{ background: '#0A0A0A' }}>
      {/* Thumbnail hero */}
      <div className="relative">
        <div className="w-full aspect-video bg-[#111]">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Back button */}
        <button onClick={goBack} className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.6)' }}>
          <BackIcon size={20} color="#fff" />
        </button>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{ background: 'linear-gradient(135deg, #E03131 0%, #C92A2A 100%)', boxShadow: '0 8px 32px rgba(224,49,49,0.5)' }}>
            <PlayIcon size={24} color="#fff" />
          </button>
        </div>

        {/* Duration badge */}
        <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded font-display">{video.duration}</span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4 pb-2">
          <h1 className="font-display font-bold text-white text-base leading-snug mb-2">{video.title}</h1>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5">
              <EyeIcon size={14} color="#6B7280" />
              <span className="text-gray-500 text-xs font-display">{video.views} views</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-700" />
            <span className="text-gray-500 text-xs font-display">{video.publishedAt}</span>
            <div className="w-1 h-1 rounded-full bg-gray-700" />
            <div className="flex items-center gap-1.5">
              <YouTubeIcon size={12} />
              <span className="text-gray-500 text-xs font-display">{video.channel}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { icon: <PlayIcon size={20} color="#E03131" />, label: 'Watch', action: () => {} },
              { icon: saved ? <SavedIcon size={20} color="#E03131" /> : <SaveIcon size={20} color="#9CA3AF" />, label: saved ? 'Saved' : 'Save', action: () => setSaved(!saved) },
              { icon: <ShareIcon size={20} color="#9CA3AF" />, label: 'Share', action: () => setShowShareSheet(true) },
              { icon: <DownloadIcon size={20} color={offline ? '#E03131' : '#9CA3AF'} />, label: offline ? 'Saved' : 'Offline', action: () => setOffline(!offline) },
            ].map(a => (
              <button key={a.label} onClick={a.action} className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-white/8 transition-all active:scale-95" style={{ background: '#141414' }}>
                {a.icon}
                <span className="text-gray-400 text-[10px] font-display font-medium">{a.label}</span>
              </button>
            ))}
          </div>

          {/* Channel row */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-white/6 mb-4" style={{ background: '#141414' }}>
            <div className="w-10 h-10 rounded-full bg-[#E03131]/20 flex items-center justify-center flex-shrink-0">
              <YouTubeIcon size={18} />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-display font-semibold">{video.channel}</p>
              <p className="text-gray-500 text-xs font-display">YouTube Channel</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg font-display font-semibold text-xs text-white" style={{ background: '#E03131' }}>
              Visit
            </button>
          </div>

          {/* Description */}
          <div className="mb-5">
            <h3 className="font-display font-semibold text-white text-sm mb-2">Description</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{video.description}</p>
          </div>

          {/* Up Next */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-3">Up Next</h3>
            <div className="flex flex-col gap-3">
              {related.map(v => (
                <VideoCard key={v.id} video={v} variant="horizontal" onClick={() => navigate('video-details', { video: v })} />
              ))}
            </div>
          </div>
        </div>

        <div className="h-6" />
      </div>

      {/* Share Sheet */}
      {showShareSheet && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end" onClick={() => setShowShareSheet(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative rounded-t-3xl p-5 border-t border-white/10" style={{ background: '#141414' }} onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5" />
            <p className="font-display font-bold text-white text-base mb-1">Share video</p>
            <p className="text-gray-500 text-sm mb-5 line-clamp-1">{video.title}</p>
            <p className="text-gray-400 text-xs font-display uppercase tracking-wider mb-3">Send to friend</p>
            <div className="flex gap-3 overflow-x-auto pb-1 mb-5">
              {chats.map(c => (
                <button key={c.id} onClick={() => { setShowShareSheet(false); navigate('private-chat', { chatId: c.id, shareVideo: video }) }} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <Avatar user={c.user} size="lg" showStatus />
                  <span className="text-gray-400 text-[10px] font-display max-w-[56px] truncate">{c.user.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowShareSheet(false)} className="w-full py-3.5 rounded-xl font-display font-semibold text-gray-400 border border-white/8" style={{ background: '#1E1E1E' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
