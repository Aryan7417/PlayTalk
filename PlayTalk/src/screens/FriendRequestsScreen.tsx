import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import type { Screen } from "../types";

import {
  BackIcon,
  CheckIcon,
  XIcon,
} from "../components/Icons";

import {
  friendRequests as initialRequests,
} from "../data/mockData";

import Avatar from "../components/Avatar";

interface Props {
  goBack: () => void;
  navigate: (s: Screen, p?: any) => void;
}

export default function FriendRequestsScreen({
  goBack,
}: Props) {
  const [requests, setRequests] =
    useState(initialRequests);

  const accept = (id: string) => {
    setRequests((prev) =>
      prev.filter((r) => r.id !== id)
    );
  };

  const reject = (id: string) => {
    setRequests((prev) =>
      prev.filter((r) => r.id !== id)
    );
  };

  const incoming = requests.filter(
    (r) => r.direction === "incoming"
  );

  const outgoing = requests.filter(
    (r) => r.direction === "outgoing"
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

        <Text style={styles.headerTitle}>
          Friend Requests
        </Text>

      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ========================= */}
        {/* Incoming */}
        {/* ========================= */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Incoming ({incoming.length})
          </Text>

          {incoming.length === 0 ? (

            /* Empty Incoming */
            <View style={styles.emptyContainer}>

              <View style={styles.emptyIcon}>
                <CheckIcon
                  size={20}
                  color="#4B5563"
                />
              </View>

              <Text style={styles.emptyText}>
                No pending requests
              </Text>

            </View>

          ) : (

            <View style={styles.requestList}>

              {incoming.map((req) => (

                <View
                  key={req.id}
                  style={styles.requestCard}
                >

                  {/* Avatar */}
                  <Avatar
                    user={req.user}
                    size="md"
                    showStatus
                  />

                  {/* User Info */}
                  <View style={styles.userInfo}>

                    <Text
                      style={styles.userName}
                      numberOfLines={1}
                    >
                      {req.user.name}
                    </Text>

                    <Text
                      style={styles.playTalkId}
                      numberOfLines={1}
                    >
                      {req.user.playTalkId}
                    </Text>

                    <Text style={styles.sentAt}>
                      {req.sentAt}
                    </Text>

                  </View>

                  {/* Actions */}
                  <View style={styles.actions}>

                    {/* Reject */}
                    <Pressable
                      onPress={() =>
                        reject(req.id)
                      }
                      style={({ pressed }) => [
                        styles.rejectButton,
                        pressed && styles.pressed,
                      ]}
                    >
                      <XIcon
                        size={18}
                        color="#9CA3AF"
                      />
                    </Pressable>

                    {/* Accept */}
                    <Pressable
                      onPress={() =>
                        accept(req.id)
                      }
                      style={({ pressed }) => [
                        styles.acceptButton,
                        pressed && styles.pressed,
                      ]}
                    >
                      <CheckIcon
                        size={18}
                        color="#FFFFFF"
                      />
                    </Pressable>

                  </View>

                </View>

              ))}

            </View>
          )}

        </View>

        {/* ========================= */}
        {/* Outgoing */}
        {/* ========================= */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Sent ({outgoing.length})
          </Text>

          <View style={styles.requestList}>

            {outgoing.map((req) => (

              <View
                key={req.id}
                style={styles.requestCard}
              >

                {/* Avatar */}
                <Avatar
                  user={req.user}
                  size="md"
                />

                {/* User Info */}
                <View style={styles.userInfo}>

                  <Text
                    style={styles.userName}
                    numberOfLines={1}
                  >
                    {req.user.name}
                  </Text>

                  <Text
                    style={styles.playTalkId}
                    numberOfLines={1}
                  >
                    {req.user.playTalkId}
                  </Text>

                  <Text style={styles.sentAt}>
                    Sent {req.sentAt}
                  </Text>

                </View>

                {/* Cancel */}
                <Pressable
                  onPress={() =>
                    reject(req.id)
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

            ))}

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

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor:
      "rgba(255,255,255,0.06)",
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
    paddingTop: 16,
    paddingBottom: 24,
  },

  /* Sections */
  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },

  /* Requests */
  requestList: {
    gap: 12,
  },

  requestCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.06)",
    backgroundColor: "#141414",
  },

  /* User info */
  userInfo: {
    flex: 1,
    minWidth: 0,
  },

  userName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  playTalkId: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 2,
  },

  sentAt: {
    color: "#4B5563",
    fontSize: 10,
    marginTop: 2,
  },

  /* Incoming actions */
  actions: {
    flexDirection: "row",
    gap: 8,
  },

  rejectButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222222",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.10)",
  },

  acceptButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E03131",
  },

  /* Outgoing */
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.10)",
  },

  cancelText: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "600",
  },

  /* Empty */
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    gap: 8,
  },

  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor:
      "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    color: "#4B5563",
    fontSize: 14,
  },

  pressed: {
    opacity: 0.75,
  },
});