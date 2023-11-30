import {useState} from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

import {baseURL} from '@/api/config';
import {images, TekmarLogo} from '@/assets';
import {AppButton, AppImage, AppImageBackground, AppInput, AppScreen, Block} from '@/components';
import {useAppDispatch, useStyledTag} from '@/hooks';
import {MainStackNavigationPropsType} from '@/navigation/stacks/MainStack/types';

const ResetPassword = params => {
  const {t}: {t: (value: string) => string} = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<MainStackNavigationPropsType>();
  const initial = {email: ''};
  const schema = yup.object({
    password: yup.string().required('Required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validations.doesnt_match_password'))
      .required(t('validations.required')),
  });

  const form = useForm({
    defaultValues: initial,
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    const values = form.getValues();
    setLoading(true);
    //strapi password reset request
    axios
      .post(baseURL + '/auth/reset-password', {
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
        code: params.route.params.code,
      })
      .then(response => {
        navigation.replace('SPLASH_SCREEN');
        Toast.show({
          text1: t('auth.success'),
          text2: t('auth.reset_password_success'),
          type: 'success',
          position: 'top',
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
            <AppImage url={TekmarLogo.dark} width={200} height={53} />
          </Block>
          <FormContainer>
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

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput
                  textContentType={'password'}
                  mb-6
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  label={'auth.repeat_password'}
                  placeholder={'auth.repeat_password'}
                  error={error?.message}
                  type="password"
                />
              )}
              name={'passwordConfirmation'}
            />
          </FormContainer>
        </AppScreen>
      </AppImageBackground>

      <Block flex center middle style={{width: '100%'}} absolute bottom={20} pb-30>
        <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} height={56} style={{width: '90%', borderRadius: 10}} middle center>
          <AppButton h-50 onPress={form.handleSubmit(onSubmit)} mt-0 type={'transparent'} title={'auth.reset_password'} loading={loading} />
        </LinearGradient>
      </Block>
    </Block>
  );
};

export default ResetPassword;
