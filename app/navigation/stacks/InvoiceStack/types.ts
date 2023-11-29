import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Routes from '@/navigation/Routes';
import {Keyof} from '@/utils';

export type InvoiceStackNavigationProps = {
  [Routes.INVOICES]: undefined;
};

export type InvoiceStackNavigationPropsType = StackNavigationProp<InvoiceStackNavigationProps>;

export type InvoiceStackNavigationRouteType<TPageName extends Keyof<InvoiceStackNavigationProps>> = RouteProp<InvoiceStackNavigationProps, TPageName>;
