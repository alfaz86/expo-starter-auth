import { usePathname } from "expo-router";
import { useEffect, useRef, useState } from "react";
import RootNavigator from "./RootNavigation";
import { overlay } from "@/theme/overlay";

function RouteWithLoadingLayout({ delayMs = 500 }) {
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
        <View style={overlay.content} pointerEvents="auto">
          <Loading />
        </View>
      )} */}
    </>
  );
}

export default RouteWithLoadingLayout;