export interface IAllowancesCompanies {
  Id?: number;
  id?: number;
  Type?: string;
  CompanyName?: string;
  Logo?: string;
  isAvailable?: boolean;
  Invoices?: Array<IFinancementInvoices>;
}

export interface IFinancementInvoices {
  InvoiceId: number;
  Id?: number;
  PayableAmount: number;
  ReceiverName?: string;
  InvoiceNumber?: string;
  IssueDate?: string;
  PaymentDueDate?: string;
  image?: string;
  KdvRate?: number | string;
  PayableAmountCurrency?: string;
  RemainingAmount?: number | string;
  IsPaid?: boolean;
}
