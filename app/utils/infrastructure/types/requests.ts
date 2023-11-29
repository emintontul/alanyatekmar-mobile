export interface IGetAllowancesSender {
  Allowances: Array<IRequestCard>;
  Page: number;
  PageSize: number;
  SortType: string;
  Sort: string;
  TotalCount: number;
  IsExport: boolean;
  ExtensionData: null;
}

export interface IRequestCard {
  Id: number;
  Status: number;
  StatusDescription: string;
  AllowanceDueDate: string;
  TotalPayableAmount: number;
  TotalInvoiceCount: number;
  NotifyBuyer: number;
}
