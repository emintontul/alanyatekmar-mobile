import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {t} from 'i18next';
import moment from 'moment';
import {Controller} from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

import userInformationForm from './useForm';

import {baseURL} from '@/api/config';
import {AppButton, AppInput, AppScreen, Block, DateTimePicker, Text} from '@/components';
import {useAppDispatch, useStyledTag} from '@/hooks';
import {MainStackNavigationPropsType} from '@/navigation/stacks/MainStack/types';
import {RootState} from '@/store';
import {COLORS} from '@/theme';
import {ICONS} from '@/utils';

export const getAuthState = (state: RootState) => state.auth;
const UserInformations = props => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MainStackNavigationPropsType>();
  // get user from params
  const {user} = props.route.params;

  const {form} = userInformationForm();
  const {token} = useSelector(getAuthState);
  const navigationOptions = {
    headerTitle: () => (
      <Text sectionTitleDark bold>
        {user?.Name}
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

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    form.setValue('Name', user?.Name);
    form.setValue('email', user?.email);
    form.setValue('SubscriptionExpireDate', user?.SubscriptionExpireDate);
  }, []);
  const [visibleDateTimePicker, setVisibleDateTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const onSubmit = async () => {
    setLoading(true);
    const formValues = form.getValues();
    const data = {
      Name: formValues.Name,
      email: formValues.email,
      SubscriptionExpireDate: formValues.SubscriptionExpireDate,
    };
    console.log('%cindex.tsx line:78 data', 'color: #007acc;', data);
    fetch(`${baseURL}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: formValues.Name,
        email: formValues.email,
        SubscriptionExpireDate: formValues.SubscriptionExpireDate,
      }),
    })
      .then(res => {
        console.log('%cindex.tsx line:102 res', 'color: #007acc;', res);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  const FormContainer = useStyledTag(Block, 'mb-20');
  return (
    <>
      <AppScreen safe scroll bg-white barStyle={'dark-content'} navigationOptions={navigationOptions}>
        <FormContainer>
          <Controller
            control={form?.control}
            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
              <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'Ad Soyad'} placeholder={'Ad Soyad'} error={error?.message} />
            )}
            name={'Name'}
          />

          <Controller
            control={form?.control}
            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
              <AppInput
                keyboard="email-address"
                textContentType="emailAddress"
                autoComplete={'email'}
                autoCapitalize={'none'}
                mb-6
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label={'auth.email'}
                placeholder={'auth.email'}
                error={error?.message}
              />
            )}
            name={'email'}
          />

          <Controller
            control={form?.control}
            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
              <AppInput
                mt-8
                value={value}
                editable={false}
                onPress={() => setVisibleDateTimePicker(true)}
                label="Üyelik Bitiş Tarihi"
                placeholder={t('Üyelik Bitiş Tarihi').toString()}
                icon={ICONS.Calendar}
              />
            )}
            name={'SubscriptionExpireDate'}
          />

          <Block style={{borderRadius: 10}} middle center mt-20 mb-20>
            <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} style={{width: '100%', borderRadius: 10}}>
              <AppButton
                h-50
                onPress={() => {
                  onSubmit();
                }}
                mt-0
                type={'transparent'}
                title={'Güncelle'}
                loading={loading}
              />
            </LinearGradient>
          </Block>
        </FormContainer>
        <DateTimePicker
          onDateChange={(date: string) => {
            setDate(new Date(date));
            form.setValue('SubscriptionExpireDate', moment(date).format('YYYY-MM-DD'));
            setVisibleDateTimePicker(false);
          }}
          visible={visibleDateTimePicker}
          setVisible={setVisibleDateTimePicker}
        />
      </AppScreen>
    </>
  );
};
const styles = StyleSheet.create({
  image1: {
    width: 200,
    aspectRatio: 1,
  },
  image2: {
    height: 300,
    width: 200,
    resizeMode: 'contain',
    marginLeft: 40,
    marginTop: 60,
  },
  text: {
    margin: 30,
  },
  animatedContainer: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 10,
  },
});
export default UserInformations;
