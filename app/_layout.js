import { Slot, Redirect, useSegments, usePathname } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "@/store/store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import Loading from "@/components/Loading";
import { useEffect, useState, useRef } from "react";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Text } from "@/components/ui/text";

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
    return (
      <GluestackUIProvider mode="light">
        <Slot />
      </GluestackUIProvider>
    );
  }

  // Belum login, tapi bukan di (auth) → ke login
  if (!token && !inAuthGroup) {
    return <Redirect href="/login" />;
  }

  // Sudah login, tapi masih di (auth) → ke home
  if (token && inAuthGroup) {
    return <Redirect href="/home" />;
  }

  return (
    <GluestackUIProvider mode="light">
      <Slot />
    </GluestackUIProvider>
  );
}

/**
 * WithRouteLoading - overlay approach
 */
function WithRouteLoading({ delayMs = 500 }) {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [busy, setBusy] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      setBusy(true);

      timerRef.current = setTimeout(() => {
        setBusy(false);
        timerRef.current = null;
      }, delayMs);

      prevPath.current = pathname;
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [pathname, delayMs]);

  return (
    <>
      <RootNavigator />
      {/* Gunakan ini untuk mengaktifkan loading overlay */}
      {/* {busy && (
        <View style={styles.overlay} pointerEvents="auto">
          <Loading />
        </View>
      )} */}
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <SafeAreaProvider>
          <MobileOnlyWrapper>
            <SafeAreaView
              style={{ flex: 1, backgroundColor: "#fff" }}
              edges={Platform.OS === "android" ? ["bottom"] : []}
            >
              <WithRouteLoading delayMs={500} />
            </SafeAreaView>
          </MobileOnlyWrapper>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

function MobileOnlyWrapper({ children }) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (Platform.OS !== "web") return; // hanya jalan di web

    function handleResize() {
      const { width } = Dimensions.get("window");
      setIsMobile(width <= 600);
    }

    handleResize(); // check saat mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (Platform.OS === "web" && !isMobile) {
    return (
      <View style={styles.overlay}>
        <Text style={styles.text}>
          Please use a mobile device or resize your window to portrait mode
        </Text>
      </View>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.95)",
    zIndex: 9999,
    elevation: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
  },
});
