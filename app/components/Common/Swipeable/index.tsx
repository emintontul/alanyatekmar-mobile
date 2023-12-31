import React, {memo} from 'react';
import {Animated, StyleSheet} from 'react-native';

import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {Props, SwipItem} from './swipeable';
import AppIcon from '../AppIcon';

import {Block, Text} from '@/components';

function ISwipeable({leftItems, rightItems, children}: Props) {
  const renderLeftActions = (progress: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <React.Fragment>
        {leftItems?.length > 0 && (
          <React.Fragment>
            {leftItems.map((item: SwipItem, index: number) => (
              <RectButton key={index} onPress={item.onPress} style={[{backgroundColor: item?.background ?? '#388e3c'}, styles.leftAction]}>
                <Animated.View
                  style={[
                    styles.actionText,
                    {
                      transform: [{scale: trans}],
                    },
                  ]}>
                  <Block middle center>
                    {item?.icon && <AppIcon name={item.icon.name} size={item.icon.size ?? 20} color={item.icon.color} />}

                    <Text style={item.textColor ? {color: item.textColor, ...item?.titleStyle} : {...item?.titleStyle}}>{item.text}</Text>
                  </Block>
                </Animated.View>
              </RectButton>
            ))}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  const renderRightActions = (progress: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <React.Fragment>
        {rightItems?.length > 0 && (
          <React.Fragment>
            {rightItems.map((item: SwipItem, index: number) => (
              <RectButton key={index} onPress={item.onPress} style={[{backgroundColor: item?.background ?? 'red'}, styles.rightAction, {
                borderRadius: 10,
                marginLeft: 10,
                overflow: 'hidden'}]}>
                <Animated.View
                  style={[
                    styles.actionText,
                    {
                      transform: [{scale: trans}],
                    },
                  ]}>
                  <Block middle center rounded-8>
                    {item?.icon && <AppIcon name={item.icon.name} size={item.icon.size ?? 20} color={item.icon.color} />}

                    <Text bold style={item.textColor ? {color: item.textColor, ...item?.titleStyle} : {...item?.titleStyle}}>{item.text}</Text>
                  </Block>
                </Animated.View>
              </RectButton>
            ))}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  return (
    <Swipeable renderLeftActions={renderLeftActions} renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  leftAction: {
    justifyContent: 'center',
  },
  rightAction: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  actionText: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default memo(ISwipeable);
