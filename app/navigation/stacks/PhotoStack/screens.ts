import {PhotoStackNavigationProps} from './types';
import routes from '../../Routes';
import {IScreen} from '../Models/IScreen';

import PhotoList from '@/screens/Photos';

const Screens: Array<IScreen<PhotoStackNavigationProps>> = [
  {
    title: 'bottom_tab.photo_list',
    name: routes.PHOTO_LIST,
    component: PhotoList,
    headerShown: true,
  },
];

export default Screens;
