import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, AsyncStorage, SafeAreaView, ScrollView, StatusBar, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

import {baseURL} from '@/api/config';
import {AppButton, AppFlatList, AppIcon, AppImage, AppScreen, Block, SegmentedControl, SegmentView, Shadow, Text} from '@/components';
import {NextArrowsvg} from '@/components/icons';
import {useAppSelector} from '@/hooks';
import {RootState} from '@/store';
import {COLORS, SIZES} from '@/theme';

export const getAuthState = (state: RootState) => state.auth;
const ExerciseDetail = context => {
  const navigation = useNavigation();
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const {params} = context.route;
  const {token} = useSelector(getAuthState);
  const [meals, setMeals] = useState({});
  useEffect(() => {
    setLoading(true);
    // find plan in async storage
    AsyncStorage.getItem('plans')
      .then(value => {
        if (value) {
          const plans = JSON.parse(value);
          const planIndex = plans.findIndex(x => x.id == params.plan);
          if (planIndex != -1 && moment(plans[planIndex].date).isSame(new Date(), 'day')) {
            setMeals(plans[planIndex]);
            setPlan(plans[planIndex].plan);
            setLoading(false);
          } else {
            throw new Error('Plan not found in async storage');
          }
        } else {
          setLoading(false);
          throw new Error('Plan not found in async storage');
        }
      })
      .catch(error => {
        axios
          .get(baseURL + '/plans/' + params.plan + '?populate[0]=exerciseGroup&populate[1]=exerciseGroup.Egzersiz&populate[2]=exerciseGroup.Egzersiz.exercise', {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then(response => {
            const plan = response.data.data.attributes;
            setPlan(plan);
            setLoading(false);
            const _meals = [];
            plan.exerciseGroup.map(exerciseGroup => {
              const meal = {
                id: exerciseGroup.id,
                label: exerciseGroup.Title,
                selected: false,
                // add setStatus to exercise
                exercises: exerciseGroup.Egzersiz.map(exercise => {
                  return {
                    id: exercise.id,
                    exercise: exercise.exercise,
                    SetTekrar: exercise.SetTekrar,
                    setStatus: false,
                  };
                }),
              };
              _meals.push(meal);
            });

            setMeals({
              meals: _meals,
              id: params.plan,
              date: new Date(),
            });
            // Check async storage if exists update it else create new one
            AsyncStorage.getItem('plans').then(value => {
              if (value) {
                const plans = JSON.parse(value);
                const planIndex = plans.findIndex(x => x.id == params.plan);
                if (planIndex != -1) {
                  plans[planIndex] = {
                    meals: _meals,
                    id: params.plan,
                    plan: plan,
                    date: new Date(),
                  };
                } else {
                  plans.push({
                    meals: _meals,
                    id: params.plan,
                    plan: plan,
                    date: new Date(),
                  });
                }
                AsyncStorage.setItem('plans', JSON.stringify(plans));
              } else {
                AsyncStorage.setItem(
                  'plans',
                  JSON.stringify([
                    {
                      meals: _meals,
                      id: params.plan,
                      date: new Date(),
                    },
                  ]),
                );
              }
            });
          })
          .catch(error => {});
      });
  }, []);

  const handleChange = (el, mealId) => {
    const temp = [...meals.meals];
    const clickedExercises = temp.find(x => x.id == mealId).exercises.find(item => item.id == el.id);

    clickedExercises.setStatus = !clickedExercises.setStatus;
    setMeals({
      meals: temp,
      id: params.plan,
      date: new Date(),
    });
    // find plan in async storage
    AsyncStorage.getItem('plans').then(value => {
      if (value) {
        const plans = JSON.parse(value);
        const planIndex = plans.findIndex(x => x.id == params.plan);
        if (planIndex != -1) {
          plans[planIndex] = {
            meals: temp,
            id: params.plan,
            plan: plan,
            date: new Date(),
          };
        } else {
          plans.push({
            meals: temp,
            id: params.plan,
            plan: plan,
            date: new Date(),
          });
        }
        AsyncStorage.setItem('plans', JSON.stringify(plans));
      } else {
        AsyncStorage.setItem(
          'plans',
          JSON.stringify([
            {
              meals: temp,
              id: params.plan,
              date: new Date(),
            },
          ]),
        );
      }
    });
  };

  const [activeTab, setActiveTab] = useState<number>(0);
  const navigationOptions = {
    headerTitle: () => (
      <Text sectionTitleDark bold>
        {plan?.Name}
      </Text>
    ),
    headerTransparent: false,
    headerStyle: {
      backgroundColor: COLORS.white,
      shadowColor: 'transparent',
      elevation: 0,
    },
    animationEnabled: true,
  };
  const onFinish = () => {
    // remove from async storage
    AsyncStorage.getItem('plans').then(value => {
      if (value) {
        const plans = JSON.parse(value);
        const planIndex = plans.findIndex(x => x.id == params.plan);
        if (planIndex != -1) {
          plans.splice(planIndex, 1);
        }
        AsyncStorage.setItem('plans', JSON.stringify(plans));
      }
    });
    navigation.navigate('HOME_MAIN');
  };
  return (
    <>
      {loading ? (
        <Block center middle flex={1}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </Block>
      ) : (
        <AppScreen navigationOptions={navigationOptions} barStyle={'dark-content'} px-0 py-0>
          {meals?.meals && (
            <SegmentView containerMargin={0} type="light" segments={meals?.meals} activeTab={activeTab} setActiveTab={setActiveTab} navigationOptions={navigationOptions}>
              {meals?.meals.map((item, index) => (
                <React.Fragment key={index}>
                  {meals?.meals.map(
                    (item, index) =>
                      activeTab == index &&
                      item.exercises.map(el => (
                        <Block mx-15 key={el.id} mt-10 borderWidth={1} borderColor={COLORS.lightGrey} rounded-15 p-12>
                          <Block row center style={{justifyContent: 'space-between'}}>
                            <Text bold style={{fontSize: 18}}>
                              {el.exercise?.data?.attributes?.Name}
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate('HOW_TO_DO', {
                                  exercise: el.exercise,
                                })
                              }
                              style={{flexDirection: 'row', alignItems: 'center'}}>
                              <Text mr-7 style={{fontSize: 15, color: COLORS.lightGray}}>
                                common.how_to_do
                              </Text>
                              <NextArrowsvg width="13" height="13" color={COLORS.lightGray} />
                            </TouchableOpacity>
                          </Block>

                          <Text style={{fontSize: 15, color: COLORS.lightGray}} mt-5 bold>
                            {el.SetTekrar}
                          </Text>

                          {/* <Block mt-15 row>
                {el.setStatus.map((item, index) => (
                  <Block key={index} mr-6 center>
                    <Block
                      pressable
                      onPressIn={() => {
                        handleChange(el, index);
                      }}
                      width={35}
                      height={35}
                      backgroundColor={
                        el.setStatus[index] == el.value
                          ? COLORS.successGreen
                          : COLORS.flueGrey
                      }
                      borderRadius={100}
                      middle
                      center>
                      <Text>
                        {el.setStatus[index] < el.value &&
                          el.setStatus[index]}

                        {el.setStatus[index] == el.value && (
                          <Success width="22" height="22" color={"#fff"} />
                        )}

                        {el.setStatus[index] > el.value &&
                          el.setStatus[index] - 1}
                      </Text>
                    </Block>
                  </Block>
                ))}
              </Block> */}
                          <Block mt-15 row center>
                            {!el.setStatus ? (
                              <Block pressable onPress={() => handleChange(el, item.id)} row center>
                                <AppIcon name="check" color={COLORS.lightGray} />
                                <Text style={{fontSize: 15, color: COLORS.lightGray}} bold>
                                  common.set_as_completed
                                </Text>
                              </Block>
                            ) : (
                              <Block pressable onPress={() => handleChange(el, item.id)} row center>
                                <AppIcon name="check" color={COLORS.success} />
                                <Text style={{fontSize: 15, color: COLORS.success, fontStyle: 'italic'}} bold>
                                  common.set_completed
                                </Text>
                              </Block>
                            )}
                          </Block>
                        </Block>
                      )),
                  )}

                  <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} height={56} style={{borderRadius: 10, marginHorizontal: 15, marginTop: 15}} middle center>
                    <AppButton h-50 onPress={onFinish} mt-0 type={'transparent'} title={'exercise.finish_exercise'} />
                  </LinearGradient>
                </React.Fragment>
              ))}
            </SegmentView>
          )}
        </AppScreen>
      )}
    </>
  );
};

export default ExerciseDetail;
