import { useEffect } from 'react'
import { YouTubeIcon } from '../components/Icons'

interface Props {
  onDone: () => void
}

export default function SplashScreen({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(224,49,49,0.15) 0%, transparent 70%)' }} />
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center gap-5 z-10 animate-[fadeIn_0.8s_ease_forwards]">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E03131 0%, #9B1414 100%)', boxShadow: '0 0 40px rgba(224,49,49,0.4)' }}>
            <div className="w-0 h-0" style={{ borderLeft: '22px solid white', borderTop: '14px solid transparent', borderBottom: '14px solid transparent', marginLeft: '4px' }} />
          </div>
          <div className="absolute -inset-1 rounded-[22px] border border-[#E03131]/20" />
        </div>

        <div className="text-center">
          <h1 className="font-display font-extrabold text-white tracking-tight" style={{ fontSize: '32px', letterSpacing: '-0.5px' }}>
            Play<span style={{ color: '#E03131' }}>Talk</span>
          </h1>
          <p className="text-gray-500 text-sm font-display mt-1 tracking-widest uppercase" style={{ fontSize: '11px', letterSpacing: '3px' }}>
            Watch · Share · Talk
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="absolute bottom-12 flex flex-col items-center gap-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#E03131]" style={{ opacity: i === 0 ? 1 : 0.3 }} />
          ))}
        </div>
        <p className="text-gray-600 text-[10px] font-display tracking-wider uppercase">Loading…</p>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  )
}
