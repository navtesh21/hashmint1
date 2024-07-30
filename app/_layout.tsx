import { LoginContextProvider } from "@/contexts/login";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <LoginContextProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            statusBarColor: "white",
            statusBarStyle: "dark",
          }}
        />
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
            statusBarColor: "white",
            statusBarStyle: "dark",
          }}
        />
        <Stack.Screen
          name="Email"
          options={{
            headerShown: false,
            statusBarColor: "white",
            statusBarStyle: "dark",
          }}
        />
        <Stack.Screen
          name="Account"
          options={{
            headerShown: false,
            statusBarColor: "white",
            statusBarStyle: "dark",
          }}
        />
      </Stack>
    </LoginContextProvider>
  );
}
