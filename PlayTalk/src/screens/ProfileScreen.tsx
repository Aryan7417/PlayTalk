import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";

import type { Screen } from "../types";

import {
  SettingsIcon,
  DownloadIcon,
  PlaylistIcon,
  ShareIcon,
} from "../components/Icons";

import {
  currentUser,
  videos,
  playlists,
  friends,
} from "../data/mockData";

import Avatar from "../components/Avatar";

interface Props {
  navigate: (s: Screen, p?: any) => void;
}

const me = {
  ...currentUser,
  name: "Alex Rivera",
  initials: "AR",
};

export default function ProfileScreen({ navigate }: Props) {
  const savedVideos = videos.filter((v) => v.saved);
  const savedPlaylists = playlists.filter((p) => p.saved);
  const offlineVideos = videos.filter((v) => v.offline);

  const stats = [
    {
      label: "Saved",
      value: savedVideos.length + savedPlaylists.length,
      icon: "🎬",
    },
    {
      label: "Friends",
      value: friends.length,
      icon: "👥",
    },
    {
      label: "Offline",
      value: offlineVideos.length,
      icon: "📥",
    },
  ];

  const quickActions = [
    {
      label: "Downloads",
      sub: `${offlineVideos.length} videos`,
      icon: <DownloadIcon size={20} color="#E03131" />,
      action: () => navigate("downloads"),
    },
    {
      label: "Playlists",
      sub: `${savedPlaylists.length} saved`,
      icon: <PlaylistIcon size={20} color="#E03131" />,
      action: () => {},
    },
    {
      label: "Shared",
      sub: "12 items",
      icon: <ShareIcon size={20} color="#E03131" />,
      action: () => {},
    },
    {
      label: "Settings",
      sub: "Account & privacy",
      icon: <SettingsIcon size={20} color="#E03131" />,
      action: () => navigate("settings"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>

          <Pressable
            onPress={() => navigate("settings")}
            style={({ pressed }) => [
              styles.settingsButton,
              pressed && styles.pressed,
            ]}
          >
            <SettingsIcon size={18} color="#9CA3AF" />
          </Pressable>
        </View>

        <View style={styles.content}>
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileTop}>
              <Avatar
                user={me}
                size="xl"
                showStatus
              />

              <View style={styles.profileInfo}>
                <Text style={styles.name}>
                  {me.name}
                </Text>

                {/* PlayTalk ID */}
                <View style={styles.idBadge}>
                  <Text style={styles.idText}>
                    {currentUser.playTalkId}
                  </Text>
                </View>

                {/* Online */}
                <View style={styles.onlineRow}>
                  <View style={styles.onlineDot} />

                  <Text style={styles.onlineText}>
                    Online
                  </Text>
                </View>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
              {stats.map((stat) => (
                <View
                  key={stat.label}
                  style={styles.statCard}
                >
                  <Text style={styles.statIcon}>
                    {stat.icon}
                  </Text>

                  <Text style={styles.statValue}>
                    {stat.value}
                  </Text>

                  <Text style={styles.statLabel}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            {quickActions.map((action) => (
              <Pressable
                key={action.label}
                onPress={action.action}
                style={({ pressed }) => [
                  styles.actionCard,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.actionIcon}>
                  {action.icon}
                </View>

                <View style={styles.actionInfo}>
                  <Text style={styles.actionTitle}>
                    {action.label}
                  </Text>

                  <Text style={styles.actionSub}>
                    {action.sub}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Recently Saved */}
          <View style={styles.recentSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Recently Saved
              </Text>

              <Pressable>
                <Text style={styles.seeAll}>
                  See all
                </Text>
              </Pressable>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentList}
            >
              {savedVideos.slice(0, 4).map((video) => (
                <Pressable
                  key={video.id}
                  onPress={() =>
                    navigate("video-details", {
                      video,
                    })
                  }
                  style={({ pressed }) => [
                    styles.recentItem,
                    pressed && styles.pressed,
                  ]}
                >
                  {/* Thumbnail */}
                  <View style={styles.thumbnailContainer}>
                    <Image
                      source={{
                        uri: video.thumbnail,
                      }}
                      style={styles.thumbnail}
                    />

                    {/* Duration */}
                    <View style={styles.durationBadge}>
                      <Text style={styles.durationText}>
                        {video.duration}
                      </Text>
                    </View>
                  </View>

                  {/* Title */}
                  <Text
                    style={styles.videoTitle}
                    numberOfLines={2}
                  >
                    {video.title}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  scrollContent: {
    paddingBottom: 32,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },

  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  content: {
    paddingHorizontal: 16,
  },

  // Profile Card
  profileCard: {
    marginTop: 12,
    padding: 20,
    borderRadius: 24,
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  profileTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },

  profileInfo: {
    flex: 1,
    paddingTop: 4,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },

  idBadge: {
    alignSelf: "flex-start",
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: "rgba(224,49,49,0.08)",
    borderWidth: 1,
    borderColor: "rgba(224,49,49,0.19)",
  },

  idText: {
    color: "#E03131",
    fontSize: 11,
    fontWeight: "700",
  },

  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 9,
  },

  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
  },

  onlineText: {
    color: "#22C55E",
    fontSize: 12,
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#1A1A1A",
  },

  statIcon: {
    fontSize: 22,
    marginBottom: 4,
  },

  statValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  statLabel: {
    color: "#6B7280",
    fontSize: 11,
    marginTop: 2,
  },

  // Quick Actions
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 20,
  },

  actionCard: {
    width: "48%",
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(224,49,49,0.08)",
  },

  actionInfo: {
    flex: 1,
    marginLeft: 10,
  },

  actionTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  actionSub: {
    color: "#6B7280",
    fontSize: 10,
    marginTop: 3,
  },

  // Recently Saved
  recentSection: {
    marginTop: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  seeAll: {
    color: "#E03131",
    fontSize: 12,
    fontWeight: "500",
  },

  recentList: {
    gap: 12,
    paddingBottom: 4,
  },

  recentItem: {
    width: 128,
  },

  thumbnailContainer: {
    width: 128,
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#222222",
    position: "relative",
  },

  thumbnail: {
    width: "100%",
    height: "100%",
  },

  durationBadge: {
    position: "absolute",
    right: 4,
    bottom: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.8)",
  },

  durationText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "500",
  },

  videoTitle: {
    color: "#D1D5DB",
    fontSize: 10,
    lineHeight: 14,
    marginTop: 5,
  },
});