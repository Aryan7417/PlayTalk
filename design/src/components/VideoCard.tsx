import type { Video, Playlist } from '../types'
import { PlayIcon, ClockIcon, PlaylistIcon } from './Icons'

interface VideoCardProps {
  video: Video
  variant?: 'grid' | 'row' | 'message' | 'horizontal'
  onClick?: () => void
}

interface PlaylistCardProps {
  playlist: Playlist
  variant?: 'row' | 'message'
  onClick?: () => void
}

export function VideoCard({ video, variant = 'grid', onClick }: VideoCardProps) {
  if (variant === 'message') {
    return (
      <div
        onClick={onClick}
        className="rounded-xl overflow-hidden border border-white/10 cursor-pointer active:opacity-80 transition-opacity"
        style={{ background: '#1A1A1A' }}>
        <div className="relative">
          <img src={video.thumbnail} alt={video.title} className="w-full h-32 object-cover bg-[#222]" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[#E03131]/90 flex items-center justify-center">
              <PlayIcon size={16} color="#fff" />
            </div>
          </div>
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-medium px-1.5 py-0.5 rounded font-display">{video.duration}</span>
        </div>
        <div className="p-2.5">
          <p className="text-white text-xs font-semibold font-display leading-snug line-clamp-2">{video.title}</p>
          <p className="text-gray-500 text-[10px] mt-0.5">{video.channel}</p>
        </div>
      </div>
    )
  }

  if (variant === 'horizontal') {
    return (
      <div onClick={onClick} className="flex gap-3 cursor-pointer active:opacity-80 transition-opacity">
        <div className="relative flex-shrink-0 w-28 h-16 rounded-lg overflow-hidden bg-[#222]">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-medium px-1 py-0.5 rounded font-display">{video.duration}</span>
        </div>
        <div className="flex-1 min-w-0 py-0.5">
          <p className="text-white text-xs font-semibold font-display leading-snug line-clamp-2">{video.title}</p>
          <p className="text-gray-500 text-[10px] mt-1">{video.channel}</p>
          <p className="text-gray-600 text-[10px] mt-0.5">{video.views} views · {video.publishedAt}</p>
        </div>
      </div>
    )
  }

  if (variant === 'row') {
    return (
      <div onClick={onClick} className="flex gap-3 p-3 rounded-xl cursor-pointer active:opacity-80 transition-opacity" style={{ background: '#141414' }}>
        <div className="relative flex-shrink-0 w-24 h-14 rounded-lg overflow-hidden bg-[#222]">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 py-0.5 rounded font-display">{video.duration}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-semibold font-display leading-snug line-clamp-2">{video.title}</p>
          <p className="text-gray-400 text-[11px] mt-1">{video.channel}</p>
          <div className="flex items-center gap-2 mt-1">
            <ClockIcon size={10} color="#6B7280" />
            <span className="text-gray-500 text-[10px]">{video.duration}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div onClick={onClick} className="cursor-pointer active:opacity-80 transition-opacity group">
      <div className="relative rounded-xl overflow-hidden bg-[#222] aspect-video">
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-medium px-1.5 py-0.5 rounded font-display">{video.duration}</span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-[#E03131]/90 flex items-center justify-center">
            <PlayIcon size={18} color="#fff" />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-white text-xs font-semibold font-display leading-snug line-clamp-2">{video.title}</p>
        <p className="text-gray-400 text-[11px] mt-0.5">{video.channel}</p>
        <p className="text-gray-600 text-[10px] mt-0.5">{video.views} views · {video.publishedAt}</p>
      </div>
    </div>
  )
}

export function PlaylistCard({ playlist, variant = 'row', onClick }: PlaylistCardProps) {
  if (variant === 'message') {
    return (
      <div onClick={onClick} className="rounded-xl overflow-hidden border border-white/10 cursor-pointer active:opacity-80 transition-opacity" style={{ background: '#1A1A1A' }}>
        <div className="relative">
          <img src={playlist.thumbnail} alt={playlist.title} className="w-full h-28 object-cover bg-[#222]" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2">
            <PlaylistIcon size={20} color="#fff" />
            <span className="text-white font-display font-semibold text-sm">{playlist.videoCount} videos</span>
          </div>
        </div>
        <div className="p-2.5">
          <p className="text-white text-xs font-semibold font-display leading-snug line-clamp-2">{playlist.title}</p>
          <p className="text-gray-500 text-[10px] mt-0.5">{playlist.channel}</p>
        </div>
      </div>
    )
  }

  return (
    <div onClick={onClick} className="flex gap-3 p-3 rounded-xl cursor-pointer active:opacity-80 transition-opacity" style={{ background: '#141414' }}>
      <div className="relative flex-shrink-0 w-24 h-14 rounded-lg overflow-hidden bg-[#222]">
        <img src={playlist.thumbnail} alt={playlist.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <PlaylistIcon size={14} color="#fff" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-semibold font-display leading-snug line-clamp-2">{playlist.title}</p>
        <p className="text-gray-400 text-[11px] mt-1">{playlist.channel}</p>
        <p className="text-gray-600 text-[10px] mt-0.5">{playlist.videoCount} videos</p>
      </div>
    </div>
  )
}
