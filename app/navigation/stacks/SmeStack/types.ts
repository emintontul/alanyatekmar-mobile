import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Routes from '@/navigation/Routes';
import {IFinancementInvoices, Keyof} from '@/utils';

export type SME_INVOICES_NESTED_SCREENS = typeof Routes.SME_INVOICES_MAIN | typeof Routes.SME_CREATE_REQUEST;

export type SmeStackNavigationProps = {
  [Routes.SME_INVOICES_MAIN]: undefined;
  [Routes.SME_CREATE_REQUEST]:
    | {
        initialPage?: number;
      }
    | undefined;
  [Routes.REQUEST_DETAIL]: {
    item: IFinancementInvoices;
  };
};

export type SmeStackNavigationPropsType = StackNavigationProp<SmeStackNavigationProps>;

export type SmeStackNavigationRouteType<TPageName extends Keyof<SmeStackNavigationProps>> = RouteProp<SmeStackNavigationProps, TPageName>;
