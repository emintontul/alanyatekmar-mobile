import React, {FC} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import screens from './screens';
import {PaymentStackNavigationProps} from './types';
import {createNavigationOptions} from '../../header/DefaultHeader';
import {IScreen} from '../Models/IScreen';

const Stack = createStackNavigator<PaymentStackNavigationProps>();

const PaymentStack: FC = () => {
  return (
    <Stack.Navigator>
      {screens.map((screen: IScreen<PaymentStackNavigationProps>, index: number) => (
        <Stack.Screen key={index} name={screen.name} component={screen.component} options={props => createNavigationOptions({screen, ...props})} />
      ))}
    </Stack.Navigator>
  );
};

export default PaymentStack;
