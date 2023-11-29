import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Routes from '@/navigation/Routes';
import {IRequestCard, Keyof} from '@/utils';

export type RequestStackNavigationProps = {
  [Routes.REQUESTS]: undefined;
  [Routes.REQUEST_DETAIL]: {item: IRequestCard};
};

export type RequestStackNavigationPropsType = StackNavigationProp<RequestStackNavigationProps>;

export type RequestStackNavigationRouteType<TPageName extends Keyof<RequestStackNavigationProps>> = RouteProp<RequestStackNavigationProps, TPageName>;
