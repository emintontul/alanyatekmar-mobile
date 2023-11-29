import { AppScreen, Block, Text } from '@/components';
import { COLORS } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseURL } from '@/api/config';
import moment from 'moment';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const getAuthState = (state: RootState) => state.auth;
const NotificationList = () => {
  const navigation = useNavigation();

  const navigationOptions = {
    headerTitle: () => <Text sectionTitleDark bold>common.notifications</Text>,

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
    axios.get( baseURL + '/strapi-plugin-fcm/fcm-notifications?populate=*', {
      headers: {
        "Authorization": "Bearer " + token,
        "Cache-Control": "no-cache",
      }
    }).then(response => {
      setNotifications(response.data.data);
    });
  }, []);
  return (
    <>
      <AppScreen scroll safe navigationOptions={navigationOptions} barStyle={"dark-content"}>

        <>
          {
            notifications?.map((notification, index) => (

              <Block pressable mb-20 style={{ fontSize: 12, backgroundColor: COLORS.flueGrey, borderRadius: 6, borderWidth: 1, borderColor: COLORS.lightGrey}}>
                <Block px-20 py-20 flex={1}>
                <Text bold style={{ fontSize: 16 }}>
                    {notification.title}
                  </Text>
                  {notification.body && <Text mt-5 style={{ fontSize: 14 }}>
                    {notification.body}
                  </Text>}
                  <Text mt-10 style={{ fontSize: 12, color: COLORS.lightGray}}>
                    {moment(notification.createdAt).format("LL")}
                  </Text>
                </Block>
              </Block>
               ))}
        </>

      </AppScreen>
    </>
  );
};

export default NotificationList;
