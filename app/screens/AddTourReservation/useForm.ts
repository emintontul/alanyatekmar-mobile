import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

const userInformationForm = () => {
  const surveySchema = yup.object({
    FirstName: yup.string().required('Ad Alanı Gereklidir.'),
    LastName: yup.string().required('Soyad Alanı Gereklidir.'),
    AdultCount: yup.number().required('Yetişkin Sayısı Alanı Gereklidir.').default(1),
    ChildCount: yup.number().required('Çocuk Sayısı Alanı Gereklidir.').default(0),
    Email: yup.string().required('Email Alanı Gereklidir.').email('Geçerli Bir Email Adresi Giriniz.'),
    PhoneNumber: yup.string().required('Telefon Alanı Gereklidir.'),
    HotelName: yup.string(),
    RoomNumber: yup.string(),
    ReservationDate: yup.date(),
    TotalPrice: yup.number(),
  });

  const form = useForm({
    resolver: yupResolver(surveySchema),
  });

  return {form, surveySchema};
};

export default userInformationForm;
