import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

import type { Screen } from "../types";
import {
  BackIcon,
  PlayIcon,
  DownloadIcon,
  WifiOffIcon,
} from "../components/Icons";

import { offlineVideos } from "../data/mockData";

interface Props {
  navigate: (s: Screen, p?: any) => void;
  goBack: () => void;
}

export default function DownloadsScreen({
  navigate,
  goBack,
}: Props) {
  const totalSize = offlineVideos.length * 312;

  const storagePercentage = Math.min(
    (totalSize / 2048) * 100,
    100
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <Pressable
          onPress={goBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <BackIcon
            size={20}
            color="#9CA3AF"
          />
        </Pressable>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>
            Downloads
          </Text>

          <Text style={styles.headerSubtitle}>
            {offlineVideos.length} videos · {totalSize} MB
          </Text>
        </View>

      </View>

      {/* Storage */}
      <View style={styles.storageSection}>

        <View style={styles.storageCard}>

          {/* Storage Header */}
          <View style={styles.storageHeader}>

            <View style={styles.storageTitleRow}>
              <WifiOffIcon
                size={16}
                color="#E03131"
              />

              <Text style={styles.storageTitle}>
                Offline Storage
              </Text>
            </View>

            <Text style={styles.storageSize}>
              {totalSize} / 2048 MB
            </Text>

          </View>

          {/* Progress Bar */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${storagePercentage}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.availableText}>
            {Math.round(2048 - totalSize)} MB available
          </Text>

        </View>

      </View>

      {/* Download List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >

        {offlineVideos.length === 0 ? (

          /* Empty State */
          <View style={styles.emptyState}>

            <View style={styles.emptyIcon}>
              <DownloadIcon
                size={28}
                color="#4B5563"
              />
            </View>

            <View style={styles.emptyTextContainer}>

              <Text style={styles.emptyTitle}>
                No offline videos
              </Text>

              <Text style={styles.emptySubtitle}>
                Save videos for offline watching
              </Text>

            </View>

          </View>

        ) : (

          /* Videos */
          <View style={styles.videoList}>

            {offlineVideos.map((video) => (

              <View
                key={video.id}
                style={styles.videoCard}
              >

                <View style={styles.videoRow}>

                  {/* Thumbnail */}
                  <View style={styles.thumbnailContainer}>

                    <Image
                      source={{
                        uri: video.thumbnail,
                      }}
                      style={styles.thumbnail}
                      resizeMode="cover"
                    />

                    <View style={styles.thumbnailOverlay}>

                      <Pressable
                        onPress={() =>
                          navigate("video-details", {
                            video,
                          })
                        }
                        style={({ pressed }) => [
                          styles.playButton,
                          pressed && styles.pressed,
                        ]}
                      >
                        <PlayIcon
                          size={14}
                          color="#FFFFFF"
                        />
                      </Pressable>

                    </View>

                  </View>

                  {/* Video Info */}
                  <View style={styles.videoInfo}>

                    <Text
                      style={styles.videoTitle}
                      numberOfLines={2}
                    >
                      {video.title}
                    </Text>

                    <Text
                      style={styles.channel}
                      numberOfLines={1}
                    >
                      {video.channel}
                    </Text>

                    <View style={styles.metaRow}>

                      <View style={styles.offlineBadge}>
                        <Text style={styles.offlineText}>
                          Offline
                        </Text>
                      </View>

                      <Text style={styles.fileSize}>
                        ~312 MB
                      </Text>

                    </View>

                  </View>

                </View>

              </View>

            ))}

          </View>

        )}

      </ScrollView>

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
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
  },

  headerContent: {
    flex: 1,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 2,
  },

  /* Storage */
  storageSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  storageCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    backgroundColor: "#141414",
  },

  storageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  storageTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  storageTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  storageSize: {
    color: "#6B7280",
    fontSize: 12,
  },

  progressTrack: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "#2A2A2A",
  },

  progressFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#E03131",
  },

  availableText: {
    color: "#4B5563",
    fontSize: 12,
    marginTop: 8,
  },

  /* List */
  list: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },

  videoList: {
    gap: 12,
  },

  /* Video Card */
  videoCard: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    backgroundColor: "#141414",
  },

  videoRow: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
  },

  thumbnailContainer: {
    width: 112,
    height: 64,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#222222",
    position: "relative",
  },

  thumbnail: {
    width: "100%",
    height: "100%",
  },

  thumbnailOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.30)",
    alignItems: "center",
    justifyContent: "center",
  },

  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(224,49,49,0.90)",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Video Info */
  videoInfo: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 2,
  },

  videoTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
  },

  channel: {
    color: "#9CA3AF",
    fontSize: 11,
    marginTop: 4,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },

  offlineBadge: {
    backgroundColor: "rgba(224,49,49,0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },

  offlineText: {
    color: "#E03131",
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  fileSize: {
    color: "#4B5563",
    fontSize: 10,
  },

  /* Empty State */
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
  },

  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  emptyTextContainer: {
    alignItems: "center",
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  emptySubtitle: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 4,
  },

  pressed: {
    opacity: 0.75,
  },
});