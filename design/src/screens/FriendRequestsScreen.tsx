import { useState } from 'react'
import type { Screen } from '../types'
import { BackIcon, CheckIcon, XIcon } from '../components/Icons'
import { friendRequests as initialRequests } from '../data/mockData'
import Avatar from '../components/Avatar'

interface Props {
  goBack: () => void
  navigate: (s: Screen, p?: any) => void
}

export default function FriendRequestsScreen({ goBack }: Props) {
  const [requests, setRequests] = useState(initialRequests)

  const accept = (id: string) => setRequests(prev => prev.filter(r => r.id !== id))
  const reject = (id: string) => setRequests(prev => prev.filter(r => r.id !== id))

  const incoming = requests.filter(r => r.direction === 'incoming')
  const outgoing = requests.filter(r => r.direction === 'outgoing')

  return (
    <div className="flex-1 flex flex-col" style={{ background: '#0A0A0A' }}>
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-white/6">
        <button onClick={goBack} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#1A1A1A' }}>
          <BackIcon size={20} color="#9CA3AF" />
        </button>
        <h1 className="font-display font-bold text-white text-lg">Friend Requests</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 space-y-6">
        {/* Incoming */}
        <section>
          <h2 className="font-display font-semibold text-white text-sm mb-3">Incoming ({incoming.length})</h2>
          {incoming.length === 0 ? (
            <div className="py-8 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <CheckIcon size={20} color="#4B5563" />
              </div>
              <p className="text-gray-600 text-sm font-display">No pending requests</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {incoming.map(req => (
                <div key={req.id} className="flex items-center gap-3 p-4 rounded-2xl border border-white/6" style={{ background: '#141414' }}>
                  <Avatar user={req.user} size="md" showStatus />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-display font-semibold text-sm">{req.user.name}</p>
                    <p className="text-gray-500 text-xs font-display mt-0.5">{req.user.playTalkId}</p>
                    <p className="text-gray-600 text-[10px] font-display mt-0.5">{req.sentAt}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => reject(req.id)} className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10" style={{ background: '#222' }}>
                      <XIcon size={18} color="#9CA3AF" />
                    </button>
                    <button onClick={() => accept(req.id)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#E03131' }}>
                      <CheckIcon size={18} color="#fff" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Outgoing */}
        <section>
          <h2 className="font-display font-semibold text-white text-sm mb-3">Sent ({outgoing.length})</h2>
          <div className="flex flex-col gap-3">
            {outgoing.map(req => (
              <div key={req.id} className="flex items-center gap-3 p-4 rounded-2xl border border-white/6" style={{ background: '#141414' }}>
                <Avatar user={req.user} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-display font-semibold text-sm">{req.user.name}</p>
                  <p className="text-gray-500 text-xs font-display mt-0.5">{req.user.playTalkId}</p>
                  <p className="text-gray-600 text-[10px] font-display mt-0.5">Sent {req.sentAt}</p>
                </div>
                <button onClick={() => reject(req.id)} className="px-3 py-1.5 rounded-lg font-display font-semibold text-xs border border-white/10 text-gray-400" style={{ background: '#1A1A1A' }}>
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
