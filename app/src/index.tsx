import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  cancelAllScheduledNotificationsAsync,
  getAllScheduledNotificationsAsync,
  getExpoPushTokenAsync,
  scheduleNotificationAsync,
  setNotificationHandler,
} from 'expo-notifications';
import { askAsync, getAsync, NOTIFICATIONS } from 'expo-permissions';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Header from './Components/Header';
import colors from './Globals/colors';
import Main from './Pages/Main';

const Root: React.FC<{}> = () => {
  useEffect(() => {
    const registerNotif = async () => {
      const { status: existingStatus } = await getAsync(NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await askAsync(NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // console.log('[Notification Service]: Failed to get push token for push notification!');
      }

      const regs = await getAllScheduledNotificationsAsync();
      setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
      const token = await getExpoPushTokenAsync();
      const regNotifId = await AsyncStorage.getItem('regNotifId').then(
        res => res && JSON.parse(res),
      );

      if (regs.length > 1) {
        await cancelAllScheduledNotificationsAsync();
      }

      if (token) {
        if (!regs.find(el => el.identifier === regNotifId)) {
          const notifId = await scheduleNotificationAsync({
            content: {
              title: 'Pandemic',
              body: 'Bugünkü istatisliklere baktın mı?',
              sound: true,
            },
            trigger: {
              hour: 20,
              minute: 0,
              repeats: true,
            },
          });
          if (notifId) {
            await AsyncStorage.removeItem('regNotifId');
            await AsyncStorage.setItem('regNotifId', JSON.stringify(notifId));
          }
        }
      }
    };

    registerNotif();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}
    >
      <StatusBar animated barStyle="light-content" />
      <Header />
      <Main />
    </SafeAreaView>
  );
};

export default Root;
