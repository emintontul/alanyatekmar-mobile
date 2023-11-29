import {IFinancementInvoices, IStyleShortcuts} from '@/utils';

export interface CardItem {
  id: string;
  title: string;
  image: string;
  date: string;
  amount: number;
  discountedAmount?: number;
  howManyDays?: number | string;
  termDate: string;
  delay?: boolean;
}

export enum CardTypes {
  FATURA = 'fatura',
  BANKA = 'banka',
  ISKONTOLANMAMIS = 'iskontolanmamıs',
  ISKONTOLANMAMIS_WAIT_APPROVED = 'iskonta_onayı_bekliyor',
  ISKONTOLANMIS = 'İskontolanmış',
  TUTAR_DUZENLENEBILIR = 'tutar_duzenlenebilir',
  ODEME_TAKIP_KARTI = 'odeme_takip_karti',
  ODEME_ONAYLANMIS = 'odeme_onaylanmis',
  ISKONTOLANMAMIS_VADESIZ = 'iskontolanmamıs_vadesiz',
  ISKONTO_ISLEMDE_KIS = 'iskonto_islemde_kismi',
  ISKONTO_ISLEMDE_UYGUN = 'iskonto_islemde_uygun',
  FATURA_TALEBI_KARTI = 'fatura_talebi_kartı',
}

export interface Props extends IStyleShortcuts {
  cardType: CardTypes | string;
  checkbox?: boolean;
  item?: IFinancementInvoices;
  onCheckedChange?: (item: IFinancementInvoices, value: boolean) => void;
  summaryCard?: boolean;
  icon?: string;
  onIconPress?: () => void;
  isAllSelected: boolean;
}
