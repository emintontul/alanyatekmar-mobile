import {yupResolver} from '@hookform/resolvers/yup';
import moment from 'moment';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';

export interface IPaymentForm {
  cardNo: string;
  paymentReceiptDate: string;
  fullname: string;
  month: string;
  year: string;
  cvv: string;
  isCheck: boolean;
}

const initial = {
  cardNo: '',
  paymentReceiptDate: moment().format('DD.MM.YYYY').toString(),
  fullname: '',
  month: '',
  year: '',
  cvv: '',
  isCheck: false,
};

const usePaymentForm = () => {
  const {t}: {t: (value: string) => string} = useTranslation();

  const paymentSchema = yup.object({
    cardNo: yup.string().min(16, t('validations.enter_valid_card_no')),
    paymentReceiptDate: yup.string().required(t('validations.required')),
    fullname: yup.string().required(t('validations.required')),
    month: yup.string().required(t('validations.required')),
    year: yup.string().required(t('validations.required')),
    cvv: yup.string().length(3, t('Geçerli bir cvv kodu giriniz')).max(3),
    isCheck: yup.bool(),
  });

  const form = useForm({
    defaultValues: initial,
    resolver: yupResolver(paymentSchema),
  });

  return {form};
};

export default usePaymentForm;
