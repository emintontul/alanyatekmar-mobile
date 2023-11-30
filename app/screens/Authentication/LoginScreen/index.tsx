import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {t} from 'i18next';
import {Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';

import useLoginForm from './useForm';

import {baseURL} from '@/api/config';
import {LoginRequestModel, usePostSessionsMutation} from '@/api/tekmarApi';
import {images, TekmarLogo} from '@/assets';
import {AppButton, AppImage, AppImageBackground, AppInput, AppScreen, Block, Text} from '@/components';
import {useAppDispatch, useStyledTag} from '@/hooks';
import {AuthStackNavigationPropsType} from '@/navigation/stacks/AuthStack/types';
import {MainStackNavigationPropsType} from '@/navigation/stacks/MainStack/types';
import {authRedux} from '@/store';

export const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {t} = useTranslation();
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};
const LoginScreen = () => {
  const navigation = useNavigation<AuthStackNavigationPropsType>();
  const rootNavigation = useNavigation<MainStackNavigationPropsType>();
  const [loginRequest, {isLoading}] = usePostSessionsMutation();
  const dispatch = useAppDispatch();

  const {form} = useLoginForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (formData: LoginRequestModel) => {
    setLoading(true);

    const formValues = form.getValues();
    const request = axios
      .post(baseURL + 'User/Login', {
        email: formValues.userName,
        password: formValues.password,
      })
      .then(response => {
        const data = response?.data;
        const token = data?.data?.access_token;
        const _user = data?.data?.access_token;


        console.log('%cindex.tsx line:76 data', 'color: #007acc;', response?.data);
        const user = response?.data;
        dispatch(authRedux.login({token, user}));
        console.log('%cindex.tsx line:80 _user?.role', 'color: #007acc;', user);
        if (user?.role?.type === 'admin') {
          console.log('admin');
          rootNavigation.replace('ADMIN_TABS_ROOT', {
            screen: 'HOME_MAIN',
          });
        } else {
          console.log('user');
          rootNavigation.replace('MAIN_TABS_ROOT', {
            screen: 'HOME_MAIN',
          });
        }
        setLoading(false);
        
      })
      .catch(error => {
        console.log('%cindex.tsx line:90 error', 'color: #007acc;', error);
        setLoading(false);
        Toast.show({
          text1: t('auth.error'),
          text2: t('auth.login_error'),
          type: 'error',
          position: 'top',
          visibilityTime: 2000,
        });
      });
  };

  const FormContainer = useStyledTag(Block, 'mt-20');

  return (
    <Block flex bg-white>
      <AppImageBackground source={images.backgroundSoft}>
        <AppScreen safe bg-transparent>
          <Block center pt-70 pb-30>
            <AppImage url={TekmarLogo.dark} width={200} height={53} />
          </Block>
          <FormContainer>
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
              name={'userName'}
            />
            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput
                  textContentType={'password'}
                  mb-6
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  label={'auth.password'}
                  placeholder={'auth.password'}
                  error={error?.message}
                  type="password"
                />
              )}
              name={'password'}
            />
          </FormContainer>
        </AppScreen>
      </AppImageBackground>
      <Block flex center middle style={{width: '100%'}} absolute bottom={20} pb-30>
        <Block pressable onPress={() => navigation.navigate('FORGOT_PASSWORD')} mb-10>
          <Text textCenter sm style={{color: '#AAB2BA'}} fs-14>
            auth.forgot_password
          </Text>
        </Block>

        <Block style={{width: '90%', borderRadius: 10}} middle center>
          <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} style={{width: '100%', borderRadius: 10}}>
            <AppButton h-50 onPress={onSubmit} mt-0 type={'transparent'} title={'auth.login'} loading={loading} />
          </LinearGradient>
        </Block>
      </Block>
    </Block>
  );
};

export default LoginScreen;
