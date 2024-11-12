import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ImageBackground } from "react-native";

SplashScreen.preventAutoHideAsync();
export default function TodoLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTitle: "Ayaoba's Todo List",
        headerBackTitleVisible: false,
        headerBackTitle: "",
        headerStyle: {
          backgroundColor: "#E4E0E1",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="todos/create-todo" options={{ headerShown: false }} />
      <Stack.Screen
        name="todos/completed-todos"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
