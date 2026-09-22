import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";

import type { Screen } from "../types";
import {
  SearchIcon,
  PlusIconSolid,
} from "../components/Icons";
import { chats } from "../data/mockData";
import Avatar from "../components/Avatar";

interface Props {
  navigate: (s: Screen, p?: any) => void;
}

export default function ChatListScreen({ navigate }: Props) {
  const totalUnread = chats.reduce(
    (n, c) => n + c.unreadCount,
    0
  );

  const lastMessage = (chat: typeof chats[0]) => {
    const last = chat.messages[chat.messages.length - 1];

    if (last.video) return "🎬 Shared a video";
    if (last.playlist) return "📋 Shared a playlist";

    return last.text || "";
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <View style={styles.headerTop}>

          <View>
            <Text style={styles.title}>
              Messages
            </Text>

            {totalUnread > 0 && (
              <Text style={styles.unreadText}>
                {totalUnread} unread
              </Text>
            )}
          </View>

          <Pressable
            onPress={() => navigate("search")}
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.pressed,
            ]}
          >
            <PlusIconSolid
              size={18}
              color="#9CA3AF"
            />
          </Pressable>

        </View>

        {/* Search */}
        <View style={styles.searchContainer}>

          <SearchIcon
            size={16}
            color="#6B7280"
          />

          <TextInput
            placeholder="Search conversations…"
            placeholderTextColor="#6B7280"
            style={styles.searchInput}
          />

        </View>

      </View>

      {/* Online Friends */}
      <View style={styles.onlineSection}>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.onlineList}
        >
          {chats
            .filter((c) => c.user.online)
            .map((chat) => (
              <Pressable
                key={chat.id}
                onPress={() =>
                  navigate("private-chat", {
                    chatId: chat.id,
                  })
                }
                style={({ pressed }) => [
                  styles.onlineFriend,
                  pressed && styles.pressed,
                ]}
              >
                <Avatar
                  user={chat.user}
                  size="md"
                  showStatus
                />

                <Text
                  style={styles.onlineName}
                  numberOfLines={1}
                >
                  {chat.user.name.split(" ")[0]}
                </Text>
              </Pressable>
            ))}
        </ScrollView>

      </View>

      {/* Section Label */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>
          ALL MESSAGES
        </Text>
      </View>

      {/* Chat List */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatList}
        renderItem={({ item: chat }) => {

          const lastMsg =
            chat.messages[chat.messages.length - 1];

          return (
            <Pressable
              onPress={() =>
                navigate("private-chat", {
                  chatId: chat.id,
                })
              }
              style={({ pressed }) => [
                styles.chatItem,
                pressed && styles.chatItemPressed,
              ]}
            >

              {/* Avatar */}
              <Avatar
                user={chat.user}
                size="md"
                showStatus
              />

              {/* Chat Content */}
              <View style={styles.chatContent}>

                {/* Name + Time */}
                <View style={styles.topRow}>

                  <Text
                    style={[
                      styles.chatName,
                      chat.unreadCount > 0
                        ? styles.chatNameUnread
                        : styles.chatNameRead,
                    ]}
                    numberOfLines={1}
                  >
                    {chat.user.name}
                  </Text>

                  <Text
                    style={[
                      styles.timestamp,
                      chat.unreadCount > 0
                        ? styles.timestampUnread
                        : styles.timestampRead,
                    ]}
                  >
                    {lastMsg.timestamp}
                  </Text>

                </View>

                {/* Last Message + Badge */}
                <View style={styles.bottomRow}>

                  <Text
                    style={[
                      styles.lastMessage,
                      chat.unreadCount > 0
                        ? styles.lastMessageUnread
                        : styles.lastMessageRead,
                    ]}
                    numberOfLines={1}
                  >
                    {lastMsg.senderId === "me"
                      ? "You: "
                      : ""}
                    {lastMessage(chat)}
                  </Text>

                  {chat.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadBadgeText}>
                        {chat.unreadCount}
                      </Text>
                    </View>
                  )}

                </View>

              </View>

            </Pressable>
          );
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  /* Header */
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#0A0A0A",
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },

  unreadText: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 2,
  },

  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  /* Search */
  searchContainer: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    paddingVertical: 0,
  },

  /* Online friends */
  onlineSection: {
    marginBottom: 16,
  },

  onlineList: {
    paddingHorizontal: 16,
    paddingBottom: 4,
    gap: 16,
  },

  onlineFriend: {
    alignItems: "center",
    gap: 6,
    width: 44,
  },

  onlineName: {
    color: "#9CA3AF",
    fontSize: 10,
    maxWidth: 44,
  },

  /* Section */
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 4,
  },

  sectionLabel: {
    color: "#4B5563",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.2,
  },

  /* Chat list */
  chatList: {
    paddingBottom: 20,
  },

  chatItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  chatItemPressed: {
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  chatContent: {
    flex: 1,
    minWidth: 0,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },

  chatName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },

  chatNameUnread: {
    color: "#FFFFFF",
  },

  chatNameRead: {
    color: "#D1D5DB",
  },

  timestamp: {
    fontSize: 10,
  },

  timestampUnread: {
    color: "#E03131",
  },

  timestampRead: {
    color: "#4B5563",
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  lastMessage: {
    flex: 1,
    fontSize: 12,
  },

  lastMessageUnread: {
    color: "#D1D5DB",
  },

  lastMessageRead: {
    color: "#4B5563",
  },

  unreadBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#E03131",
    alignItems: "center",
    justifyContent: "center",
  },

  unreadBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  pressed: {
    opacity: 0.75,
  },
});