import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";

import type { Screen, Video } from "../types";

import {
  BackIcon,
  PlayIcon,
  SavedIcon,
  SaveIcon,
  ShareIcon,
  DownloadIcon,
  EyeIcon,
  YouTubeIcon,
} from "../components/Icons";

import { VideoCard } from "../components/VideoCard";
import { videos, chats } from "../data/mockData";
import Avatar from "../components/Avatar";

interface Props {
  navigate: (s: Screen, p?: any) => void;
  goBack: () => void;
  params?: {
    video?: Video;
  };
}

export default function VideoDetailsScreen({
  navigate,
  goBack,
  params,
}: Props) {
  const video = params?.video || videos[0];

  const [saved, setSaved] = useState(
    video.saved ?? false
  );

  const [offline, setOffline] = useState(
    video.offline ?? false
  );

  const [showShareSheet, setShowShareSheet] =
    useState(false);

  const related = videos
    .filter((v) => v.id !== video.id)
    .slice(0, 4);

  return (
    <View style={styles.container}>
      {/* Hero Thumbnail */}
      <View style={styles.hero}>
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: video.thumbnail }}
            style={styles.thumbnail}
          />

          <View style={styles.thumbnailOverlay} />
        </View>

        {/* Back */}
        <Pressable
          onPress={goBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <BackIcon size={20} color="#FFFFFF" />
        </Pressable>

        {/* Play */}
        <View style={styles.playContainer}>
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              styles.playButton,
              pressed && styles.playPressed,
            ]}
          >
            <PlayIcon size={24} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Duration */}
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>
            {video.duration}
          </Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.contentScroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>
          {video.title}
        </Text>

        {/* Metadata */}
        <View style={styles.metadata}>
          <View style={styles.metaItem}>
            <EyeIcon
              size={14}
              color="#6B7280"
            />

            <Text style={styles.metaText}>
              {video.views} views
            </Text>
          </View>

          <View style={styles.dot} />

          <Text style={styles.metaText}>
            {video.publishedAt}
          </Text>

          <View style={styles.dot} />

          <View style={styles.metaItem}>
            <YouTubeIcon size={12} />

            <Text
              style={styles.metaText}
              numberOfLines={1}
            >
              {video.channel}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsGrid}>
          {/* Watch */}
          <ActionButton
            icon={
              <PlayIcon
                size={20}
                color="#E03131"
              />
            }
            label="Watch"
            onPress={() => {}}
          />

          {/* Save */}
          <ActionButton
            icon={
              saved ? (
                <SavedIcon
                  size={20}
                  color="#E03131"
                />
              ) : (
                <SaveIcon
                  size={20}
                  color="#9CA3AF"
                />
              )
            }
            label={saved ? "Saved" : "Save"}
            onPress={() => setSaved((v) => !v)}
          />

          {/* Share */}
          <ActionButton
            icon={
              <ShareIcon
                size={20}
                color="#9CA3AF"
              />
            }
            label="Share"
            onPress={() =>
              setShowShareSheet(true)
            }
          />

          {/* Offline */}
          <ActionButton
            icon={
              <DownloadIcon
                size={20}
                color={
                  offline
                    ? "#E03131"
                    : "#9CA3AF"
                }
              />
            }
            label={
              offline ? "Saved" : "Offline"
            }
            onPress={() =>
              setOffline((v) => !v)
            }
          />
        </View>

        {/* Channel */}
        <View style={styles.channelCard}>
          <View style={styles.channelIcon}>
            <YouTubeIcon size={18} />
          </View>

          <View style={styles.channelInfo}>
            <Text style={styles.channelName}>
              {video.channel}
            </Text>

            <Text style={styles.channelSubtitle}>
              YouTube Channel
            </Text>
          </View>

          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              styles.visitButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.visitText}>
              Visit
            </Text>
          </Pressable>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>
            Description
          </Text>

          <Text style={styles.description}>
            {video.description}
          </Text>
        </View>

        {/* Up Next */}
        <View style={styles.upNext}>
          <Text style={styles.sectionTitle}>
            Up Next
          </Text>

          <View style={styles.relatedList}>
            {related.map((relatedVideo) => (
              <VideoCard
                key={relatedVideo.id}
                video={relatedVideo}
                variant="horizontal"
                onClick={() =>
                  navigate("video-details", {
                    video: relatedVideo,
                  })
                }
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Share Sheet */}
      {showShareSheet && (
        <View style={styles.shareOverlay}>
          {/* Overlay */}
          <Pressable
            style={styles.overlayBackground}
            onPress={() =>
              setShowShareSheet(false)
            }
          />

          {/* Bottom Sheet */}
          <View style={styles.shareSheet}>
            {/* Handle */}
            <View style={styles.sheetHandle} />

            <Text style={styles.shareTitle}>
              Share video
            </Text>

            <Text
              style={styles.shareVideoTitle}
              numberOfLines={1}
            >
              {video.title}
            </Text>

            <Text style={styles.sendLabel}>
              SEND TO FRIEND
            </Text>

            {/* Friends */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={
                styles.friendsList
              }
            >
              {chats.map((chat) => (
                <Pressable
                  key={chat.id}
                  onPress={() => {
                    setShowShareSheet(false);

                    navigate("private-chat", {
                      chatId: chat.id,
                      shareVideo: video,
                    });
                  }}
                  style={({ pressed }) => [
                    styles.friendItem,
                    pressed && styles.pressed,
                  ]}
                >
                  <Avatar
                    user={chat.user}
                    size="lg"
                    showStatus
                  />

                  <Text
                    style={styles.friendName}
                    numberOfLines={1}
                  >
                    {chat.user.name.split(" ")[0]}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Cancel */}
            <Pressable
              onPress={() =>
                setShowShareSheet(false)
              }
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

/* -------------------------------- */
/* Action Button                    */
/* -------------------------------- */

function ActionButton({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        pressed && styles.pressed,
      ]}
    >
      {icon}

      <Text style={styles.actionLabel}>
        {label}
      </Text>
    </Pressable>
  );
}

/* -------------------------------- */
/* Styles                           */
/* -------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  // Hero
  hero: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#111111",
    position: "relative",
  },

  thumbnailContainer: {
    width: "100%",
    height: "100%",
  },

  thumbnail: {
    width: "100%",
    height: "100%",
  },

  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
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
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  playContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },

  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E03131",
    shadowColor: "#E03131",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },

  playPressed: {
    transform: [{ scale: 0.9 }],
  },

  durationBadge: {
    position: "absolute",
    right: 12,
    bottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.8)",
  },

  durationText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "500",
  },

  // Content
  contentScroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    marginBottom: 10,
  },

  metadata: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    maxWidth: "40%",
  },

  metaText: {
    color: "#6B7280",
    fontSize: 10,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#374151",
  },

  // Actions
  actionsGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },

  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minHeight: 68,
    borderRadius: 12,
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  actionLabel: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "500",
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },

  // Channel
  channelCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginBottom: 18,
  },

  channelIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(224,49,49,0.12)",
  },

  channelInfo: {
    flex: 1,
  },

  channelName: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  channelSubtitle: {
    color: "#6B7280",
    fontSize: 10,
    marginTop: 3,
  },

  visitButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: "#E03131",
  },

  visitText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },

  // Description
  descriptionSection: {
    marginBottom: 20,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  description: {
    color: "#9CA3AF",
    fontSize: 13,
    lineHeight: 20,
  },

  // Up Next
  upNext: {
    marginBottom: 8,
  },

  relatedList: {
    gap: 12,
  },

  // Share Overlay
  shareOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
    justifyContent: "flex-end",
  },

  overlayBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  shareSheet: {
    backgroundColor: "#141414",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },

  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 20,
  },

  shareTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  shareVideoTitle: {
    color: "#6B7280",
    fontSize: 12,
    marginBottom: 20,
  },

  sendLabel: {
    color: "#9CA3AF",
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 12,
  },

  friendsList: {
    gap: 16,
    paddingBottom: 4,
    marginBottom: 20,
  },

  friendItem: {
    width: 56,
    alignItems: "center",
    gap: 6,
  },

  friendName: {
    color: "#9CA3AF",
    fontSize: 10,
    maxWidth: 56,
  },

  cancelButton: {
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  cancelText: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "600",
  },
});