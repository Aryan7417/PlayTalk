import { useState } from 'react'
import type { Screen } from '../types'
import { BackIcon, BellIcon, ProfileIcon, SearchIcon, DownloadIcon, WifiOffIcon, XIcon } from '../components/Icons'
import { currentUser } from '../data/mockData'
import Avatar from '../components/Avatar'

interface Props {
  navigate: (s: Screen) => void
  goBack: () => void
}

const me = { ...currentUser, name: 'Alex Rivera', initials: 'AR' }

export default function SettingsScreen({ navigate, goBack }: Props) {
  const [notifs, setNotifs] = useState({ messages: true, requests: true, reminders: false })
  const [privacy, setPrivacy] = useState({ showOnline: true, readReceipts: true })

  const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${on ? 'bg-[#E03131]' : 'bg-[#2A2A2A]'}`}>
      <div className={`w-4.5 h-4.5 rounded-full bg-white absolute top-0.5 transition-all ${on ? 'right-0.5' : 'left-0.5'}`} style={{ width: '18px', height: '18px' }} />
    </button>
  )

  return (
    <div className="flex-1 flex flex-col" style={{ background: '#0A0A0A' }}>
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-white/6">
        <button onClick={goBack} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#1A1A1A' }}>
          <BackIcon size={20} color="#9CA3AF" />
        </button>
        <h1 className="font-display font-bold text-white text-lg">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 space-y-5">
        {/* Profile section */}
        <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/6" style={{ background: '#141414' }}>
          <Avatar user={me} size="lg" />
          <div className="flex-1">
            <p className="text-white font-display font-bold text-base">{me.name}</p>
            <p className="text-[#E03131] text-xs font-display font-semibold mt-0.5">{currentUser.playTalkId}</p>
          </div>
          <button className="px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 text-xs font-display font-semibold" style={{ background: '#1A1A1A' }}>
            Edit
          </button>
        </div>

        {/* Account */}
        <SettingSection title="Account">
          {[
            { label: 'Email', value: 'alex@example.com' },
            { label: 'Phone', value: 'Not set' },
            { label: 'Change Password', value: '••••••••' },
          ].map(s => (
            <SettingRow key={s.label} label={s.label} value={s.value} />
          ))}
        </SettingSection>

        {/* Notifications */}
        <SettingSection title="Notifications">
          <ToggleRow label="Messages" sublabel="New chat messages" on={notifs.messages} onChange={() => setNotifs(n => ({ ...n, messages: !n.messages }))} />
          <ToggleRow label="Friend requests" sublabel="Incoming requests" on={notifs.requests} onChange={() => setNotifs(n => ({ ...n, requests: !n.requests }))} />
          <ToggleRow label="Watch reminders" sublabel="Resume watching" on={notifs.reminders} onChange={() => setNotifs(n => ({ ...n, reminders: !n.reminders }))} />
        </SettingSection>

        {/* Privacy */}
        <SettingSection title="Privacy">
          <ToggleRow label="Show online status" sublabel="Friends can see when you're active" on={privacy.showOnline} onChange={() => setPrivacy(p => ({ ...p, showOnline: !p.showOnline }))} />
          <ToggleRow label="Read receipts" sublabel="Show when you've read messages" on={privacy.readReceipts} onChange={() => setPrivacy(p => ({ ...p, readReceipts: !p.readReceipts }))} />
        </SettingSection>

        {/* Storage */}
        <SettingSection title="Storage & Downloads">
          <SettingRow label="Offline videos" value="624 MB" />
          <button className="w-full flex items-center justify-between py-3.5 border-t border-white/5">
            <span className="text-[#E03131] font-display font-semibold text-sm">Clear offline cache</span>
          </button>
        </SettingSection>

        {/* Danger zone */}
        <div className="pt-2">
          <button
            onClick={() => navigate('login')}
            className="w-full py-4 rounded-2xl font-display font-semibold text-sm border border-[#E03131]/30 text-[#E03131]"
            style={{ background: '#1A0000' }}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

function SettingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: '#141414' }}>
      <p className="text-gray-500 text-xs font-display uppercase tracking-wider px-4 pt-3.5 pb-2">{title}</p>
      {children}
    </div>
  )
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 border-t border-white/5">
      <span className="text-white font-display text-sm">{label}</span>
      <span className="text-gray-500 text-sm font-display">{value}</span>
    </div>
  )
}

function ToggleRow({ label, sublabel, on, onChange }: { label: string; sublabel: string; on: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 border-t border-white/5">
      <div>
        <p className="text-white font-display text-sm">{label}</p>
        <p className="text-gray-600 text-xs font-display mt-0.5">{sublabel}</p>
      </div>
      <button
        onClick={onChange}
        className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
        style={{ background: on ? '#E03131' : '#2A2A2A' }}>
        <div
          className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-all"
          style={{ left: on ? 'calc(100% - 21px)' : '3px' }}
        />
      </button>
    </div>
  )
}
