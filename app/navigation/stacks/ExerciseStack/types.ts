import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Routes from '@/navigation/Routes';
import {Keyof} from '@/utils';

export type ExerciseStackNavigationProps = {
  [Routes.EXERCISE_DETAIL]: undefined;
};

export type ExerciseStackNavigationPropsType = StackNavigationProp<ExerciseStackNavigationProps>;

export type ExerciseStackNavigationRouteType<TPageName extends Keyof<ExerciseStackNavigationProps>> = RouteProp<ExerciseStackNavigationProps, TPageName>;
