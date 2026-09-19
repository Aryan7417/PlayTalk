# Technical Requirements Document (TRD)

## 1. Document Information

| Field                   | Details                         |
| ----------------------- | ------------------------------- |
| Project Name            | PlayTalk                        |
| Document Type           | Technical Requirements Document |
| Version                 | 1.0                             |
| Status                  | MVP                             |
| Platform                | Android / iOS                   |
| Frontend                | React Native + Expo             |
| Backend                 | Node.js + Express.js            |
| Database                | MongoDB                         |
| Real-Time Communication | Socket.IO                       |
| Language                | TypeScript                      |

---

# 2. Technical Overview

PlayTalk is a mobile application consisting of three primary technical layers:

```text
┌─────────────────────────────┐
│      React Native App       │
│           Expo              │
└──────────────┬──────────────┘
               │
          HTTPS / WSS
               │
┌──────────────▼──────────────┐
│       Node.js Backend       │
│     Express + Socket.IO     │
└──────────────┬──────────────┘
               │
        ┌──────▼──────┐
        │   MongoDB   │
        └─────────────┘
```

The REST API will handle authentication, users, friends and content management.

Socket.IO will handle real-time chat functionality.

---

# 3. Technology Stack

## 3.1 Mobile Application

| Technology                    | Purpose                    |
| ----------------------------- | -------------------------- |
| React Native                  | Mobile UI                  |
| Expo                          | Development/build platform |
| Expo Router                   | Navigation                 |
| TypeScript                    | Type safety                |
| Zustand                       | Global state               |
| NativeWind                    | Styling                    |
| Axios                         | HTTP requests              |
| Socket.IO Client              | Real-time communication    |
| AsyncStorage / Secure Storage | Local persistence          |

---

# 4. Backend Stack

| Technology | Purpose                    |
| ---------- | -------------------------- |
| Node.js    | Runtime                    |
| Express.js | REST API                   |
| TypeScript | Type safety                |
| Socket.IO  | Real-time communication    |
| Mongoose   | MongoDB ODM                |
| JWT        | Authentication             |
| bcrypt     | Password hashing           |
| Zod        | Request validation         |
| dotenv     | Environment configuration  |
| Helmet     | HTTP security              |
| CORS       | Cross-origin configuration |

---

# 5. Database

Primary database:

**MongoDB**

ODM:

**Mongoose**

Main collections:

```text
users
friendRequests
conversations
messages
videos
playlists
```

---

# 6. System Architecture

```text
                         ┌──────────────────┐
                         │   React Native   │
                         │     Expo App     │
                         └────────┬─────────┘
                                  │
                     ┌────────────┴────────────┐
                     │                         │
                   HTTPS                     WSS
                     │                         │
                     ▼                         ▼
             ┌───────────────┐        ┌───────────────┐
             │ Express REST  │        │   Socket.IO   │
             │      API      │        │     Server    │
             └───────┬───────┘        └───────┬───────┘
                     │                         │
                     └────────────┬────────────┘
                                  │
                                  ▼
                         ┌────────────────┐
                         │    MongoDB     │
                         └────────────────┘
```

---

# 7. Application Architecture

The mobile application should follow a modular architecture.

```text
UI
 ↓
Screens
 ↓
Hooks / State
 ↓
Services
 ↓
API / Socket
 ↓
Backend
```

Recommended separation:

```text
components/
screens/
services/
stores/
hooks/
types/
utils/
constants/
```

---

# 8. Mobile Folder Structure

```text
PlayTalk/
│
├── app/
│   ├── _layout.tsx
│   │
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── signup.tsx
│   │
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx
│       ├── chat.tsx
│       ├── friends.tsx
│       └── profile.tsx
│
├── components/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Avatar.tsx
│   ├── VideoCard.tsx
│   ├── PlaylistCard.tsx
│   ├── MessageBubble.tsx
│   ├── FriendCard.tsx
│   └── Loader.tsx
│
├── screens/
│   ├── ChatScreen.tsx
│   ├── ConversationScreen.tsx
│   ├── AddFriendScreen.tsx
│   ├── AddContentScreen.tsx
│   └── ContentDetailsScreen.tsx
│
├── services/
│   ├── api.ts
│   ├── auth.service.ts
│   ├── user.service.ts
│   ├── friend.service.ts
│   ├── chat.service.ts
│   └── youtube.service.ts
│
├── stores/
│   ├── auth.store.ts
│   ├── chat.store.ts
│   ├── friend.store.ts
│   └── content.store.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── useChat.ts
│   └── useSocket.ts
│
├── types/
│   ├── auth.types.ts
│   ├── user.types.ts
│   ├── chat.types.ts
│   └── content.types.ts
│
├── constants/
│   ├── colors.ts
│   └── config.ts
│
└── utils/
    ├── validation.ts
    └── storage.ts
```

---

# 9. Backend Folder Structure

```text
server/
│
├── src/
│   │
│   ├── app.ts
│   ├── server.ts
│   │
│   ├── config/
│   │   ├── db.ts
│   │   └── env.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── friend.controller.ts
│   │   ├── chat.controller.ts
│   │   └── content.controller.ts
│   │
│   ├── models/
│   │   ├── User.model.ts
│   │   ├── FriendRequest.model.ts
│   │   ├── Conversation.model.ts
│   │   ├── Message.model.ts
│   │   ├── Video.model.ts
│   │   └── Playlist.model.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── friend.routes.ts
│   │   ├── chat.routes.ts
│   │   └── content.routes.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── socket/
│   │   ├── index.ts
│   │   ├── chat.socket.ts
│   │   └── presence.socket.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── friend.service.ts
│   │   ├── chat.service.ts
│   │   └── youtube.service.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── password.ts
│   │   ├── userId.ts
│   │   └── response.ts
│   │
│   └── types/
│       └── index.ts
│
├── .env
├── package.json
└── tsconfig.json
```

---

# 10. Authentication Architecture

## Signup Flow

```text
Mobile
  │
  │ POST /api/auth/signup
  ▼
Backend
  │
  ├── Validate email
  ├── Check existing user
  ├── Hash password
  ├── Generate unique User ID
  ├── Create User
  └── Generate JWT
  │
  ▼
Mobile
```

## Login Flow

```text
Mobile
   │
   │ POST /api/auth/login
   ▼
Backend
   │
   ├── Find user
   ├── Compare password
   └── Generate JWT
   │
   ▼
Access Token
```

---

# 11. User Model

Example MongoDB schema:

```text
User
{
    _id,
    email,
    passwordHash,
    uniqueUserId,
    avatar,
    isOnline,
    lastSeen,
    createdAt,
    updatedAt
}
```

### Indexes

```text
email: unique
uniqueUserId: unique
```

---

# 12. Unique User ID Generation

Format:

```text
PTK + 6-8 random alphanumeric characters
```

Example:

```text
PTK7X92M
PTKA82LQ
PTK91MX2
```

Before saving, the backend must verify that the generated ID does not already exist.

The server, not the client, should generate the final unique ID.

---

# 13. Friend Request Model

```text
FriendRequest
{
    _id,
    sender,
    receiver,
    status,
    createdAt,
    updatedAt
}
```

### Status

```text
pending
accepted
rejected
cancelled
```

Relationships:

```text
sender → User
receiver → User
```

---

# 14. Friend APIs

## Search User

```http
GET /api/users/:uniqueUserId
```

Response:

```json
{
  "success": true,
  "user": {
    "uniqueUserId": "PTK7X92M",
    "avatar": "...",
    "isOnline": true
  }
}
```

---

## Send Friend Request

```http
POST /api/friends/request
```

Body:

```json
{
  "receiverId": "USER_MONGODB_ID"
}
```

---

## Get Incoming Requests

```http
GET /api/friends/requests/incoming
```

---

## Accept Request

```http
PATCH /api/friends/requests/:requestId/accept
```

---

## Reject Request

```http
PATCH /api/friends/requests/:requestId/reject
```

---

## Get Friends

```http
GET /api/friends
```

---

## Remove Friend

```http
DELETE /api/friends/:userId
```

---

# 15. Conversation Architecture

A conversation will contain exactly two users for MVP.

```text
Conversation
{
    _id,
    participants: [
        userId1,
        userId2
    ],
    lastMessage,
    lastMessageAt,
    createdAt,
    updatedAt
}
```

A unique constraint/index should prevent duplicate conversations between the same two users.

---

# 16. Message Model

```text
Message
{
    _id,
    conversationId,
    senderId,
    type,
    text,
    content,
    status,
    createdAt,
    updatedAt
}
```

### Message Types

```text
text
youtube_video
youtube_playlist
```

Future types:

```text
image
file
voice
```

---

# 17. Chat API

## Get Conversations

```http
GET /api/chats
```

---

## Get Messages

```http
GET /api/chats/:conversationId/messages
```

Query:

```text
?page=1&limit=30
```

---

## Create/Get Conversation

```http
POST /api/chats
```

Body:

```json
{
  "friendId": "USER_ID"
}
```

---

# 18. Socket.IO Architecture

Socket.IO will be responsible for real-time communication.

Connection:

```text
Mobile
   │
   │ WebSocket
   ▼
Socket.IO Server
```

Authentication should be performed during the socket handshake using the user's access token.

---

# 19. Socket Events

## Connection

```text
connection
```

## Disconnect

```text
disconnect
```

## Send Message

```text
message:send
```

Payload:

```json
{
  "conversationId": "...",
  "text": "Hello bro"
}
```

## Receive Message

```text
message:new
```

## Typing Start

```text
typing:start
```

## Typing Stop

```text
typing:stop
```

## Message Read

```text
message:read
```

---

# 20. Chat Message Flow

```text
User A
  │
  │ message:send
  ▼
Socket.IO Server
  │
  ├── Validate authentication
  ├── Validate conversation
  ├── Save message to MongoDB
  │
  └── Emit message:new
          │
          ▼
       User B
```

The message must be persisted in MongoDB before being treated as successfully stored.

---

# 21. Presence System

The backend will maintain:

```text
isOnline
lastSeen
```

When the user connects:

```text
isOnline = true
```

When disconnected:

```text
isOnline = false
lastSeen = current timestamp
```

Presence information should only be exposed where appropriate.

---

# 22. YouTube Service

The backend will contain a dedicated YouTube service.

```text
youtube.service.ts
```

Responsibilities:

* Validate YouTube URL
* Extract video ID
* Extract playlist ID
* Retrieve permitted metadata
* Normalize response
* Return application-friendly data

---

# 23. YouTube URL Processing

Supported URL types should be identified by the backend.

Example:

```text
https://www.youtube.com/watch?v=VIDEO_ID
```

and

```text
https://www.youtube.com/playlist?list=PLAYLIST_ID
```

Flow:

```text
URL
 ↓
URL Validator
 ↓
Identify Content Type
 ├── Video
 └── Playlist
 ↓
YouTube Service
 ↓
Metadata
 ↓
MongoDB
```

The backend should not trust URL data supplied by the client.

---

# 24. Video Model

```text
Video
{
    _id,
    ownerId,
    youtubeVideoId,
    title,
    thumbnail,
    channelName,
    duration,
    youtubeUrl,
    createdAt,
    updatedAt
}
```

Indexes:

```text
ownerId
youtubeVideoId
```

A compound index can be used to prevent unnecessary duplicates for the same owner.

---

# 25. Playlist Model

```text
Playlist
{
    _id,
    ownerId,
    youtubePlaylistId,
    title,
    thumbnail,
    channelName,
    videos: [
        {
            youtubeVideoId,
            title,
            thumbnail,
            position
        }
    ],
    createdAt,
    updatedAt
}
```

Indexes:

```text
ownerId
youtubePlaylistId
```

---

# 26. Content APIs

## Add Video

```http
POST /api/content/videos
```

Body:

```json
{
  "youtubeUrl": "YOUTUBE_URL"
}
```

---

## Get Videos

```http
GET /api/content/videos
```

---

## Delete Video

```http
DELETE /api/content/videos/:videoId
```

---

## Add Playlist

```http
POST /api/content/playlists
```

Body:

```json
{
  "youtubeUrl": "YOUTUBE_PLAYLIST_URL"
}
```

---

## Get Playlists

```http
GET /api/content/playlists
```

---

## Delete Playlist

```http
DELETE /api/content/playlists/:playlistId
```

---

# 27. Content Sharing

When a user shares a YouTube video:

```text
Mobile
 ↓
message:send
 ↓
Socket.IO
 ↓
Message Service
 ↓
MongoDB
 ↓
message:new
 ↓
Friend
```

Example message:

```json
{
  "type": "youtube_video",
  "content": {
    "videoId": "abc123",
    "title": "React Native Tutorial",
    "thumbnail": "..."
  }
}
```

---

# 28. Offline Architecture

Offline functionality should be separated from normal chat functionality.

```text
Online Content
      ↓
Eligibility / Permission Check
      ↓
Authorized Offline Content
      ↓
Local Storage
      ↓
Offline Library
```

The implementation must not bypass YouTube's access controls or download restrictions.

For authorized local media, the application can maintain:

```text
downloadId
contentId
status
progress
localPath
createdAt
```

Possible states:

```text
queued
downloading
completed
failed
cancelled
```

---

# 29. API Authentication

Protected requests will use:

```http
Authorization: Bearer <JWT>
```

Middleware:

```text
auth.middleware.ts
```

Flow:

```text
Request
 ↓
Extract JWT
 ↓
Verify JWT
 ↓
Identify User
 ↓
Attach user to request
 ↓
Controller
```

---

# 30. API Response Format

A consistent response structure should be used.

### Success

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Something went wrong",
  "error": {
    "code": "INVALID_REQUEST"
  }
}
```

---

# 31. Error Handling

Centralized error handling:

```text
Request
 ↓
Controller
 ↓
Service
 ↓
Error
 ↓
Error Middleware
 ↓
Standard Response
```

Common error codes:

```text
AUTH_INVALID_CREDENTIALS
AUTH_EMAIL_EXISTS
USER_NOT_FOUND
FRIEND_REQUEST_EXISTS
NOT_FRIEND
CONVERSATION_NOT_FOUND
INVALID_YOUTUBE_URL
CONTENT_NOT_FOUND
VALIDATION_ERROR
UNAUTHORIZED
FORBIDDEN
SERVER_ERROR
```

---

# 32. Validation

All user-controlled input must be validated.

Examples:

### Email

```text
Valid email format
```

### Password

```text
Minimum length
```

### User ID

```text
PTK + allowed characters
```

### YouTube URL

```text
Valid URL
Supported YouTube format
```

Validation should happen on both:

```text
Client
+
Server
```

Server-side validation is authoritative.

---

# 33. Security Requirements

The application must:

* Hash passwords using bcrypt/Argon2.
* Never store plaintext passwords.
* Never expose password hashes through API responses.
* Protect private chat endpoints.
* Verify conversation participants before returning messages.
* Verify friend relationships before allowing chat creation.
* Validate all request bodies.
* Rate-limit authentication and friend-request endpoints.
* Secure Socket.IO authentication.
* Restrict CORS to trusted origins.
* Use HTTPS/WSS in production.
* Keep API keys and secrets in environment variables.

---

# 34. Environment Variables

Example:

```env
NODE_ENV=development

PORT=5000

MONGODB_URI=

JWT_SECRET=
JWT_EXPIRES_IN=

YOUTUBE_API_KEY=

CLIENT_URL=
```

Secrets must never be committed to Git.

A `.env.example` file should be committed instead:

```env
MONGODB_URI=
JWT_SECRET=
YOUTUBE_API_KEY=
CLIENT_URL=
```

---

# 35. State Management

Zustand stores:

```text
auth.store
 ├── user
 ├── token
 ├── isAuthenticated
 └── logout()

chat.store
 ├── conversations
 ├── activeConversation
 └── messages

friend.store
 ├── friends
 ├── incomingRequests
 └── sentRequests

content.store
 ├── videos
 └── playlists
```

---

# 36. API Client

A centralized Axios client should be used.

```text
services/api.ts
```

Responsibilities:

* Base URL
* Authorization header
* Request configuration
* Response handling
* Token expiration handling
* Error normalization

Example:

```text
/api
 ├── auth
 ├── users
 ├── friends
 ├── chats
 └── content
```

---

# 37. Caching Strategy

The mobile application can cache:

* User profile
* Friends list
* Recent conversations
* Recent messages
* Saved content metadata

Server remains the source of truth for:

* User accounts
* Friend relationships
* Messages
* Conversations

---

# 38. Pagination

Messages should not be loaded all at once.

Example:

```http
GET /api/chats/:id/messages?page=1&limit=30
```

When the user scrolls upward:

```text
Load older messages
```

Content lists should also support pagination when the data becomes large.

---

# 39. Notifications

Push notifications can be added after the MVP.

Potential notifications:

```text
New Friend Request
New Message
Friend Request Accepted
```

Technology can later include:

```text
Expo Notifications
FCM / APNs
```

---

# 40. Logging & Monitoring

Backend should log:

* Server startup
* Database connection
* Authentication errors
* API errors
* Socket connection/disconnection
* Unexpected exceptions

Production logs must not expose:

* Passwords
* JWT secrets
* API keys
* Private message content unnecessarily

---

# 41. Testing Requirements

## Backend

Test:

* Authentication
* User ID generation
* Friend requests
* Friend acceptance
* Conversation creation
* Message authorization
* YouTube URL validation
* Content APIs

## Socket

Test:

* Connection
* Authentication
* Send message
* Receive message
* Typing events
* Read events
* Disconnect/reconnect

## Mobile

Test:

* Login
* Signup
* Navigation
* Friend flow
* Chat
* Content addition
* Content sharing
* Error states

---

# 42. Deployment Architecture

Production:

```text
                 Internet
                    │
          ┌─────────▼─────────┐
          │ React Native App  │
          └─────────┬─────────┘
                    │
                 HTTPS/WSS
                    │
          ┌─────────▼─────────┐
          │ Backend Server    │
          │ Node + Express    │
          │ Socket.IO         │
          └─────────┬─────────┘
                    │
          ┌─────────▼─────────┐
          │ MongoDB Atlas     │
          └───────────────────┘
```

Possible deployment options:

* Backend → Render / Railway / Fly.io / AWS
* Database → MongoDB Atlas
* Mobile → Expo EAS

---

# 43. Development Phases

## Phase 1 — Project Setup

* React Native Expo project
* Backend TypeScript project
* MongoDB connection
* Environment configuration
* API structure
* Error handling

## Phase 2 — Authentication

* User model
* Signup API
* Login API
* JWT
* Password hashing
* Protected routes
* Auth state

## Phase 3 — Friends

* User search
* Unique User ID
* Friend request
* Accept/reject
* Friends list

## Phase 4 — Chat

* Conversation model
* Message model
* Socket.IO
* Real-time messaging
* Typing indicator
* Presence
* Read status

## Phase 5 — YouTube

* URL validation
* Video metadata
* Playlist metadata
* Content library
* Content sharing

## Phase 6 — Offline

* Authorized offline workflow
* Download state management
* Local storage
* Offline library

## Phase 7 — Testing & Deployment

* API testing
* Socket testing
* Mobile testing
* Security testing
* Production deployment

---

# 44. Technical Acceptance Criteria

The technical implementation will be considered MVP-ready when:

### Authentication

* [ ] User can register.
* [ ] Password is securely hashed.
* [ ] Unique PlayTalk ID is generated.
* [ ] User can login.
* [ ] Protected endpoints reject invalid tokens.

### Friends

* [ ] User can search by PlayTalk ID.
* [ ] User can send request.
* [ ] User can accept/reject request.
* [ ] Friends list is persisted.

### Chat

* [ ] Friends can create a conversation.
* [ ] Messages are persisted.
* [ ] Messages are delivered in real time.
* [ ] Non-participants cannot access the conversation.
* [ ] Typing state works.
* [ ] Presence works.

### YouTube

* [ ] Valid video URLs are detected.
* [ ] Valid playlist URLs are detected.
* [ ] Metadata is retrieved through permitted APIs.
* [ ] Content can be saved.
* [ ] Content can be shared through chat.

### Security

* [ ] Passwords are never stored in plaintext.
* [ ] Secrets are stored in environment variables.
* [ ] Protected routes require authentication.
* [ ] Authorization checks exist for private resources.
* [ ] Input validation is implemented.

---

# 45. Future Technical Improvements

Future versions can introduce:

* Redis for Socket.IO scaling
* Message queues for heavy background jobs
* Cloud object storage for authorized user media
* Push notifications
* End-to-end encryption considerations
* Advanced search
* Full-text message search
* Multi-device synchronization
* Analytics
* Horizontal backend scaling

---

# 46. Final Technical Architecture

```text
                         PLAYTALK
                            │
             ┌──────────────┴──────────────┐
             │                             │
        MOBILE CLIENT                 BACKEND SERVER
             │                             │
      React Native + Expo            Node.js + Express
             │                             │
        Expo Router                  REST API + JWT
             │                             │
          Zustand                    Socket.IO Server
             │                             │
             └──────────────┬──────────────┘
                            │
                       MongoDB
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
        Users            Friends           Chat
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
                      YouTube Content
                            │
                    ┌───────┴───────┐
                    │               │
                  Videos         Playlists
```

## Technical Principle

**REST API** → Authentication, users, friends, content and chat history.

**Socket.IO** → Real-time messaging, typing and presence.

**MongoDB** → Persistent application data.

**YouTube API** → Supported YouTube metadata retrieval.

**Local storage** → Client-side caching and authorized offline content.

**JWT** → User authentication and authorization.
