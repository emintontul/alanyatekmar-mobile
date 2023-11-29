import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import {useSelector} from 'react-redux';

import {baseURL} from '@/api/config';
import {AppIcon, AppScreen, Block, Text} from '@/components';
import {RootState} from '@/store';
import {COLORS} from '@/theme';
import {ICONS} from '@/utils';

export const getAuthState = (state: RootState) => state.auth;
const HomePage = () => {
  const navigation = useNavigation();

  const navigationOptions = {
    headerTitle: () => (
      <Text sectionTitleDark bold>
        common.notifications
      </Text>
    ),

    headerTransparent: false,
    headerStyle: {
      backgroundColor: COLORS.white,
      shadowColor: 'transparent',
      elevation: 0,
    },
    animationEnabled: true,
  };
  const [notifications, setNotifications] = useState([]);
  const {token} = useSelector(getAuthState);
  useEffect(() => {
    axios
      .get(baseURL + '/strapi-plugin-fcm/fcm-notifications?populate=*', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Cache-Control': 'no-cache',
        },
      })
      .then(response => {
        setNotifications(response.data.data);
      });
  }, []);
  return (
    <>
      <AppScreen scroll safe navigationOptions={navigationOptions} barStyle={'dark-content'}>
        <>
          {
            // check if bluetooth printer is connected
          }
          <Block
            pressable
            mb-20
            px-20
            py-15
            style={{
              fontSize: 12,
              backgroundColor: COLORS.flueGrey,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: COLORS.lightGrey,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <AppIcon name={ICONS.Copy} size={18} color={COLORS.gray} />
            <Block ml-15>
              <Text bold style={{fontSize: 16}}>
                Yazıcı bağlı değil!
              </Text>
              <Block pressable onPress={() => navigation.navigate('CONNECT_PRINTER')}>
                <Text style={{color: COLORS.primary}}>Yazıcıya bağlan.</Text>
              </Block>
            </Block>
          </Block>
        </>
      </AppScreen>
    </>
  );
};

export default HomePage;
