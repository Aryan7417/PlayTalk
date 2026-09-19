import { useState } from 'react'
import type { Screen } from '../types'
import { BackIcon } from '../components/Icons'

interface Props {
  navigate: (s: Screen) => void
  goBack: () => void
}

export default function SignupScreen({ navigate, goBack }: Props) {
  const [step, setStep] = useState<'form' | 'id'>('form')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const generatedId = 'PT-' + name.substring(0, 4).toUpperCase().replace(/\s/g, 'X') + '8847'

  if (step === 'id') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6" style={{ background: '#0A0A0A' }}>
        <div className="w-16 h-16 rounded-full bg-[#E03131]/15 flex items-center justify-center mb-6">
          <span className="text-3xl">🎉</span>
        </div>
        <h2 className="font-display font-bold text-white text-2xl text-center mb-2">Account Created!</h2>
        <p className="text-gray-500 text-sm text-center mb-8">Your unique PlayTalk ID has been assigned. Share it with friends so they can find you.</p>

        <div className="w-full p-5 rounded-2xl border mb-8 text-center" style={{ background: '#141414', borderColor: '#E03131' + '40' }}>
          <p className="text-gray-500 text-xs font-display mb-2 uppercase tracking-wider">Your PlayTalk ID</p>
          <p className="font-display font-extrabold text-2xl" style={{ color: '#E03131' }}>{generatedId}</p>
          <p className="text-gray-600 text-xs mt-2 font-display">Tap to copy</p>
        </div>

        <button
          onClick={() => navigate('home')}
          className="w-full py-4 rounded-2xl font-display font-bold text-white text-base"
          style={{ background: 'linear-gradient(135deg, #E03131 0%, #C92A2A 100%)', boxShadow: '0 8px 24px rgba(224,49,49,0.3)' }}>
          Get Started
        </button>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col" style={{ background: '#0A0A0A' }}>
      <div className="flex items-center px-4 pt-4 pb-2">
        <button onClick={goBack} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#1A1A1A' }}>
          <BackIcon size={20} color="#9CA3AF" />
        </button>
      </div>

      <div className="flex-1 px-6 pt-2 pb-8 flex flex-col">
        <h2 className="font-display font-bold text-white text-2xl mb-1">Create account</h2>
        <p className="text-gray-500 text-sm mb-8">Join PlayTalk and start sharing videos</p>

        <div className="flex flex-col gap-3 mb-8">
          {[
            { label: 'Full Name', value: name, setter: setName, placeholder: 'Alex Carter', type: 'text' },
            { label: 'Email', value: email, setter: setEmail, placeholder: 'you@example.com', type: 'email' },
            { label: 'Password', value: password, setter: setPassword, placeholder: '8+ characters', type: 'password' },
          ].map(f => (
            <div key={f.label}>
              <label className="text-gray-400 text-xs font-display font-medium mb-1.5 block">{f.label}</label>
              <input
                type={f.type}
                value={f.value}
                onChange={e => f.setter(e.target.value)}
                placeholder={f.placeholder}
                className="w-full rounded-xl px-4 py-3.5 text-white text-sm border border-white/8 font-display"
                style={{ background: '#1A1A1A' }}
              />
            </div>
          ))}
        </div>

        <p className="text-gray-600 text-xs text-center mb-4 font-display">
          By signing up you agree to our{' '}
          <span className="text-gray-400">Terms of Service</span> &amp;{' '}
          <span className="text-gray-400">Privacy Policy</span>
        </p>

        <button
          onClick={() => name && email && password ? setStep('id') : null}
          className="w-full py-4 rounded-2xl font-display font-bold text-white text-base transition-all active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, #E03131 0%, #C92A2A 100%)', boxShadow: '0 8px 24px rgba(224,49,49,0.3)', opacity: name && email && password ? 1 : 0.5 }}>
          Create Account
        </button>
      </div>
    </div>
  )
}
