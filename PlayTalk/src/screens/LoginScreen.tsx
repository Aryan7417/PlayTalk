import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import type { Screen } from "../types";

interface Props {
  navigate: (s: Screen) => void;
}

export default function LoginScreen({ navigate }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* Header Graphic */}
        <View style={styles.hero}>

          {/* Glow */}
          <View style={styles.glow} />

          <View style={styles.logoContainer}>

            {/* Play Icon */}
            <View style={styles.logoIcon}>
              <View style={styles.playTriangle} />
            </View>

            {/* Logo */}
            <Text style={styles.logoText}>
              Play
              <Text style={styles.logoAccent}>
                Talk
              </Text>
            </Text>

          </View>

        </View>

        {/* Content */}
        <View style={styles.content}>

          <Text style={styles.heading}>
            Welcome back
          </Text>

          <Text style={styles.subtitle}>
            Sign in to continue watching & chatting
          </Text>

          {/* Form */}
          <View style={styles.form}>

            {/* Email */}
            <View style={styles.field}>

              <Text style={styles.label}>
                Email
              </Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#6B7280"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />

            </View>

            {/* Password */}
            <View style={styles.field}>

              <Text style={styles.label}>
                Password
              </Text>

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#6B7280"
                secureTextEntry
                autoCapitalize="none"
                style={styles.input}
              />

            </View>

          </View>

          {/* Forgot Password */}
          <Pressable
            style={({ pressed }) => [
              styles.forgotButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.forgotText}>
              Forgot password?
            </Text>
          </Pressable>

          {/* Sign In */}
          <Pressable
            onPress={() => navigate("home")}
            style={({ pressed }) => [
              styles.signInButton,
              pressed && styles.signInPressed,
            ]}
          >
            <Text style={styles.signInText}>
              Sign In
            </Text>
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerContainer}>

            <View style={styles.divider} />

            <Text style={styles.orText}>
              or
            </Text>

            <View style={styles.divider} />

          </View>

          {/* Signup */}
          <View style={styles.signupContainer}>

            <Text style={styles.signupText}>
              Don't have an account?{" "}
            </Text>

            <Pressable
              onPress={() => navigate("signup")}
              style={({ pressed }) => [
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.signupLink}>
                Sign Up
              </Text>
            </Pressable>

          </View>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },

  /* ========================= */
  /* Hero */
  /* ========================= */

  hero: {
    height: 176,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 32,
    backgroundColor: "#140000",
    position: "relative",
    overflow: "hidden",
  },

  glow: {
    position: "absolute",
    top: -40,
    left: "15%",
    right: "15%",
    height: 150,
    borderRadius: 100,
    backgroundColor: "rgba(224,49,49,0.12)",
  },

  logoContainer: {
    alignItems: "center",
    zIndex: 10,
  },

  logoIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#E03131",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#E03131",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },

  playTriangle: {
    width: 0,
    height: 0,
    borderTopWidth: 9,
    borderBottomWidth: 9,
    borderLeftWidth: 14,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#FFFFFF",
    marginLeft: 2,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },

  logoAccent: {
    color: "#E03131",
  },

  /* ========================= */
  /* Content */
  /* ========================= */

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },

  subtitle: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 32,
  },

  /* ========================= */
  /* Form */
  /* ========================= */

  form: {
    gap: 12,
    marginBottom: 8,
  },

  field: {
    width: "100%",
  },

  label: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 6,
  },

  input: {
    width: "100%",
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "#1A1A1A",
    color: "#FFFFFF",
    fontSize: 14,
  },

  /* ========================= */
  /* Forgot Password */
  /* ========================= */

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: 8,
    marginBottom: 32,
  },

  forgotText: {
    color: "#E03131",
    fontSize: 12,
    fontWeight: "500",
  },

  /* ========================= */
  /* Sign In */
  /* ========================= */

  signInButton: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E03131",
    shadowColor: "#E03131",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },

  signInPressed: {
    opacity: 0.85,
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  signInText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  /* ========================= */
  /* Divider */
  /* ========================= */

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 24,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  orText: {
    color: "#4B5563",
    fontSize: 12,
  },

  /* ========================= */
  /* Signup */
  /* ========================= */

  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  signupText: {
    color: "#6B7280",
    fontSize: 14,
  },

  signupLink: {
    color: "#E03131",
    fontSize: 14,
    fontWeight: "600",
  },

  pressed: {
    opacity: 0.7,
  },
});