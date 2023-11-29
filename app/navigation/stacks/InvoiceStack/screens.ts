import {InvoiceStackNavigationProps} from './types';
import routes from '../../Routes';
import {IScreen} from '../Models/IScreen';

import {Invoices} from '@/screens';

const Screens: Array<IScreen<InvoiceStackNavigationProps>> = [
  {
    title: 'bottom_tab.invoices',
    name: routes.INVOICES,
    component: Invoices,
    headerShown: true,
  },
];

export default Screens;
