import { Slot, Redirect, useSegments, usePathname } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "@store/store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import { Platform, View, StyleSheet } from "react-native";
import Loading from "@components/Loading";
import { useEffect, useState, useRef } from "react";

function RootNavigator() {
  const { token } = useSelector((state) => state.auth);
  const segments = useSegments();
  const inAuthGroup = segments[0] === "(auth)";
  const isNotFound = segments[0] === "+not-found";

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


/**
 * WithRouteLoading - overlay approach
 */
function WithRouteLoading({ delayMs = 500 }) {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [busy, setBusy] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // jalankan hanya ketika path berubah
    if (prevPath.current !== pathname) {
      // clear timer sebelumnya (safety)
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      // mulai busy
      setBusy(true);

      // hentikan busy setelah delayMs
      timerRef.current = setTimeout(() => {
        setBusy(false);
        timerRef.current = null;
      }, delayMs);

      prevPath.current = pathname;
    }
    // cleanup jika component unmount
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
      {/* gunakan ini untuk menampilkan loading overlay */}
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
          <SafeAreaView
            style={{ flex: 1, backgroundColor: "#fff" }}
            edges={Platform.OS === "android" ? ["bottom"] : []}
          >
            <WithRouteLoading delayMs={500} />
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
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
});
