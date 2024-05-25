import {ExerciseStackNavigationProps} from './types';
import routes from '../../Routes';
import {IScreen} from '../Models/IScreen';
import ReservationDetail from '@/screens/ReservationDetail';
import HowToDo from '@/screens/HowToDo';
import ExerciseList from '@/screens/ExerciseList';

const Screens: Array<IScreen<ExerciseStackNavigationProps>> = [
  {
    title: 'bottom_tab.reservation_detail',
    name: routes.RESERVATION_DETAIL,
    component: ReservationDetail,
    headerShown: true,
  },
  {
    title: 'bottom_tab.how_to_do',
    name: routes.HOW_TO_DO,
    component: HowToDo,
    headerShown: true,
  },

  {
    title: 'bottom_tab.exercise_list',
    name: routes.EXERCISE_LIST,
    component: ExerciseList,
    headerShown: true,
  },
];

export default Screens;
