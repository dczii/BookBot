import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/navigation";
import { Colors, FontFamily, FontSize, Spacing, BorderRadius } from "../constants/theme";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { SegmentedControl } from "../components/SegmentedControl";
import { SocialButton } from "../components/SocialButton";

type AuthNav = NativeStackNavigationProp<RootStackParamList, "Auth">;
type AuthRoute = RouteProp<RootStackParamList, "Auth">;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthScreen() {
  const navigation = useNavigation<AuthNav>();
  const route = useRoute<AuthRoute>();

  const initialTab = route.params?.initialTab === "login" ? 0 : 1;
  const [activeTab, setActiveTab] = useState(initialTab);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Sign up state
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const isLogin = activeTab === 0;

  const loginEmailValid = useMemo(
    () => loginEmail.length > 0 && EMAIL_REGEX.test(loginEmail),
    [loginEmail]
  );
  const signUpEmailValid = useMemo(
    () => signUpEmail.length > 0 && EMAIL_REGEX.test(signUpEmail),
    [signUpEmail]
  );

  const handleSubmit = () => {
    // Stub — navigate to Home for now
    navigation.replace("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text style={styles.headline}>
            {isLogin ? "Welcome back" : "Create your account"}
          </Text>
          <Text style={styles.subtitle}>
            {isLogin
              ? "Your photobooks are waiting"
              : "Start creating beautiful photobooks"}
          </Text>

          {/* Segmented control */}
          <SegmentedControl
            tabs={["Log In", "Sign Up"]}
            activeIndex={activeTab}
            onChange={setActiveTab}
          />

          {/* Form */}
          <View style={styles.form}>
            {isLogin ? (
              <>
                <TextInput
                  label="Email address"
                  value={loginEmail}
                  onChangeText={setLoginEmail}
                  placeholder="maria@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  valid={loginEmailValid}
                />
                <TextInput
                  label="Password"
                  value={loginPassword}
                  onChangeText={setLoginPassword}
                  placeholder="••••••••"
                  secureTextEntry
                  rightLabel="Forgot?"
                  onRightLabelPress={() => {}}
                />
                <Button
                  title="Log In to SnapBook"
                  onPress={handleSubmit}
                  variant="primary"
                />
              </>
            ) : (
              <>
                <TextInput
                  label="Full name"
                  value={signUpName}
                  onChangeText={setSignUpName}
                  placeholder="Maria Santos"
                  autoCapitalize="words"
                />
                <TextInput
                  label="Email address"
                  value={signUpEmail}
                  onChangeText={setSignUpEmail}
                  placeholder="maria@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  valid={signUpEmailValid}
                />
                <TextInput
                  label="Password"
                  value={signUpPassword}
                  onChangeText={setSignUpPassword}
                  placeholder="••••••••"
                  secureTextEntry
                />
                <Button
                  title="Create Account"
                  onPress={handleSubmit}
                  variant="primary"
                />
              </>
            )}
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social auth */}
          <View style={styles.socialButtons}>
            <SocialButton provider="google" onPress={() => {}} />
            <SocialButton provider="facebook" onPress={() => {}} />
          </View>

          {/* Terms */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{" "}
            <Text style={styles.termsLink}>Terms</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.cream,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
  },
  headline: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.xl,
    color: Colors.light.espresso,
    textAlign: "center",
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: Colors.light.mocha,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  form: {
    marginTop: Spacing.lg,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.border,
  },
  dividerText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.light.mocha,
    marginHorizontal: Spacing.md,
  },
  socialButtons: {
    gap: Spacing.sm,
  },
  termsText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.light.mocha,
    textAlign: "center",
    marginTop: Spacing.lg,
    lineHeight: 18,
  },
  termsLink: {
    color: Colors.light.primary,
    textDecorationLine: "underline",
  },
});
