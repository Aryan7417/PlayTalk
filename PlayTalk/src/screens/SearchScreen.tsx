import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";

import type { Screen } from "../types";

import {
  BackIcon,
  SearchIcon,
  PersonPlusIcon,
  CheckIcon,
} from "../components/Icons";

import { friends, videos } from "../data/mockData";
import Avatar from "../components/Avatar";
import { VideoCard } from "../components/VideoCard";

interface Props {
  navigate: (s: Screen, p?: any) => void;
  goBack: () => void;
}

type Tab = "people" | "videos";

export default function SearchScreen({
  navigate,
  goBack,
}: Props) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("people");
  const [sentRequests, setSentRequests] = useState<string[]>(
    []
  );

  const peopleResults =
    query.length > 1
      ? friends.filter(
          (f) =>
            f.name
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            f.playTalkId
              .toLowerCase()
              .includes(query.toLowerCase())
        )
      : [];

  const videoResults =
    query.length > 1
      ? videos.filter(
          (v) =>
            v.title
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            v.channel
              .toLowerCase()
              .includes(query.toLowerCase())
        )
      : [];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back */}
        <Pressable
          onPress={goBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <BackIcon size={20} color="#9CA3AF" />
        </Pressable>

        {/* Search Input */}
        <View style={styles.searchBox}>
          <SearchIcon size={16} color="#6B7280" />

          <TextInput
            autoFocus
            value={query}
            onChangeText={setQuery}
            placeholder="Search people, videos…"
            placeholderTextColor="#6B7280"
            style={styles.searchInput}
            returnKeyType="search"
          />

          {query.length > 0 && (
            <Pressable
              onPress={() => setQuery("")}
              hitSlop={8}
            >
              <Text style={styles.clearText}>Clear</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* PlayTalk ID Banner */}
      {!query && (
        <View style={styles.bannerContainer}>
          <View style={styles.idBanner}>
            <View style={styles.bannerIcon}>
              <SearchIcon
                size={18}
                color="#E03131"
              />
            </View>

            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>
                Find by PlayTalk ID
              </Text>

              <Text style={styles.bannerSubtitle}>
                Search using format: PT-XXXX0000
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Tabs */}
      {query.length > 1 && (
        <View style={styles.tabs}>
          {(["people", "videos"] as Tab[]).map(
            (currentTab) => {
              const active = tab === currentTab;

              const count =
                currentTab === "people"
                  ? peopleResults.length
                  : videoResults.length;

              return (
                <Pressable
                  key={currentTab}
                  onPress={() => setTab(currentTab)}
                  style={[
                    styles.tab,
                    {
                      backgroundColor: active
                        ? "#E03131"
                        : "#1A1A1A",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color: active
                          ? "#FFFFFF"
                          : "#6B7280",
                      },
                    ]}
                  >
                    {currentTab === "people"
                      ? "People"
                      : "Videos"}{" "}
                    ({count})
                  </Text>
                </Pressable>
              );
            }
          )}
        </View>
      )}

      {/* Results */}
      <ScrollView
        style={styles.results}
        contentContainerStyle={styles.resultsContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* People Results */}
        {query.length > 1 && tab === "people" && (
          <View style={styles.resultsList}>
            {peopleResults.length === 0 ? (
              <View style={styles.emptyState}>
                <View style={styles.emptyIcon}>
                  <SearchIcon
                    size={20}
                    color="#4B5563"
                  />
                </View>

                <Text style={styles.emptyText}>
                  No people found for "{query}"
                </Text>

                <Text style={styles.emptySubtext}>
                  Try searching by PlayTalk ID
                </Text>
              </View>
            ) : (
              peopleResults.map((user) => {
                // Same as original web implementation
                const isFriend = true;
                const sent = sentRequests.includes(
                  user.id
                );

                return (
                  <View
                    key={user.id}
                    style={styles.personCard}
                  >
                    {/* Avatar */}
                    <Avatar
                      user={user}
                      size="md"
                      showStatus
                    />

                    {/* User Info */}
                    <View style={styles.personInfo}>
                      <Text style={styles.personName}>
                        {user.name}
                      </Text>

                      <Text style={styles.personId}>
                        {user.playTalkId}
                      </Text>
                    </View>

                    {/* Action */}
                    {isFriend ? (
                      <Pressable
                        onPress={() =>
                          navigate("private-chat", {
                            chatId: "c1",
                          })
                        }
                        style={({ pressed }) => [
                          styles.messageButton,
                          pressed && styles.pressed,
                        ]}
                      >
                        <Text style={styles.messageButtonText}>
                          Message
                        </Text>
                      </Pressable>
                    ) : sent ? (
                      <View style={styles.sentButton}>
                        <CheckIcon
                          size={12}
                          color="#9CA3AF"
                        />

                        <Text style={styles.sentText}>
                          Sent
                        </Text>
                      </View>
                    ) : (
                      <Pressable
                        onPress={() =>
                          setSentRequests((prev) => [
                            ...prev,
                            user.id,
                          ])
                        }
                        style={({ pressed }) => [
                          styles.addButton,
                          pressed && styles.pressed,
                        ]}
                      >
                        <PersonPlusIcon
                          size={16}
                          color="#FFFFFF"
                        />
                      </Pressable>
                    )}
                  </View>
                );
              })
            )}
          </View>
        )}

        {/* Video Results */}
        {query.length > 1 && tab === "videos" && (
          <View style={styles.resultsList}>
            {videoResults.length === 0 ? (
              <View style={styles.videoEmptyState}>
                <Text style={styles.emptyText}>
                  No videos found for "{query}"
                </Text>
              </View>
            ) : (
              videoResults.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  variant="row"
                  onClick={() =>
                    navigate("video-details", {
                      video,
                    })
                  }
                />
              ))
            )}
          </View>
        )}

        {/* Recent Searches */}
        {!query && (
          <View style={styles.recentSection}>
            <Text style={styles.recentHeading}>
              RECENT SEARCHES
            </Text>

            {[
              "PT-ALEX2941",
              "JavaScript tutorial",
              "Fireship",
            ].map((search) => (
              <Pressable
                key={search}
                onPress={() => setQuery(search)}
                style={({ pressed }) => [
                  styles.recentItem,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.recentIcon}>
                  <SearchIcon
                    size={13}
                    color="#6B7280"
                  />
                </View>

                <Text style={styles.recentText}>
                  {search}
                </Text>
              </Pressable>
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

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
  },

  searchBox: {
    flex: 1,
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    paddingVertical: 0,
  },

  clearText: {
    color: "#6B7280",
    fontSize: 11,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  // Banner
  bannerContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  idBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#1A0000",
    borderWidth: 1,
    borderColor: "rgba(224,49,49,0.2)",
  },

  bannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(224,49,49,0.12)",
  },

  bannerContent: {
    flex: 1,
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  bannerSubtitle: {
    color: "#6B7280",
    fontSize: 11,
    marginTop: 3,
  },

  // Tabs
  tabs: {
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  tabText: {
    fontSize: 11,
    fontWeight: "600",
  },

  // Results
  results: {
    flex: 1,
  },

  resultsContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  resultsList: {
    gap: 12,
  },

  // Person card
  personCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  personInfo: {
    flex: 1,
    minWidth: 0,
  },

  personName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  personId: {
    color: "#6B7280",
    fontSize: 11,
    marginTop: 3,
  },

  messageButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: "#E03131",
  },

  messageButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },

  sentButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  sentText: {
    color: "#9CA3AF",
    fontSize: 11,
  },

  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E03131",
  },

  // Empty
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    gap: 8,
  },

  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    marginBottom: 2,
  },

  emptyText: {
    color: "#6B7280",
    fontSize: 13,
    textAlign: "center",
  },

  emptySubtext: {
    color: "#4B5563",
    fontSize: 11,
    textAlign: "center",
  },

  videoEmptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },

  // Recent Searches
  recentSection: {
    gap: 2,
  },

  recentHeading: {
    color: "#4B5563",
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 8,
  },

  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },

  recentIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
  },

  recentText: {
    color: "#D1D5DB",
    fontSize: 13,
  },
});