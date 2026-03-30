import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";
import { Colors, FontFamily, FontSize, Spacing, BorderRadius } from "../constants/theme";
import { STORAGE_KEYS } from "../constants/storage";
import { Button } from "../components/Button";
import { PageIndicator } from "../components/PageIndicator";

type OnboardingNav = NativeStackNavigationProp<RootStackParamList, "Onboarding">;

const PAGES = [
  {
    badge: "Step 1 of 3",
    headline: "Hold your memories\nin your hands",
    body: "Transform your phone photos into a beautifully printed photobook you'll treasure forever.",
    illustration: "📖",
  },
  {
    badge: "Step 2 of 3",
    headline: "Design it\nyour way",
    body: "Choose layouts, add captions, pick covers. Make it uniquely yours in minutes.",
    illustration: "🎨",
  },
  {
    badge: "Step 3 of 3",
    headline: "Get it printed\n& delivered",
    body: "We print and deliver right to your doorstep. GCash, COD, or card — you choose.",
    illustration: "📦",
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<OnboardingNav>();
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const completeOnboarding = async (tab: "login" | "signup") => {
    await AsyncStorage.setItem(STORAGE_KEYS.HAS_ONBOARDED, "true");
    navigation.replace("Auth", { initialTab: tab });
  };

  const handleContinue = () => {
    if (currentPage < PAGES.length - 1) {
      pagerRef.current?.setPage(currentPage + 1);
    } else {
      completeOnboarding("signup");
    }
  };

  const handleSkip = () => {
    completeOnboarding("signup");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip button */}
      <View style={styles.header}>
        <View />
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Pager */}
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {PAGES.map((page, index) => (
          <View key={index} style={styles.page}>
            {/* Illustration area */}
            <View style={styles.illustrationContainer}>
              <View style={styles.illustrationBox}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{page.badge}</Text>
                </View>
                <Text style={styles.illustrationIcon}>{page.illustration}</Text>
              </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.headline}>{page.headline}</Text>
              <Text style={styles.body}>{page.body}</Text>
            </View>
          </View>
        ))}
      </PagerView>

      {/* Footer */}
      <View style={styles.footer}>
        <PageIndicator total={PAGES.length} current={currentPage} />

        <Button
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          style={{ marginTop: Spacing.lg }}
        />

        <TouchableOpacity
          onPress={() => completeOnboarding("login")}
          style={styles.loginLink}
        >
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={styles.loginTextBold}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.cream,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  skipText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    color: Colors.light.primary,
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Spacing.md,
  },
  illustrationBox: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: Colors.light.latte,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  badgeText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: Colors.light.white,
  },
  illustrationIcon: {
    fontSize: 64,
  },
  content: {
    paddingTop: Spacing.lg,
  },
  headline: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.xl,
    color: Colors.light.espresso,
    textAlign: "center",
    lineHeight: 32,
  },
  body: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: Colors.light.mocha,
    textAlign: "center",
    marginTop: Spacing.sm,
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  loginLink: {
    alignItems: "center",
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  loginText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.light.mocha,
  },
  loginTextBold: {
    fontFamily: FontFamily.bodySemiBold,
    color: Colors.light.primary,
    textDecorationLine: "underline",
  },
});
