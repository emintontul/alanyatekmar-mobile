import {RequestStackNavigationProps} from './types';
import routes from '../../Routes';
import {IScreen} from '../Models/IScreen';

import {Requests} from '@/screens';

const Screens: Array<IScreen<RequestStackNavigationProps>> = [
  {
    title: 'bottom_tab.requests',
    name: routes.REQUESTS,
    component: Requests,
    headerShown: true,
  },
];

export default Screens;
