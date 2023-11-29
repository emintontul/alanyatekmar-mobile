import React, {memo, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

import {Props} from './floating-action-button';

import {AppIcon, Block, Text} from '@/components';
import {useAppSelector} from '@/hooks';

function FloatingActionButton({isVisible = true, onPress = () => {}}: Props) {
  //#region Animation
  const bottomTranslateValue = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: bottomTranslateValue.value}],
    };
  });

  useEffect(() => {
    bottomTranslateValue.value = withSpring(isVisible ? 5 : 175);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);
  //#endregion

  const theme = useAppSelector(state => state.settings.theme);
  const shadowColors = theme === 'light' ? ['#00000000', '#000000B3', '#000000'] : ['#00000000', '#000000B3', '#000000'];

  return (
    <Animated.View style={[styles.animatedView, animatedStyles]}>
      <Block pressable style={styles.container} onPress={onPress}>
        <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} style={{width: '100%', borderRadius: 10}} style={styles.gradient}>
          <AppIcon name="plus" size={30} color="#fff" />
        </LinearGradient>
      </Block>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    bottom: 70,
    backgroundColor: 'transparent',
    right: 20,
    height: 60,
    width: 60,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: 'transparent',
    height: 60,
    width: 60,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default memo(FloatingActionButton);
