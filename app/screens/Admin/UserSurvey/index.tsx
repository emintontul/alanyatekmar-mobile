import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Controller} from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

import useSurveyForm from './useForm';

import {baseURL} from '@/api/config';
import {AppButton, AppInput, AppScreen, Block, Text} from '@/components';
import {useAppDispatch, useStyledTag} from '@/hooks';
import {MainStackNavigationPropsType} from '@/navigation/stacks/MainStack/types';
import {RootState} from '@/store';
import {COLORS} from '@/theme';

export const getAuthState = (state: RootState) => state.auth;
const UserSurvey = props => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MainStackNavigationPropsType>();
  // get user from params
  const {user} = props.route.params;

  const {form} = useSurveyForm();
  const {token} = useSelector(getAuthState);
  const navigationOptions = {
    headerTitle: () => (
      <Text sectionTitleDark bold>
        {user?.Name} Anket
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
  const [pageLoading, setPageLoading] = useState(true);
  const [survey, setSurvey] = useState(null);
  useEffect(() => {
    axios
      .get(`${baseURL}/users/${user?.id}?populate[0]=Anket`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setSurvey(res.data.Anket);
        console.log('%cindex.tsx line:48 res.data', 'color: #007acc;', res.data);
        form.setValue('Age', res.data?.Anket?.Age);
        form.setValue('Weight', res.data?.Anket?.Weight);
        form.setValue('Height', res.data?.Anket?.Height);
        form.setValue('SportHistory', res.data?.Anket?.SportHistory);
        form.setValue('Ailments', res.data?.Anket?.Ailments);
        form.setValue('Disease', res.data?.Anket?.Disease);
        form.setValue('Surgery', res.data?.Anket?.Surgery);
        form.setValue('ConstantlyMedication', res.data?.Anket?.ConstantlyMedication);
        form.setValue('Supplement', res.data?.Anket?.Supplement);
        form.setValue('Meals', res.data?.Anket?.Meals);
        form.setValue('DrinkWater', res.data?.Anket?.DrinkWater);
        form.setValue('MainGoal', res.data?.Anket?.MainGoal);
        form.setValue('TotalExerciseDay', res.data?.Anket?.TotalExerciseDay);
        form.setValue('WorkoutStyle', res.data?.Anket?.WorkoutStyle);
        form.setValue('MaxTrainingTime', res.data?.Anket?.MaxTrainingTime);

        setTimeout(() => {
          setPageLoading(false);
        }, 500);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    const formValues = form.getValues();
    const data = {
      Anket: {
        Age: formValues.Age != undefined ? formValues.Age : '',
        Weight: formValues.Weight != undefined ? formValues.Weight : '',
        Height: formValues.Height != undefined ? formValues.Height : '',
        SportHistory: formValues.SportHistory != undefined ? formValues.SportHistory : '',
        Ailments: formValues.Ailments != undefined ? formValues.Ailments : '',
        Disease: formValues.Disease != undefined ? formValues.Disease : '',
        Surgery: formValues.Surgery != undefined ? formValues.Surgery : '',
        ConstantlyMedication: formValues.ConstantlyMedication != undefined ? formValues.ConstantlyMedication : '',
        Supplement: formValues.Supplement != undefined ? formValues.Supplement : '',
        Meals: formValues.Meals != undefined ? formValues.Meals : '',
        DrinkWater: formValues.DrinkWater != undefined ? formValues.DrinkWater : '',
        MainGoal: formValues.MainGoal != undefined ? formValues.MainGoal : '',
        TotalExerciseDay: formValues.TotalExerciseDay != undefined ? formValues.TotalExerciseDay : '',
        WorkoutStyle: formValues.WorkoutStyle != undefined ? formValues.WorkoutStyle : '',
        MaxTrainingTime: formValues.MaxTrainingTime != undefined ? formValues.MaxTrainingTime : '',
      },
    };
    console.log('%cindex.tsx line:78 data', 'color: #007acc;', data);
    console.log(`${baseURL}/users/${user.id}`);
    fetch(`${baseURL}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Anket: {
          Age: formValues.Age != undefined ? formValues.Age : '',
          Weight: formValues.Weight != undefined ? formValues.Weight : '',
          Height: formValues.Height != undefined ? formValues.Height : '',
          SportHistory: formValues.SportHistory != undefined ? formValues.SportHistory : '',
          Ailments: formValues.Ailments != undefined ? formValues.Ailments : '',
          Disease: formValues.Disease != undefined ? formValues.Disease : '',
          Surgery: formValues.Surgery != undefined ? formValues.Surgery : '',
          ConstantlyMedication: formValues.ConstantlyMedication != undefined ? formValues.ConstantlyMedication : '',
          Supplement: formValues.Supplement != undefined ? formValues.Supplement : '',
          Meals: formValues.Meals != undefined ? formValues.Meals : '',
          DrinkWater: formValues.DrinkWater != undefined ? formValues.DrinkWater : '',
          MainGoal: formValues.MainGoal != undefined ? formValues.MainGoal : '',
          TotalExerciseDay: formValues.TotalExerciseDay != undefined ? formValues.TotalExerciseDay : '',
          WorkoutStyle: formValues.WorkoutStyle != undefined ? formValues.WorkoutStyle : '',
          MaxTrainingTime: formValues.MaxTrainingTime != undefined ? formValues.MaxTrainingTime : '',
        },
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

  const FormContainer = useStyledTag(Block, 'mb-0');
  return (
    <>
      <AppScreen keyboardScroll safe scroll bg-white barStyle={'dark-content'} navigationOptions={navigationOptions}>
        {pageLoading ? (
          <Block
            py-30
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              borderRadius: 15,
            }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </Block>
        ) : (
          <FormContainer>
            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'Yaşınız'} placeholder={'Yaşınız'} error={error?.message} />
              )}
              name={'Age'}
            />

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput mb-6 onBlur={onBlur} onChangeText={onChange} value={value} label={'Kilonuz'} placeholder={'Kilonuz'} error={error?.message} flex={1} />
              )}
              name={'Weight'}
            />

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput mb-6 onBlur={onBlur} onChangeText={onChange} value={value} label={'Boyunuz'} placeholder={'Boyunuz'} error={error?.message} flex={1} />
              )}
              name={'Height'}
            />

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput
                  mb-6
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={'Daha önce spor yaptınız mı? Toplam ne kadar süre ile?'}
                  placeholder={'Spor Geçmişiniz'}
                  error={error?.message}
                  flex={1}
                />
              )}
              name={'SportHistory'}
            />

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput mb-6 onBlur={onBlur} onChangeText={onChange} value={value} label={'Herhangi bir hastalığınız var mı?'} placeholder={'Hastalıklar'} error={error?.message} flex={1} />
              )}
              name={'Ailments'}
            />

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput
                  mb-6
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={'Herhangi bir rahatsızlığınız var mı ? (Eklem, kas, tendon ağrısı ya da rahatsızlığı)'}
                  placeholder={'Rahatsızlıklar'}
                  error={error?.message}
                  flex={1}
                />
              )}
              name={'Disease'}
            />

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput mb-6 onBlur={onBlur} onChangeText={onChange} value={value} label={'Daha önce ameliyat oldunuz mu?'} placeholder={'Ameliyatlar'} error={error?.message} flex={1} />
              )}
              name={'Surgery'}
            />

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput
                  mb-6
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={'Sürekli kullandığınız bir ilaç var mı? (Tansiyon, Kolestrol vb.)'}
                  placeholder={'Sürekli Kullandığınız İlaçlar'}
                  error={error?.message}
                  flex={1}
                />
              )}
              name={'ConstantlyMedication'}
            />

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput
                  mb-6
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={'Sürekli kullandığınız Vitamin, Mineral ya da Supplement var mı?'}
                  placeholder={'Kullandığınız Takviyeler'}
                  error={error?.message}
                  flex={1}
                />
              )}
              name={'Supplement'}
            />

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput mb-6 onBlur={onBlur} onChangeText={onChange} value={value} label={'Günde kaç öğün besleniyorsunuz?'} placeholder={'Öğün Sayınız'} error={error?.message} flex={1} />
              )}
              name={'Meals'}
            />

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput
                  mb-6
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={'Günde toplam ne kadar su tüketiyorsunuz?'}
                  placeholder={'Su Tüketiminiz'}
                  error={error?.message}
                  flex={1}
                />
              )}
              name={'DrinkWater'}
            />

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput
                  mb-6
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={'Temel amacınız nedir ? ( kilo alma, kilo verme, performans, güç vb.'}
                  placeholder={'Temel Amacınız'}
                  error={error?.message}
                  flex={1}
                />
              )}
              name={'MainGoal'}
            />

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput
                  mb-6
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={'Hafta da kaç gün antrenmana geleceksiniz?'}
                  placeholder={'Antrenman Günü Sayısı'}
                  error={error?.message}
                  flex={1}
                />
              )}
              name={'TotalExerciseDay'}
            />

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput
                  mb-6
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={'Çalışmayı sevdiğiniz antrenman tarzı var mı? (Makine ağırlıklı, vücut ağırlığı ile, fonksiyonel vb.)'}
                  placeholder={'Antrenman Tarzı'}
                  error={error?.message}
                  flex={1}
                />
              )}
              name={'WorkoutStyle'}
            />

            <Controller
              control={form?.control}
              render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <AppInput
                  mb-6
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={'Antrenman süresinde kısıtlamanız var mı? ( maksimum 1 saat,maksimum 2 saat vb)'}
                  placeholder={'Süre Kısıtı'}
                  error={error?.message}
                  flex={1}
                />
              )}
              name={'MaxTrainingTime'}
            />

            <Block style={{borderRadius: 10}} middle center mt-20>
              <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} style={{width: '100%', borderRadius: 10}}>
                <AppButton
                  h-50
                  onPress={() => {
                    onSubmit();
                  }}
                  mt-0
                  type={'transparent'}
                  title={'Anketi Kaydet'}
                  loading={loading}
                />
              </LinearGradient>
            </Block>
          </FormContainer>
        )}
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
export default UserSurvey;
