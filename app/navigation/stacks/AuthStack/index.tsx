import React, {FC} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import screens from './screens';
import {AuthStackNavigationProps} from './types';
import {createNavigationOptions} from '../../header/DefaultHeader';
import {IScreen} from '../Models/IScreen';

const Stack = createStackNavigator<AuthStackNavigationProps>();

const AuthStack: FC = () => {
  return (
    <Stack.Navigator>
      {screens.map((screen: IScreen<AuthStackNavigationProps>, index: number) => {
        return <Stack.Screen key={index} name={screen.name} component={screen.component} options={props => createNavigationOptions({screen, ...props})} />;
      })}
    </Stack.Navigator>
  );
};

export default AuthStack;
