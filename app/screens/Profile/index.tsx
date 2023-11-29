import { useNavigation } from '@react-navigation/native';

import { ProfileCardItem } from './partials';

import { AppImage, AppScreen, Block, Text } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { MainStackNavigationPropsType } from '@/navigation/stacks/MainStack/types';
import { RootState, authRedux, settingsRedux } from '@/store';
import { COLORS } from '@/theme';
import { useTranslation } from 'react-i18next';
import { images } from '@/assets';
import { Linking } from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';

export const getAuthState = (state: RootState) => state.auth;
const Profile = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MainStackNavigationPropsType>();
  // const state = useAppSelector((state) => state);
  // const user = state.auth.user;
  const {user} = useSelector(getAuthState);
  
  const logout = () => {
    dispatch(authRedux.logout());
    navigation.replace('AUTH_ROOT');
  };

  const onChangeLang = (_language: string) => {
    dispatch(settingsRedux.changeLanguage(_language));
  };
  const { t } = useTranslation();
  const navigationOptions = {
    headerTitle: () => <Text sectionTitleDark bold>{t("bottom_tab.profile")}</Text>,
    headerLeft: () => null,
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
  var now = moment(new Date()); //todays date
  var end = moment(user?.SubscriptionExpireDate); // another date
  var duration = moment.duration(end.diff(now));
  var days = duration.asDays();

  return (
    <AppScreen p-0 navigationOptions={navigationOptions} height={"100%"}>

      <Block px-20 py-20 style={{ borderBottomWidth: 2, borderBottomColor: COLORS.flueGrey }}>

        <Block center row >
          <AppImage url={
            user?.ProfilePictureUrl
              ? user?.ProfilePictureUrl
              : images.avatar
          } width={60} height={60} rounded-100 />
          <Block column px-10>
            {user?.Name && <Text bold style={{ fontSize: 16 }}>
              {user?.Name}
            </Text>}
            {user?.SubscriptionExpireDate &&
            <Text bold style={{ color: "#AAB2BA" }} mt-2>
              {t("profile.subscriptionExpireDate").replace("{date}", days.toFixed(0))}
            </Text>}
          </Block>
        </Block>
      </Block>
      <Block px-20 pt-20>


        <Block row justify-between center mb-10>
          <Text sectionTitleDark bold>common.language</Text>
        </Block>
        <Block row center justify-between mb-10 px-10>
          {/* <AppButton type="primary" title={'İngilizce'} onPress={() => onChangeLang('en')} width)/>
        <AppButton type="primary" title={'Türkçe'} onPress={() => onChangeLang('tr')} mt-10 /> */}
          <Block style={{ width: "50%", marginLeft: -10, backgroundColor: t("lang") == "en" ? COLORS.primary : COLORS.flueGrey }} pressable onPress={() => onChangeLang('en')} width={150} height={50} center middle bg-white rounded-15>
            <Text bold style={{ fontSize: 18, color: t("lang") == "en" ? COLORS.white : COLORS.primaryDark }}>English</Text>
          </Block>
          <Block style={{ width: "50%", marginRight: -10, backgroundColor: t("lang") == "tr" ? COLORS.primary : COLORS.flueGrey }} pressable onPress={() => onChangeLang('tr')} width={150} height={50} center middle bg-white rounded-15>
            <Text bold style={{ fontSize: 18, color: t("lang") == "tr" ? COLORS.white : COLORS.primaryDark }}>Türkçe</Text>
          </Block>
        </Block>
      </Block>
      <ProfileCardItem onPress={logout} title={t("auth.logout")} absolute bottom={0} />
      <Block absolute bottom={80} center width={"100%"} style={{ marginBottom: 20 }}>
        <Block pressable onPress={() => {
          Linking.openURL("https://www.lime.com.tr/")
            .catch(err => {
              console.error("Failed opening page because: ", err)
              alert('Failed to open page')
            })
        }}
          row center justify-between mb-10 px-10>
          <AppImage url={images.lime} width={75} height={40} />
        </Block>
      </Block>
    </AppScreen>
  );
};

export default Profile;
