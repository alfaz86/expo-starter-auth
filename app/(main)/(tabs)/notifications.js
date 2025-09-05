import React, { useEffect } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, markAsRead } from '@/store/notificationsSlice';
import {
  Alert,
  AlertText,
} from '@/components/ui/alert';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { useActiveTheme } from '@/hooks/useActiveTheme';
import { colors } from '@/theme/colors';
import { useSocket } from '@/hooks/useSocket';
import { clearNotifications } from "@/store/notificationsSlice";
import ModalClearAll from "@/components/tabs/ModalClearAll";
import { closeClearAllModal } from '@/store/modalSlice';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';

export default function NotificationsScreen() {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.list);
  const activeTheme = useActiveTheme();
  const themeColors = colors[activeTheme];
  const socket = useSocket();
  const { safePush } = useSafeNavigation();
  const isClearAllOpen = useSelector((state) => state.modal.isClearAllOpen);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('newNotification', (data) => {
      if (data.type === "global") {
        console.log("Global notif:", data);
      } else {
        console.log("Personal notif:", data);
      }
      dispatch(addNotification(data));
    });

    return () => {
      socket.off('connect');
      socket.off('newNotification');
    };
  }, [dispatch, socket]);

  const handleOpenDetail = (id) => {
    dispatch(markAsRead(id));
    safePush(`/notifications/${id}`);
  };

  if (notifications.length === 0) {
    return (
      <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No notifications</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <Alert style={{
            borderColor: themeColors.borderColor,
            borderWidth: 0.2,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            marginBottom: 5,
            borderRadius: 0,
            backgroundColor: themeColors.backgroundColor,
          }}>
            <Pressable
              onPress={() => handleOpenDetail(item.id)}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 8,
              }}
            >
              {/* Icon */}
              <Ionicons name="notifications" size={16} color={
                item.read ? themeColors.borderColor : '#0da6f2'
              } style={{ marginTop: 2 }} />

              {/* Title + Message */}
              <View style={{ flex: 1, flexDirection: 'column', gap: 4 }}>
                <AlertText className="font-bold text-typography-900">
                  {item.title}
                </AlertText>
                <AlertText className="font-semibold text-typography-500"
                  size="xs"
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {item.message}
                </AlertText>
              </View>

              {/* Waktu */}
              <AlertText className="font-semibold text-typography-500" size="xs" style={{ marginTop: 2, maxWidth: 80, textAlign: 'right' }}>
                {new Date(item.createdAt).toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </AlertText>
            </Pressable>
          </Alert>
        )}
      />

      <ModalClearAll
        isOpen={isClearAllOpen}
        onClose={() => dispatch(closeClearAllModal())}
        onConfirm={() => {
          dispatch(clearNotifications());
          dispatch(closeClearAllModal());
        }}
      />
    </View>
  );
}
