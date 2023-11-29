import React, { useEffect } from 'react';
import { ActivityIndicator, Keyboard, LogBox, Platform, StatusBar } from 'react-native';
import 'react-native-gesture-handler';

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Host } from 'react-native-portalize';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { navigationRef } from './navigation/RootNavigation';
import MainStack from './navigation/stacks/MainStack';

import { AppLoader, Block, Text } from '@/components';
import { linking, locale, toastConfig } from '@/config';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { persistor, settingsRedux, store } from '@/store';
import firebase from '@react-native-firebase/app';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { AndroidStyle, Notification } from '@notifee/react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const MainContainer = () => {
  const dispatch = useAppDispatch();

  const language = useAppSelector(state => state.settings.language);
  const theme = useAppSelector(state => state.settings.theme);
  const user = useAppSelector(state => state.auth.user);
  // useEffect(() => {
  //   Keyboard.addListener('keyboardDidShow', () => dispatch(settingsRedux.changeBottomTabDisplay(false)));
  //   Keyboard.addListener('keyboardDidHide', () => dispatch(settingsRedux.changeBottomTabDisplay(true)));
  //   return () => {
  //     Keyboard.removeAllListeners('keyboardDidShow');
  //     Keyboard.removeAllListeners('keyboardDidHide');
  //   };
  // }, [dispatch]);

  useEffect(() => {
    locale(language);
  }, [language]);

  useEffect(() => {
    messaging()
      .getToken(firebase.app().options.messagingSenderId)
      .then(x => console.log(x))
      .catch(e => console.log(e));
  }, []);


  const requestUserPermission = async () => {

    await notifee.requestPermission();
    const granted = await messaging().requestPermission();
    if (granted) {
      console.log('User granted messaging permissions!');
    } else {
      console.log('User declined messaging permissions :(');
    }
  };
  useEffect(() => {
    requestUserPermission();
    firebase.messaging()
      .subscribeToTopic('active_members')
      .then(() => console.log('Subscribed to topic!'));
    firebase.messaging().setBackgroundMessageHandler(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
      },
    );

    firebase.messaging().onMessage(response => {
      showNotification(response.notification!, response.data);

    });
  }, []);

  const showNotification = async (
    notification: FirebaseMessagingTypes.Notification,
    data?: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    console.log('%cindex.tsx line:66 notification', 'color: #007acc;', notification);

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'tekmarmobile',
      name: 'Kingdom Sport Club',
    });
    let notificationDto: Notification = {
      id: notification.id ?? new Date().getTime().toString(),
      title: notification.title,
      body: notification.body,
    };
    if (Platform.OS === 'android') {
      if (data?.fcm_options?.image) {
        notificationDto.android = {
          ...notificationDto.android,
          imageUrl: data?.fcm_options?.image ?? null,
          style: AndroidStyle.BIGPICTURE,
        };
      }
    }
    notificationDto = {
      ...notificationDto,
      android: {
        ...notificationDto.android,
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    };

    if (Platform.OS === 'ios') {
      if (data?.fcm_options?.image) {
        notificationDto.ios = {
          attachments: [
            {
              url: data?.fcm_options?.image,
              id: 'big-picture',
              options: {
                fileName: 'big-picture.jpg',
                mimeType: 'image/jpg',
                bigPicture: true,
                contentUrl: data?.fcm_options?.image,
              },
            },
          ],
        };
      }
    }
    const notificationId = await notifee.displayNotification(notificationDto);
  };


  return (
    <Host>
      <NavigationContainer ref={navigationRef} linking={linking} theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar barStyle="light-content" />
        <MainStack />
      </NavigationContainer>
    </Host>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PortalProvider>
            <MainContainer />
        </PortalProvider>
          </GestureHandlerRootView>
      </PersistGate>
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;
