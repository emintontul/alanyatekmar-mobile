import React from 'react';

import {Controller} from 'react-hook-form';

import useRegisterForm from './useForm';

import {KingdomLogo, images} from '@/assets';
import {AppButton, AppImage, AppImageBackground, AppInput, AppScreen, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {IRegisterData} from '@/utils';

const RegisterScreen = () => {
  const {form} = useRegisterForm();

  const onSubmit = (data: IRegisterData) => {
    form.reset();
  };

  const navigationOptions = {
    headerTitle: () => <AppImage url={KingdomLogo.light} width={100} height={20} />,
    headerTransparent: false,
  };

  const FormContainer = useStyledTag(Block, '');

  return (
    <Block bg-dark flex>
      <AppImageBackground source={images.bgArrows}>
        <AppScreen keyboardScroll safe bg-transparent navigationOptions={navigationOptions}>
          <Text bigHeaderLight mb-24 mt-10>
            auth.register
          </Text>
          <FormContainer>
            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'auth.fullname'} placeholder={'auth.fullname'} error={error?.message} />
              )}
              name={'fullName'}
            />
            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'E-mail'} placeholder={'test@test.com'} error={error?.message} />
              )}
              name={'email'}
            />
            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput type="password" mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'auth.password'} placeholder={'******'} error={error?.message} />
              )}
              name={'password'}
            />
            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'auth.repeat_password'} placeholder={'******'} error={error?.message} type="password" />
              )}
              name={'rePassword'}
            />
            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'auth.phone'} placeholder={'0(5__) ___ __ __ __'} error={error?.message} />
              )}
              name={'phone'}
            />
            <AppButton h-48 onPress={form.handleSubmit(onSubmit)} mt-20 type={'primary'} title={'auth.register'} />
          </FormContainer>
        </AppScreen>
      </AppImageBackground>
    </Block>
  );
};

export default RegisterScreen;
