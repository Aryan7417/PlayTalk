export type Screen =
  | 'splash' | 'login' | 'signup'
  | 'home' | 'add-content' | 'video-details' | 'playlist-details'
  | 'chat-list' | 'private-chat'
  | 'friends' | 'friend-requests' | 'search'
  | 'downloads' | 'profile' | 'settings'

export type TabScreen = 'home' | 'chat-list' | 'friends' | 'profile'

export interface NavState {
  screen: Screen
  params?: Record<string, any>
}

export interface Video {
  id: string
  youtubeId: string
  title: string
  channel: string
  duration: string
  views: string
  thumbnail: string
  description: string
  publishedAt: string
  saved?: boolean
  offline?: boolean
}

export interface Playlist {
  id: string
  youtubeId: string
  title: string
  channel: string
  videoCount: number
  thumbnail: string
  videos: Video[]
  saved?: boolean
}

export interface User {
  id: string
  playTalkId: string
  name: string
  avatarColor: string
  initials: string
  online: boolean
  lastSeen?: string
}

export interface Message {
  id: string
  senderId: string
  text?: string
  video?: Video
  playlist?: Playlist
  timestamp: string
  read: boolean
}

export interface Chat {
  id: string
  user: User
  messages: Message[]
  unreadCount: number
}

export interface FriendRequest {
  id: string
  user: User
  sentAt: string
  direction: 'incoming' | 'outgoing'
}
