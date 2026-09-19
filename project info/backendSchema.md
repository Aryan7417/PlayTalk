PlayTalk — Backend Database Schema

1. Overview

PlayTalk backend will use MongoDB as the database and Mongoose as the ODM.

The MVP database will contain the following collections:

User

FriendRequest

Conversation

Message

Video

Playlist

PlaylistVideo

Database Relationship

User
 ├── FriendRequest
 ├── Conversation
 │      └── Message
 ├── Video
 └── Playlist
        └── PlaylistVideo

2. User

Stores registered PlayTalk users.

Fields

Field

Type

Required

Description

_id

ObjectId

Yes

MongoDB unique identifier

email

String

Yes

User email, unique

passwordHash

String

Yes

Hashed password

playTalkId

String

Yes

Public unique user ID

avatar

String

No

Profile image URL

isOnline

Boolean

Yes

Current online status

lastSeen

Date

No

Last active timestamp

createdAt

Date

Yes

Account creation time

updatedAt

Date

Yes

Last update time

Indexes

Unique index on email

Unique index on playTalkId

Example

User
 ├── email: aryan@gmail.com
 ├── playTalkId: PTK7X92M
 ├── avatar
 ├── isOnline
 ├── lastSeen
 ├── createdAt
 └── updatedAt

3. FriendRequest

Stores friend requests between users.

Fields

Field

Type

Required

Description

_id

ObjectId

Yes

Request ID

sender

ObjectId → User

Yes

User sending request

receiver

ObjectId → User

Yes

User receiving request

status

Enum

Yes

Request status

createdAt

Date

Yes

Request creation time

updatedAt

Date

Yes

Last update time

Status

pending
accepted
rejected
cancelled

Relationship

User A
  │
  └── sender
       │
       ▼
  FriendRequest
       │
       └── receiver
             │
             ▼
           User B

Index

A compound index should prevent duplicate requests for the same sender and receiver.

4. Conversation

Stores one-to-one chat conversations.

Group conversations are not part of the MVP.

Fields

Field

Type

Required

Description

_id

ObjectId

Yes

Conversation ID

participants

Array<ObjectId> → User

Yes

Two users participating

lastMessage

ObjectId → Message

No

Most recent message

lastMessageAt

Date

No

Last message timestamp

createdAt

Date

Yes

Conversation creation time

updatedAt

Date

Yes

Last update time

Relationship

User A
   │
   └──────┐
          ▼
     Conversation
          ▲
   ┌──────┘
   │
User B

Important Rule

The backend must ensure that only one conversation exists between the same two users.

5. Message

Stores messages exchanged between two users.

Fields

Field

Type

Required

Description

_id

ObjectId

Yes

Message ID

conversationId

ObjectId → Conversation

Yes

Conversation containing message

senderId

ObjectId → User

Yes

Message sender

type

Enum

Yes

Message type

text

String

Conditional

Text message content

videoId

ObjectId → Video

Conditional

Shared video reference

playlistId

ObjectId → Playlist

Conditional

Shared playlist reference

isRead

Boolean

Yes

Read status

createdAt

Date

Yes

Message creation time

updatedAt

Date

Yes

Last update time

Message Types

text
youtube_video
youtube_playlist

Examples

Text:

type: text
text: "Bhai ye video dekh"

YouTube video:

type: youtube_video
videoId: <Video ID>

YouTube playlist:

type: youtube_playlist
playlistId: <Playlist ID>

Index

Messages should be indexed by:

conversationId + createdAt

This allows efficient chat-history pagination.

6. Video

Stores YouTube videos saved by a user.

Fields

Field

Type

Required

Description

_id

ObjectId

Yes

Internal video ID

ownerId

ObjectId → User

Yes

User who saved the video

youtubeVideoId

String

Yes

Original YouTube video ID

title

String

Yes

Video title

thumbnail

String

No

Thumbnail URL

channelName

String

No

YouTube channel name

duration

String

No

Video duration

youtubeUrl

String

Yes

Original YouTube URL

createdAt

Date

Yes

Save time

updatedAt

Date

Yes

Last update time

Relationship

User
  │
  └── owns
        │
        ▼
      Video

Index

Compound unique index:

ownerId + youtubeVideoId

This prevents the same user from unnecessarily saving the same video multiple times.

7. Playlist

Stores YouTube playlist metadata saved by a user.

Fields

Field

Type

Required

Description

_id

ObjectId

Yes

Internal playlist ID

ownerId

ObjectId → User

Yes

User who saved playlist

youtubePlaylistId

String

Yes

Original YouTube playlist ID

title

String

Yes

Playlist title

thumbnail

String

No

Playlist thumbnail

channelName

String

No

YouTube channel name

createdAt

Date

Yes

Save time

updatedAt

Date

Yes

Last update time

Relationship

User
  │
  └── owns
        │
        ▼
     Playlist

Index

Compound unique index:

ownerId + youtubePlaylistId

8. PlaylistVideo

Stores the videos belonging to a saved playlist.

A separate collection is used instead of storing all playlist videos directly inside the Playlist document.

Fields

Field

Type

Required

Description

_id

ObjectId

Yes

Playlist-video record ID

playlistId

ObjectId → Playlist

Yes

Parent playlist

youtubeVideoId

String

Yes

Original YouTube video ID

title

String

Yes

Video title

thumbnail

String

No

Video thumbnail

position

Number

Yes

Position inside playlist

createdAt

Date

Yes

Record creation time

Relationship

Playlist
   │
   ├── PlaylistVideo
   ├── PlaylistVideo
   ├── PlaylistVideo
   └── PlaylistVideo

Index

playlistId + position

This allows playlist videos to be retrieved in the correct order.

9. Complete Entity Relationship

                         ┌──────────────┐
                         │     User     │
                         └──────┬───────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
 ┌────────────────┐    ┌────────────────┐    ┌──────────────┐
 │ FriendRequest  │    │ Conversation   │    │    Video     │
 └────────────────┘    └───────┬────────┘    └──────────────┘
                                │
                                ▼
                         ┌──────────────┐
                         │   Message    │
                         └──────┬───────┘
                                │
                         ┌──────┴───────┐
                         │              │
                         ▼              ▼
                       Video         Playlist
                                        │
                                        ▼
                                  PlaylistVideo

10. Collection Summary

Collection

Purpose

users

User accounts and profiles

friendRequests

Friend request management

conversations

One-to-one conversations

messages

Chat messages

videos

Saved YouTube videos

playlists

Saved YouTube playlists

playlistVideos

Videos belonging to playlists

11. MVP Relationship Summary

User
 │
 ├── sends/receives → FriendRequest
 │
 ├── participates in → Conversation
 │                         │
 │                         └── contains → Message
 │
 ├── owns → Video
 │
 └── owns → Playlist
                │
                └── contains → PlaylistVideo

12. Future Collections

These collections are not required for the MVP but may be introduced later:

notifications
downloads
friendships
blockedUsers
messageReactions
attachments
devices

The downloads collection can be introduced later for tracking authorized/permitted offline content and download status.

13. Final MVP Schema

MongoDB
│
├── users
│
├── friendRequests
│
├── conversations
│
├── messages
│
├── videos
│
├── playlists
│
└── playlistVideos

This is the complete backend database schema for the current PlayTalk MVP.