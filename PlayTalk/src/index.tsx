import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";

import type { Screen, TabScreen, NavState } from "./types";

import BottomNav from "./components/BottomNav";
import SplashScreen from "./screens/SearchScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import AddContentScreen from "./screens/AddContentScreen";
import VideoDetailsScreen from "./screens/VideoDetailsScreen";
import PlaylistDetailsScreen from "./screens/PlaylistDetailsScreen";
import ChatListScreen from "./screens/ChatListScreen";
import PrivateChatScreen from "./screens/PrivateChatScreen";
import FriendsScreen from "./screens/FriendsScreen";
import FriendRequestsScreen from "./screens/FriendRequestsScreen";
import SearchScreen from "./screens/SearchScreen";
import DownloadsScreen from "./screens/DownloadsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";

const TAB_SCREENS: Screen[] = [
  "home",
  "chat-list",
  "friends",
  "profile",
];

export default function App() {
  const [history, setHistory] = useState<NavState[]>([
    { screen: "splash" },
  ]);

  const current = history[history.length - 1];

  const navigate = useCallback(
    (screen: Screen, params?: Record<string, any>) => {
      setHistory((prev) => {
        // Tab change → reset navigation stack
        if (TAB_SCREENS.includes(screen)) {
          return [{ screen }];
        }

        return [...prev, { screen, params }];
      });
    },
    []
  );

  const goBack = useCallback(() => {
    setHistory((prev) =>
      prev.length > 1 ? prev.slice(0, -1) : prev
    );
  }, []);

  const isTab = TAB_SCREENS.includes(current.screen);

  const activeTab = (
    isTab ? current.screen : "home"
  ) as TabScreen;

  const renderScreen = () => {
    switch (current.screen) {
      case "splash":
        return (
          <SplashScreen
            onDone={() => navigate("login")}
          />
        );

      case "login":
        return <LoginScreen navigate={navigate} />;

      case "signup":
        return (
          <SignupScreen
            navigate={navigate}
            goBack={goBack}
          />
        );

      case "home":
        return <HomeScreen navigate={navigate} />;

      case "add-content":
        return (
          <AddContentScreen
            navigate={navigate}
            goBack={goBack}
          />
        );

      case "video-details":
        return (
          <VideoDetailsScreen
            navigate={navigate}
            goBack={goBack}
            params={current.params}
          />
        );

      case "playlist-details":
        return (
          <PlaylistDetailsScreen
            navigate={navigate}
            goBack={goBack}
            params={current.params}
          />
        );

      case "chat-list":
        return <ChatListScreen navigate={navigate} />;

      case "private-chat":
        return (
          <PrivateChatScreen
            navigate={navigate}
            goBack={goBack}
            params={current.params}
          />
        );

      case "friends":
        return <FriendsScreen navigate={navigate} />;

      case "friend-requests":
        return (
          <FriendRequestsScreen
            navigate={navigate}
            goBack={goBack}
          />
        );

      case "search":
        return (
          <SearchScreen
            navigate={navigate}
            goBack={goBack}
          />
        );

      case "downloads":
        return (
          <DownloadsScreen
            navigate={navigate}
            goBack={goBack}
          />
        );

      case "profile":
        return <ProfileScreen navigate={navigate} />;

      case "settings":
        return (
          <SettingsScreen
            navigate={navigate}
            goBack={goBack}
          />
        );

      default:
        return <HomeScreen navigate={navigate} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        {renderScreen()}
      </View>

      {isTab && (
        <View>
          <BottomNav
            active={activeTab}
            onNavigate={navigate}
          />

          {/* iPhone home indicator */}
          <View style={styles.indicatorContainer}>
            <View style={styles.indicator} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },

  screen: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  indicatorContainer: {
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D0D0D",
  },

  indicator: {
    width: 96,
    height: 4,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
});