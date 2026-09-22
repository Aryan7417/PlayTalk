import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";

import type { Screen } from "../types";

import { BackIcon } from "../components/Icons";
import { currentUser } from "../data/mockData";
import Avatar from "../components/Avatar";

interface Props {
  navigate: (s: Screen) => void;
  goBack: () => void;
}

const me = {
  ...currentUser,
  name: "Alex Rivera",
  initials: "AR",
};

export default function SettingsScreen({
  navigate,
  goBack,
}: Props) {
  const [notifs, setNotifs] = useState({
    messages: true,
    requests: true,
    reminders: false,
  });

  const [privacy, setPrivacy] = useState({
    showOnline: true,
    readReceipts: true,
  });

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
          Settings
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile */}
        <View style={styles.profileCard}>
          <Avatar user={me} size="lg" />

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {me.name}
            </Text>

            <Text style={styles.playTalkId}>
              {currentUser.playTalkId}
            </Text>
          </View>

          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              styles.editButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.editText}>
              Edit
            </Text>
          </Pressable>
        </View>

        {/* Account */}
        <SettingSection title="Account">
          <SettingRow
            label="Email"
            value="alex@example.com"
          />

          <SettingRow
            label="Phone"
            value="Not set"
          />

          <SettingRow
            label="Change Password"
            value="••••••••"
          />
        </SettingSection>

        {/* Notifications */}
        <SettingSection title="Notifications">
          <ToggleRow
            label="Messages"
            sublabel="New chat messages"
            on={notifs.messages}
            onChange={() =>
              setNotifs((n) => ({
                ...n,
                messages: !n.messages,
              }))
            }
          />

          <ToggleRow
            label="Friend requests"
            sublabel="Incoming requests"
            on={notifs.requests}
            onChange={() =>
              setNotifs((n) => ({
                ...n,
                requests: !n.requests,
              }))
            }
          />

          <ToggleRow
            label="Watch reminders"
            sublabel="Resume watching"
            on={notifs.reminders}
            onChange={() =>
              setNotifs((n) => ({
                ...n,
                reminders: !n.reminders,
              }))
            }
          />
        </SettingSection>

        {/* Privacy */}
        <SettingSection title="Privacy">
          <ToggleRow
            label="Show online status"
            sublabel="Friends can see when you're active"
            on={privacy.showOnline}
            onChange={() =>
              setPrivacy((p) => ({
                ...p,
                showOnline: !p.showOnline,
              }))
            }
          />

          <ToggleRow
            label="Read receipts"
            sublabel="Show when you've read messages"
            on={privacy.readReceipts}
            onChange={() =>
              setPrivacy((p) => ({
                ...p,
                readReceipts: !p.readReceipts,
              }))
            }
          />
        </SettingSection>

        {/* Storage */}
        <SettingSection title="Storage & Downloads">
          <SettingRow
            label="Offline videos"
            value="624 MB"
          />

          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              styles.clearCacheRow,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.clearCacheText}>
              Clear offline cache
            </Text>
          </Pressable>
        </SettingSection>

        {/* Danger Zone */}
        <View style={styles.dangerZone}>
          <Pressable
            onPress={() => navigate("login")}
            style={({ pressed }) => [
              styles.signOutButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.signOutText}>
              Sign Out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

/* -------------------------------- */
/* Setting Section                  */
/* -------------------------------- */

function SettingSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      {children}
    </View>
  );
}

/* -------------------------------- */
/* Setting Row                      */
/* -------------------------------- */

function SettingRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>
        {label}
      </Text>

      <Text style={styles.settingValue}>
        {value}
      </Text>
    </View>
  );
}

/* -------------------------------- */
/* Toggle Row                       */
/* -------------------------------- */

function ToggleRow({
  label,
  sublabel,
  on,
  onChange,
}: {
  label: string;
  sublabel: string;
  on: boolean;
  onChange: () => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleInfo}>
        <Text style={styles.toggleLabel}>
          {label}
        </Text>

        <Text style={styles.toggleSubLabel}>
          {sublabel}
        </Text>
      </View>

      <Pressable
        onPress={onChange}
        style={[
          styles.toggle,
          {
            backgroundColor: on
              ? "#E03131"
              : "#2A2A2A",
          },
        ]}
      >
        <View
          style={[
            styles.toggleCircle,
            {
              left: on ? 21 : 3,
            },
          ]}
        />
      </Pressable>
    </View>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 20,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  // Profile
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  profileInfo: {
    flex: 1,
  },

  profileName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  playTalkId: {
    color: "#E03131",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 3,
  },

  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  editText: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "600",
  },

  // Sections
  section: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  sectionTitle: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    textTransform: "uppercase",
  },

  // Setting Row
  settingRow: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },

  settingLabel: {
    color: "#FFFFFF",
    fontSize: 13,
  },

  settingValue: {
    color: "#6B7280",
    fontSize: 13,
  },

  // Toggle
  toggleRow: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },

  toggleInfo: {
    flex: 1,
    paddingRight: 16,
  },

  toggleLabel: {
    color: "#FFFFFF",
    fontSize: 13,
  },

  toggleSubLabel: {
    color: "#4B5563",
    fontSize: 10,
    marginTop: 3,
  },

  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    position: "relative",
  },

  toggleCircle: {
    position: "absolute",
    top: 3,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
  },

  // Storage
  clearCacheRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },

  clearCacheText: {
    color: "#E03131",
    fontSize: 13,
    fontWeight: "600",
  },

  // Sign out
  dangerZone: {
    paddingTop: 4,
  },

  signOutButton: {
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#1A0000",
    borderWidth: 1,
    borderColor: "rgba(224,49,49,0.3)",
  },

  signOutText: {
    color: "#E03131",
    fontSize: 13,
    fontWeight: "600",
  },
});