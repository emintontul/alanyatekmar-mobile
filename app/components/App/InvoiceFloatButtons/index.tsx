import React, {memo, useEffect, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
import {useSelector} from 'react-redux';

import {baseURL} from '@/api/config';
import {AppIcon, Block, Text} from '@/components';
import {useAppSelector, useTheme} from '@/hooks';
import {MainStackNavigationPropsType} from '@/navigation/stacks/MainStack/types';
import {RootState} from '@/store';
import {window} from '@/theme';
import {heightPixel, ICONS} from '@/utils';

interface InvoiceFloatingButtonProps {
  onClose: () => void;
  isVisible?: boolean;
  setIsVisible: (value: boolean) => void;
}

export const getAuthState = (state: RootState) => state.auth;
const InvoiceFloatingButton = ({onClose, isVisible, setIsVisible}: InvoiceFloatingButtonProps) => {
  const {colors} = useTheme();
  const bottomTranslateValue = useSharedValue(0);
  const opacity = useSharedValue(0);

  const navigation = useNavigation<MainStackNavigationPropsType>();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: bottomTranslateValue.value}],
      backgroundColor: `rgba(0, 0, 0, ${opacity.value})`,
    };
  });

  useEffect(() => {
    bottomTranslateValue.value = withSpring(isVisible ? 5 : window.height + 200, {
      damping: 30,
      stiffness: 300,
    });

    opacity.value = withTiming(isVisible ? 0.5 : 0, {
      duration: isVisible ? 500 : 180,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const [plans, setPlans] = useState([]);
  const {token} = useSelector(getAuthState);
  useEffect(() => {
    axios
      .get(baseURL + '/users/me?populate=*', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Cache-Control': 'no-cache',
        },
      })
      .then(response => {
        setPlans(response.data.plans);
      });
  }, []);
  const navigateToLastExercise = () => {
    navigation.navigate('EXERCISE_ROOT', {
      screen: 'EXERCISE_DETAIL',
      params: {
        plan: plans[0].id,
      },
    });
    setIsVisible(false);
  };
  const navigateToExerciseList = () => {
    navigation.navigate('EXERCISE_ROOT', {
      screen: 'EXERCISE_LIST',
    });
    setIsVisible(false);
  };
  return (
    <Block flex>
      <Animated.View style={[styles.animatedView, animatedStyles]}>
        <Block pressable flex onPress={onClose} pb-0 style={styles.menuGradient}>
          <Block justify-end flex center>
            <Block column pb-60 row>
              {plans.length > 0 && (
                <Block onPress={navigateToLastExercise} center pressable mr-8 rounded-8 w-163 bg-white p-20 row justify-between>
                  <Text buttonTitle>common.latestPlan</Text>
                  <AppIcon name={ICONS.RightArrow} size={24} color={colors.gray} />
                </Block>
              )}
              <Block
                onPress={navigateToExerciseList}
                bg-white
                rounded-8
                pressable
                center
                middle
                w-163
                p-20
                row
                style={{alignItems: 'flex-start', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text buttonTitle>common.trainingPrograms</Text>
                <AppIcon name={ICONS.RightArrow} size={24} color={colors.gray} />
              </Block>
            </Block>
          </Block>
        </Block>
      </Animated.View>
    </Block>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 70,
    ...Platform.select({
      ios: {
        bottom: 40,
      },
      android: {
        bottom: 20,
      },
    }),
  },
  menuGradient: {
    height: window.height,
  },
});

export default memo(InvoiceFloatingButton);
