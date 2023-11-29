import { AppImage, AppScreen, Block, Text } from '@/components';
import { COLORS } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { images } from '@/assets';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseURL } from '@/api/config';
import moment from 'moment';
import { t } from 'i18next';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const getAuthState = (state: RootState) => state.auth;
const ExerciseList = () => {
  const navigation = useNavigation();

  const navigationOptions = {
    headerTitle: () => <Text sectionTitleDark bold>common.trainingPrograms</Text>,

    headerTransparent: false,
    headerStyle: {
      backgroundColor: COLORS.white,
      shadowColor: 'transparent',
      elevation: 0,
    },
    animationEnabled: true,
  };
  const [plans, setPlans] = useState([]);
  const { token} = useSelector(getAuthState);
  useEffect(() => {
    axios.get(baseURL + '/users/me?populate=*', {
      headers: {
        "Authorization": "Bearer " + token,
        "Cache-Control": "no-cache",
      }
    }).then(response => {
      setPlans(response.data.plans);
    });
  }, []);
  return (
    <>
      <AppScreen scroll safe navigationOptions={navigationOptions} barStyle={"dark-content"}>

        <>
          {
            plans.length > 0 ? plans.map((plan, index) => (

              <Block key={plan.id} pressable onPress={() => navigation.navigate('EXERCISE_ROOT', {
                screen: 'EXERCISE_DETAIL', params: { plan: plan.id }
              }
              )} style={{ fontSize: 12, }}>
                <Block pt-10 relative>

                  <AppImage url={images.exercise} height={150} width={"100%"} rounded-15 />
                  <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 150, borderRadius: 15 }} />
                  <Block absolute style={{ top: 20, right: 10 }} rounded-2 bg-white px-10 py-3>
                    <Text bold style={{ fontSize: 12, color: COLORS.primaryDark }}>{moment(plan.createdAt).format("LL")}</Text>
                  </Block>
                  <Block absolute style={{ bottom: 20, left: 10 }}>
                    <Text bold style={{ fontSize: 18, color: COLORS.white }}>{plan.Name}</Text>
                    <Text style={{ fontSize: 12, color: COLORS.white }}>{plan.exerciseGroup?.length} {t("common.exerciseGroups")}</Text>
                  </Block>

                </Block>
              </Block>)) : <Block py-30 style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: COLORS.flueGrey,
                borderRadius: 15,
              }}>
              <Text style={{ fontSize: 14 }}>common.noPlans</Text>
            </Block>}
        </>

      </AppScreen>
    </>
  );
};

export default ExerciseList;
