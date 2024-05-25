import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { t } from 'i18next';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { baseURL } from '@/api/config';
import { AppBottomSheet, AppButton, AppFlatList, AppInput, AppScreen, Block, DateTimePicker, Text } from '@/components';
import { useAppDispatch, useDebounce, useStyledTag } from '@/hooks';
import { MainStackNavigationPropsType } from '@/navigation/stacks/MainStack/types';
import { RootState } from '@/store';
import { COLORS, window } from '@/theme';
import { ICONS } from '@/utils';
import BottomSheet from '@gorhom/bottom-sheet';
import { Controller, useForm } from 'react-hook-form';
import { reset } from '@/store/reducers/request';

export const getAuthState = (state: RootState) => state.auth;
const AddTourReservation = props => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MainStackNavigationPropsType>();
  // get user from params

  // const { form } = userInformationForm();
  const { token } = useSelector(getAuthState);
  const navigationOptions = {
    headerTitle: () => (
      <Text sectionTitleDark bold>
        page.add_tour_reservation
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

  const [isTourBottomSheetOpen, setIsTourBottomSheetOpen] = useState(false);
  const exerciseListSnapPoints = useMemo(() => ['90%', '90%'], []);

  const tourBottomSheetRef = useRef<BottomSheet>(null);

  const [defaultTourList, setDefaultTourList] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [tours, setTours] = useState([]);
  useEffect(() => {
    axios.get(baseURL + 'Tour/GetAllTours?localeId=cc25c2b8a-2778-4f25-9350-42f714ff54a9', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setTours(res.data.data.data);
      setDefaultTourList(res.data.data.data);
    }).catch(error => {
      //401
      console.log('%capp/screens/AddTourReservation/index.tsx:68 error', 'color: #007acc;', error);
      if (error.response.status == 401) {
        navigation.navigate('AUTH_ROOT', { screen: 'LOGIN' });
      }
    });
  }, []);


  const [visibleDateTimePicker, setVisibleDateTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const onSubmit = async () => {
    setLoading(true);
    const formValues = getValues();
    const data = {
      tourId: selectedTour?.id,
      firstName: formValues.FirstName,
      lastName: formValues.LastName,
      email: formValues.Email,
      phoneNumber: formValues.PhoneNumber,
      hotelName: formValues.HotelName,
      roomNumber: formValues.RoomNumber,
      adultCount: formValues.AdultCount,
      childCount: formValues.ChildCount,
      reservationDate: moment(formValues.ReservationDate).utc().format(),
      totalPrice: formValues.TotalPrice,
      currency: currency,
      image: selectedTour?.tourImageList.find((x) => x.isCover)?.image.originalName,
      slug: selectedTour?.slug,
      name: selectedTour?.name,
      type: 2
    };
    console.log('%capp/screens/AddTourReservation/index.tsx:100 data', 'color: #007acc;', data);
    axios.post(baseURL + 'Reservation/Add', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setLoading(false);
      navigation.navigate('HOME_SCREEN');
    }).catch(error => {
      setLoading(false);
      console.log('%capp/screens/AddTourReservation/index.tsx:107 error', 'color: #007acc;', JSON.stringify(error));
    });
  };
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    if (debouncedSearchText) {
      axios
        .post(baseURL + 'Tour/Get', {
          name: debouncedSearchText,
        })
        .then(response => {
          setTours(response.data.data);
        })
        .catch(error => {
          console.log('%capp/screens/Admin/AddTrainingPlan/index.tsx:198 error', 'color: #007acc;', error);
        });
    } else {
      setTours(defaultTourList);
    }
  }, [debouncedSearchText]);
  const FormContainer = useStyledTag(Block, 'mb-20');
  const [currency, setCurrency] = useState(0);
  const changeCurrency = (currency: number) => {
    setCurrency(currency);
    console.log('%capp/screens/AddTourReservation/index.tsx:130 currency', 'color: #007acc;', currency);
  }
  const surveySchema = yup.object({
    FirstName: yup.string().required('Ad Alanı Gereklidir.'),
    LastName: yup.string().required('Soyad Alanı Gereklidir.'),
    AdultCount: yup.number({
      required_error: "Amount is required",
      invalid_type_error: "Value is not allowed please type a valid number",
    }).required('Yetişkin Sayısı Alanı Gereklidir.').default(1),
    ChildCount: yup.number('Bu alana sadece sayı girilebilir.').required('Çocuk Sayısı Alanı Gereklidir.').default(0),
    Email: yup.string().required('Email Alanı Gereklidir.').email('Geçerli Bir Email Adresi Giriniz.'),
    PhoneNumber: yup.string().required('Telefon Alanı Gereklidir.'),
    HotelName: yup.string(),
    RoomNumber: yup.string(),
    ReservationDate: yup.date(),
    TotalPrice: yup.number('Bu alan sadece sayı olabilir.').required('Toplam Fiyat Alanı Gereklidir.'),
    SelectedTour: yup.object().required('Tur Seçiniz'),
  });

  const { control, handleSubmit, errors, setValue, reset, getValues, watch, trigger } = useForm({
    resolver: yupResolver(surveySchema),
    defaultValues: {
      childCount: 0,
      adultCount: 1,
      currency: 0,
    },
  });
  return (
    <>
      <AppScreen safe scroll bg-white barStyle={'dark-content'} navigationOptions={navigationOptions}>
        {isTourBottomSheetOpen && (
          <AppBottomSheet
            ref={tourBottomSheetRef}
            onClose={() => {
              setIsTourBottomSheetOpen(false);
              tourBottomSheetRef.current?.close();
            }}
            isVisible={isTourBottomSheetOpen}
            backdrop
            index={1}
            snapPoints={exerciseListSnapPoints}
            isFlatList={true}>
            <Block flex column height={'100%'}>
              <Block height={60} space={'between'} px-20 py-10 style={{ borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey }}>
                <Text fs-16 bold>
                  Tur Seçiniz
                </Text>
              </Block>
              <Block px-20 row center middle space={'between'} style={{ backgroundColor: COLORS.white }}>
                <AppInput placeholder={t('common.search')} flex={1} icon={ICONS.Search} onChange={e => setSearchText(e.nativeEvent.text?.toLowerCase())} />
              </Block>
              <AppFlatList
                data={tours}
                scrollEnabled
                height={window.height - 250}
                renderItem={({ item }) => (
                  <Block
                    pressable
                    onPress={() => {
                      setSelectedTour(item);
                      setValue('SelectedTour', item);
                      setIsTourBottomSheetOpen(false);
                      tourBottomSheetRef.current?.close();
  trigger('SelectedTour');
                    }}
                    row
                    center
                    style={{
                      borderBottomWidth: 1,
                      borderColor: COLORS.lightGrey,
                      paddingBottom: 10,
                      marginBottom: 10,
                      borderRadius: 0,
                      width: '100%',
                    }}
                    px-20
                    py-10>
                    <Text>{item.name}</Text>
                  </Block>
                )}
              />
            </Block>
          </AppBottomSheet>
        )}
        <FormContainer>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
              <Block
              flex={1}
              column
              middle
              space={'between'}
              pt-15
              pressable
              onPress={() => {
                setIsTourBottomSheetOpen(true);
                tourBottomSheetRef.current?.expand();
                setTours(defaultTourList);
                
              }}>
              <Text pb-5 tinyGray>
                Tur Seçiniz
              </Text>
              <Block
                row
                center
                style={{
                  borderWidth: error?.message ? 0.5 : 2,
                  borderColor: error?.message ? COLORS.error : COLORS.lightGrey,
                  padding: 20,
                  marginBottom: 10,
                  borderRadius: 10,
                  width: '100%',
                }}>
                <Text style={{color: COLORS.gray, fontWeight:600}}>{selectedTour ? selectedTour?.name : 'Tur Seçiniz'}</Text>
              </Block>
            </Block>
            {error?.message && <Text style={{ color: COLORS.error, fontWeight:600}} fs-12 mb-10>
              * {error?.message}
            </Text>}
            </>
            )}
            name={'SelectedTour'}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'Müşteri Adı'} placeholder={'Müşteri Adı'} error={error?.message} />
            )}
            name={'FirstName'}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'Müşteri Soyadı'} placeholder={'Müşteri Soyadı'} error={error?.message} />
            )}
            name={'LastName'}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppInput
                keyboard="email-address"
                textContentType="emailAddress"
                autoComplete={'email'}
                autoCapitalize={'none'}
                mb-6
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label={'Müşteri E-Postası'}
                placeholder={'Müşteri E-Postası'}
                error={error?.message}
              />
            )}
            name={'Email'}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'Telefon'} placeholder={'Telefon'} error={error?.message} />
            )}
            name={'PhoneNumber'}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'Otel'} placeholder={'Otel'} error={error?.message} />
            )}
            name={'HotelName'}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'Oda Numarası'} placeholder={'Oda Numarası'} error={error?.message} />
            )}
            name={'RoomNumber'}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'Yetişkin Sayısı'} placeholder={'Yetişkin Sayısı'} error={error?.message} keyboard='numeric' />
            )}
            name={'AdultCount'}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'Çocuk Sayısı'} placeholder={'Çocuk Sayısı'} error={error?.message} keyboard='numeric' />
            )}
            name={'ChildCount'}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'Toplam Fiyat'} placeholder={'Toplam Fiyat'} error={error?.message} keyboard='numeric' />
            )}
            name={'TotalPrice'}
          />
          {/* currency picker */}
          <Block flex={1} row >
            <Block pressable onPress={() => changeCurrency(0)} row center middle style={currency === 0 ? { marginRight: 10, backgroundColor: COLORS.primary, borderRadius: 5, height: 40, width: '33.33333%' } : { marginRight: 10, backgroundColor: COLORS.flueGrey, borderRadius: 5, height: 40, width: '33.33333%' }}>
              <Text style={currency === 0 ? { color: COLORS.white } : { color: COLORS.black }}>₺ - TRY</Text>
            </Block>
            <Block pressable onPress={() => changeCurrency(1)} row center middle style={currency === 1 ? { marginRight: 10, backgroundColor: COLORS.primary, borderRadius: 5, height: 40, width: '30%' } : { marginRight: 10, backgroundColor: COLORS.flueGrey, borderRadius: 5, height: 40, width: '30%' }}>
              <Text style={currency === 1 ? { color: COLORS.white } : { color: COLORS.black }}>$ - USD</Text>
            </Block>
            <Block pressable onPress={() => changeCurrency(2)} row center middle style={currency === 2 ? { marginRight: 10, backgroundColor: COLORS.primary, borderRadius: 5, height: 40, width: '30%' } : { marginRight: 10, backgroundColor: COLORS.flueGrey, borderRadius: 5, height: 40, width: '30%' }}>
              <Text style={currency === 2 ? { color: COLORS.white } : { color: COLORS.black }}>€ - EUR</Text>
            </Block>
          </Block>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppInput
                mt-8
                value={value}
                editable={false}
                onPress={() => setVisibleDateTimePicker(true)}
                label="Tur Tarihi"
                placeholder={t('Tur Tarihi').toString()}
                icon={ICONS.Calendar}
              />
            )}
            name={'ReservationDate'}
          />

          <Block style={{ borderRadius: 10 }} middle center mt-20 mb-20>
            <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} style={{ width: '100%', borderRadius: 10 }}>
              <AppButton
                h-50
                onPress={handleSubmit(onSubmit)}
                mt-0
                type={'transparent'}
                title={'Rezervasyon Ekle'}
                loading={loading}
              />
            </LinearGradient>
          </Block>
        </FormContainer>
        <DateTimePicker
          onDateChange={(date: string) => {
            setDate(new Date(date));
            setValue('ReservationDate', moment(date).format('YYYY-MM-DD'));
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
export default AddTourReservation;
