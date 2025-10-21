import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  // Globalny layout — StatusBar i Stack routera (bez headera)
  return (
    <>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}