import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {t} from 'i18next';
import {Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

import AdminNotificationForm from './useForm';

import {baseURL} from '@/api/config';
import {AppButton, AppIcon, AppInput, AppScreen, Block, FloatingButton, Swipeable, Text} from '@/components';
import FloatingActionButton from '@/components/Common/FloatingActionButton';
import {useAppDispatch} from '@/hooks';
import {MainStackNavigationPropsType} from '@/navigation/stacks/MainStack/types';
import {authRedux, RootState} from '@/store';
import {COLORS} from '@/theme';
import {ICONS} from '@/utils';

export const getAuthState = (state: RootState) => state.auth;
const AdminNotification = props => {
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
      borderBottomWidth: 1,
      borderBottomColor: COLORS.flueGrey,
      elevation: 0,
    },
    animationEnabled: true,
  };
  const {form} = AdminNotificationForm();

  const [loading, setLoading] = useState(false);

  const {token} = useSelector(getAuthState);
  const onSubmit = async () => {
    setLoading(true);
    const data = form.getValues();
    const model = {
      data: {
        title: data.Title,
        body: data.Body,
        image: '',
        payload: '',
        targetType: 'topics',
        // "targetType": "tokens",
        target: 'active_members',
        //or multiple topics "target": "client_android,client_ios",
        //or "target": "eyJhbGciOiJFUzI1...",
        //publishedAt: null //<<- uncomment this if you want to just add an entry as a draft to 'FCM Notification' collection without publishing and sending FCM.
      },
    };
    axios({
      url: `${baseURL}/strapi-plugin-fcm/fcm-notifications/send`,
      data: JSON.stringify(model),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setLoading(false);
        console.log('%cindex.tsx line:68 response', 'color: #007acc;', response);
      })
      .catch(error => {
        console.log('%cindex.tsx line:68 error', 'color: #007acc;', error);
        setLoading(false);
      });
  };

  return (
    <>
      <AppScreen safe bg-white barStyle={'dark-content'} navigationOptions={navigationOptions}>
        <Text style={{borderWidth: 1, borderColor: COLORS.lightGrey, borderRadius: 10}} p-20>
          Bu kısımdan yalnızca tüm kullanıcılara bildirim gönderimi yapılmaktadır.
        </Text>
        <Block column mt-20>
          <Controller
            control={form?.control}
            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
              <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'Bildirim Başlığı'} placeholder={'Bildirim Başlığı'} error={error?.message} />
            )}
            name={'Title'}
          />

          <Controller
            control={form?.control}
            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
              <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'Bildirim İçeriği'} placeholder={'Bildirim İçeriği'} error={error?.message} />
            )}
            name={'Body'}
          />
        </Block>

        <Block style={{borderRadius: 10}} middle center mt-20 mb-20>
          <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} style={{width: '100%', borderRadius: 10}}>
            <AppButton h-50 onPress={onSubmit} mt-0 type={'transparent'} title={'Gönder'} loading={loading} />
          </LinearGradient>
        </Block>
      </AppScreen>
    </>
  );
};
export default AdminNotification;
