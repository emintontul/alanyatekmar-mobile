/* eslint-disable @typescript-eslint/no-explicit-any */
import {baseApi as api} from './baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getAddressesSearch: build.query<GetAddressesSearchApiResponse, GetAddressesSearchApiArg>({
      query: queryArg => ({url: '/addresses/search', params: {key: queryArg}}),
    }),
    postAllowances: build.mutation<PostAllowancesApiResponse, PostAllowancesApiArg>({
      query: queryArg => ({url: '/allowances', method: 'POST', body: queryArg}),
    }),
    getAllowancesById: build.query<GetAllowancesByIdApiResponse, GetAllowancesByIdApiArg>({
      query: queryArg => ({url: `/allowances/${queryArg}`}),
    }),
    putAllowancesByIdApprove: build.mutation<PutAllowancesByIdApproveApiResponse, PutAllowancesByIdApproveApiArg>({
      query: queryArg => ({url: `/allowances/${queryArg.id}/approve`, method: 'PUT', body: queryArg.allowanceRequestModel}),
    }),
    putAllowancesByIdDeny: build.mutation<PutAllowancesByIdDenyApiResponse, PutAllowancesByIdDenyApiArg>({
      query: queryArg => ({url: `/allowances/${queryArg.id}/deny`, method: 'PUT'}),
    }),
    getAllowancesSender: build.query<GetAllowancesSenderApiResponse, GetAllowancesSenderApiArg>({
      query: queryArg => ({
        url: '/allowances/sender',
        params: {
          SenderCompanyId: queryArg.senderCompanyId,
          InvoiceNumber: queryArg.invoiceNumber,
          BillNo: queryArg.billNo,
          ReceiverName: queryArg.receiverName,
          Status: queryArg.status,
          Kind: queryArg.kind,
          StartDate: queryArg.startDate,
          EndDate: queryArg.endDate,
          AllowanceId: queryArg.allowanceId,
          Page: queryArg.page,
          PageSize: queryArg.pageSize,
          SortType: queryArg.sortType,
          Sort: queryArg.sort,
          TotalCount: queryArg.totalCount,
          IsExport: queryArg.isExport,
          ExtensionData: queryArg.extensionData,
        },
      }),
    }),
    getAllowancesApprove: build.query<GetAllowancesApproveApiResponse, GetAllowancesApproveApiArg>({
      query: queryArg => ({url: '/allowances/approve', params: {Kind: queryArg.kind, CompanyId: queryArg.companyId}}),
    }),
    putAllowancesApprove: build.mutation<PutAllowancesApproveApiResponse, PutAllowancesApproveApiArg>({
      query: queryArg => ({url: '/allowances/approve', method: 'PUT', params: {Kind: queryArg.kind, CompanyId: queryArg.companyId}}),
    }),
    getAllowancesAccept: build.query<GetAllowancesAcceptApiResponse, GetAllowancesAcceptApiArg>({
      query: queryArg => ({url: '/allowances/accept', params: {Kind: queryArg.kind, CompanyId: queryArg.companyId}}),
    }),
    putAllowancesAccept: build.mutation<PutAllowancesAcceptApiResponse, PutAllowancesAcceptApiArg>({
      query: queryArg => ({url: '/allowances/accept', method: 'PUT', params: {Kind: queryArg}}),
    }),
    getAllowancesCompanies: build.query<GetAllowancesCompaniesApiResponse, GetAllowancesCompaniesApiArg>({
      query: queryArg => ({
        url: '/allowances/companies',
        params: {
          SenderCompanyId: queryArg.senderCompanyId,
          ReceiverCompanyId: queryArg.receiverCompanyId,
          NotifyBuyer: queryArg.notifyBuyer,
          Currency: queryArg.currency,
          AllowanceKind: queryArg.allowanceKind,
          Invoices: queryArg.invoices,
        },
      }),
    }),
    getAllowancesByAllowanceIdFinancers: build.query<GetAllowancesByAllowanceIdFinancersApiResponse, GetAllowancesByAllowanceIdFinancersApiArg>({
      query: queryArg => ({url: `/allowances/${queryArg.allowanceId}/financers`}),
    }),
    putAllowancesByAllowanceIdFinancersAndIdAccept: build.mutation<PutAllowancesByAllowanceIdFinancersAndIdAcceptApiResponse, PutAllowancesByAllowanceIdFinancersAndIdAcceptApiArg>({
      query: queryArg => ({url: `/allowances/${queryArg.allowanceId}/financers/${queryArg.id}/accept`, method: 'PUT'}),
    }),
    getAllowancesByAllowanceIdInvoices: build.query<GetAllowancesByAllowanceIdInvoicesApiResponse, GetAllowancesByAllowanceIdInvoicesApiArg>({
      query: queryArg => ({url: `/allowances/${queryArg.allowanceId}/invoices`, params: {ReceiverIdentifier: queryArg.receiverIdentifier, ReceiverName: queryArg.receiverName}}),
    }),
    getAllowancesByAllowanceIdOrders: build.query<GetAllowancesByAllowanceIdOrdersApiResponse, GetAllowancesByAllowanceIdOrdersApiArg>({
      query: queryArg => ({url: `/allowances/${queryArg}/orders`}),
    }),
    postCompaniesSignup: build.mutation<PostCompaniesSignupApiResponse, PostCompaniesSignupApiArg>({
      query: queryArg => ({url: '/companies/signup', method: 'POST', body: queryArg}),
    }),
    getCompaniesByCompanyIdFinancerLimit: build.query<GetCompaniesByCompanyIdFinancerLimitApiResponse, GetCompaniesByCompanyIdFinancerLimitApiArg>({
      query: queryArg => ({url: `/companies/${queryArg.companyId}/FinancerLimit`, params: {CompanyId: queryArg.CompanyId, FinancerId: queryArg.financerId}}),
    }),
    getOfficialHolidays: build.query<GetOfficialHolidaysApiResponse, GetOfficialHolidaysApiArg>({
      query: queryArg => ({
        url: '/definitions/officialHolidays',
        params: {
          year: queryArg.year,
        },
      }),
    }),
    getCompaniesByCompanyIdDefinitions: build.query<GetCompaniesByCompanyIdDefinitionsApiResponse, GetCompaniesByCompanyIdDefinitionsApiArg>({
      query: queryArg => ({
        url: `/companies/${queryArg.companyId}/definitions`,
        params: {
          CompanyId: queryArg.CompanyId,
          SenderCompanyId: queryArg.senderCompanyId,
          ReceiverCompanyId: queryArg.receiverCompanyId,
          FinancerId: queryArg.financerId,
          NotifyBuyer: queryArg.notifyBuyer,
        },
      }),
    }),
    getCompaniesByCompanyIdDefinitionsState: build.query<GetCompaniesByCompanyIdDefinitionsStateApiResponse, GetCompaniesByCompanyIdDefinitionsStateApiArg>({
      query: queryArg => ({url: `/companies/${queryArg.companyId}/definitions/state`, params: {NotifyBuyer: queryArg.notifyBuyer, CompanyId: queryArg.CompanyId}}),
    }),
    getCompaniesSettingsLogo: build.query<GetCompaniesSettingsLogoApiResponse, GetCompaniesSettingsLogoApiArg>({
      query: queryArg => ({url: '/companies/Settings/Logo', params: {CompanyType: queryArg}}),
    }),
    getDocuments: build.query<GetDocumentsApiResponse, GetDocumentsApiArg>({
      query: queryArg => ({url: '/documents', params: {ReceiverCompanyId: queryArg.receiverCompanyId, SenderCompanyId: queryArg.senderCompanyId, AllowanceId: queryArg.allowanceId}}),
    }),
    getDocumentsAllowanceByAllowanceIdAbfAndFinancerId: build.query<GetDocumentsAllowanceByAllowanceIdAbfAndFinancerIdApiResponse, GetDocumentsAllowanceByAllowanceIdAbfAndFinancerIdApiArg>({
      query: queryArg => ({url: `/documents/allowance/${queryArg.allowanceId}/abf/${queryArg.financerId}`}),
    }),
    getInvoices: build.query<GetInvoicesApiResponse, GetInvoicesApiArg>({
      query: queryArg => ({
        url: '/invoices',
        params: {
          Id: queryArg.id,
          Status: queryArg.status,
          InvoiceNumber: queryArg.invoiceNumber,
          MinRemainingAmount: queryArg.minRemainingAmount,
          MaxRemainingAmount: queryArg.maxRemainingAmount,
          ReceiverIdentifier: queryArg.receiverIdentifier,
          ReceiverName: queryArg.receiverName,
          SenderName: queryArg.senderName,
          StartPaymentDate: queryArg.startPaymentDate,
          EndPaymentDate: queryArg.endPaymentDate,
          StartIssueDate: queryArg.startIssueDate,
          EndIssueDate: queryArg.endIssueDate,
          StartDate: queryArg.startDate,
          EndDate: queryArg.endDate,
          MinPayableAmount: queryArg.minPayableAmount,
          MaxPayableAmount: queryArg.maxPayableAmount,
          PayableAmountCurrency: queryArg.payableAmountCurrency,
          Type: queryArg.type,
          SerialNumber: queryArg.serialNumber,
          SequenceNumber: queryArg.sequenceNumber,
          SenderCompanyId: queryArg.senderCompanyId,
          SenderIdentifier: queryArg.senderIdentifier,
          Party: queryArg.party,
          ReceiverCompanyId: queryArg.receiverCompanyId,
          NotifyBuyer: queryArg.notifyBuyer,
          ProfileId: queryArg.profileId,
          AvailableType: queryArg.availableType,
          IsDeleted: queryArg.isDeleted,
          CurrencyId: queryArg.currencyId,
          IsConcentration: queryArg.isConcentration,
          Page: queryArg.page,
          PageSize: queryArg.pageSize,
          SortType: queryArg.sortType,
          Sort: queryArg.sort,
          TotalCount: queryArg.totalCount,
          IsExport: queryArg.isExport,
          ExtensionData: queryArg.extensionData,
        },
      }),
    }),
    getInvoicesById: build.query<GetInvoicesByIdApiResponse, GetInvoicesByIdApiArg>({
      query: queryArg => ({url: `/invoices/${queryArg}`}),
    }),
    getInvoicesByIdAllowances: build.query<GetInvoicesByIdAllowancesApiResponse, GetInvoicesByIdAllowancesApiArg>({
      query: queryArg => ({url: `/invoices/${queryArg}/allowances`}),
    }),
    getLogs: build.query<GetLogsApiResponse, GetLogsApiArg>({
      query: queryArg => ({url: '/logs', params: {AllowanceId: queryArg}}),
    }),
    postPaymentsPay: build.mutation<PostPaymentsPayApiResponse, PostPaymentsPayApiArg>({
      query: queryArg => ({url: '/payments/pay', method: 'POST', body: queryArg}),
    }),
    putPaymentsPay: build.mutation<PutPaymentsPayApiResponse, PutPaymentsPayApiArg>({
      query: queryArg => ({url: '/payments/pay', method: 'PUT', body: queryArg}),
    }),
    getPaymentsCards: build.query<GetPaymentsCardsApiResponse, GetPaymentsCardsApiArg>({
      query: queryArg => ({url: '/payments/cards', params: {RequireCcv: queryArg}}),
    }),
    deletePaymentsCards: build.mutation<DeletePaymentsCardsApiResponse, DeletePaymentsCardsApiArg>({
      query: queryArg => ({url: '/payments/cards', method: 'DELETE', params: {CToken: queryArg}}),
    }),
    getPayments: build.query<GetPaymentsApiResponse, GetPaymentsApiArg>({
      query: queryArg => ({
        url: '/payments',
        params: {
          ReferenceId: queryArg.referenceId,
          OperationType: queryArg.operationType,
          CompanyId: queryArg.companyId,
          Page: queryArg.page,
          PageSize: queryArg.pageSize,
          SortType: queryArg.sortType,
          Sort: queryArg.sort,
          TotalCount: queryArg.totalCount,
          IsExport: queryArg.isExport,
          ExtensionData: queryArg.extensionData,
        },
      }),
    }),
    postPaymentsType: build.mutation<PostPaymentsTypeApiResponse, PostPaymentsTypeApiArg>({
      query: queryArg => ({url: '/payments/type', method: 'POST', body: queryArg}),
    }),
    getPaymentRequests: build.query<GetPaymentRequestsApiResponse, GetPaymentRequestsApiArg>({
      query: queryArg => ({url: '/paymentRequests', params: {allowanceId: queryArg}}),
    }),
    postSessions: build.mutation<PostSessionsApiResponse, PostSessionsApiArg>({
      query: queryArg => ({url: '/sessions', method: 'POST', body: queryArg}),
    }),
    getSessionsVerify: build.query<GetSessionsVerifyApiResponse, GetSessionsVerifyApiArg>({
      query: () => ({url: '/sessions/verify'}),
    }),
    postSessionsAuthenticationCode: build.mutation<PostSessionsAuthenticationCodeApiResponse, PostSessionsAuthenticationCodeApiArg>({
      query: queryArg => ({url: '/sessions/authenticationCode', method: 'POST', body: queryArg}),
    }),
    getStatsAllowanceStatus: build.query<GetStatsAllowanceStatusApiResponse, GetStatsAllowanceStatusApiArg>({
      query: queryArg => ({url: '/stats/allowanceStatus', params: {ActivityType: queryArg.activityType, StartDate: queryArg.startDate, EndDate: queryArg.endDate}}),
    }),
    getSubscriptionCheck: build.query<GetSubscriptionCheckApiResponse, GetSubscriptionCheckApiArg>({
      query: () => ({url: '/subscription/check'}),
    }),
    putUsersPassword: build.mutation<PutUsersPasswordApiResponse, PutUsersPasswordApiArg>({
      query: queryArg => ({url: '/users/password', method: 'PUT', body: queryArg}),
    }),
    putUsersUpdatePassword: build.mutation<PutUsersUpdatePasswordApiResponse, PutUsersUpdatePasswordApiArg>({
      query: queryArg => ({url: '/users/updatePassword', method: 'PUT', body: queryArg}),
    }),
    getUserPositions: build.query<GetUserPositionsApiResponse, GetUserPositionsApiArg>({
      query: () => ({url: '/userPositions'}),
    }),
  }),
  overrideExisting: false,
});
export {injectedRtkApi as kingdomApi};
export type GetAddressesSearchApiResponse = unknown;
export type GetAddressesSearchApiArg = string;
export type PostAllowancesApiResponse = /** status 200 Success */ AllowanceCreateResponseModel;
export type PostAllowancesApiArg = AllowanceRequestModel;
export type GetAllowancesByIdApiResponse = /** status 200 Success */ AllowanceResponseModel;
export type GetAllowancesByIdApiArg = number;
export type PutAllowancesByIdApproveApiResponse = /** status 200 Success */ AllowanceApproveResponseModel;
export type PutAllowancesByIdApproveApiArg = {
  id: number;
  allowanceRequestModel: AllowanceRequestModel;
};
export type PutAllowancesByIdDenyApiResponse = /** status 200 Success */ AllowanceDenyResponseModel;
export type PutAllowancesByIdDenyApiArg = {
  id: number;
  companyId: number;
  userId: number;
};
export type GetAllowancesSenderApiResponse = /** status 200 Success */ AllowanceListResponseModel;
export type GetAllowancesSenderApiArg = {
  senderCompanyId?: number;
  invoiceNumber?: string;
  billNo?: string;
  receiverName?: string;
  status?: number;
  kind?: number;
  startDate?: string;
  endDate?: string;
  allowanceId?: number;
  page?: number;
  pageSize?: number;
  sortType?: string;
  sort?: string;
  totalCount?: number;
  isExport?: boolean;
  extensionData?: string;
};
export type GetAllowancesApproveApiResponse = /** status 200 Success */ AllowanceSummaryResponseModel[];
export type GetAllowancesApproveApiArg = {
  kind?: number;
  companyId?: number;
};
export type PutAllowancesApproveApiResponse = /** status 200 Success */ AllowanceApproveResponseModel;
export type PutAllowancesApproveApiArg = {
  kind?: number;
  companyId?: number;
};
export type GetAllowancesAcceptApiResponse = /** status 200 Success */ AllowanceSummaryResponseModel[];
export type GetAllowancesAcceptApiArg = {
  kind?: number;
  companyId?: number;
};
export type PutAllowancesAcceptApiResponse = /** status 200 Success */ AllowanceFinancerAcceptResponseModel;
export type PutAllowancesAcceptApiArg = number;
export type GetAllowancesCompaniesApiResponse = /** status 200 Success */ SearchFinancerCompanyByAllowanceResponseModel[];
export type GetAllowancesCompaniesApiArg = {
  senderCompanyId?: number;
  receiverCompanyId?: number;
  notifyBuyer?: number;
  currency?: string;
  allowanceKind?: number;
  invoices?: number[];
};
export type GetAllowancesByAllowanceIdFinancersApiResponse = /** status 200 Success */ AllowanceFinancerResponseModel[];
export type GetAllowancesByAllowanceIdFinancersApiArg = {
  allowanceId: number;
  senderCompanyId: number;
};
export type PutAllowancesByAllowanceIdFinancersAndIdAcceptApiResponse = /** status 200 Success */ AllowanceFinancerAcceptResponseModel;
export type PutAllowancesByAllowanceIdFinancersAndIdAcceptApiArg = {
  allowanceId: number;
  id: number;
};
export type GetAllowancesByAllowanceIdInvoicesApiResponse = /** status 200 Success */ AllowanceInvoiceReponseModel[];
export type GetAllowancesByAllowanceIdInvoicesApiArg = {
  allowanceId: number;
  receiverIdentifier?: string;
  receiverName?: string;
};
export type GetAllowancesByAllowanceIdOrdersApiResponse = /** status 200 Success */ OrderGetResponseModel;
export type GetAllowancesByAllowanceIdOrdersApiArg = number;
export type PostCompaniesSignupApiResponse = /** status 200 Success */ CompanyAndUserResponseModel;
export type PostCompaniesSignupApiArg = CompanyAndUserRequestModel;
export type GetCompaniesByCompanyIdFinancerLimitApiResponse = /** status 200 Success */ GetCompanyLimitResponseModel;
export type GetCompaniesByCompanyIdFinancerLimitApiArg = {
  companyId: number;
  CompanyId?: number;
  financerId?: number;
};
export type GetCompaniesByCompanyIdDefinitionsApiResponse = /** status 200 Success */ CompanyDefinitionResponseModel[];
export type GetCompaniesByCompanyIdDefinitionsApiArg = {
  companyId: number;
  CompanyId?: number;
  senderCompanyId?: number;
  receiverCompanyId?: number;
  financerId?: number;
  notifyBuyer?: number;
};
export type GetOfficialHolidaysApiResponse = /** status 200 Success */ OfficialHolidayResponseModel;
export type GetOfficialHolidaysApiArg = {
  year: number;
};
export type GetCompaniesByCompanyIdDefinitionsStateApiResponse = /** status 200 Success */ CompanyDefinitionCheckResponseModel;
export type GetCompaniesByCompanyIdDefinitionsStateApiArg = {
  companyId: number;
  notifyBuyer?: number;
  CompanyId?: number;
};
export type GetCompaniesSettingsLogoApiResponse = /** status 200 Success */ SearchCompanySettingsResponseModel;
export type GetCompaniesSettingsLogoApiArg = CompanyTypes;
export type GetDocumentsApiResponse = /** status 200 Success */ DocumentResponseModel[];
export type GetDocumentsApiArg = {
  receiverCompanyId?: number;
  senderCompanyId?: number;
  allowanceId?: number;
};
export type GetDocumentsAllowanceByAllowanceIdAbfAndFinancerIdApiResponse = /** status 200 Success */ File;
export type GetDocumentsAllowanceByAllowanceIdAbfAndFinancerIdApiArg = {
  allowanceId: number;
  financerId: number;
};
export type GetInvoicesApiResponse = /** status 200 Success */ InvoiceSearchResponseModel;
export type GetInvoicesApiArg = {
  id?: number;
  status?: number;
  invoiceNumber?: string;
  minRemainingAmount?: number;
  maxRemainingAmount?: number;
  receiverIdentifier?: string;
  receiverName?: string;
  senderName?: string;
  startPaymentDate?: string;
  endPaymentDate?: string;
  startIssueDate?: string;
  endIssueDate?: string;
  startDate?: string;
  endDate?: string;
  minPayableAmount?: number;
  maxPayableAmount?: number;
  payableAmountCurrency?: string;
  type?: number;
  serialNumber?: string;
  sequenceNumber?: string;
  senderCompanyId?: number;
  senderIdentifier?: string;
  party?: InvoiceParty;
  receiverCompanyId?: number;
  notifyBuyer?: number;
  profileId?: string;
  availableType?: number;
  isDeleted?: number;
  currencyId?: number;
  isConcentration?: boolean;
  page?: number;
  pageSize?: number;
  sortType?: string;
  sort?: string;
  totalCount?: number;
  isExport?: boolean;
  extensionData?: string;
};
export type GetInvoicesByIdApiResponse = /** status 200 Success */ InvoiceResponseModel;
export type GetInvoicesByIdApiArg = number;
export type GetInvoicesByIdAllowancesApiResponse = /** status 200 Success */ AllowanceResponseModel[];
export type GetInvoicesByIdAllowancesApiArg = number;
export type GetLogsApiResponse = /** status 200 Success */ GetAllowanceLogsResponseModel;
export type GetLogsApiArg = number;
export type PostPaymentsPayApiResponse = /** status 200 Success */ PayCreditCardResponseModel;
export type PostPaymentsPayApiArg = PaymentRequestModel;
export type PutPaymentsPayApiResponse = /** status 200 Success */ BaseResponseModel;
export type PutPaymentsPayApiArg = PaymentUpdateRequestModel;
export type GetPaymentsCardsApiResponse = /** status 200 Success */ CreditCardResponseModel[];
export type GetPaymentsCardsApiArg = boolean;
export type DeletePaymentsCardsApiResponse = /** status 200 Success */ DeleteCardResponseModel;
export type DeletePaymentsCardsApiArg = string;
export type GetPaymentsApiResponse = /** status 200 Success */ PaymentStatusPageResponseModel;
export type GetPaymentsApiArg = {
  referenceId?: number;
  operationType?: PaymentOperationType;
  companyId?: number;
  page?: number;
  pageSize?: number;
  sortType?: string;
  sort?: string;
  totalCount?: number;
  isExport?: boolean;
  extensionData?: string;
};
export type PostPaymentsTypeApiResponse = /** status 200 Success */ GetPaymentTypeResponseModel[];
export type PostPaymentsTypeApiArg = GetPaymentTypeRequestModel;
export type GetPaymentRequestsApiResponse = /** status 200 Success */ PaymentRequestGetResponseModel[];
export type GetPaymentRequestsApiArg = number;
export type PostSessionsApiResponse = /** status 200 Success */ LoginResponseModel;
export type PostSessionsApiArg = LoginRequestModel;
export type GetSessionsVerifyApiResponse = /** status 200 Success */ GetVersionResponseModel;
export type GetSessionsVerifyApiArg = void;
export type PostSessionsAuthenticationCodeApiResponse = /** status 200 Success */ LoginAuthenticationCodeResponseModel;
export type PostSessionsAuthenticationCodeApiArg = LoginAuthenticationCodeRequestModel;
export type GetStatsAllowanceStatusApiResponse = /** status 200 Success */ StatsAllowanceStatusGroupResponseModel[];
export type GetStatsAllowanceStatusApiArg = {
  activityType?: number;
  startDate?: string;
  endDate?: string;
};
export type GetSubscriptionCheckApiResponse = /** status 200 Success */ SubscriptionCheckPaymentResponseModel;
export type GetSubscriptionCheckApiArg = void;
export type PutUsersPasswordApiResponse = /** status 200 Success */ UserResetPasswordResponseModel;
export type PutUsersPasswordApiArg = UserResetPasswordRequestModel;
export type PutUsersUpdatePasswordApiResponse = /** status 200 Success */ UserUpdatePasswordResponseModel;
export type PutUsersUpdatePasswordApiArg = UserUpdatePasswordRequestModel;
export type GetUserPositionsApiResponse = /** status 200 Success */ PositionGetResponseModel[];
export type GetUserPositionsApiArg = void;
export type AllowanceCreateResponseModel = {
  id?: number;
};
export type ExceptionResponseModel = {
  code?: string | null;
  title?: string | null;
  friendlyMessage?: string | null;
  exceptionMessage?: string | null;
};
export type AllowanceStatus = 0 | 1 | 2 | 10 | 20 | 30 | 40 | 50 | 60 | 61 | 70 | 71 | 72 | 80;
export type AllowanceInvoiceRequestModel = {
  id?: number;
  invoiceId?: number;
  allowanceId?: number;
  payableAmount?: number;
  payableAmountCurrency?: string | null;
  paymentDueDate?: string | null;
  approvedPayableAmount?: number | null;
  approvedPaymentDueDate?: string | null;
  userId?: number;
  insertDatetime?: string | null;
  status?: AllowanceStatus;
  statusDesciption?: string | null;
  invoiceNumber?: string | null;
  serialNumber?: string | null;
  sequenceNumber?: string | null;
  isDeleted?: number;
  invoicePayableAmount?: number;
  bidPayableAmount?: number;
  bidAmount?: number | null;
  receiverName?: string | null;
  receiverIdentifier?: string | null;
  extraSenderInterest?: number | null;
  extraInvoiceDueDay?: number | null;
  documentExist?: number;
  kdvRate?: number | null;
  paymentDueDay?: number;
  allowanceDay?: number;
  currencyId?: number;
  receiverInvoiceScore?: number;
};
export type AllowanceBillRequestModel = {
  id?: number;
  billId?: number;
  allowanceId?: number;
  payableAmount?: number;
  paymentDueDate?: string | null;
  billNo?: string | null;
  drawerName?: string | null;
  endorserName?: string | null;
  drawerIdentifier?: string | null;
  endorserIdentifier?: string | null;
  bankEftCode?: string | null;
  bankName?: string | null;
  bankBranchEftCode?: string | null;
  bankBranchName?: string | null;
  chequeAccountNo?: string | null;
  userId?: number;
};
export type AllowanceOrderRequestModel = {
  id?: number;
  orderId?: number;
  allowanceId?: number;
  payableAmount?: number;
  payableAmountCurrency?: string | null;
  approvedPayableAmount?: number | null;
  approvedPaymentDueDate?: string | null;
  orderNo?: string | null;
  userId?: number;
  invoices?: number[] | null;
  isQuarantee?: number | null;
};
export type FinancerAllowanceStatus = 800 | 810 | 830 | 840 | 850 | 860 | 870 | 880 | 890 | 900 | 910 | 950;
export type AllowanceFinancerBidRequestModel = {
  id?: number;
  allowanceFinancerId?: number;
  dueDayCount?: number;
  allowanceId?: number;
  allowanceInvoiceId?: number | null;
  allowanceBillId?: number | null;
  payableAmount?: number;
  extraDueDayCount?: number;
  payableAmountCurrency?: string | null;
  bidAmount?: number;
  bidAmountCurrency?: string | null;
  interestRate?: number | null;
  interestAmount?: number | null;
  bsmvAmount?: number | null;
  kdvAmount?: number | null;
  paidAmount?: number;
  userId?: number;
  insertDateTime?: string | null;
  status?: number;
  invoiceNumber?: string | null;
  serialNumber?: string | null;
  sequenceNumber?: string | null;
  billNo?: string | null;
  getInvoiceNumber?: string | null;
};
export type AllowanceFinancerRequestModel = {
  id?: number;
  allowanceId?: number;
  companyId?: number;
  totalPayableAmount?: number | null;
  totalBidAmount?: number | null;
  payableAmountCurrency?: string | null;
  valueDate?: number;
  invoiceValueDate?: number;
  interestRate?: number | null;
  totalInterestAmount?: number | null;
  totalBsmvAmount?: number | null;
  totalKdvAmount?: number | null;
  interestMethodType?: number | null;
  costAmount?: number | null;
  costRate?: number | null;
  commissionAmount?: number | null;
  commissionRate?: number | null;
  bidAmountCurrency?: string | null;
  bidDueDate?: string | null;
  totalPaidAmount?: number | null;
  isWinner?: number;
  status?: FinancerAllowanceStatus;
  statusDescription?: string | null;
  companyIdentifier?: string | null;
  companyName?: string | null;
  companyLogo?: string | null;
  bids?: AllowanceFinancerBidRequestModel[] | null;
  rebateAmount?: number | null;
  extraDueDayCount?: number | null;
  receiverInterestRate?: number | null;
  receiverInterestType?: number | null;
  allowanceDueTime?: string | null;
  kdv?: number | null;
  avgDueDay?: number;
  bidAvgDueDay?: number;
  userId?: number;
  abfId?: number | null;
};
export type AllowanceRequestModel = {
  validate?: boolean;
  id?: number;
  senderCompanyId?: number;
  receiverCompanyId?: number | null;
  allowanceDueDate?: string | null;
  totalPayableAmount?: number | null;
  payableAmountCurrency?: string | null;
  notifyBuyer?: number;
  status?: AllowanceStatus;
  statusDescription?: string | null;
  statusDate?: string | null;
  userId?: number;
  totalInvoiceCount?: number;
  totalApprovedPayableAmount?: number | null;
  type?: number | null;
  kind?: number;
  avgDueDayCount?: number | null;
  companyBankAccountId?: number | null;
  allowanceInvoices?: AllowanceInvoiceRequestModel[] | null;
  allowanceBills?: AllowanceBillRequestModel[] | null;
  allowanceOrder?: AllowanceOrderRequestModel;
  allowanceFinancers?: AllowanceFinancerRequestModel[] | null;
  currencyId?: number;
  isAuto?: boolean;
  insertedDate?: string;
  companyId?: number;
  companyFinancerTemplateId?: number | null;
};
export type AllowanceResponseModel = {
  id?: number;
  senderCompanyId?: number;
  receiverCompanyId?: number | null;
  allowanceDueDate?: string | null;
  totalPayableAmount?: number | null;
  payableAmountCurrency?: string | null;
  totalInvoiceCount?: number;
  totalApprovedPayableAmount?: number | null;
  notifyBuyer?: number;
  type?: number | null;
  status?: AllowanceStatus;
  statusDescription?: string | null;
  statusDate?: string | null;
  insertDatetime?: string | null;
  userId?: number;
  senderCompanyName?: string | null;
  senderCompanyIdentifier?: string | null;
  receiverCompanyName?: string | null;
  receiverCompanyIdentifier?: string | null;
  kind?: number;
  avgDueDayCount?: number | null;
  companyBankAccountId?: number | null;
  companyBankAccountIban?: string | null;
  isQuarantee?: number | null;
  transactionFee?: number | null;
  allInvoiceIsPaymentApproved?: boolean;
};
export type AllowanceApproveResponseModel = {
  isSuccess?: boolean;
};
export type AllowanceDenyResponseModel = {
  isSuccess?: boolean;
};
export type AllowanceListResponseModel = {
  page?: number;
  pageSize?: number;
  sortType?: string | null;
  sort?: string | null;
  totalCount?: number;
  isExport?: boolean;
  extensionData?: string | null;
  allowances?: AllowanceResponseModel[] | null;
};
export type AllowanceSummaryResponseModel = {
  amount?: number | null;
  count?: number | null;
  allowanceIds?: number[] | null;
  currency?: string | null;
};
export type AllowanceFinancerAcceptResponseModel = {
  isSuccess?: boolean;
};
export type CompanyPaymentDaysResponseModel = {
  id?: number;
  day?: string | null;
};
export type CompanyAllowanceFinancerDetailResponseModel = {
  invoiceId?: number;
  isAvailable?: boolean;
  message?: string | null;
};
export type SearchFinancerCompanyByAllowanceResponseModel = {
  id?: number;
  identifier?: string | null;
  type?: number | null;
  firstName?: string | null;
  middleName?: string | null;
  familyName?: string | null;
  companyName?: string | null;
  logo?: string | null;
  dayConstant?: number;
  chequeAllowed?: number | null;
  orderAllowed?: number | null;
  calculateType?: number | null;
  isAvailable?: boolean;
  message?: string | null;
  paymentDays?: CompanyPaymentDaysResponseModel[] | null;
  invoices?: CompanyAllowanceFinancerDetailResponseModel[] | null;
  paymentDates?: string[] | null;
};
export type AllowanceFinancerBidResponseModel = {
  id?: number;
  allowanceFinancerId?: number;
  allowanceId?: number;
  allowanceInvoiceId?: number | null;
  allowanceBillId?: number | null;
  payableAmount?: number;
  payableAmountCurrency?: string | null;
  bidAmount?: number;
  bidAmountCurrency?: string | null;
  interestRate?: number | null;
  interestAmount?: number | null;
  bsmvAmount?: number | null;
  kdvAmount?: number | null;
  paidAmount?: number;
  userId?: number;
  insertDateTime?: string | null;
  status?: number;
  invoiceNumber?: string | null;
  serialNumber?: string | null;
  sequenceNumber?: string | null;
  billNo?: string | null;
  dueDayCount?: number;
  extraDueDayCount?: number;
  kdvRate?: number | null;
  invoiceId?: number;
};
export type AllowanceFinancerResponseModel = {
  id?: number;
  allowanceId?: number;
  companyId?: number;
  totalPayableAmount?: number | null;
  totalBidAmount?: number | null;
  payableAmountCurrency?: string | null;
  valueDate?: number;
  invoiceValueDate?: number;
  interestRate?: number | null;
  totalInterestAmount?: number | null;
  totalBsmvAmount?: number | null;
  totalKdvAmount?: number | null;
  interestMethodType?: number | null;
  costAmount?: number | null;
  costRate?: number | null;
  commissionAmount?: number | null;
  commissionRate?: number | null;
  bidAmountCurrency?: string | null;
  bidDueDate?: string | null;
  totalPaidAmount?: number | null;
  isWinner?: number;
  status?: FinancerAllowanceStatus;
  statusDescription?: string | null;
  companyIdentifier?: string | null;
  companyName?: string | null;
  companyLogo?: string | null;
  rebateAmount?: number | null;
  extraDueDayCount?: number | null;
  receiverInterestRate?: number | null;
  receiverInterestType?: number | null;
  allowanceDueTime?: string | null;
  kdv?: number | null;
  avgDueDay?: number;
  bidAvgDueDay?: number;
  companyFinancerTemplateId?: number | null;
  bids?: AllowanceFinancerBidResponseModel[] | null;
  isIbanRequired?: boolean | null;
};
export type EInvoiceTypes = 1 | 2;
export type InvoiceTypes = 1 | 2;
export type AllowanceInvoiceReponseModel = {
  id?: number;
  invoiceId?: number;
  allowanceId?: number;
  payableAmount?: number;
  payableAmountCurrency?: string | null;
  paymentDueDate?: string | null;
  approvedPayableAmount?: number | null;
  approvedPaymentDueDate?: string | null;
  userId?: number | null;
  insertDatetime?: string | null;
  status?: AllowanceStatus;
  statusDescription?: string | null;
  invoiceNumber?: string | null;
  serialNumber?: string | null;
  sequenceNumber?: string | null;
  isDeleted?: number;
  invoicePayableAmount?: number;
  bidPayableAmount?: number;
  bidAmount?: number | null;
  receiverName?: string | null;
  receiverIdentifier?: string | null;
  extraSenderInterest?: number | null;
  extraInvoiceDueDay?: number | null;
  documentExist?: number;
  hashCode?: string | null;
  isPaid?: boolean;
  isGibApproved?: boolean | null;
  gibCheckDate?: string | null;
  systemRate?: number;
  financerRate?: number;
  systemAmount?: number;
  financerAmount?: number;
  issueDate?: string | null;
  spread?: number;
  eInvoiceType?: EInvoiceTypes;
  invoiceType?: InvoiceTypes;
  taxFreeAmount?: number | null;
  eInvoiceTypeDescription?: string | null;
  invoiceTypeDescription?: string | null;
  extraValueDay?: number | null;
  senderIdentifier?: string | null;
  dueDayCount?: number | null;
};
export type OrderGetResponseModel = {
  id?: number;
  payableAmount?: number;
  remainingAmount?: number;
  orderNo?: string | null;
  receiverIdentifier?: string | null;
  receiverCompanyId?: number | null;
  receiverName?: string | null;
  senderIdentifier?: string | null;
  senderCompanyId?: number;
  senderName?: string | null;
  paymentDueDay?: number;
  allowanceDay?: number;
  startInvoiceIssueDate?: string;
  endInvoiceIssueDate?: string;
  payableAmountCurrency?: string | null;
};
export type CompanyActivityType = 1 | 2 | 3;
export type CompanyVerify = 0 | 1 | 2 | 3;
export type LanguageResponseModel = {
  id?: number;
  name?: string | null;
  code?: string | null;
  cultureCode?: string | null;
  isDefault?: boolean;
  isActive?: boolean;
  image?: string | null;
};
export type LoginUserResponseModel = {
  id?: number;
  userIdentifier?: string | null;
  identifier?: string | null;
  userName?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  userPhone?: string | null;
  birthDate?: string | null;
  type?: number;
  CompanyId?: number;
  companyName?: string | null;
  companyType?: number;
  activityType?: CompanyActivityType;
  companyVerify?: CompanyVerify;
  signedContract?: number | null;
  language?: LanguageResponseModel;
  authorities?: string[] | null;
  companyAddress?: string | null;
  companyMailAdress?: string | null;
  companyPhone?: string | null;
  companyTaxOffice?: string | null;
  companyDistrictId?: number | null;
  companyDistrictName?: string | null;
  SubscriptionExpireDate?: string | null;
  ProfilePictureUrl?: string | null;
};
export type CompanyAndUserResponseModel = {
  token?: string | null;
  user?: LoginUserResponseModel;
};
export type UserCreateRequestModel = {
  identifier?: string | null;
  companyId?: number;
  userName?: string | null;
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  consent?: number;
  isLocked?: number;
  type?: number;
  birthDate?: string | null;
  userPositionId?: number | null;
  languageId?: number | null;
  passwordStatusType?: number | null;
  password?: string | null;
};
export type CompanyLimitationRequestModel = {
  id?: number;
  invoiceAmount?: number;
  invoiceCount?: number;
  day?: number;
};
export type CompanyRequestModel = {
  identifier: string;
  type?: number;
  firstName?: string | null;
  middleName?: string | null;
  familyName?: string | null;
  companyName?: string | null;
  taxOffice?: string | null;
  taxOfficeCode?: string | null;
  status?: number;
  logo?: string | null;
  bsmv?: number;
  dayConstant?: number;
  chequeAllowed?: number;
  signedContract?: number | null;
  creatorIpAddress?: string | null;
  bankCode?: string | null;
  insertDateTime?: string;
  allowanceDueTime?: string | null;
  userId?: number | null;
  calculateType?: number | null;
  activityType?: CompanyActivityType;
  address?: string | null;
  phone?: string | null;
  mailAddress?: string | null;
  verify?: CompanyVerify;
  verifiedDate?: string | null;
  limit?: CompanyLimitationRequestModel;
  isTest?: boolean;
  utm?: string | null;
  isAutoSenderFirstApprove?: boolean | null;
  districtId?: number | null;
  userPositionId?: number | null;
};
export type CompanyAndUserRequestModel = {
  user?: UserCreateRequestModel;
  company?: CompanyRequestModel;
};
export type GetCompanyLimitResponseModel = {
  totalLimit?: number;
  totalActiveLimit?: number;
  maxInvoiceDueDay?: number;
  estimatedFinancerLimit?: number;
  estimatedSystemLimit?: number;
  financerActiveLimit?: number;
  systemActiveLimit?: number;
  totalFinancerLimit?: number;
  totalSystemLimit?: number;
  financerIdentifier?: string | null;
  companyName?: string | null;
  financerCompanyName?: string | null;
};
export type CompanyDefinitionResponseModel = {
  id?: number;
  senderCompanyId?: number | null;
  receiverCompanyId?: number | null;
  firstApprove?: number;
  lastApprove?: number;
  notifyBuyer?: number;
  senderIdentifier?: string | null;
  receiverIdentifier?: string | null;
  receiverCompanyName?: string | null;
  companyCategoryId?: number | null;
  partialAllowance?: number;
  senderInvoiceUpload?: number;
  isBidViewable?: boolean | null;
  senderCancel?: number;
  companyCategoryCode?: string | null;
  senderBankAccountUpdate?: number | null;
  senderCompanyName?: string | null;
};
export type OfficialHolidayResponseModel = {
  IsSuccess?: boolean;
  OfficialHolidays?: OfficialHolidayModel[];
};
export type OfficialHolidayModel = {
  Id?: number;
  Date?: Date;
  Description?: string;
};
export type CompanyDefinitionCheckResponseModel = {
  result?: boolean;
};
export type CompanySettingLogoResponseModel = {
  id?: number;
  companyLogo?: string | null;
};
export type SearchCompanySettingsResponseModel = {
  isSuccess?: boolean;
  items?: CompanySettingLogoResponseModel[] | null;
};
export type CompanyTypes = 0 | 1 | 2 | 3 | 4 | 5;
export type DocumentStatus = 0 | 1 | 3 | 4 | 5 | 6 | 7 | 8;
export type DocumentResponseModel = {
  id?: number;
  labelId?: number;
  labelDescription?: string | null;
  senderCompanyId?: number;
  receiverCompanyId?: number | null;
  allowanceId?: number | null;
  name?: string | null;
  type?: string | null;
  isSigned?: number;
  insertDatetime?: string | null;
  labelName?: string | null;
  receiverCompanies?: number[] | null;
  receiverCompanyName?: string | null;
  senderCompanyName?: string | null;
  status?: DocumentStatus;
  message?: string | null;
  periodYear?: number | null;
  periodMonth?: number | null;
  periodQuarter?: number | null;
  senderIdentifier?: string | null;
  expireDate?: string | null;
  originalFileName?: string | null;
};
export type File = object;
export type InvoiceResponseModel = {
  id?: number;
  senderCompanyId?: number;
  receiverCompanyId?: number | null;
  uuId?: string | null;
  envUuId?: string | null;
  invoiceNumber?: string | null;
  customerInvoiceNumber?: string | null;
  senderIdentifier?: string | null;
  senderName?: string | null;
  receiverIdentifier?: string | null;
  receiverName?: string | null;
  insertedDate?: string;
  profileId?: string | null;
  paymentDueDate?: string | null;
  invoiceTypeCode?: string | null;
  documentCurrency?: string | null;
  payableAmount?: number;
  payableAmountCurrency?: string | null;
  issueDate?: string | null;
  issueTime?: string | null;
  userId?: number;
  expireDate?: string | null;
  hashCode?: string | null;
  type?: number;
  status?: number;
  serialNumber?: string | null;
  sequenceNumber?: string | null;
  operationType?: number | null;
  usageType?: number | null;
  bankOperationType?: number | null;
  isSampleInvoice?: number | null;
  remainingAmount?: number;
  approvedPayableAmount?: number;
  deductionAmount?: number | null;
  balanceAmount?: number | null;
  receiverErpInvoiceCode?: string | null;
  isDeleted?: number | null;
  extraSenderInterest?: number | null;
  documentExist?: number;
  kdvRate?: number | null;
  eInvoiceType?: EInvoiceTypes;
  taxFreeAmount?: number | null;
  isGibApproved?: boolean | null;
  gibApproveDate?: string | null;
  gibMessage?: string | null;
  paymentDate?: string | null;
  currencyId?: number;
};
export type InvoiceSearchResponseModel = {
  page?: number;
  pageSize?: number;
  sortType?: string | null;
  sort?: string | null;
  totalCount?: number;
  isExport?: boolean;
  extensionData?: string | null;
  invoices?: InvoiceResponseModel[] | null;
};
export type InvoiceParty = 1 | 2;
export type LogResponseModel = {
  id?: number;
  type?: number | null;
  allowanceId?: number | null;
  shortDescription?: string | null;
  description?: string | null;
  companyId?: number | null;
  userId?: number | null;
  data?: any | null;
  typeDescription?: string | null;
};
export type GetAllowanceLogsResponseModel = {
  logs?: LogResponseModel[] | null;
};
export type PayCreditCardResponseModel = {
  isSuccess?: boolean;
  merchantId?: string | null;
  orderNumber?: string | null;
  email?: string | null;
  paymentType?: string | null;
  amount?: string | null;
  installmentCount?: number;
  currency?: string | null;
  ip?: string | null;
  testMode?: string | null;
  non3D?: string | null;
  userName?: string | null;
  address?: string | null;
  phone?: string | null;
  basket?: string | null;
  non3DTestFailed?: string | null;
  debugOn?: string | null;
  token?: string | null;
  baseAmount?: number;
  discountAmount?: number;
};
export type PaymentOperationType = 0 | 1 | 3 | 4 | 5;
export type PaymentRequestModel = {
  companyId?: number;
  referenceIds?: number[] | null;
  operationType?: PaymentOperationType;
  ip?: string | null;
};
export type BaseResponseModel = {
  isSuccess?: boolean;
};
export type PaymentUpdateRequestModel = {
  orderNumber?: string | null;
};
export type CreditCardResponseModel = {
  ctoken?: string | null;
  last4?: string | null;
  month?: string | null;
  year?: string | null;
  cBank?: string | null;
  requireCvv?: string | null;
  cName?: string | null;
  cBrand?: string | null;
  cType?: string | null;
  businessCard?: string | null;
  uToken?: string | null;
};
export type DeleteCardResponseModel = {
  isSuccess?: boolean;
  message?: string | null;
};
export type PaymentStatus = 1 | 2 | 3 | 4 | 5 | 6;
export type PaymentDetailResponseModel = {
  id?: number;
  createdDate?: string;
  referenceId?: number;
  description?: string | null;
  amount?: number;
  returnedAmount?: number;
  paymentId?: number;
  paymentStatus?: PaymentStatus;
  paymentStatusDescription?: string | null;
  discountAmount?: number;
};
export type PaymentStatusResponseModel = {
  isSuccess?: boolean;
  status?: PaymentStatus;
  statusName?: string | null;
  description?: string | null;
  paymentDate?: string | null;
  amount?: number;
  orderNumber?: string | null;
  paymentOperationType?: PaymentOperationType;
  paymentOperationTypeName?: string | null;
  paymentId?: number;
  details?: PaymentDetailResponseModel[] | null;
  returnAmount?: number | null;
  totalDiscountAmount?: number;
};
export type PaymentStatusPageResponseModel = {
  page?: number;
  pageSize?: number;
  sortType?: string | null;
  sort?: string | null;
  totalCount?: number;
  isExport?: boolean;
  extensionData?: string | null;
  items?: PaymentStatusResponseModel[] | null;
};
export type PaymentType = 1 | 2 | 3;
export type OperationChargeStatus = 0 | 1 | 2 | 3 | 4 | 6;
export type GetPaymentTypeDetailResponseModel = {
  id?: number;
  invoiceId?: number | null;
  invoicePayableAmount?: number;
  transactionFee?: number;
  transactionFeeInfo?: number | null;
  percentFeeInfo?: number | null;
  minAmountInfo?: number;
  maxAmountInfo?: number;
  invoiceNumber?: string | null;
  billId?: number | null;
};
export type GetPaymentTypeResponseModel = {
  isSuccess?: boolean;
  paymentType?: PaymentType;
  description?: string | null;
  amount?: number;
  paymentDate?: string | null;
  financerCompanyId?: number | null;
  financerCompanyName?: string | null;
  statusDescription?: string | null;
  status?: OperationChargeStatus;
  referenceId?: number;
  details?: GetPaymentTypeDetailResponseModel[] | null;
  discountAmount?: number | null;
};
export type GetPaymentTypeRequestModel = {
  companyId?: number;
  referenceIds?: number[] | null;
  operationType?: PaymentOperationType;
};
export type PaymentRequestGetResponseModel = {
  id?: number;
  invoiceId?: number;
  allowanceId?: number | null;
  invoiceNumber?: string | null;
  serialNumber?: string | null;
  sequenceNumber?: string | null;
  no?: string | null;
  payableAmount?: number | null;
  approvedAmount?: number | null;
  deductionAmount?: number | null;
  remainingAmount?: number | null;
};
export type LoginResponseModel = {
  Token?: string;
  user?: LoginUserResponseModel;
};
export type LoginRequestModel = {
  identifier?: string | null;
  userName?: string | null;
  password?: string | null;
  consent?: number | null;
  userAgent?: string | null;
  businessPartnerCompanyId?: number | null;
  authenticationCode?: string | null;
};
export type GetVersionResponseModel = {
  version?: any | null;
};
export type LoginAuthenticationCodeResponseModel = {
  isSuccess?: boolean;
  isTwoFactorAuthenticationIsActive?: boolean;
  userContact?: string | null;
  user?: LoginUserResponseModel;
  consent?: number | null;
};
export type LoginAuthenticationCodeRequestModel = {
  identifier?: string | null;
  userName?: string | null;
  password?: string | null;
};
export type StatsAllowanceStatusGroupResponseModel = {
  status?: number | null;
  statusDescription?: string | null;
  count?: number;
};
export type SubscriptionCheckPaymentResponseModel = {
  message?: string | null;
  success?: boolean;
};
export type UserResetPasswordResponseModel = {
  isSuccess?: boolean;
};
export type UserResetPasswordRequestModel = {
  identifier?: string | null;
  userName?: string | null;
  email?: string | null;
};
export type UserUpdatePasswordResponseModel = {
  isSuccess?: boolean;
};
export type UserUpdatePasswordRequestModel = {
  identifier?: string | null;
  userName?: string | null;
  lastPassword?: string | null;
  newPassword?: string | null;
  userId?: number;
  accessToken?: string | null;
  pwdExpDate?: string | null;
  passwordUpdatedDate?: string | null;
  failedLoginCount?: number;
  passwordStatusType?: number;
};
export type PositionGetResponseModel = {
  id?: number;
  name?: string | null;
};
export const {
  useGetAddressesSearchQuery,
  useLazyGetAddressesSearchQuery,
  usePostAllowancesMutation,
  useGetAllowancesByIdQuery,
  useLazyGetAllowancesByIdQuery,
  usePutAllowancesByIdApproveMutation,
  usePutAllowancesByIdDenyMutation,
  useGetAllowancesSenderQuery,
  useLazyGetAllowancesSenderQuery,
  useGetAllowancesApproveQuery,
  useLazyGetAllowancesApproveQuery,
  usePutAllowancesApproveMutation,
  useGetAllowancesAcceptQuery,
  useLazyGetAllowancesAcceptQuery,
  usePutAllowancesAcceptMutation,
  useGetAllowancesCompaniesQuery,
  useLazyGetAllowancesCompaniesQuery,
  useGetAllowancesByAllowanceIdFinancersQuery,
  useLazyGetAllowancesByAllowanceIdFinancersQuery,
  usePutAllowancesByAllowanceIdFinancersAndIdAcceptMutation,
  useGetAllowancesByAllowanceIdInvoicesQuery,
  useLazyGetAllowancesByAllowanceIdInvoicesQuery,
  useGetAllowancesByAllowanceIdOrdersQuery,
  useLazyGetAllowancesByAllowanceIdOrdersQuery,
  usePostCompaniesSignupMutation,
  useGetCompaniesByCompanyIdFinancerLimitQuery,
  useLazyGetCompaniesByCompanyIdFinancerLimitQuery,
  useGetCompaniesByCompanyIdDefinitionsQuery,
  useLazyGetCompaniesByCompanyIdDefinitionsQuery,
  useGetCompaniesByCompanyIdDefinitionsStateQuery,
  useLazyGetCompaniesByCompanyIdDefinitionsStateQuery,
  useGetCompaniesSettingsLogoQuery,
  useLazyGetCompaniesSettingsLogoQuery,
  useGetDocumentsQuery,
  useLazyGetDocumentsQuery,
  useGetDocumentsAllowanceByAllowanceIdAbfAndFinancerIdQuery,
  useLazyGetDocumentsAllowanceByAllowanceIdAbfAndFinancerIdQuery,
  useGetInvoicesQuery,
  useLazyGetInvoicesQuery,
  useGetInvoicesByIdQuery,
  useLazyGetInvoicesByIdQuery,
  useGetInvoicesByIdAllowancesQuery,
  useLazyGetInvoicesByIdAllowancesQuery,
  useGetLogsQuery,
  useLazyGetLogsQuery,
  usePostPaymentsPayMutation,
  usePutPaymentsPayMutation,
  useGetPaymentsCardsQuery,
  useLazyGetPaymentsCardsQuery,
  useDeletePaymentsCardsMutation,
  useGetPaymentsQuery,
  useLazyGetPaymentsQuery,
  usePostPaymentsTypeMutation,
  useGetPaymentRequestsQuery,
  useLazyGetPaymentRequestsQuery,
  usePostSessionsMutation,
  useGetSessionsVerifyQuery,
  useLazyGetSessionsVerifyQuery,
  usePostSessionsAuthenticationCodeMutation,
  useGetStatsAllowanceStatusQuery,
  useLazyGetStatsAllowanceStatusQuery,
  useGetSubscriptionCheckQuery,
  useLazyGetSubscriptionCheckQuery,
  usePutUsersPasswordMutation,
  usePutUsersUpdatePasswordMutation,
  useGetUserPositionsQuery,
  useLazyGetUserPositionsQuery,
  useGetOfficialHolidaysQuery,
  useLazyGetOfficialHolidaysQuery,
} = injectedRtkApi;
