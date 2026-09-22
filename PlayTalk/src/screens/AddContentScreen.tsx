import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

import type { Screen } from "../types";
import {
  BackIcon,
  LinkIcon,
  YouTubeIcon,
  PlaylistIcon,
  PlayIcon,
} from "../components/Icons";

import { videos, playlists } from "../data/mockData";

interface Props {
  navigate: (s: Screen, p?: any) => void;
  goBack: () => void;
}

type State = "idle" | "loading" | "video" | "playlist" | "saved";

export default function AddContentScreen({
  navigate,
  goBack,
}: Props) {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<State>("idle");
  const [isPlaylist, setIsPlaylist] = useState(false);

  const detect = () => {
    if (!url.trim()) return;

    setState("loading");

    setTimeout(() => {
      const pl =
        url.includes("list=") ||
        url.includes("playlist");

      setIsPlaylist(pl);
      setState(pl ? "playlist" : "video");
    }, 1400);
  };

  const mockResult = isPlaylist ? playlists[0] : videos[0];

  const exampleVideo =
    "https://youtube.com/watch?v=BRRolKTlF6Q";

  const examplePlaylist =
    "https://youtube.com/playlist?list=PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU";

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
          <BackIcon size={20} color="#9CA3AF" />
        </Pressable>

        <Text style={styles.headerTitle}>
          Add Content
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* URL Input */}
        <View style={styles.inputSection}>

          <Text style={styles.label}>
            YouTube URL
          </Text>

          <View style={styles.inputRow}>

            <View style={styles.inputWrapper}>
              <LinkIcon
                size={18}
                color="#6B7280"
              />

              <TextInput
                value={url}
                onChangeText={setUrl}
                placeholder="Paste a YouTube video or playlist URL…"
                placeholderTextColor="#6B7280"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
              />
            </View>

            <Pressable
              onPress={detect}
              disabled={!url.trim()}
              style={({ pressed }) => [
                styles.fetchButton,
                url.trim()
                  ? styles.fetchButtonActive
                  : styles.fetchButtonDisabled,
                pressed && url.trim()
                  ? styles.pressed
                  : undefined,
              ]}
            >
              <Text
                style={[
                  styles.fetchText,
                  {
                    color: url.trim()
                      ? "#FFFFFF"
                      : "#4B5563",
                  },
                ]}
              >
                Fetch
              </Text>
            </Pressable>

          </View>

          <Text style={styles.helperText}>
            Works with videos, shorts, playlists and channels
          </Text>
        </View>

        {/* Quick Examples */}
        {state === "idle" && (
          <View style={styles.examplesContainer}>

            <Text style={styles.sectionLabel}>
              TRY AN EXAMPLE
            </Text>

            {/* Video Example */}
            <Pressable
              onPress={() => setUrl(exampleVideo)}
              style={({ pressed }) => [
                styles.exampleCard,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.exampleIcon}>
                <PlayIcon
                  size={14}
                  color="#E03131"
                />
              </View>

              <View style={styles.exampleTextContainer}>
                <Text style={styles.exampleTitle}>
                  YouTube Video
                </Text>

                <Text
                  style={styles.exampleUrl}
                  numberOfLines={1}
                >
                  {exampleVideo}
                </Text>
              </View>
            </Pressable>

            {/* Playlist Example */}
            <Pressable
              onPress={() => setUrl(examplePlaylist)}
              style={({ pressed }) => [
                styles.exampleCard,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.exampleIcon}>
                <PlaylistIcon
                  size={14}
                  color="#E03131"
                />
              </View>

              <View style={styles.exampleTextContainer}>
                <Text style={styles.exampleTitle}>
                  YouTube Playlist
                </Text>

                <Text
                  style={styles.exampleUrl}
                  numberOfLines={1}
                >
                  {examplePlaylist}
                </Text>
              </View>
            </Pressable>

          </View>
        )}

        {/* Loading */}
        {state === "loading" && (
          <View style={styles.loadingContainer}>

            <View style={styles.youtubeBox}>
              <YouTubeIcon size={32} />
            </View>

            <View style={styles.loadingTextContainer}>
              <Text style={styles.loadingTitle}>
                Fetching content…
              </Text>

              <Text style={styles.loadingSubtitle}>
                Detecting type and loading metadata
              </Text>
            </View>

            <View style={styles.dotsContainer}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>

          </View>
        )}

        {/* Video Result */}
        {state === "video" && (
          <View style={styles.resultContainer}>

            {/* Detection Badge */}
            <View style={styles.detectedBadge}>
              <PlayIcon
                size={14}
                color="#E03131"
              />

              <Text style={styles.detectedText}>
                Video detected
              </Text>
            </View>

            {/* Thumbnail */}
            <View style={styles.videoThumbnailContainer}>

              <Image
                source={{
                  uri: (mockResult as any).thumbnail,
                }}
                style={styles.videoThumbnail}
                resizeMode="cover"
              />

              <View style={styles.thumbnailOverlay}>
                <View style={styles.playButton}>
                  <PlayIcon
                    size={24}
                    color="#FFFFFF"
                  />
                </View>
              </View>

              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>
                  {(mockResult as any).duration}
                </Text>
              </View>

            </View>

            {/* Video Info */}
            <View style={styles.infoCard}>

              <Text style={styles.videoTitle}>
                {(mockResult as any).title}
              </Text>

              <Text style={styles.channel}>
                {(mockResult as any).channel}
              </Text>

              <View style={styles.metadataRow}>

                <Text style={styles.metadata}>
                  {(mockResult as any).views} views
                </Text>

                <Text style={styles.metadata}>
                  {(mockResult as any).publishedAt}
                </Text>

              </View>

            </View>

            {/* Actions */}
            <View style={styles.actionsRow}>

              <Pressable
                onPress={() => {
                  setState("saved");

                  setTimeout(() => {
                    navigate("video-details", {
                      video: mockResult,
                    });
                  }, 500);
                }}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.primaryButtonText}>
                  Save Video
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  navigate("video-details", {
                    video: mockResult,
                  })
                }
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.secondaryButtonText}>
                  Preview
                </Text>
              </Pressable>

            </View>

          </View>
        )}

        {/* Playlist Result */}
        {state === "playlist" && (
          <View style={styles.resultContainer}>

            {/* Detection Badge */}
            <View style={styles.detectedBadge}>

              <PlaylistIcon
                size={14}
                color="#E03131"
              />

              <Text style={styles.detectedText}>
                Playlist detected —{" "}
                {(mockResult as any).videoCount} videos
              </Text>

            </View>

            {/* Playlist Thumbnail */}
            <View style={styles.playlistThumbnailContainer}>

              <Image
                source={{
                  uri: (mockResult as any).thumbnail,
                }}
                style={styles.playlistThumbnail}
                resizeMode="cover"
              />

              <View style={styles.playlistOverlay}>

                <PlaylistIcon
                  size={28}
                  color="#FFFFFF"
                />

                <Text style={styles.playlistVideoCount}>
                  {(mockResult as any).videoCount} videos
                </Text>

              </View>

            </View>

            {/* Playlist Info */}
            <View style={styles.infoCard}>

              <Text style={styles.videoTitle}>
                {(mockResult as any).title}
              </Text>

              <Text style={styles.channel}>
                {(mockResult as any).channel}
              </Text>

            </View>

            {/* Actions */}
            <View style={styles.actionsRow}>

              <Pressable
                onPress={() =>
                  navigate("playlist-details", {
                    playlist: mockResult,
                  })
                }
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.primaryButtonText}>
                  Save Playlist
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  navigate("playlist-details", {
                    playlist: mockResult,
                  })
                }
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.secondaryButtonText}>
                  Preview
                </Text>
              </Pressable>

            </View>

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

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  /* Scroll */
  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
  },

  /* Input */
  inputSection: {
    marginBottom: 20,
  },

  label: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
  },

  inputRow: {
    flexDirection: "row",
    gap: 8,
  },

  inputWrapper: {
    flex: 1,
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "#1A1A1A",
  },

  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    paddingVertical: 0,
  },

  fetchButton: {
    paddingHorizontal: 16,
    minHeight: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  fetchButtonActive: {
    backgroundColor: "#E03131",
  },

  fetchButtonDisabled: {
    backgroundColor: "#2A2A2A",
  },

  fetchText: {
    fontSize: 14,
    fontWeight: "700",
  },

  helperText: {
    color: "#4B5563",
    fontSize: 12,
    marginTop: 8,
  },

  /* Examples */
  examplesContainer: {
    gap: 12,
  },

  sectionLabel: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.2,
    marginBottom: 2,
  },

  exampleCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    backgroundColor: "#141414",
  },

  exampleIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#2A0000",
    alignItems: "center",
    justifyContent: "center",
  },

  exampleTextContainer: {
    flex: 1,
  },

  exampleTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 3,
  },

  exampleUrl: {
    color: "#4B5563",
    fontSize: 10,
  },

  /* Loading */
  loadingContainer: {
    alignItems: "center",
    marginTop: 32,
  },

  youtubeBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "rgba(224,49,49,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingTextContainer: {
    alignItems: "center",
    marginTop: 16,
  },

  loadingTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  loadingSubtitle: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 4,
  },

  dotsContainer: {
    flexDirection: "row",
    gap: 6,
    marginTop: 18,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E03131",
  },

  /* Result */
  resultContainer: {
    gap: 16,
  },

  detectedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "rgba(224,49,49,0.12)",
  },

  detectedText: {
    color: "#E03131",
    fontSize: 12,
    fontWeight: "600",
  },

  /* Video thumbnail */
  videoThumbnailContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },

  videoThumbnail: {
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
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(224,49,49,0.90)",
    alignItems: "center",
    justifyContent: "center",
  },

  durationBadge: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.80)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },

  durationText: {
    color: "#FFFFFF",
    fontSize: 11,
  },

  /* Playlist thumbnail */
  playlistThumbnailContainer: {
    width: "100%",
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },

  playlistThumbnail: {
    width: "100%",
    height: "100%",
  },

  playlistOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.60)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
  },

  playlistVideoCount: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  /* Info */
  infoCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "#141414",
  },

  videoTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },

  channel: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 4,
  },

  metadataRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 12,
  },

  metadata: {
    color: "#6B7280",
    fontSize: 12,
  },

  /* Buttons */
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },

  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#E03131",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E03131",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.30,
    shadowRadius: 20,
    elevation: 6,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "700",
  },

  pressed: {
    opacity: 0.75,
  },
});