import { useState, useCallback } from 'react'
import type { Screen, TabScreen, NavState } from './types'

import BottomNav from './components/BottomNav'
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import HomeScreen from './screens/HomeScreen'
import AddContentScreen from './screens/AddContentScreen'
import VideoDetailsScreen from './screens/VideoDetailsScreen'
import PlaylistDetailsScreen from './screens/PlaylistDetailsScreen'
import ChatListScreen from './screens/ChatListScreen'
import PrivateChatScreen from './screens/PrivateChatScreen'
import FriendsScreen from './screens/FriendsScreen'
import FriendRequestsScreen from './screens/FriendRequestsScreen'
import SearchScreen from './screens/SearchScreen'
import DownloadsScreen from './screens/DownloadsScreen'
import ProfileScreen from './screens/ProfileScreen'
import SettingsScreen from './screens/SettingsScreen'

const TAB_SCREENS: Screen[] = ['home', 'chat-list', 'friends', 'profile']
const NO_NAV_SCREENS: Screen[] = ['splash', 'login', 'signup']

export default function App() {
  const [history, setHistory] = useState<NavState[]>([{ screen: 'splash' }])
  const current = history[history.length - 1]

  const navigate = useCallback((screen: Screen, params?: Record<string, any>) => {
    setHistory(prev => {
      // Tab switch: reset to that tab
      if (TAB_SCREENS.includes(screen)) {
        return [{ screen }]
      }
      return [...prev, { screen, params }]
    })
  }, [])

  const goBack = useCallback(() => {
    setHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev)
  }, [])

  const isTab = TAB_SCREENS.includes(current.screen)
  const showNav = isTab
  const activeTab = (TAB_SCREENS.includes(current.screen) ? current.screen : 'home') as TabScreen

  const renderScreen = () => {
    switch (current.screen) {
      case 'splash': return <SplashScreen onDone={() => navigate('login')} />
      case 'login': return <LoginScreen navigate={navigate} />
      case 'signup': return <SignupScreen navigate={navigate} goBack={goBack} />
      case 'home': return <HomeScreen navigate={navigate} />
      case 'add-content': return <AddContentScreen navigate={navigate} goBack={goBack} />
      case 'video-details': return <VideoDetailsScreen navigate={navigate} goBack={goBack} params={current.params} />
      case 'playlist-details': return <PlaylistDetailsScreen navigate={navigate} goBack={goBack} params={current.params} />
      case 'chat-list': return <ChatListScreen navigate={navigate} />
      case 'private-chat': return <PrivateChatScreen navigate={navigate} goBack={goBack} params={current.params} />
      case 'friends': return <FriendsScreen navigate={navigate} />
      case 'friend-requests': return <FriendRequestsScreen navigate={navigate} goBack={goBack} />
      case 'search': return <SearchScreen navigate={navigate} goBack={goBack} />
      case 'downloads': return <DownloadsScreen navigate={navigate} goBack={goBack} />
      case 'profile': return <ProfileScreen navigate={navigate} />
      case 'settings': return <SettingsScreen navigate={navigate} goBack={goBack} />
      default: return <HomeScreen navigate={navigate} />
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-6" style={{ background: '#050505' }}>
      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: '390px',
          height: '844px',
          borderRadius: '50px',
          background: '#0A0A0A',
          boxShadow: '0 0 0 1px #2A2A2A, 0 0 0 3px #1A1A1A, 0 40px 80px rgba(0,0,0,0.8)',
        }}>

        {/* Notch */}
        <div className="flex-shrink-0 flex justify-center pt-3 pb-1" style={{ background: '#0A0A0A', zIndex: 50 }}>
          <div className="w-28 h-7 rounded-full flex items-center justify-between px-4" style={{ background: '#000' }}>
            <span className="text-white text-[11px] font-display font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              {/* Signal */}
              <div className="flex items-end gap-0.5">
                {[3, 5, 7, 9].map((h, i) => (
                  <div key={i} className="w-1 rounded-sm" style={{ height: `${h}px`, background: i < 3 ? '#fff' : '#ffffff50' }} />
                ))}
              </div>
              {/* WiFi */}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M7 8.5C7.55 8.5 8 8.95 8 9.5C8 10.05 7.55 10.5 7 10.5C6.45 10.5 6 10.05 6 9.5C6 8.95 6.45 8.5 7 8.5Z" fill="white" />
                <path d="M4.5 6.5C5.5 5.5 8.5 5.5 9.5 6.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M2 4C4 2 10 2 12 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {/* Battery */}
              <div className="flex items-center gap-0.5">
                <div className="w-5 h-2.5 rounded-sm border border-white/60 relative">
                  <div className="absolute inset-0.5 rounded-sm bg-white" style={{ right: '20%' }} />
                </div>
                <div className="w-0.5 h-1.5 rounded-r-sm bg-white/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Screen area */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ minHeight: 0 }}>
          {renderScreen()}
        </div>

        {/* Bottom nav */}
        {showNav && (
          <div className="flex-shrink-0">
            <BottomNav active={activeTab} onNavigate={navigate} />
            {/* Home indicator */}
            <div className="flex justify-center pb-2 pt-1" style={{ background: '#0D0D0D' }}>
              <div className="w-24 h-1 rounded-full bg-white/20" />
            </div>
          </div>
        )}

        {/* Frame border glow */}
        <div className="absolute inset-0 rounded-[50px] pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }} />
      </div>

      {/* Side label */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <p className="text-gray-700 text-xs font-display tracking-widest uppercase">PlayTalk · Watch. Share. Talk.</p>
      </div>
    </div>
  )
}
