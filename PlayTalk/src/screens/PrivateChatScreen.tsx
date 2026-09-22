import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import type { Screen, Video } from "../types";
import {
  BackIcon,
  SendIcon,
  AttachIcon,
  MoreIcon,
} from "../components/Icons";

import { VideoCard, PlaylistCard } from "../components/VideoCard";
import { chats } from "../data/mockData";
import Avatar from "../components/Avatar";

interface Props {
  navigate: (s: Screen, p?: any) => void;
  goBack: () => void;
  params?: {
    chatId?: string;
    shareVideo?: Video;
  };
}

export default function PrivateChatScreen({
  navigate,
  goBack,
  params,
}: Props) {
  const chat =
    chats.find((c) => c.id === (params?.chatId || "c1")) || chats[0];

  const [text, setText] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState(() => {
    if (params?.shareVideo) {
      return [
        ...chat.messages,
        {
          id: "new1",
          senderId: "me",
          video: params.shareVideo,
          timestamp: "now",
          read: true,
        },
      ];
    }

    return chat.messages;
  });

  // Auto scroll to bottom when messages change
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  const send = () => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        senderId: "me",
        text: trimmedText,
        timestamp: "now",
        read: true,
      },
    ]);

    setText("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        {/* Back */}
        <Pressable onPress={goBack} style={styles.headerButton}>
          <BackIcon size={20} color="#9CA3AF" />
        </Pressable>

        {/* User */}
        <Pressable
          onPress={() => {}}
          style={styles.userSection}
        >
          <Avatar user={chat.user} size="sm" showStatus />

          <View style={styles.userInfo}>
            <Text
              style={styles.userName}
              numberOfLines={1}
            >
              {chat.user.name}
            </Text>

            <Text
              style={[
                styles.onlineText,
                {
                  color: chat.user.online
                    ? "#22C55E"
                    : "#6B7280",
                },
              ]}
            >
              {chat.user.online
                ? "Online now"
                : `Last seen ${chat.user.lastSeen}`}
            </Text>
          </View>
        </Pressable>

        {/* More */}
        <Pressable
          onPress={() => {}}
          style={styles.headerButton}
        >
          <MoreIcon size={20} color="#6B7280" />
        </Pressable>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg, i) => {
          const isMe = msg.senderId === "me";

          const prevMsg = messages[i - 1];

          const showAvatar =
            !isMe &&
            (!prevMsg ||
              prevMsg.senderId !== msg.senderId);

          const isConsecutive =
            !!prevMsg &&
            prevMsg.senderId === msg.senderId;

          return (
            <View
              key={msg.id}
              style={[
                styles.messageRow,
                isMe
                  ? styles.myMessageRow
                  : styles.otherMessageRow,
                {
                  marginTop: isConsecutive ? 2 : 8,
                },
              ]}
            >
              {/* Avatar */}
              {!isMe && (
                <View style={styles.messageAvatar}>
                  {showAvatar && (
                    <Avatar
                      user={chat.user}
                      size="sm"
                    />
                  )}
                </View>
              )}

              {/* Message content */}
              <View
                style={[
                  styles.messageContent,
                  isMe
                    ? styles.myMessageContent
                    : styles.otherMessageContent,
                ]}
              >
                {/* Video */}
                {msg.video ? (
                  <View style={styles.sharedCard}>
                    <VideoCard
                      video={msg.video}
                      variant="message"
                      onClick={() =>
                        navigate("video-details", {
                          video: msg.video,
                        })
                      }
                    />
                  </View>
                ) : msg.playlist ? (
                  /* Playlist */
                  <View style={styles.sharedCard}>
                    <PlaylistCard
                      playlist={msg.playlist}
                      variant="message"
                      onClick={() =>
                        navigate("playlist-details", {
                          playlist: msg.playlist,
                        })
                      }
                    />
                  </View>
                ) : (
                  /* Text */
                  <View
                    style={[
                      styles.textBubble,
                      isMe
                        ? styles.myBubble
                        : styles.otherBubble,
                      isMe
                        ? styles.myBubbleRadius
                        : styles.otherBubbleRadius,
                    ]}
                  >
                    <Text style={styles.messageText}>
                      {msg.text}
                    </Text>
                  </View>
                )}

                {/* Timestamp */}
                {(!isConsecutive ||
                  i === messages.length - 1) && (
                  <Text style={styles.timestamp}>
                    {msg.timestamp}
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputBar}>
        {/* Attach */}
        <Pressable
          onPress={() => {}}
          style={styles.attachButton}
        >
          <AttachIcon size={18} color="#6B7280" />
        </Pressable>

        {/* Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Message…"
            placeholderTextColor="#6B7280"
            style={styles.input}
            multiline
            maxLength={2000}
            onSubmitEditing={send}
            blurOnSubmit={false}
          />
        </View>

        {/* Send */}
        <Pressable
          onPress={send}
          style={[
            styles.sendButton,
            {
              backgroundColor: text.trim()
                ? "#E03131"
                : "#1A1A1A",
            },
          ]}
        >
          <SendIcon
            size={18}
            color={text.trim() ? "#FFFFFF" : "#4B5563"}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  // Header
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#0D0D0D",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  headerButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  userSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
    gap: 10,
  },

  userInfo: {
    flex: 1,
  },

  userName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  onlineText: {
    fontSize: 11,
    marginTop: 2,
  },

  // Messages
  messagesContainer: {
    flex: 1,
  },

  messagesContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingBottom: 16,
  },

  messageRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },

  myMessageRow: {
    justifyContent: "flex-end",
  },

  otherMessageRow: {
    justifyContent: "flex-start",
  },

  messageAvatar: {
    width: 28,
    height: 28,
    marginRight: 8,
    justifyContent: "flex-end",
  },

  messageContent: {
    maxWidth: "75%",
  },

  myMessageContent: {
    alignItems: "flex-end",
  },

  otherMessageContent: {
    alignItems: "flex-start",
  },

  // Text bubble
  textBubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },

  myBubble: {
    backgroundColor: "#E03131",
  },

  otherBubble: {
    backgroundColor: "#1E1E1E",
  },

  myBubbleRadius: {
    borderBottomRightRadius: 4,
  },

  otherBubbleRadius: {
    borderBottomLeftRadius: 4,
  },

  messageText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
  },

  // Shared content
  sharedCard: {
    width: 208,
    overflow: "hidden",
    borderRadius: 12,
  },

  timestamp: {
    color: "#4B5563",
    fontSize: 9,
    marginTop: 4,
    paddingHorizontal: 4,
  },

  // Input
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#0D0D0D",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },

  attachButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
  },

  inputWrapper: {
    flex: 1,
    minHeight: 40,
    maxHeight: 110,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  input: {
    color: "#FFFFFF",
    fontSize: 14,
    padding: 0,
    maxHeight: 90,
  },

  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});