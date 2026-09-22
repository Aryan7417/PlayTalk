import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

import type {
  Screen,
  Playlist,
} from "../types";

import {
  BackIcon,
  PlaylistIcon,
  PlayIcon,
  SaveIcon,
  SavedIcon,
  ShareIcon,
} from "../components/Icons";

import { VideoCard } from "../components/VideoCard";
import { playlists } from "../data/mockData";

interface Props {
  navigate: (s: Screen, p?: any) => void;
  goBack: () => void;
  params?: {
    playlist?: Playlist;
  };
}

export default function PlaylistDetailsScreen({
  navigate,
  goBack,
  params,
}: Props) {
  const playlist =
    params?.playlist || playlists[0];

  const [saved, setSaved] = useState(
    playlist.saved ?? false
  );

  const placeholderCount = Math.max(
    0,
    playlist.videoCount -
      playlist.videos.length
  );

  const playlistItems = [
    ...playlist.videos,
    ...Array(placeholderCount).fill(null),
  ].slice(0, 8);

  return (
    <View style={styles.container}>

      {/* ========================= */}
      {/* Hero */}
      {/* ========================= */}

      <View style={styles.hero}>

        <Image
          source={{
            uri: playlist.thumbnail,
          }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Hero Overlay */}
        <View style={styles.heroOverlay} />

        {/* Back */}
        <Pressable
          onPress={goBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <BackIcon
            size={20}
            color="#FFFFFF"
          />
        </Pressable>

        {/* Playlist Info */}
        <View style={styles.heroInfo}>

          <View style={styles.playlistLabelRow}>

            <PlaylistIcon
              size={14}
              color="#E03131"
            />

            <Text style={styles.playlistLabel}>
              Playlist
            </Text>

          </View>

          <Text
            style={styles.heroTitle}
            numberOfLines={2}
          >
            {playlist.title}
          </Text>

          <Text style={styles.heroMeta}>
            {playlist.channel} ·{" "}
            {playlist.videoCount} videos
          </Text>

        </View>

      </View>

      {/* ========================= */}
      {/* Action Row */}
      {/* ========================= */}

      <View style={styles.actionRow}>

        {/* Play All */}
        <Pressable
          style={({ pressed }) => [
            styles.playAllButton,
            pressed && styles.pressed,
          ]}
        >
          <PlayIcon
            size={18}
            color="#FFFFFF"
          />

          <Text style={styles.playAllText}>
            Play All
          </Text>
        </Pressable>

        {/* Save */}
        <Pressable
          onPress={() =>
            setSaved((value) => !value)
          }
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          {saved ? (
            <SavedIcon
              size={20}
              color="#E03131"
            />
          ) : (
            <SaveIcon
              size={20}
              color="#9CA3AF"
            />
          )}
        </Pressable>

        {/* Share */}
        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <ShareIcon
            size={20}
            color="#9CA3AF"
          />
        </Pressable>

      </View>

      {/* ========================= */}
      {/* Video List */}
      {/* ========================= */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.listHeader}>

          <Text style={styles.listTitle}>
            Videos in this playlist
          </Text>

          <Text style={styles.totalText}>
            {playlist.videoCount} total
          </Text>

        </View>

        <View style={styles.videoList}>

          {playlistItems.map((video, index) => {

            /* Real Video */
            if (video) {
              return (
                <View
                  key={video.id}
                  style={styles.videoRow}
                >

                  <Text style={styles.index}>
                    {index + 1}
                  </Text>

                  <View style={styles.videoCardContainer}>
                    <VideoCard
                      video={video}
                      variant="horizontal"
                      onClick={() =>
                        navigate(
                          "video-details",
                          {
                            video,
                          }
                        )
                      }
                    />
                  </View>

                </View>
              );
            }

            /* Placeholder */
            return (
              <View
                key={`placeholder-${index}`}
                style={styles.videoRow}
              >

                <Text style={styles.index}>
                  {index + 1}
                </Text>

                <View
                  style={styles.placeholderContainer}
                >

                  <View
                    style={
                      styles.placeholderThumbnail
                    }
                  >
                    <PlaylistIcon
                      size={16}
                      color="#4B5563"
                    />
                  </View>

                  <View
                    style={
                      styles.placeholderInfo
                    }
                  >

                    <View
                      style={
                        styles.placeholderTitle
                      }
                    />

                    <View
                      style={
                        styles.placeholderSubtitle
                      }
                    />

                  </View>

                </View>

              </View>
            );
          })}

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

  /* ========================= */
  /* Hero */
  /* ========================= */

  hero: {
    height: 250,
    position: "relative",
    backgroundColor: "#111111",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:
      "rgba(0,0,0,0.48)",
  },

  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      "rgba(0,0,0,0.60)",
  },

  /* Hero Info */
  heroInfo: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 12,
  },

  playlistLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },

  playlistLabel: {
    color: "#E03131",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 25,
    marginBottom: 4,
  },

  heroMeta: {
    color: "#9CA3AF",
    fontSize: 14,
  },

  /* ========================= */
  /* Actions */
  /* ========================= */

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor:
      "rgba(255,255,255,0.06)",
  },

  playAllButton: {
    flex: 1,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 16,
    backgroundColor: "#E03131",

    shadowColor: "#E03131",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },

  playAllText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.10)",
  },

  /* ========================= */
  /* Video List */
  /* ========================= */

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },

  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  listTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  totalText: {
    color: "#6B7280",
    fontSize: 12,
  },

  videoList: {
    gap: 12,
  },

  videoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  index: {
    width: 20,
    color: "#4B5563",
    fontSize: 12,
    textAlign: "center",
  },

  videoCardContainer: {
    flex: 1,
  },

  /* ========================= */
  /* Placeholder */
  /* ========================= */

  placeholderContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    opacity: 0.4,
  },

  placeholderThumbnail: {
    width: 112,
    height: 64,
    borderRadius: 8,
    backgroundColor: "#222222",
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderInfo: {
    flex: 1,
    paddingVertical: 4,
  },

  placeholderTitle: {
    width: "75%",
    height: 12,
    borderRadius: 4,
    backgroundColor: "#222222",
    marginBottom: 8,
  },

  placeholderSubtitle: {
    width: "50%",
    height: 10,
    borderRadius: 4,
    backgroundColor: "#1A1A1A",
  },

  pressed: {
    opacity: 0.75,
  },
});