import React, {useEffect} from 'react';
import {ActivityIndicator, Keyboard, LogBox, Platform, StatusBar} from 'react-native';
import 'react-native-gesture-handler';

import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Host} from 'react-native-portalize';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {navigationRef} from './navigation/RootNavigation';
import MainStack from './navigation/stacks/MainStack';

import {linking, locale, toastConfig} from '@/config';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {persistor, settingsRedux, store} from '@/store';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {PortalProvider} from '@gorhom/portal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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
        <GestureHandlerRootView style={{flex: 1}}>
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
