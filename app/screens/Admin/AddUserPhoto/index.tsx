import {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, Image, Platform, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {t} from 'i18next';
import moment from 'moment';
import {Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

import {baseURL} from '@/api/config';
import {AppButton, AppFlatList, AppIcon, AppInput, AppScreen, Block, FloatingButton, Swipeable, Text} from '@/components';
import FloatingActionButton from '@/components/Common/FloatingActionButton';
import {useAppDispatch} from '@/hooks';
import {MainStackNavigationPropsType} from '@/navigation/stacks/MainStack/types';
import useLoginForm from '@/screens/Authentication/LoginScreen/useForm';
import {authRedux, RootState} from '@/store';
import {COLORS} from '@/theme';
import {ICONS} from '@/utils';

export const getAuthState = (state: RootState) => state.auth;
const AddUserPhoto = props => {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MainStackNavigationPropsType>();
  // get user from params
  const {user} = props.route.params;

  const {token} = useSelector(getAuthState);
  const [photo, setPhoto] = useState(null);
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
  const handleChoosePhoto = () => {
    launchImageLibrary(
      {
        noData: true,
        selectionLimit: 0,
      },
      response => {
        // console.log(response);
        if (response) {
          setPhoto(response);
        }
      },
    );
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(moment().format('LL'));
  }, []);

  const {form} = useLoginForm();
  const onSubmit = async () => {
    const formValues = form.getValues();
    const _title = formValues.title || title;
    setLoading(true);
    const req = axios({
      url: `${baseURL}/user-photos`,
      method: 'post',
      data: {
        data: {
          Title: _title,
          user: user.id,
        },
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const formData = new FormData();
        console.log('%cindex.tsx line:89 response', 'color: #007acc;', response.data);
        formData.append('refId', response.data.data.id);
        formData.append('ref', 'api::user-photo.user-photo');
        formData.append('field', 'Photos');
        photo.assets.map((item, index) => {
          formData.append('files', {
            name: item.fileName,
            type: item.type,
            uri: Platform.OS === 'android' ? item.uri : item.uri.replace('file://', ''),
          });
        });
        fetch(`${baseURL}/upload`, {
          method: 'post',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => response.json())
          .then(response => {
            setLoading(false);
            navigation.goBack();
          })
          .catch(error => {
            setLoading(false);
            console.log('error', error);
          });
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });
  };

  return (
    <>
      <AppScreen safe scroll bg-white barStyle={'dark-content'} navigationOptions={navigationOptions}>
        <Text bold fs-15 mb-10>
          Yüklenenler
        </Text>

        {photo && (
          <>
            <FlatList
              horizontal
              data={photo.assets}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => {
                return (
                  <Block pressable key={item.id}>
                    <Image source={{uri: item.uri}} style={styles.animatedContainer} />
                  </Block>
                );
              }}
              keyExtractor={item => item.id}
            />
          </>
        )}

        <Block center middle pressable row onPress={handleChoosePhoto} py-10 mt-10 style={[{backgroundColor: '#F3F5F7', borderRadius: 10}]}>
          <AppIcon name={ICONS.Upload} size={30} color={'#1A1B1E'} />
          <Text color="#1A1B1E" ml-10 bold>
            Fotoğraf yükle
          </Text>
        </Block>
        <Block row center middle space={'between'} style={{backgroundColor: COLORS.white}} mt-10>
          <Controller
            control={form?.control}
            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
              <AppInput
                onChangeText={text => {
                  setTitle(text);
                  onChange(text);
                }}
                value={title}
                mb-6
                onBlur={onBlur}
                label={'Fotoğraf başlığı'}
                placeholder={'Fotoğraf başlığı'}
                error={error?.message}
                flex={1}
                defaultValue={moment().format('LL')}
                onClear={() => {
                  form.reset({title: ''});
                }}
              />
            )}
            name={'title'}
          />
        </Block>

        <Block style={{borderRadius: 10}} middle center mt-20>
          <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} style={{width: '100%', borderRadius: 10}}>
            <AppButton h-50 onPress={onSubmit} mt-0 type={'transparent'} title={'Yüklemeyi Başlat'} loading={loading} />
          </LinearGradient>
        </Block>
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
export default AddUserPhoto;
