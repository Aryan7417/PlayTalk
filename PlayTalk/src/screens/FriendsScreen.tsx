import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import type { Screen } from "../types";

import {
  PersonPlusIcon,
  SearchIcon,
} from "../components/Icons";

import {
  friends,
  friendRequests,
} from "../data/mockData";

import Avatar from "../components/Avatar";

interface Props {
  navigate: (s: Screen, p?: any) => void;
}

export default function FriendsScreen({
  navigate,
}: Props) {
  const online = friends.filter(
    (f) => f.online
  );

  const offline = friends.filter(
    (f) => !f.online
  );

  const incoming = friendRequests.filter(
    (r) => r.direction === "incoming"
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <View style={styles.headerTop}>

          <Text style={styles.title}>
            Friends
          </Text>

          <View style={styles.headerActions}>

            {/* Search */}
            <Pressable
              onPress={() => navigate("search")}
              style={({ pressed }) => [
                styles.headerButton,
                pressed && styles.pressed,
              ]}
            >
              <SearchIcon
                size={18}
                color="#9CA3AF"
              />
            </Pressable>

            {/* Friend Requests */}
            <Pressable
              onPress={() =>
                navigate("friend-requests")
              }
              style={({ pressed }) => [
                styles.headerButton,
                pressed && styles.pressed,
              ]}
            >
              <PersonPlusIcon
                size={18}
                color="#9CA3AF"
              />

              {incoming.length > 0 && (
                <View style={styles.requestBadge}>
                  <Text style={styles.requestBadgeText}>
                    {incoming.length}
                  </Text>
                </View>
              )}
            </Pressable>

          </View>

        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>

          <SearchIcon
            size={16}
            color="#6B7280"
          />

          <TextInput
            placeholder="Search friends…"
            placeholderTextColor="#6B7280"
            style={styles.searchInput}
          />

        </View>

      </View>

      {/* Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Friend Requests Banner */}
        {incoming.length > 0 && (
          <Pressable
            onPress={() =>
              navigate("friend-requests")
            }
            style={({ pressed }) => [
              styles.requestBanner,
              pressed && styles.pressed,
            ]}
          >

            <View style={styles.requestBannerIcon}>
              <PersonPlusIcon
                size={20}
                color="#E03131"
              />
            </View>

            <View style={styles.requestBannerContent}>

              <Text style={styles.requestBannerTitle}>
                {incoming.length} Friend{" "}
                {incoming.length === 1
                  ? "Request"
                  : "Requests"}
              </Text>

              <Text
                style={styles.requestBannerSubtitle}
                numberOfLines={1}
              >
                {incoming
                  .map(
                    (r) =>
                      r.user.name.split(" ")[0]
                  )
                  .join(", ")}{" "}
                sent you a request
              </Text>

            </View>

            <Text style={styles.viewText}>
              View →
            </Text>

          </Pressable>
        )}

        {/* Online */}
        {online.length > 0 && (
          <View style={styles.section}>

            <View style={styles.sectionHeader}>

              <View style={styles.onlineDot} />

              <Text style={styles.sectionTitle}>
                Online now
              </Text>

              <Text style={styles.count}>
                ({online.length})
              </Text>

            </View>

            <View style={styles.friendList}>

              {online.map((friend) => (
                <FriendRow
                  key={friend.id}
                  user={friend}
                  onChat={() =>
                    navigate("private-chat", {
                      chatId:
                        "c" +
                        (friends.indexOf(friend) + 1),
                    })
                  }
                />
              ))}

            </View>

          </View>
        )}

        {/* Offline */}
        {offline.length > 0 && (
          <View style={styles.section}>

            <View style={styles.sectionHeader}>

              <View style={styles.offlineDot} />

              <Text style={styles.sectionTitle}>
                Offline
              </Text>

              <Text style={styles.count}>
                ({offline.length})
              </Text>

            </View>

            <View style={styles.friendList}>

              {offline.map((friend) => (
                <FriendRow
                  key={friend.id}
                  user={friend}
                  onChat={() =>
                    navigate("private-chat", {
                      chatId:
                        "c" +
                        (friends.indexOf(friend) + 1),
                    })
                  }
                />
              ))}

            </View>

          </View>
        )}

      </ScrollView>

    </View>
  );
}

/* ================================================= */
/* Friend Row */
/* ================================================= */

function FriendRow({
  user,
  onChat,
}: {
  user: typeof friends[0];
  onChat: () => void;
}) {
  return (
    <View style={styles.friendRow}>

      {/* Avatar */}
      <Avatar
        user={user}
        size="md"
        showStatus
      />

      {/* User Info */}
      <View style={styles.friendInfo}>

        <Text
          style={styles.friendName}
          numberOfLines={1}
        >
          {user.name}
        </Text>

        {user.online ? (
          <Text style={styles.activeText}>
            Active now
          </Text>
        ) : (
          <Text style={styles.lastSeen}>
            Last seen {user.lastSeen}
          </Text>
        )}

      </View>

      {/* Message */}
      <Pressable
        onPress={onChat}
        style={({ pressed }) => [
          styles.messageButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.messageText}>
          Message
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  /* ========================= */
  /* Header */
  /* ========================= */

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

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.08)",
    position: "relative",
  },

  requestBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#E03131",
    alignItems: "center",
    justifyContent: "center",
  },

  requestBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },

  /* ========================= */
  /* Search */
  /* ========================= */

  searchContainer: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.06)",
  },

  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    paddingVertical: 0,
  },

  /* ========================= */
  /* Scroll */
  /* ========================= */

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  /* ========================= */
  /* Friend Request Banner */
  /* ========================= */

  requestBanner: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    marginBottom: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor:
      "rgba(224,49,49,0.30)",
    backgroundColor: "#1A0000",
  },

  requestBannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor:
      "rgba(224,49,49,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  requestBannerContent: {
    flex: 1,
    minWidth: 0,
  },

  requestBannerTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  requestBannerSubtitle: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 2,
  },

  viewText: {
    color: "#E03131",
    fontSize: 12,
    fontWeight: "600",
  },

  /* ========================= */
  /* Sections */
  /* ========================= */

  section: {
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },

  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
  },

  offlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4B5563",
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  count: {
    color: "#4B5563",
    fontSize: 12,
  },

  friendList: {
    gap: 2,
  },

  /* ========================= */
  /* Friend Row */
  /* ========================= */

  friendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 12,
  },

  friendInfo: {
    flex: 1,
    minWidth: 0,
  },

  friendName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  activeText: {
    color: "#22C55E",
    fontSize: 12,
    marginTop: 2,
  },

  lastSeen: {
    color: "#4B5563",
    fontSize: 12,
    marginTop: 2,
  },

  messageButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.08)",
  },

  messageText: {
    color: "#D1D5DB",
    fontSize: 12,
    fontWeight: "600",
  },

  pressed: {
    opacity: 0.7,
  },
});