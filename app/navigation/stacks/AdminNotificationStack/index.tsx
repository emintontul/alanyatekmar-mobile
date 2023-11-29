import React, {FC} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import screens from './screens';
import {AdminNotificationStackNavigationProps} from './types';
import {createNavigationOptions} from '../../header/DefaultHeader';
import {IScreen} from '../Models/IScreen';

const Stack = createStackNavigator<AdminNotificationStackNavigationProps>();

const AdminNotificationStack: FC = () => {
  return (
    <Stack.Navigator>
      {screens.map((screen: IScreen<AdminNotificationStackNavigationProps>, index: number) => (
        <Stack.Screen key={index} name={screen.name} component={screen.component} options={props => createNavigationOptions({screen, ...props})} />
      ))}
    </Stack.Navigator>
  );
};

export default AdminNotificationStack;
