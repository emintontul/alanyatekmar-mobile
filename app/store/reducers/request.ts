import {createSlice} from '@reduxjs/toolkit';

export interface ICreateRequestBody {
  allowanceInvoices: AllowanceInvoice[];
  allowanceFinancers: Array<{CompanyId: number}>;
}

export interface AllowanceInvoice {
  RemainingAmount: number;
  InvoiceId: number;
  PayableAmount: number;
  PayableAmountCurrency: 'TRY' | 'EUR';
  KdvRate: number | null | undefined;
  PaymentDueDate: string;
}

export interface IRequestState {
  totalAmount: number;
  createRequestBody: ICreateRequestBody;
}

export const initialState: IRequestState = {
  totalAmount: 0,
  createRequestBody: {
    allowanceInvoices: [],
    allowanceFinancers: [],
  },
};

const requestSlice = createSlice({
  name: 'requestSlice',
  initialState,
  reducers: {
    reset: (state: IRequestState) => {
      state.createRequestBody = {
        allowanceInvoices: [],
        allowanceFinancers: [],
      };
      state.totalAmount = 0;
    },
    setAllowenceInvoices: (state: IRequestState, action) => {
      const {item, isAdd, invoices} = action.payload;

      const temp = {...state} as IRequestState;

      if (invoices) {
        temp.createRequestBody.allowanceInvoices = invoices.allowanceInvoices;
        state = temp;
        return;
      }

      if (isAdd) {
        temp.createRequestBody.allowanceInvoices = [...(state.createRequestBody.allowanceInvoices || []), item];
        state.totalAmount = state.createRequestBody.allowanceInvoices.reduce((acc, curr) => acc + curr.RemainingAmount, 0);
      } else {
        temp.createRequestBody.allowanceInvoices = state.createRequestBody.allowanceInvoices?.filter(r => r?.InvoiceId !== item?.InvoiceId);
        state.totalAmount = (state.createRequestBody.allowanceInvoices || []).reduce((acc, curr) => acc + curr.PayableAmount, 0);
      }
      state = temp;
    },
    setAllowenceFinancer: (state: IRequestState, action) => {
      const temp = {...state};

      temp.createRequestBody.allowanceFinancers = [
        {
          CompanyId: action.payload,
        },
      ];
    },
  },
});

const {actions, reducer} = requestSlice;
export const {reset, setAllowenceInvoices, setAllowenceFinancer} = actions;

export default reducer;
