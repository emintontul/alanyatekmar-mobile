import {ProfileStackNavigationProps} from './types';
import routes from '../../Routes';
import {IScreen} from '../Models/IScreen';

import {Profile} from '@/screens';

const Screens: Array<IScreen<ProfileStackNavigationProps>> = [
  {
    title: 'bottom_tab.profile',
    name: routes.PROFILE,
    component: Profile,
    headerShown: true,
  },
];

export default Screens;
