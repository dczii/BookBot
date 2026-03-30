export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: { initialTab?: "login" | "signup" };
  Home: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
