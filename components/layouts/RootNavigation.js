import { Redirect, Slot, useSegments } from "expo-router";
import { Platform } from "react-native";
import { useSelector } from "react-redux";

function RootNavigator() {
  const { token } = useSelector((state) => state.auth);
  const segments = useSegments();
  const inAuthGroup = segments[0] === "(auth)";
  const isNotFound = segments[0] === "+not-found";

  // --- KHUSUS WEB: redirect root "/" ke login ---
  if (Platform.OS === "web" && window.location.pathname === "/") {
    return <Redirect href="/login" />;
  }

  // Jika halaman not-found
  if (isNotFound) {
    return <Slot />;
  }

  // Belum login, tapi bukan di (auth) → ke login
  if (!token && !inAuthGroup) {
    return <Redirect href="/login" />;
  }

  // Sudah login, tapi masih di (auth) → ke home
  if (token && inAuthGroup) {
    return <Redirect href="/home" />;
  }

  return <Slot />;
}

export default RootNavigator;