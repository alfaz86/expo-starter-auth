import { Redirect, Slot, useSegments } from "expo-router";
import { useSelector } from "react-redux";

function RootNavigator() {
  const { token } = useSelector((state) => state.auth);
  const segments = useSegments();
  const inAuthGroup = segments[0] === "(auth)";

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