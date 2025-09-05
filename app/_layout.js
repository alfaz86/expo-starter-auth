import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "@/components/Loading";

import "@/global.css";
import GlueStackUILayout from "@/components/layouts/GlueStackUILayout";

/**
 * RootLayout ini membungkus seluruh aplikasi dengan:
 * - Provider Redux
 * --- PersistGate
 * ---- SafeAreaProvider
 * ----- GlueStackUIProvider (untuk theming dan UI Gluestack)
 * ------ MobileOnlyWrapper (untuk menampilkan pesan jika diakses dari web)
 * ------- BaseLayout (mengatur SafeAreaView dan route handling)
 * -------- RouteWithLoadingLayout (menangani loading state saat navigasi)
 * --------- RootNavigator (mengatur navigasi aplikasi)
 */
export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <SafeAreaProvider>
          <GlueStackUILayout />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
