import React, {FC} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import screens from './screens';
import {AdminStackNavigationProps} from './types';
import {createNavigationOptions} from '../../header/DefaultHeader';
import {IScreen} from '../Models/IScreen';

const Stack = createStackNavigator<AdminStackNavigationProps>();

const AdminStack: FC = () => {
  return (
    <Stack.Navigator>
      {screens.map((screen: IScreen<AdminStackNavigationProps>, index: number) => (
        <Stack.Screen key={index} name={screen.name} component={screen.component} options={props => createNavigationOptions({screen, ...props})} />
      ))}
    </Stack.Navigator>
  );
};

export default AdminStack;
