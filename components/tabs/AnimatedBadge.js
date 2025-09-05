import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { Text } from "@/components/ui/text";

function AnimatedBadge({ count }) {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (count > 0) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scale, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [count]);

  if (count === 0) return null;

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        position: "absolute",
        right: -6,
        top: -3,
        backgroundColor: "#0da6f2",
        borderRadius: 8,
        minWidth: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
      }}
    >
      <Text style={{ color: "white", fontSize: 10, lineHeight: 12 }}>
        {count}
      </Text>
    </Animated.View>
  );
}

export default AnimatedBadge;