import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';


const userInformationForm = () => {
  const surveySchema = yup.object({
    Name: yup.string().required('İsim Alanı Gereklidir.'),
    email: yup.string().required('Email Alanı Gereklidir.').email('Geçerli Bir Email Adresi Giriniz.'),
    SubscriptionExpireDate: yup.date()
  });

  const form = useForm({
    resolver: yupResolver(surveySchema),
  });

  return {form};
};

export default userInformationForm;
