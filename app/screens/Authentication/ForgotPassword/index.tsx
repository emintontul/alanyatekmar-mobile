import React, {useState} from 'react';
import {Button} from 'react-native';

import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {values} from 'lodash';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

import {baseURL} from '@/api/config';
import {images, KingdomLogo} from '@/assets';
import {AppButton, AppImage, AppImageBackground, AppInput, AppScreen, Block} from '@/components';
import {useStyledTag} from '@/hooks';
import {MainStackNavigationPropsType} from '@/navigation/stacks/MainStack/types';
import {login} from '@/store/reducers/auth';

const ForgotPassword = () => {
  const {t}: {t: (value: string) => string} = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<MainStackNavigationPropsType>();
  const initial = {email: ''};
  const schema = yup.object({
    email: yup.string().email(t('validations.valid_email')).required(t('validations.required')),
  });

  const form = useForm({
    defaultValues: initial,
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    const values = form.getValues();
    setLoading(true);
    //strapi password reset request
    axios
      .post(baseURL + '/auth/forgot-password', {
        email: values.email,
      })
      .then(response => {
        navigation.navigate('SPLASH_SCREEN');
        Toast.show({
          text1: t('auth.success'),
          text2: t('auth.reset_password_mail_success'),
          type: 'success',
          position: 'top',
          marginTop: 150,
          visibilityTime: 4000,
        });

        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const navigationOptions = {
    headerTransparent: true,
  };
  const FormContainer = useStyledTag(Block, 'mt-20');

  return (
    <Block bg-white flex>
      <AppImageBackground source={images.backgroundSoft}>
        <AppScreen safe bg-transparent navigationOptions={navigationOptions}>
          <Block center pt-70 pb-30>
            <AppImage url={KingdomLogo.dark} width={200} height={53} />
          </Block>
          <FormContainer>
            <Controller
              control={form.control}
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
                  label={'E-mail'}
                  placeholder={'test@test.com'}
                  error={error?.message}
                />
              )}
              name={'email'}
            />
          </FormContainer>
        </AppScreen>
      </AppImageBackground>
      <Block flex center middle style={{width: '100%'}} absolute bottom={50}>
        <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} height={56} style={{width: '90%', borderRadius: 10}}>
          <Block flex center middle>
            <Button title={'auth.reset_password'} color="#fff" style={{color: '#fff', fontWeight: '600', fontSize: 15}} onPress={login} />
          </Block>
        </LinearGradient>
      </Block>

      <Block flex center middle style={{width: '100%'}} absolute bottom={20} pb-30>
        <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} height={56} style={{width: '90%', borderRadius: 10}} middle center>
          <AppButton h-50 onPress={form.handleSubmit(onSubmit)} mt-0 type={'transparent'} title={'auth.reset_password'} loading={loading} />
        </LinearGradient>
      </Block>
    </Block>
  );
};

export default ForgotPassword;
