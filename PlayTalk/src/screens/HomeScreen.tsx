import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";

import type { Screen } from "../types";

import {
  SearchIcon,
  BellIcon,
  PlusIconSolid,
  DownloadIcon,
} from "../components/Icons";

import {
  VideoCard,
  PlaylistCard,
} from "../components/VideoCard";

import {
  videos,
  playlists,
} from "../data/mockData";

interface Props {
  navigate: (s: Screen, p?: any) => void;
}

export default function HomeScreen({
  navigate,
}: Props) {
  const savedVideos = videos.filter(
    (v) => v.saved
  );

  const savedPlaylists = playlists.filter(
    (p) => p.saved
  );

  return (
    <View style={styles.container}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* ========================= */}
        {/* Header */}
        {/* ========================= */}

        <View style={styles.header}>

          <View>
            <Text style={styles.greeting}>
              Good evening 👋
            </Text>

            <Text style={styles.logo}>
              Play
              <Text style={styles.logoAccent}>
                Talk
              </Text>
            </Text>
          </View>

          <View style={styles.headerActions}>

            {/* Search */}
            <Pressable
              onPress={() =>
                navigate("search")
              }
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

            {/* Downloads */}
            <Pressable
              onPress={() =>
                navigate("downloads")
              }
              style={({ pressed }) => [
                styles.headerButton,
                pressed && styles.pressed,
              ]}
            >
              <DownloadIcon
                size={18}
                color="#9CA3AF"
              />
            </Pressable>

            {/* Notifications */}
            <Pressable
              style={({ pressed }) => [
                styles.headerButton,
                pressed && styles.pressed,
              ]}
            >
              <BellIcon
                size={18}
                color="#9CA3AF"
              />

              <View
                style={styles.notificationDot}
              />
            </Pressable>

          </View>

        </View>

        {/* ========================= */}
        {/* Continue Watching */}
        {/* ========================= */}

        <View style={styles.section}>

          <View style={styles.sectionHeader}>

            <Text style={styles.sectionTitle}>
              Continue Watching
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
            contentContainerStyle={
              styles.horizontalList
            }
          >

            {savedVideos
              .slice(0, 4)
              .map((video) => (

                <Pressable
                  key={video.id}
                  onPress={() =>
                    navigate(
                      "video-details",
                      { video }
                    )
                  }
                  style={({ pressed }) => [
                    styles.continueCard,
                    pressed && styles.pressed,
                  ]}
                >

                  {/* Thumbnail */}
                  <View
                    style={
                      styles.continueThumbnailContainer
                    }
                  >

                    <Image
                      source={{
                        uri: video.thumbnail,
                      }}
                      style={
                        styles.continueThumbnail
                      }
                      resizeMode="cover"
                    />

                    {/* Bottom Gradient-like overlay */}
                    <View
                      style={
                        styles.thumbnailOverlay
                      }
                    />

                    {/* Progress */}
                    <View
                      style={
                        styles.progressContainer
                      }
                    >
                      <View
                        style={
                          styles.progressTrack
                        }
                      >
                        <View
                          style={[
                            styles.progressFill,
                            {
                              width: "58%",
                            },
                          ]}
                        />
                      </View>
                    </View>

                    {/* Duration */}
                    <View
                      style={styles.durationBadge}
                    >
                      <Text
                        style={
                          styles.durationText
                        }
                      >
                        {video.duration}
                      </Text>
                    </View>

                    {/* Offline */}
                    {video.offline && (
                      <View
                        style={
                          styles.offlineBadge
                        }
                      >
                        <Text
                          style={
                            styles.offlineBadgeText
                          }
                        >
                          OFFLINE
                        </Text>
                      </View>
                    )}

                  </View>

                  <Text
                    style={styles.continueTitle}
                    numberOfLines={2}
                  >
                    {video.title}
                  </Text>

                  <Text
                    style={styles.continueChannel}
                    numberOfLines={1}
                  >
                    {video.channel}
                  </Text>

                </Pressable>

              ))}

          </ScrollView>

        </View>

        {/* ========================= */}
        {/* Featured */}
        {/* ========================= */}

        <Pressable
          onPress={() =>
            navigate("video-details", {
              video: videos[3],
            })
          }
          style={({ pressed }) => [
            styles.featuredCard,
            pressed && styles.featuredPressed,
          ]}
        >

          <Image
            source={{
              uri: videos[3].thumbnail,
            }}
            style={styles.featuredImage}
            resizeMode="cover"
          />

          {/* Overlay */}
          <View
            style={styles.featuredOverlay}
          />

          {/* Featured Text */}
          <View
            style={styles.featuredContent}
          >

            <Text style={styles.featuredLabel}>
              FEATURED
            </Text>

            <Text
              style={styles.featuredTitle}
              numberOfLines={2}
            >
              {videos[3].title}
            </Text>

            <Text
              style={styles.featuredMeta}
              numberOfLines={1}
            >
              {videos[3].channel} ·{" "}
              {videos[3].duration}
            </Text>

          </View>

          {/* Play */}
          <View style={styles.featuredPlay}>
            <View
              style={styles.playTriangle}
            />
          </View>

        </Pressable>

        {/* ========================= */}
        {/* My Videos */}
        {/* ========================= */}

        <View style={styles.section}>

          <View style={styles.sectionHeader}>

            <Text style={styles.sectionTitle}>
              My Videos
            </Text>

            <Pressable>
              <Text style={styles.seeAll}>
                See all
              </Text>
            </Pressable>

          </View>

          <View style={styles.videoGrid}>

            {savedVideos.map((video) => (
              <View
                key={video.id}
                style={styles.gridItem}
              >
                <VideoCard
                  video={video}
                  variant="grid"
                  onClick={() =>
                    navigate(
                      "video-details",
                      { video }
                    )
                  }
                />
              </View>
            ))}

          </View>

        </View>

        {/* ========================= */}
        {/* My Playlists */}
        {/* ========================= */}

        <View style={styles.section}>

          <View style={styles.sectionHeader}>

            <Text style={styles.sectionTitle}>
              My Playlists
            </Text>

            <Pressable>
              <Text style={styles.seeAll}>
                See all
              </Text>
            </Pressable>

          </View>

          <View style={styles.playlistList}>

            {savedPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                variant="row"
                onClick={() =>
                  navigate(
                    "playlist-details",
                    { playlist }
                  )
                }
              />
            ))}

          </View>

        </View>

      </ScrollView>

      {/* ========================= */}
      {/* FAB */}
      {/* ========================= */}

      <Pressable
        onPress={() =>
          navigate("add-content")
        }
        style={({ pressed }) => [
          styles.fab,
          pressed && styles.fabPressed,
        ]}
      >
        <PlusIconSolid
          size={22}
          color="#FFFFFF"
        />
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingBottom: 100,
  },

  /* ========================= */
  /* Header */
  /* ========================= */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#0A0A0A",
  },

  greeting: {
    color: "#6B7280",
    fontSize: 12,
    marginBottom: 2,
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  logoAccent: {
    color: "#E03131",
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

  notificationDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E03131",
    borderWidth: 2,
    borderColor: "#0A0A0A",
  },

  /* ========================= */
  /* Sections */
  /* ========================= */

  section: {
    marginTop: 28,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  seeAll: {
    color: "#E03131",
    fontSize: 12,
    fontWeight: "500",
  },

  /* ========================= */
  /* Continue Watching */
  /* ========================= */

  horizontalList: {
    paddingHorizontal: 16,
    gap: 12,
  },

  continueCard: {
    width: 176,
  },

  continueThumbnailContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#222222",
    position: "relative",
  },

  continueThumbnail: {
    width: "100%",
    height: "100%",
  },

  thumbnailOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "45%",
    backgroundColor:
      "rgba(0,0,0,0.45)",
  },

  progressContainer: {
    position: "absolute",
    left: 8,
    right: 8,
    bottom: 8,
  },

  progressTrack: {
    height: 2,
    borderRadius: 1,
    backgroundColor:
      "rgba(255,255,255,0.20)",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#E03131",
    borderRadius: 1,
  },

  durationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor:
      "rgba(0,0,0,0.80)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  durationText: {
    color: "#FFFFFF",
    fontSize: 9,
  },

  offlineBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#E03131",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 999,
  },

  offlineBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },

  continueTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
    marginTop: 6,
  },

  continueChannel: {
    color: "#6B7280",
    fontSize: 10,
    marginTop: 2,
  },

  /* ========================= */
  /* Featured */
  /* ========================= */

  featuredCard: {
    height: 144,
    marginHorizontal: 16,
    marginTop: 28,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#222222",
  },

  featuredImage: {
    width: "100%",
    height: "100%",
  },

  featuredOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor:
      "rgba(0,0,0,0.55)",
  },

  featuredContent: {
    position: "absolute",
    left: 16,
    top: 0,
    bottom: 0,
    width: "58%",
    justifyContent: "center",
  },

  featuredLabel: {
    color: "#E03131",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  featuredTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 19,
  },

  featuredMeta: {
    color: "#9CA3AF",
    fontSize: 10,
    marginTop: 4,
  },

  featuredPlay: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    marginTop: 48,
    borderRadius: 24,
    backgroundColor:
      "rgba(224,49,49,0.90)",
  },

  playTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderTopWidth: 9,
    borderBottomWidth: 9,
    borderLeftColor: "#FFFFFF",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginLeft: 3,
  },

  /* ========================= */
  /* My Videos */
  /* ========================= */

  videoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 12,
  },

  gridItem: {
    width: "48%",
  },

  /* ========================= */
  /* Playlists */
  /* ========================= */

  playlistList: {
    paddingHorizontal: 16,
    gap: 8,
  },

  /* ========================= */
  /* FAB */
  /* ========================= */

  fab: {
    position: "absolute",
    right: 16,
    bottom: 76,
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E03131",
    shadowColor: "#E03131",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 10,
  },

  fabPressed: {
    opacity: 0.85,
    transform: [
      {
        scale: 0.95,
      },
    ],
  },

  pressed: {
    opacity: 0.75,
  },

  featuredPressed: {
    opacity: 0.9,
  },
});