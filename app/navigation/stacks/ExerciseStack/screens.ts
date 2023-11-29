import {ExerciseStackNavigationProps} from './types';
import routes from '../../Routes';
import {IScreen} from '../Models/IScreen';
import ExerciseDetail from '@/screens/ExerciseDetail';
import HowToDo from '@/screens/HowToDo';
import ExerciseList from '@/screens/ExerciseList';

const Screens: Array<IScreen<ExerciseStackNavigationProps>> = [
  {
    title: 'bottom_tab.exercise_detail',
    name: routes.EXERCISE_DETAIL,
    component: ExerciseDetail,
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
