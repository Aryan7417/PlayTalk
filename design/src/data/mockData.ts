import type { Video, Playlist, User, Chat, FriendRequest } from '../types'

export const videos: Video[] = [
  {
    id: 'v1',
    youtubeId: 'BRRolKTlF6Q',
    title: '100+ Web Development Concepts in 10 Minutes',
    channel: 'Fireship',
    duration: '10:25',
    views: '4.2M',
    thumbnail: 'https://img.youtube.com/vi/BRRolKTlF6Q/maxresdefault.jpg',
    description: 'A whirlwind tour of 100+ web development concepts from HTML basics to advanced frameworks, covering everything a modern web developer should know.',
    publishedAt: '2 months ago',
    saved: true,
  },
  {
    id: 'v2',
    youtubeId: 'rfscVS0vtbw',
    title: 'Learn Python - Full Course for Beginners',
    channel: 'freeCodeCamp.org',
    duration: '4:26:51',
    views: '38M',
    thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg',
    description: 'This course will give you a full introduction into all of the core concepts in Python. Follow along with the videos and you\'ll be a python programmer in no time!',
    publishedAt: '4 years ago',
    saved: true,
    offline: true,
  },
  {
    id: 'v3',
    youtubeId: 'ysz5S6PUM-U',
    title: 'Flexbox CSS In 20 Minutes',
    channel: 'Traversy Media',
    duration: '19:58',
    views: '2.1M',
    thumbnail: 'https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg',
    description: 'In this video we will be going over the CSS Flexbox layout module. Flexbox makes it incredibly easy to align and layout elements in your HTML structure.',
    publishedAt: '6 years ago',
    saved: true,
  },
  {
    id: 'v4',
    youtubeId: '8mAITcNt710',
    title: 'React Crash Course 2024',
    channel: 'Traversy Media',
    duration: '1:48:12',
    views: '1.8M',
    thumbnail: 'https://img.youtube.com/vi/8mAITcNt710/maxresdefault.jpg',
    description: 'In this crash course we will build a complete React application from scratch covering all the fundamentals of React including components, state, props, hooks and more.',
    publishedAt: '8 months ago',
    saved: true,
    offline: true,
  },
  {
    id: 'v5',
    youtubeId: 'PkZNo7MFNFg',
    title: 'JavaScript Programming - Full Course',
    channel: 'freeCodeCamp.org',
    duration: '7:26:06',
    views: '5.3M',
    thumbnail: 'https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg',
    description: 'Learn JavaScript from scratch in this full course. This tutorial covers all the important JavaScript topics, including variables, functions, objects, arrays, and more.',
    publishedAt: '3 years ago',
    saved: false,
  },
  {
    id: 'v6',
    youtubeId: 'Jce5FixpgZQ',
    title: '25 VS Code Productivity Tips',
    channel: 'Fireship',
    duration: '8:41',
    views: '980K',
    thumbnail: 'https://img.youtube.com/vi/Jce5FixpgZQ/maxresdefault.jpg',
    description: 'Become a VS Code power user with these 25 tips and tricks that will boost your productivity and make you a more efficient developer.',
    publishedAt: '1 year ago',
    saved: true,
  },
]

export const playlists: Playlist[] = [
  {
    id: 'pl1',
    youtubeId: 'PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU',
    title: 'Full Stack Web Development Course',
    channel: 'Traversy Media',
    videoCount: 24,
    thumbnail: 'https://img.youtube.com/vi/8mAITcNt710/maxresdefault.jpg',
    videos: [videos[3], videos[2], videos[0]],
    saved: true,
  },
  {
    id: 'pl2',
    youtubeId: 'PLWKjhJtqVAbnRT_hue-3zyiuIYj0OlpyG',
    title: 'CS50 Algorithm Visualizations',
    channel: 'CS50',
    videoCount: 12,
    thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg',
    videos: [videos[1], videos[4]],
    saved: true,
  },
  {
    id: 'pl3',
    youtubeId: 'PLjVLYmrlmjGfpTy6ELDqwfJ4KrE3xFzwb',
    title: 'TypeScript Masterclass',
    channel: 'Jack Herrington',
    videoCount: 8,
    thumbnail: 'https://img.youtube.com/vi/BRRolKTlF6Q/maxresdefault.jpg',
    videos: [videos[0], videos[5]],
    saved: false,
  },
]

export const friends: User[] = [
  { id: 'u1', playTalkId: 'PT-ALEX2941', name: 'Alex Carter', avatarColor: '#3B82F6', initials: 'AC', online: true },
  { id: 'u2', playTalkId: 'PT-JESS5837', name: 'Jessica Kim', avatarColor: '#8B5CF6', initials: 'JK', online: true },
  { id: 'u3', playTalkId: 'PT-MARK1122', name: 'Marcus Webb', avatarColor: '#F59E0B', initials: 'MW', online: false, lastSeen: '2h ago' },
  { id: 'u4', playTalkId: 'PT-SARA7734', name: 'Sara Okonjo', avatarColor: '#10B981', initials: 'SO', online: false, lastSeen: 'Yesterday' },
  { id: 'u5', playTalkId: 'PT-RYAN4421', name: 'Ryan Torres', avatarColor: '#EC4899', initials: 'RT', online: true },
  { id: 'u6', playTalkId: 'PT-NINA8823', name: 'Nina Patel', avatarColor: '#14B8A6', initials: 'NP', online: false, lastSeen: '3d ago' },
]

export const chats: Chat[] = [
  {
    id: 'c1',
    user: friends[0],
    unreadCount: 3,
    messages: [
      { id: 'm1', senderId: 'u1', text: 'Hey! Check this out 🔥', timestamp: '10:24 AM', read: true },
      { id: 'm2', senderId: 'u1', video: videos[0], timestamp: '10:24 AM', read: true },
      { id: 'm3', senderId: 'me', text: 'Woah this is insane, been looking for something like this', timestamp: '10:26 AM', read: true },
      { id: 'm4', senderId: 'u1', text: 'Right?? Fireship always delivers', timestamp: '10:27 AM', read: true },
      { id: 'm5', senderId: 'me', text: 'Also found this playlist you might like 👇', timestamp: '10:28 AM', read: true },
      { id: 'm6', senderId: 'me', playlist: playlists[0], timestamp: '10:28 AM', read: true },
      { id: 'm7', senderId: 'u1', text: 'Bro this is exactly what I needed 😭', timestamp: '10:30 AM', read: false },
      { id: 'm8', senderId: 'u1', text: 'Saving everything you share lol', timestamp: '10:30 AM', read: false },
      { id: 'm9', senderId: 'u1', text: 'Thanks man 🙏', timestamp: '10:31 AM', read: false },
    ],
  },
  {
    id: 'c2',
    user: friends[1],
    unreadCount: 0,
    messages: [
      { id: 'm10', senderId: 'u2', text: 'Did you finish the React crash course?', timestamp: 'Yesterday', read: true },
      { id: 'm11', senderId: 'me', text: 'Almost! Like 30 mins left', timestamp: 'Yesterday', read: true },
      { id: 'm12', senderId: 'u2', text: 'Let me know what you think when done!', timestamp: 'Yesterday', read: true },
    ],
  },
  {
    id: 'c3',
    user: friends[4],
    unreadCount: 1,
    messages: [
      { id: 'm13', senderId: 'u5', text: 'You have to watch this Python course', timestamp: 'Tuesday', read: true },
      { id: 'm14', senderId: 'u5', video: videos[1], timestamp: 'Tuesday', read: false },
    ],
  },
  {
    id: 'c4',
    user: friends[2],
    unreadCount: 0,
    messages: [
      { id: 'm15', senderId: 'me', text: 'Saved that VS Code tips video you shared', timestamp: 'Monday', read: true },
      { id: 'm16', senderId: 'u3', text: 'The multi-cursor editing one blew my mind 🤯', timestamp: 'Monday', read: true },
    ],
  },
]

export const friendRequests: FriendRequest[] = [
  { id: 'fr1', user: { id: 'u7', playTalkId: 'PT-OMAR3391', name: 'Omar Hassan', avatarColor: '#F97316', initials: 'OH', online: true }, sentAt: '5 min ago', direction: 'incoming' },
  { id: 'fr2', user: { id: 'u8', playTalkId: 'PT-LUNA9182', name: 'Luna Rossi', avatarColor: '#A855F7', initials: 'LR', online: false }, sentAt: '2 hours ago', direction: 'incoming' },
  { id: 'fr3', user: { id: 'u9', playTalkId: 'PT-JAMES0041', name: 'James Park', avatarColor: '#06B6D4', initials: 'JP', online: false }, sentAt: '1 day ago', direction: 'outgoing' },
]

export const currentUser: User = {
  id: 'me',
  playTalkId: 'PT-YOU8847',
  name: 'You',
  avatarColor: '#E03131',
  initials: 'YO',
  online: true,
}

export const offlineVideos: Video[] = videos.filter(v => v.offline)
