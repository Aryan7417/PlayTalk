import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { User } from "../types";

interface AvatarProps {
  user: User;
  size?: "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
}

const sizes = {
  sm: {
    size: 32,
    fontSize: 12,
    dot: 10,
  },
  md: {
    size: 40,
    fontSize: 14,
    dot: 12,
  },
  lg: {
    size: 56,
    fontSize: 16,
    dot: 14,
  },
  xl: {
    size: 80,
    fontSize: 20,
    dot: 16,
  },
};

export default function Avatar({
  user,
  size = "md",
  showStatus = false,
}: AvatarProps) {
  const s = sizes[size];

  return (
    <View
      style={[
        styles.avatar,
        {
          width: s.size,
          height: s.size,
          borderRadius: s.size / 2,

          // Same visual idea as:
          // user.avatarColor + "30"
          backgroundColor: `${user.avatarColor}30`,

          borderColor: `${user.avatarColor}40`,
        },
      ]}
    >
      <Text
        style={[
          styles.initials,
          {
            fontSize: s.fontSize,
            color: user.avatarColor,
          },
        ]}
      >
        {user.initials}
      </Text>

      {showStatus && (
        <View
          style={[
            styles.status,
            {
              width: s.dot,
              height: s.dot,
              borderRadius: s.dot / 2,
              backgroundColor: user.online
                ? "#22C55E"
                : "#4B5563",
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    position: "relative",
  },

  initials: {
    fontWeight: "700",
  },

  status: {
    position: "absolute",
    right: -1,
    bottom: -1,

    borderWidth: 2,
    borderColor: "#0A0A0A",
  },
});