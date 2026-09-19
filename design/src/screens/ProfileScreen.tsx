import type { Screen } from '../types'
import { SettingsIcon, DownloadIcon, PlaylistIcon, ShareIcon } from '../components/Icons'
import { currentUser, videos, playlists, friends } from '../data/mockData'
import Avatar from '../components/Avatar'

interface Props {
  navigate: (s: Screen, p?: any) => void
}

const me = { ...currentUser, name: 'Alex Rivera', initials: 'AR' }

export default function ProfileScreen({ navigate }: Props) {
  const savedVideos = videos.filter(v => v.saved)
  const savedPlaylists = playlists.filter(p => p.saved)
  const offlineVideos = videos.filter(v => v.offline)

  const stats = [
    { label: 'Saved', value: savedVideos.length + savedPlaylists.length, icon: '🎬' },
    { label: 'Friends', value: friends.length, icon: '👥' },
    { label: 'Offline', value: offlineVideos.length, icon: '📥' },
  ]

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h1 className="font-display font-extrabold text-white text-xl">Profile</h1>
        <button onClick={() => navigate('settings')} className="w-9 h-9 rounded-full flex items-center justify-center border border-white/8" style={{ background: '#141414' }}>
          <SettingsIcon size={18} color="#9CA3AF" />
        </button>
      </div>

      <div className="px-4 pb-8 space-y-5">
        {/* Profile card */}
        <div className="p-5 rounded-3xl border border-white/6" style={{ background: '#141414' }}>
          <div className="flex items-start gap-4">
            <Avatar user={me} size="xl" showStatus />
            <div className="flex-1 pt-1">
              <h2 className="font-display font-extrabold text-white text-xl">{me.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[#E03131] text-xs font-display font-bold" style={{ background: '#E03131' + '15', padding: '2px 8px', borderRadius: '20px', border: '1px solid #E0313130' }}>
                  {currentUser.playTalkId}
                </span>
              </div>
              <p className="text-green-500 text-xs font-display mt-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                Online
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-3 mt-5">
            {stats.map(s => (
              <div key={s.label} className="flex-1 text-center p-3 rounded-2xl" style={{ background: '#1A1A1A' }}>
                <p className="text-2xl mb-1">{s.icon}</p>
                <p className="font-display font-extrabold text-white text-lg">{s.value}</p>
                <p className="text-gray-500 text-xs font-display">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <DownloadIcon size={20} color="#E03131" />, label: 'Downloads', sub: `${offlineVideos.length} videos`, action: () => navigate('downloads') },
            { icon: <PlaylistIcon size={20} color="#E03131" />, label: 'Playlists', sub: `${savedPlaylists.length} saved`, action: () => {} },
            { icon: <ShareIcon size={20} color="#E03131" />, label: 'Shared', sub: '12 items', action: () => {} },
            { icon: <SettingsIcon size={20} color="#E03131" />, label: 'Settings', sub: 'Account & privacy', action: () => navigate('settings') },
          ].map(a => (
            <button key={a.label} onClick={a.action} className="flex items-center gap-3 p-4 rounded-2xl border border-white/6 text-left transition-all active:scale-98" style={{ background: '#141414' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#E03131' + '15' }}>
                {a.icon}
              </div>
              <div>
                <p className="text-white font-display font-semibold text-sm">{a.label}</p>
                <p className="text-gray-500 text-xs font-display mt-0.5">{a.sub}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Recent videos */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-white text-sm">Recently Saved</h2>
            <button className="text-[#E03131] text-xs font-display font-medium">See all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {savedVideos.slice(0, 4).map(v => (
              <button key={v.id} onClick={() => navigate('video-details', { video: v })} className="flex-shrink-0 w-32">
                <div className="rounded-xl overflow-hidden aspect-video bg-[#222] relative">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 py-0.5 rounded font-display">{v.duration}</span>
                </div>
                <p className="text-gray-300 text-[10px] font-display mt-1 line-clamp-2 leading-snug">{v.title}</p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
