import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

const AdminNotificationForm = () => {
  const surveySchema = yup.object({
    Title: yup.string().required('Başlık Alanı Gereklidir.'),
    Body: yup.string(),
  });

  const form = useForm({
    resolver: yupResolver(surveySchema),
  });

  return {form};
};

export default AdminNotificationForm;
