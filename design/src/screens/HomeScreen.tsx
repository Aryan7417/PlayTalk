import type { Screen } from '../types'
import { SearchIcon, BellIcon, PlusIconSolid, DownloadIcon } from '../components/Icons'
import { VideoCard, PlaylistCard } from '../components/VideoCard'
import { videos, playlists } from '../data/mockData'

interface Props {
  navigate: (s: Screen, p?: any) => void
}

export default function HomeScreen({ navigate }: Props) {
  const savedVideos = videos.filter(v => v.saved)
  const savedPlaylists = playlists.filter(p => p.saved)

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 sticky top-0 z-20" style={{ background: '#0A0A0A' }}>
        <div>
          <p className="text-gray-500 text-xs font-display">Good evening 👋</p>
          <h1 className="font-display font-extrabold text-white text-xl tracking-tight">
            Play<span style={{ color: '#E03131' }}>Talk</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('search')} className="w-9 h-9 rounded-full flex items-center justify-center border border-white/8" style={{ background: '#141414' }}>
            <SearchIcon size={18} color="#9CA3AF" />
          </button>
          <button onClick={() => navigate('downloads')} className="w-9 h-9 rounded-full flex items-center justify-center border border-white/8" style={{ background: '#141414' }}>
            <DownloadIcon size={18} color="#9CA3AF" />
          </button>
          <button className="w-9 h-9 rounded-full flex items-center justify-center relative border border-white/8" style={{ background: '#141414' }}>
            <BellIcon size={18} color="#9CA3AF" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E03131] border-2 border-[#0A0A0A]" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-6 space-y-7">
        {/* Continue Watching */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-white text-base">Continue Watching</h2>
            <button className="text-[#E03131] text-xs font-display font-medium">See all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {savedVideos.slice(0, 4).map(v => (
              <div key={v.id} className="flex-shrink-0 w-44">
                <div onClick={() => navigate('video-details', { video: v })} className="cursor-pointer group">
                  <div className="relative rounded-xl overflow-hidden bg-[#222] aspect-video">
                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-[#E03131] rounded-full" style={{ width: `${Math.random() * 80 + 10}%` }} />
                      </div>
                    </div>
                    <span className="absolute top-2 right-2 bg-black/80 text-white text-[9px] px-1.5 py-0.5 rounded font-display">{v.duration}</span>
                    {v.offline && (
                      <span className="absolute top-2 left-2 bg-[#E03131] text-white text-[9px] px-1.5 py-0.5 rounded-full font-display font-bold">OFFLINE</span>
                    )}
                  </div>
                  <p className="text-white text-xs font-display font-semibold mt-1.5 leading-snug line-clamp-2">{v.title}</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">{v.channel}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured banner */}
        <div
          onClick={() => navigate('video-details', { video: videos[3] })}
          className="relative rounded-2xl overflow-hidden h-36 cursor-pointer active:opacity-90 transition-opacity">
          <img src={videos[3].thumbnail} alt={videos[3].title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
          <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-center max-w-[60%]">
            <span className="text-[#E03131] text-[9px] font-display font-bold uppercase tracking-widest mb-1">Featured</span>
            <p className="text-white text-sm font-display font-bold leading-snug line-clamp-2">{videos[3].title}</p>
            <p className="text-gray-400 text-[10px] mt-1">{videos[3].channel} · {videos[3].duration}</p>
          </div>
          <div className="absolute right-4 top-0 bottom-0 flex items-center">
            <div className="w-12 h-12 rounded-full bg-[#E03131]/90 flex items-center justify-center backdrop-blur-sm">
              <div className="w-0 h-0" style={{ borderLeft: '14px solid white', borderTop: '9px solid transparent', borderBottom: '9px solid transparent', marginLeft: '3px' }} />
            </div>
          </div>
        </div>

        {/* My Videos */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-white text-base">My Videos</h2>
            <button className="text-[#E03131] text-xs font-display font-medium">See all</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {savedVideos.map(v => (
              <VideoCard key={v.id} video={v} variant="grid" onClick={() => navigate('video-details', { video: v })} />
            ))}
          </div>
        </section>

        {/* My Playlists */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-white text-base">My Playlists</h2>
            <button className="text-[#E03131] text-xs font-display font-medium">See all</button>
          </div>
          <div className="flex flex-col gap-2">
            {savedPlaylists.map(pl => (
              <PlaylistCard key={pl.id} playlist={pl} variant="row" onClick={() => navigate('playlist-details', { playlist: pl })} />
            ))}
          </div>
        </section>
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate('add-content')}
        className="fixed bottom-20 right-4 w-14 h-14 rounded-2xl flex items-center justify-center z-30 transition-all active:scale-95"
        style={{ background: 'linear-gradient(135deg, #E03131 0%, #C92A2A 100%)', boxShadow: '0 8px 24px rgba(224,49,49,0.4)' }}>
        <PlusIconSolid size={22} color="#fff" />
      </button>
    </div>
  )
}
