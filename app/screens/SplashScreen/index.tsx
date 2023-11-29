import React, {memo, useEffect} from 'react';
import {Button, Linking} from 'react-native';

import {utils} from '@react-native-firebase/app';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

import {images, KingdomLogo} from '@/assets';
import {AppButton, AppImage, AppImageBackground, Block, Text} from '@/components';
import {useAppSelector} from '@/hooks';
import {MainStackNavigationPropsType} from '@/navigation/stacks/MainStack/types';

const SplashScreen = () => {
  const navigation = useNavigation<MainStackNavigationPropsType>();
  const {token, user} = useAppSelector(state => state.auth);

  const linking = {
    prefixes: ['kingdomsc://', 'https://kingdomsportclub.com'],

    // Custom function to get the URL which was used to open the app
    async getInitialURL() {
      // First, you would need to get the initial URL from your third-party integration
      // The exact usage depend on the third-party SDK you use
      // For example, to get the initial URL for Firebase Dynamic Links:
      const {isAvailable} = utils().playServicesAvailability;

      // As a fallback, you may want to do the default deep link handling
      const url = await Linking.getInitialURL();

      return url;
    },

    // Custom function to subscribe to incoming links
    subscribe(listener) {
      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', ({url}) => {
        listener(url);
      });

      return () => {
        // Clean up the event listeners
        linkingSubscription.remove();
      };
    },

    config: {
      // Deep link configuration
    },
  };
  useEffect(() => {
    linking.subscribe(url => {
      if (url) {
        const code = url.split('?code=')[1];
        if (code) {
          navigation.navigate('AUTH_ROOT', {
            screen: 'RESET_PASSWORD',
            params: {
              code,
            },
          });
        }
      }
    });
  }, []);
  useEffect(() => {
    if (token) {
      user?.role?.type === 'admin' ? navigation.replace('ADMIN_TABS_ROOT') : navigation.replace('MAIN_TABS_ROOT');
    }
  }, [navigation, token]);

  const login = () => {
    if (token) {
      user?.role?.type === 'admin' ? navigation.replace('ADMIN_TABS_ROOT') : navigation.replace('MAIN_TABS_ROOT');
    } else {
      navigation.navigate('AUTH_ROOT', {
        screen: 'LoginScreen',
      });
    }
  };
  // const register = () => {
  //   token ? navigation.replace('MAIN_TABS_ROOT') : navigation.navigate('AUTH_ROOT', {
  //     screen: 'RegisterScreen'
  //   });
  // }
  return (
    <AppImageBackground source={images.background}>
      <SafeAreaView height={'100%'}>
        <Block flex center style={{paddingTop: 100, height: '100%'}}>
          <AppImage url={KingdomLogo.dark} width={200} height={53} />
          <Text mt-40 style={{color: '#000', fontWeight: '400', fontSize: 20}}>
            common.welcome
          </Text>
        </Block>

        <Block flex center middle style={{width: '100%'}} absolute bottom={20} pb-30>
          <Block style={{width: '90%', borderRadius: 10}} middle center>
            <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} style={{width: '100%', borderRadius: 10}}>
              <AppButton h-50 onPress={login} mt-0 type={'transparent'} title={'auth.login'} />
            </LinearGradient>
          </Block>
        </Block>
        {/* <Block flex center middle style={{ width: "100%" }} absolute bottom={50}>
          <Block mt-20 pressable onPress={login}>
            <Text color="#000" style={{ color: "#000", fontWeight: "600", fontSize: 15 }}>
              Giriş Yap
            </Text>
          </Block>
        </Block> */}
      </SafeAreaView>
    </AppImageBackground>
  );
};

export default memo(SplashScreen);
