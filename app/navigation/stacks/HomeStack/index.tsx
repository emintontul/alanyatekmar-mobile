import React, {FC} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import screens from './screens';
import {HomeStackNavigationProps} from './types';
import {createNavigationOptions} from '../../header/DefaultHeader';
import {IScreen} from '../Models/IScreen';

const Stack = createStackNavigator<HomeStackNavigationProps>();

const HomeStack: FC = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      {screens.map((screen: IScreen<HomeStackNavigationProps>, index: number) => (
        <Stack.Screen key={index} name={screen.name} component={screen.component} options={props => createNavigationOptions({screen, t, ...props})} />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
