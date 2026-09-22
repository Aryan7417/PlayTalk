import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

import type { Video, Playlist } from "../types";
import {
  PlayIcon,
  ClockIcon,
  PlaylistIcon,
} from "./Icons";

interface VideoCardProps {
  video: Video;
  variant?: "grid" | "row" | "message" | "horizontal";
  onClick?: () => void;
}

interface PlaylistCardProps {
  playlist: Playlist;
  variant?: "row" | "message";
  onClick?: () => void;
}

export function VideoCard({
  video,
  variant = "grid",
  onClick,
}: VideoCardProps) {
  // MESSAGE
  if (variant === "message") {
    return (
      <Pressable
        onPress={onClick}
        style={({ pressed }) => [
          styles.messageCard,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.messageImageContainer}>
          <Image
            source={{ uri: video.thumbnail }}
            style={styles.messageImage}
            resizeMode="cover"
          />

          <View style={styles.playOverlay}>
            <View style={styles.messagePlayButton}>
              <PlayIcon size={16} color="#fff" />
            </View>
          </View>

          <View style={styles.durationBadgeMessage}>
            <Text style={styles.durationText}>
              {video.duration}
            </Text>
          </View>
        </View>

        <View style={styles.messageContent}>
          <Text
            style={styles.messageTitle}
            numberOfLines={2}
          >
            {video.title}
          </Text>

          <Text style={styles.messageChannel}>
            {video.channel}
          </Text>
        </View>
      </Pressable>
    );
  }

  // HORIZONTAL
  if (variant === "horizontal") {
    return (
      <Pressable
        onPress={onClick}
        style={({ pressed }) => [
          styles.horizontalContainer,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.horizontalThumbnail}>
          <Image
            source={{ uri: video.thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />

          <View style={styles.smallDurationBadge}>
            <Text style={styles.smallDurationText}>
              {video.duration}
            </Text>
          </View>
        </View>

        <View style={styles.horizontalContent}>
          <Text
            style={styles.horizontalTitle}
            numberOfLines={2}
          >
            {video.title}
          </Text>

          <Text style={styles.horizontalChannel}>
            {video.channel}
          </Text>

          <Text style={styles.horizontalMeta}>
            {video.views} views · {video.publishedAt}
          </Text>
        </View>
      </Pressable>
    );
  }

  // ROW
  if (variant === "row") {
    return (
      <Pressable
        onPress={onClick}
        style={({ pressed }) => [
          styles.rowCard,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.rowThumbnail}>
          <Image
            source={{ uri: video.thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />

          <View style={styles.smallDurationBadge}>
            <Text style={styles.smallDurationText}>
              {video.duration}
            </Text>
          </View>
        </View>

        <View style={styles.rowContent}>
          <Text
            style={styles.rowTitle}
            numberOfLines={2}
          >
            {video.title}
          </Text>

          <Text style={styles.rowChannel}>
            {video.channel}
          </Text>

          <View style={styles.durationRow}>
            <ClockIcon size={10} color="#6B7280" />

            <Text style={styles.durationTextGray}>
              {video.duration}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  // GRID
  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => [
        styles.gridContainer,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.gridThumbnail}>
        <Image
          source={{ uri: video.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        {/* Dark gradient replacement */}
        <View style={styles.gridOverlay} />

        <View style={styles.gridDurationBadge}>
          <Text style={styles.durationText}>
            {video.duration}
          </Text>
        </View>

        <View style={styles.gridPlayContainer}>
          <View style={styles.gridPlayButton}>
            <PlayIcon size={18} color="#fff" />
          </View>
        </View>
      </View>

      <View style={styles.gridContent}>
        <Text
          style={styles.gridTitle}
          numberOfLines={2}
        >
          {video.title}
        </Text>

        <Text style={styles.gridChannel}>
          {video.channel}
        </Text>

        <Text style={styles.gridMeta}>
          {video.views} views · {video.publishedAt}
        </Text>
      </View>
    </Pressable>
  );
}

export function PlaylistCard({
  playlist,
  variant = "row",
  onClick,
}: PlaylistCardProps) {
  // MESSAGE
  if (variant === "message") {
    return (
      <Pressable
        onPress={onClick}
        style={({ pressed }) => [
          styles.messageCard,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.playlistMessageImage}>
          <Image
            source={{ uri: playlist.thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />

          <View style={styles.playlistOverlay}>
            <PlaylistIcon size={20} color="#fff" />

            <Text style={styles.playlistVideoCount}>
              {playlist.videoCount} videos
            </Text>
          </View>
        </View>

        <View style={styles.messageContent}>
          <Text
            style={styles.messageTitle}
            numberOfLines={2}
          >
            {playlist.title}
          </Text>

          <Text style={styles.messageChannel}>
            {playlist.channel}
          </Text>
        </View>
      </Pressable>
    );
  }

  // ROW
  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => [
        styles.rowCard,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.playlistThumbnail}>
        <Image
          source={{ uri: playlist.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        <View style={styles.playlistRowOverlay}>
          <PlaylistIcon size={14} color="#fff" />
        </View>
      </View>

      <View style={styles.rowContent}>
        <Text
          style={styles.rowTitle}
          numberOfLines={2}
        >
          {playlist.title}
        </Text>

        <Text style={styles.rowChannel}>
          {playlist.channel}
        </Text>

        <Text style={styles.playlistCount}>
          {playlist.videoCount} videos
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  /* Common */

  pressed: {
    opacity: 0.75,
  },

  thumbnail: {
    width: "100%",
    height: "100%",
    backgroundColor: "#222",
  },

  /* Message */

  messageCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  messageImageContainer: {
    width: "100%",
    height: 128,
    position: "relative",
    backgroundColor: "#222",
  },

  messageImage: {
    width: "100%",
    height: "100%",
  },

  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },

  messagePlayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(224,49,49,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },

  durationBadgeMessage: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  durationText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "500",
  },

  messageContent: {
    padding: 10,
  },

  messageTitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
  },

  messageChannel: {
    color: "#6B7280",
    fontSize: 10,
    marginTop: 2,
  },

  /* Horizontal */

  horizontalContainer: {
    flexDirection: "row",
    gap: 12,
  },

  horizontalThumbnail: {
    width: 112,
    height: 64,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#222",
    position: "relative",
  },

  horizontalContent: {
    flex: 1,
    paddingVertical: 2,
  },

  horizontalTitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
  },

  horizontalChannel: {
    color: "#6B7280",
    fontSize: 10,
    marginTop: 4,
  },

  horizontalMeta: {
    color: "#4B5563",
    fontSize: 10,
    marginTop: 2,
  },

  /* Row */

  rowCard: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#141414",
  },

  rowThumbnail: {
    width: 96,
    height: 56,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#222",
    position: "relative",
  },

  smallDurationBadge: {
    position: "absolute",
    right: 4,
    bottom: 4,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },

  smallDurationText: {
    color: "#fff",
    fontSize: 9,
  },

  rowContent: {
    flex: 1,
    minWidth: 0,
  },

  rowTitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
  },

  rowChannel: {
    color: "#9CA3AF",
    fontSize: 11,
    marginTop: 4,
  },

  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },

  durationTextGray: {
    color: "#6B7280",
    fontSize: 10,
  },

  playlistCount: {
    color: "#4B5563",
    fontSize: 10,
    marginTop: 2,
  },

  /* Grid */

  gridContainer: {
    minWidth: 0,
  },

  gridThumbnail: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#222",
    position: "relative",
  },

  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  gridDurationBadge: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  gridPlayContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },

  gridPlayButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(224,49,49,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },

  gridContent: {
    marginTop: 8,
  },

  gridTitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
  },

  gridChannel: {
    color: "#9CA3AF",
    fontSize: 11,
    marginTop: 2,
  },

  gridMeta: {
    color: "#4B5563",
    fontSize: 10,
    marginTop: 2,
  },

  /* Playlist */

  playlistMessageImage: {
    width: "100%",
    height: 112,
    backgroundColor: "#222",
    position: "relative",
  },

  playlistOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  playlistVideoCount: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  playlistThumbnail: {
    width: 96,
    height: 56,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#222",
    position: "relative",
  },

  playlistRowOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});