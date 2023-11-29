export interface IRenderInput {
  name: string;
  label: string;
  placeholder: string;
  secureTextEntry: boolean;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  fullName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface ILoginResponseModel {
  Token?: string;
  User?: ILoginUserResponseModel;
}
interface ILoginUserResponseModel {
  Id?: number;
  UserIdentifier?: string | null;
  Identifier?: string | null;
  UserName?: string | null;
  Email?: string | null;
  FirstName?: string | null;
  LastName?: string | null;
  UserPhone?: string | null;
  BirthDate?: string | null;
  Type?: number;
  CompanyId?: number;
  companyName?: string | null;
  CompanyType?: number;
  Authorities?: string[] | null;
  CompanyAddress?: string | null;
  CompanyMailAdress?: string | null;
  CompanyPhone?: string | null;
  CompanyTaxOffice?: string | null;
  CompanyDistrictId?: number | null;
  CompanyDistrictName?: string | null;
}
