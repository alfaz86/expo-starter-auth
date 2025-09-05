import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useActiveTheme } from '@/hooks/useActiveTheme';
import { styles } from '@/theme/global';
import { colors } from '@/theme/colors';
import { Heading } from '@/components/ui/heading';

export default function NotificationDetail() {
  const { id } = useLocalSearchParams();
  const activeTheme = useActiveTheme();
  const notification = useSelector((state) =>
    state.notifications.list.find((n) => n.id.toString() === id)
  );

  if (!notification) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Notification not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.card, colors[activeTheme]]}>
        <Heading>{notification.title}</Heading>
        <Text>{notification.message}</Text>
        <Text className="text-xs text-typography-500" style={{ marginTop: 10 }}>
          {new Date(notification.createdAt).toLocaleString("id-ID")}
        </Text>
      </View>
    </View>
  );
}
