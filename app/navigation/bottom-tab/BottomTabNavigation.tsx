import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Host} from 'react-native-portalize';

import {BottomTabContainer} from './BottomTabContainer';
import {BottomTabItemList} from './BottomTabItems';

const Tab = createBottomTabNavigator();

/**
 * fade animate trasition navigation
 * @param {*} {current, closing}
 */
export const forFade = ({current}: {current: {progress: number}}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const BottomTabNavigation = () => {
  
  return (
    <Host>
      <Tab.Navigator tabBar={p => <BottomTabContainer {...p} />} options={{
                    gestureEnabled: false
                }}
>
        {BottomTabItemList.map(item => (
          <Tab.Screen key={item.name} options={{headerTitle: 'asdf', headerShown: item.headerShown}} name={item.name} component={item.component}  />
        ))}
      </Tab.Navigator>
    </Host>
  );
};
