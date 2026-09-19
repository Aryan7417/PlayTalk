import { useState } from 'react'
import type { Screen } from '../types'

interface Props {
  navigate: (s: Screen) => void
}

export default function LoginScreen({ navigate }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex-1 flex flex-col" style={{ background: '#0A0A0A' }}>
      {/* Header graphic */}
      <div className="relative h-44 flex items-end justify-center pb-8" style={{ background: 'linear-gradient(180deg, #1A0000 0%, #0A0A0A 100%)' }}>
        <div className="absolute top-0 left-0 right-0 h-full" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(224,49,49,0.2) 0%, transparent 65%)' }} />
        <div className="z-10 text-center">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E03131 0%, #9B1414 100%)' }}>
            <div className="w-0 h-0" style={{ borderLeft: '14px solid white', borderTop: '9px solid transparent', borderBottom: '9px solid transparent', marginLeft: '2px' }} />
          </div>
          <h1 className="font-display font-extrabold text-white text-2xl">Play<span className="text-[#E03131]">Talk</span></h1>
        </div>
      </div>

      <div className="flex-1 px-6 pt-6 pb-8 flex flex-col">
        <h2 className="font-display font-bold text-white text-2xl mb-1">Welcome back</h2>
        <p className="text-gray-500 text-sm mb-8">Sign in to continue watching & chatting</p>

        <div className="flex flex-col gap-3 mb-2">
          <div>
            <label className="text-gray-400 text-xs font-display font-medium mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl px-4 py-3.5 text-white text-sm border border-white/8 font-display"
              style={{ background: '#1A1A1A' }}
            />
          </div>
          <div>
            <label className="text-gray-400 text-xs font-display font-medium mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl px-4 py-3.5 text-white text-sm border border-white/8 font-display"
              style={{ background: '#1A1A1A' }}
            />
          </div>
        </div>

        <button className="text-[#E03131] text-xs font-display font-medium text-right mb-8 self-end">
          Forgot password?
        </button>

        <button
          onClick={() => navigate('home')}
          className="w-full py-4 rounded-2xl font-display font-bold text-white text-base transition-all active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, #E03131 0%, #C92A2A 100%)', boxShadow: '0 8px 24px rgba(224,49,49,0.3)' }}>
          Sign In
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-gray-600 text-xs font-display">or</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        <p className="text-center text-gray-500 text-sm font-display">
          Don't have an account?{' '}
          <button onClick={() => navigate('signup')} className="text-[#E03131] font-semibold">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}
