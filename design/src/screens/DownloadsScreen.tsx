import type { Screen } from '../types'
import { BackIcon, PlayIcon, DownloadIcon, WifiOffIcon } from '../components/Icons'
import { offlineVideos } from '../data/mockData'

interface Props {
  navigate: (s: Screen, p?: any) => void
  goBack: () => void
}

export default function DownloadsScreen({ navigate, goBack }: Props) {
  const totalSize = offlineVideos.length * 312

  return (
    <div className="flex-1 flex flex-col" style={{ background: '#0A0A0A' }}>
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-white/6">
        <button onClick={goBack} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#1A1A1A' }}>
          <BackIcon size={20} color="#9CA3AF" />
        </button>
        <div className="flex-1">
          <h1 className="font-display font-bold text-white text-lg">Downloads</h1>
          <p className="text-gray-500 text-xs font-display">{offlineVideos.length} videos · {totalSize} MB</p>
        </div>
      </div>

      {/* Storage bar */}
      <div className="px-4 py-4 border-b border-white/6">
        <div className="p-4 rounded-2xl border border-white/6" style={{ background: '#141414' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <WifiOffIcon size={16} color="#E03131" />
              <span className="text-white font-display font-semibold text-sm">Offline Storage</span>
            </div>
            <span className="text-gray-500 text-xs font-display">{totalSize} / 2048 MB</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#2A2A2A' }}>
            <div className="h-full rounded-full" style={{ width: `${(totalSize / 2048) * 100}%`, background: 'linear-gradient(90deg, #E03131 0%, #C92A2A 100%)' }} />
          </div>
          <p className="text-gray-600 text-xs font-display mt-2">{Math.round(2048 - totalSize)} MB available</p>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
        {offlineVideos.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
              <DownloadIcon size={28} color="#4B5563" />
            </div>
            <div className="text-center">
              <p className="text-white font-display font-semibold">No offline videos</p>
              <p className="text-gray-500 text-sm mt-1">Save videos for offline watching</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {offlineVideos.map(v => (
              <div key={v.id} className="relative rounded-2xl overflow-hidden border border-white/6" style={{ background: '#141414' }}>
                <div className="flex gap-3 p-3">
                  <div className="relative flex-shrink-0 w-28 h-16 rounded-xl overflow-hidden bg-[#222]">
                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button onClick={() => navigate('video-details', { video: v })} className="w-9 h-9 rounded-full bg-[#E03131]/90 flex items-center justify-center">
                        <PlayIcon size={14} color="#fff" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 py-0.5">
                    <p className="text-white text-xs font-display font-semibold leading-snug line-clamp-2">{v.title}</p>
                    <p className="text-gray-400 text-[11px] mt-1 font-display">{v.channel}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-[#E03131]/20 text-[#E03131] text-[9px] font-display font-bold px-2 py-0.5 rounded-full uppercase">Offline</span>
                      <span className="text-gray-600 text-[10px] font-display">~312 MB</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
