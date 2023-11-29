import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';


const useLoginForm = () => {
  const {t}: {t: (value: string) => string} = useTranslation();

  const loginSchema = yup.object({
    email: yup.string().required(t('validations.required')).email(t('validations.valid_email')),
    password: yup.string().min(6, t('validations.min_characters')).max(20, t('validations.max_characters')).required(t('validations.required')),
  });

  const form = useForm({
    resolver: yupResolver(loginSchema),
  });

  return {form};
};

export default useLoginForm;
