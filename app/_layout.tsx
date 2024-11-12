import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    MovistarRegular: require("../assets/fonts/Movistar-Regular.ttf"),
    PlayFairItalic: require("../assets/fonts/PlayFair-Display.Italic.ttf"),
    PlayFairBold: require("../assets/fonts/PlayFair-Display.Bold.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="todos" options={{ headerShown: false }} />
    </Stack>
  );
}
