import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import type { Screen } from "../types";
import { BackIcon } from "../components/Icons";

interface Props {
  navigate: (s: Screen) => void;
  goBack: () => void;
}

export default function SignupScreen({
  navigate,
  goBack,
}: Props) {
  const [step, setStep] = useState<"form" | "id">("form");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const generatedId =
    "PT-" +
    name
      .substring(0, 4)
      .toUpperCase()
      .replace(/\s/g, "X") +
    "8847";

  const canCreate =
    name.trim() &&
    email.trim() &&
    password.trim();

  // --------------------------------
  // Account Created / ID Screen
  // --------------------------------

  if (step === "id") {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          {/* Success Icon */}
          <View style={styles.successIcon}>
            <Text style={styles.emoji}>🎉</Text>
          </View>

          <Text style={styles.successTitle}>
            Account Created!
          </Text>

          <Text style={styles.successDescription}>
            Your unique PlayTalk ID has been assigned.
            Share it with friends so they can find you.
          </Text>

          {/* PlayTalk ID Card */}
          <Pressable
            onPress={() => {}}
            style={styles.idCard}
          >
            <Text style={styles.idLabel}>
              YOUR PLAYTALK ID
            </Text>

            <Text style={styles.generatedId}>
              {generatedId}
            </Text>

            <Text style={styles.copyHint}>
              Tap to copy
            </Text>
          </Pressable>

          {/* Get Started */}
          <Pressable
            onPress={() => navigate("home")}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              Get Started
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // --------------------------------
  // Signup Form
  // --------------------------------

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
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formScroll}
      >
        {/* Back */}
        <View style={styles.backContainer}>
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
        </View>

        <View style={styles.formContainer}>
          {/* Heading */}
          <Text style={styles.heading}>
            Create account
          </Text>

          <Text style={styles.subtitle}>
            Join PlayTalk and start sharing videos
          </Text>

          {/* Fields */}
          <View style={styles.fieldsContainer}>
            {/* Name */}
            <InputField
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="Alex Carter"
              autoCapitalize="words"
            />

            {/* Email */}
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* Password */}
            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="8+ characters"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Terms */}
          <Text style={styles.terms}>
            By signing up you agree to our{" "}
            <Text style={styles.termsHighlight}>
              Terms of Service
            </Text>{" "}
            &{" "}
            <Text style={styles.termsHighlight}>
              Privacy Policy
            </Text>
          </Text>

          {/* Create Account */}
          <Pressable
            disabled={!canCreate}
            onPress={() => {
              if (canCreate) {
                setStep("id");
              }
            }}
            style={({ pressed }) => [
              styles.primaryButton,
              {
                opacity: canCreate ? 1 : 0.5,
              },
              pressed && canCreate && styles.pressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              Create Account
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// --------------------------------
// Input Field
// --------------------------------

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  autoCapitalize?: any;
  autoCorrect?: boolean;
}

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoCorrect = true,
}: InputFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        style={styles.input}
      />
    </View>
  );
}

// --------------------------------
// Styles
// --------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  // Success screen
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(224,49,49,0.15)",
    marginBottom: 24,
  },

  emoji: {
    fontSize: 30,
  },

  successTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },

  successDescription: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 32,
  },

  idCard: {
    width: "100%",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "rgba(224,49,49,0.25)",
    marginBottom: 32,
  },

  idLabel: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  generatedId: {
    color: "#E03131",
    fontSize: 24,
    fontWeight: "800",
  },

  copyHint: {
    color: "#4B5563",
    fontSize: 11,
    marginTop: 8,
  },

  // Form
  formScroll: {
    flexGrow: 1,
    paddingBottom: 32,
  },

  backContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
  },

  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },

  subtitle: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 32,
  },

  fieldsContainer: {
    gap: 12,
    marginBottom: 24,
  },

  field: {
    width: "100%",
  },

  fieldLabel: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 6,
  },

  input: {
    width: "100%",
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    color: "#FFFFFF",
    fontSize: 13,
  },

  // Terms
  terms: {
    color: "#4B5563",
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    marginBottom: 16,
  },

  termsHighlight: {
    color: "#9CA3AF",
  },

  // Button
  primaryButton: {
    width: "100%",
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#E03131",
    shadowColor: "#E03131",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});