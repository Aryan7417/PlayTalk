import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

interface Props {
    onDone: () => void;
}

export default function SplashScreen({
    onDone,
}: Props) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDone();
        }, 2400);

        return () => clearTimeout(timer);
    }, [onDone]);

    return (
        <View style={styles.container}>

            {/* Ambient Glow */}
            <View style={styles.glowContainer}>
                <View style={styles.glow} />
            </View>

            {/* Logo */}
            <View style={styles.logoSection}>

                <View style={styles.logoWrapper}>

                    {/* Main Logo */}
                    <View style={styles.logoBox}>

                        {/* Play Triangle */}
                        <View style={styles.playTriangle} />

                    </View>

                    {/* Outer Ring */}
                    <View style={styles.outerRing} />

                </View>

                {/* App Name */}
                <View style={styles.titleContainer}>

                    <Text style={styles.title}>
                        Play
                        <Text style={styles.titleAccent}>
                            Talk
                        </Text>
                    </Text>

                    <Text style={styles.tagline}>
                        Watch · Share · Talk
                    </Text>

                </View>

            </View>

            {/* Bottom Loading */}
            <View style={styles.bottomContainer}>

                <View style={styles.dotsContainer}>

                    <View
                        style={[
                            styles.dot,
                            styles.activeDot,
                        ]}
                    />

                    <View style={styles.dot} />

                    <View style={styles.dot} />

                </View>

                <Text style={styles.loadingText}>
                    Loading…
                </Text>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A0A0A",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },

    /* ========================= */
    /* Ambient Glow */
    /* ========================= */

    glowContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    },

    glow: {
        width: 256,
        height: 256,
        borderRadius: 128,
        backgroundColor: "rgba(224,49,49,0.10)",
    },

    /* ========================= */
    /* Logo */
    /* ========================= */

    logoSection: {
        alignItems: "center",
        gap: 20,
        zIndex: 10,
    },

    logoWrapper: {
        width: 96,
        height: 96,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    logoBox: {
        width: 96,
        height: 96,
        borderRadius: 24,
        backgroundColor: "#E03131",
        alignItems: "center",
        justifyContent: "center",

        shadowColor: "#E03131",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 12,
    },

    playTriangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 22,
        borderTopWidth: 14,
        borderBottomWidth: 14,
        borderLeftColor: "#FFFFFF",
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
        marginLeft: 4,
    },

    outerRing: {
        position: "absolute",
        top: -4,
        left: -4,
        right: -4,
        bottom: -4,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: "rgba(224,49,49,0.20)",
    },

    /* ========================= */
    /* Title */
    /* ========================= */

    titleContainer: {
        alignItems: "center",
    },

    title: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "800",
        letterSpacing: -0.5,
    },

    titleAccent: {
        color: "#E03131",
    },

    tagline: {
        color: "#6B7280",
        fontSize: 11,
        letterSpacing: 3,
        textTransform: "uppercase",
        marginTop: 4,
    },

    /* ========================= */
    /* Bottom */
    /* ========================= */

    bottomContainer: {
        position: "absolute",
        bottom: 48,
        alignItems: "center",
        gap: 12,
    },

    dotsContainer: {
        flexDirection: "row",
        gap: 6,
    },

    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#E03131",
        opacity: 0.3,
    },

    activeDot: {
        opacity: 1,
    },

    loadingText: {
        color: "#4B5563",
        fontSize: 10,
        letterSpacing: 1.2,
        textTransform: "uppercase",
    },
});