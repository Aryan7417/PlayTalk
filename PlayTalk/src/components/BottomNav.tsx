import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import type { TabScreen } from "../types";

import {
  HomeIcon,
  HomeOutlineIcon,
  ChatIcon,
  ChatOutlineIcon,
  UsersIcon,
  ProfileIcon,
} from "./Icons";

import { chats, friendRequests } from "../data/mockData";

interface BottomNavProps {
  active: TabScreen;
  onNavigate: (tab: TabScreen) => void;
}

const totalUnread = chats.reduce(
  (total, chat) => total + chat.unreadCount,
  0
);

const pendingRequests = friendRequests.filter(
  (request) => request.direction === "incoming"
).length;

export default function BottomNav({
  active,
  onNavigate,
}: BottomNavProps) {
  const tabs: Array<{
    id: TabScreen;
    label: string;
    badge?: number;
  }> = [
    {
      id: "home",
      label: "Home",
    },
    {
      id: "chat-list",
      label: "Chat",
      badge: totalUnread,
    },
    {
      id: "friends",
      label: "Friends",
      badge: pendingRequests,
    },
    {
      id: "profile",
      label: "Profile",
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = active === tab.id;

        return (
          <Pressable
            key={tab.id}
            onPress={() => onNavigate(tab.id)}
            style={styles.tab}
          >
            <View style={styles.iconContainer}>
              <TabIcon
                id={tab.id}
                active={isActive}
              />

              {tab.badge && tab.badge > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {tab.badge > 99 ? "99+" : tab.badge}
                  </Text>
                </View>
              ) : null}
            </View>

            <Text
              style={[
                styles.label,
                isActive
                  ? styles.activeLabel
                  : styles.inactiveLabel,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function TabIcon({
  id,
  active,
}: {
  id: TabScreen;
  active: boolean;
}) {
  const color = active ? "#E03131" : "#4B5563";

  if (id === "home") {
    return active ? (
      <HomeIcon size={22} color={color} />
    ) : (
      <HomeOutlineIcon size={22} color={color} />
    );
  }

  if (id === "chat-list") {
    return active ? (
      <ChatIcon size={22} color={color} />
    ) : (
      <ChatOutlineIcon size={22} color={color} />
    );
  }

  if (id === "friends") {
    return <UsersIcon size={22} color={color} />;
  }

  return <ProfileIcon size={22} color={color} />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 4,

    backgroundColor: "#0D0D0D",
    borderTopWidth: 1,
    borderTopColor: "#1E1E1E",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },

  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  badge: {
    position: "absolute",
    top: -5,
    right: -8,

    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,

    borderRadius: 10,
    backgroundColor: "#E03131",

    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },

  label: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: "500",
  },

  activeLabel: {
    color: "#E03131",
  },

  inactiveLabel: {
    color: "#4B5563",
  },
});