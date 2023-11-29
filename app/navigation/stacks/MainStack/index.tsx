import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {random} from 'lodash';

import screens from './screens';
import {MainStackNavigationProps} from './types';

import Dialog from '@/components/Common/Dialog';
import Routes from '@/navigation/Routes';

/**
 * fade animate trasition navigation
 * @param {*} {current, closing}
 */
export const forFade = ({current}: {current: {progress: number}}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator<MainStackNavigationProps>();

const MainStack = () => {
  return (
    <Stack.Navigator>
      {screens.map(screen => (
        <Stack.Screen
          key={`${random(1000)}_main_stack_screen`}
          component={screen.component}
          name={screen.name}
          options={{
            ...screen.options,
          }}
        />
      ))}
      <Stack.Group screenOptions={{presentation: 'transparentModal', headerShown: false}}>
        <Stack.Screen
          name={Routes.ALERT}
          component={Dialog}
          options={{
            cardStyleInterpolator: forFade,
            cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.7)'},
            gestureEnabled: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStack;
