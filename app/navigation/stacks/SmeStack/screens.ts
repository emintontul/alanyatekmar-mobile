import {SmeStackNavigationProps} from './types';
import routes from '../../Routes';
import {IScreen} from '../Models/IScreen';

import {RequestDetail, SmeCreateRequest, SmeInvoices} from '@/screens';

const Screens: Array<IScreen<SmeStackNavigationProps>> = [
  {
    title: 'sme.finance_invoices',
    name: routes.SME_INVOICES_MAIN,
    component: SmeInvoices,
    headerShown: true,
  },
  {
    title: 'sme.create_request',
    name: routes.SME_CREATE_REQUEST,
    component: SmeCreateRequest,
    headerShown: true,
  },
  {
    title: 'sme.request_detail',
    name: routes.REQUEST_DETAIL,
    component: RequestDetail,
    headerShown: true,
  },
];

export default Screens;
