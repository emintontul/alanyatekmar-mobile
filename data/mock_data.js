import {images} from '@/assets/images';

export const invoiceMock = [
  {
    id: 'TCO9823KFJ2389LKA',
    image: 'https://i.hizliresim.com/oq86etu.png',
    title: 'Midas',
    date: '24.08.2022',
    amount: 5200030,
    termDate: '19.01.2023',
    howManyDays: '2 gün kaldı',
    delay: false,
  },
  {
    id: 'TCO9823KFJ2389LKB',
    image: 'https://i.hizliresim.com/oq86etu.png',
    title: 'Midas',
    date: '24.08.2022',
    amount: 5300000,
    termDate: '19.01.2023',
    delay: true,
  },
  {
    id: 'TCO9823KFJ2389LKD',
    image: 'https://i.hizliresim.com/oq86etu.png',
    title: 'Midas',
    date: '24.08.2022',
    amount: 5900030,
    termDate: '19.01.2023',
    delay: true,
  },
  {
    id: 'TCO9823KFJ2389SD',
    image: 'https://i.hizliresim.com/oq86etu.png',
    title: 'Midas',
    date: '24.08.2022',
    amount: 5900030,
    termDate: '19.01.2023',
    delay: true,
  },
  {
    id: 'TCO982CVJ2389SD',
    image: 'https://i.hizliresim.com/oq86etu.png',
    title: 'Midas',
    date: '24.08.2022',
    amount: 5900030,
    termDate: '19.01.2023',
    delay: true,
  },
  {
    id: 'TCO98DFG89SD',
    image: 'https://i.hizliresim.com/oq86etu.png',
    title: 'Midas',
    date: '24.08.2022',
    amount: 5900030,
    termDate: '19.01.2023',
    delay: true,
  },
];

export const LimitDistributionCards = [
  {
    image: images.akbank,
    name: 'Akbank',
    rest: 100000,
    total: 210000,
    amountToPaid: 208000,
    expiryDay: '60',
    invoice: '2/3',
  },
  {
    image: images.fibabank,
    name: 'Fibabanka',
    rest: 167000,
    total: 210000,
    amountToPaid: 84000,
    expiryDay: '60',
    invoice: '3/3',
  },
  {
    image: images.isbankasi,
    name: 'İş Bankası',
    rest: 36000,
    total: 187000,
    amountToPaid: 128000,
    expiryDay: '60',
    invoice: '1/3',
  },
];

export const UpcomingPaymentsData = [
  {
    date: '23-03-2023',
    payments: [
      {
        remainingDays: 0,
        isToday: true,
        amount: '53.090,00₺',
        code: '#941238',
        title: 'Geciken Ödeme',
      },
    ],
  },
  {
    date: '30-03-2023',
    payments: [
      {
        remainingDays: 1,
        amount: '53.090,00₺',
        code: '#941238',
        title: 'Bugün',
      },
      {
        remainingDays: 7,
        isToday: true,
        amount: '61.000,00₺',
        code: '#941238',
        title: '7 gün kaldı',
      },
    ],
  },
  {
    date: '4-04-2023',
    payments: [
      {
        remainingDays: 11,
        isToday: true,
        amount: '53.090,00₺',
        code: '#941238',
        title: '11 gün kaldı',
      },
    ],
  },
  {
    date: '19-04-2023',
    payments: [
      {
        remainingDays: 7,
        isToday: true,
        amount: '61.000,00₺',
        code: '#941238',
        title: '7 gün kaldı',
      },
      {
        remainingDays: 7,
        isToday: true,
        amount: '61.000,00₺',
        code: '#941238',
        title: '7 gün kaldı',
      },
      {
        remainingDays: 7,
        isToday: true,
        amount: '61.000,00₺',
        code: '#941238',
        title: '7 gün kaldı',
      },
      {
        remainingDays: 7,
        isToday: true,
        amount: '61.000,00₺',
        code: '#941238',
        title: '7 gün kaldı',
      },
    ],
  },
];

export const DocumentsData = [
  {
    id: 1,
    title: 'Kurumlar Vergisi  Beyannamesi',
    uploadDate: '01.02.2023',
    isWaiting: true,
  },
  {
    id: 2,
    title: '2023 1. Geçici Vergi Dönemine Ait Mizan',
    uploadDate: '01.02.2023',
    isWaiting: false,
  },
  {
    id: 3,
    title: '2023 1. Geçici Vergi Dönemine Ait Beyanname',
    uploadDate: '01.02.2023',
    isWaiting: false,
  },
];

// İskontolanacak faturalar
export const WillBeDiscountInvoices = [
  {
    id: 'TCO9823KFJ2389LKA',
    image: images.fibabank,
    title: 'Papara',
    date: '24.08.2022',
    amount: 7200000,
    discountedAmount: 8400000,
    termDate: '19.01.2023',
    howManyDays: '2 gün kaldı',
    delay: false,
  },
];

// İskontoya uygun faturalar
export const SuitableForDiscountInvoices = [
  {
    id: 'TCO9823KJSD389LKA',
    image: images.papara,
    title: 'Papara',
    date: '24.08.2022',
    amount: 8400000,
    termDate: '19.01.2023',
    howManyDays: '2 gün kaldı',
    delay: false,
  },
  {
    id: 'TCO9823KFJ2389LKD',
    image: images.eczacibasi,
    title: 'Eczacıbaşı',
    date: '24.08.2022',
    amount: 8400000,
    termDate: '19.01.2023',
    howManyDays: '2 gün kaldı',
    delay: false,
  },
];

export const Requests = [
  {
    id: 1,
    requestName: 'Çoklu Alıcı',
    requestNo: '#98555',
    discountAmount: '304.400,00 TL',
    paymentDate: '05.02.2023',
    invoice: '3',
    check: null,
    status: 1,
    statusMessage: 'Fatura Kontrolü',
  },
  {
    id: 2,
    requestName: 'Çoklu Alıcı',
    requestNo: '#23512',
    discountAmount: '152.400,00 TL',
    paymentDate: '09.03.2023',
    invoice: null,
    check: '3',
    status: 2,
    statusMessage: 'Teklif sürecinde',
  },
  {
    id: 3,
    requestName: 'Çoklu Alıcı',
    requestNo: '#23512',
    discountAmount: '152.400,00 TL',
    paymentDate: '09.03.2023',
    invoice: null,
    check: '3',
    status: 3,
    statusMessage: 'Finansman Aşamasında',
  },
  {
    id: 3,
    requestName: 'Eczacıbaşı',
    requestNo: '#84712',
    discountAmount: '152.400,00 TL',
    paymentDate: '09.03.2023',
    invoice: null,
    check: '3',
    status: 4,
    statusMessage: 'Alıcı Tarafından Ön Onayda Reddedildi',
  },
  {
    id: 4,
    requestName: 'Eczacıbaşı',
    requestNo: '#84712',
    discountAmount: '152.400,00 TL',
    paymentDate: '09.03.2023',
    invoice: null,
    check: '3',
    status: 4,
    statusMessage: 'Şirket Yetkiliniz Tarafından Reddedildi',
  },
  {
    id: 5,
    requestName: 'Eczacıbaşı',
    requestNo: '#84712',
    discountAmount: '152.400,00 TL',
    paymentDate: '09.03.2023',
    invoice: null,
    check: '3',
    status: 4,
    statusMessage: 'Şirket Yetkiliniz Tarafından Reddedildi',
  },
  {
    id: 6,
    requestName: 'Çoklu Alıcı',
    requestNo: '#82343',
    discountAmount: '152.400,00 TL',
    paymentDate: '09.03.2023',
    invoice: null,
    check: '3',
    status: 5,
    statusMessage: 'Ödemeniz Hesabınıza Geçti',
  },
  {
    id: 7,
    requestName: 'Çoklu Alıcı',
    requestNo: '#82343',
    discountAmount: '152.400,00 TL',
    paymentDate: '09.03.2023',
    invoice: null,
    check: '3',
    status: 5,
    statusMessage: 'Ödemeniz Hesabınıza Geçti',
  },
];

export const RequestsHistory = [
  {
    id: 1,
    date: 'Bugün',
    messages: [
      {
        id: 1,
        requestTime: '14:23',
        message: '#134098 Numaralı iskonto talebine Yapıkredi Faktoring tarafından ödeme verilmiştir.',
      },
      {
        id: 2,
        requestTime: '14:20',
        message: 'Serkan Sözen adlı kullanıcı #1248 nolu iskonto talebi için işlem ücretini ödedi.',
      },
    ],
  },
  {
    id: 2,
    date: '13 Şubat 2023',
    messages: [
      {
        id: 1,
        requestTime: '14:23',
        message: '#134098 Numaralı iskonto talebine Yapıkredi Faktoring tarafından ödeme verilmiştir.',
      },
    ],
  },
  {
    id: 3,
    date: '12 Şubat 2023',
    messages: [
      {
        id: 1,
        requestTime: '14:23',
        message: '#134098 Numaralı iskonto talebine Yapıkredi Faktoring tarafından ödeme verilmiştir.',
      },
    ],
  },
];

export const OfferProcessBankDetail = [
  {
    id: 1,
    bankName: 'Fibabanka',
    paymentDate: '02.01.2023',
    paymentAmount: '290.030,00 TL',
    details: [
      {
        id: 1,
        title: 'Fonlama Oranı',
        subtitle: '%97,79',
      },
      {
        id: 2,
        title: 'İskontolanabilir Tut.',
        subtitle: '300.000,00 TL',
      },
      {
        id: 3,
        title: 'Toplam Kesinti',
        subtitle: '32,67 TL',
      },
      {
        id: 4,
        title: 'Faiz Tutarı',
        subtitle: '27,09 TL',
      },
      {
        id: 5,
        title: 'Komisyon Tutarı',
        subtitle: '0,00 TL',
      },
      {
        id: 6,
        title: 'Oran',
        subtitle: '%25',
      },
      {
        id: 7,
        title: 'Toplam BSMV',
        subtitle: '1,15 TL',
      },
      {
        id: 8,
        title: 'Masraf Tutarı',
        subtitle: '0,00 TL',
      },
    ],
  },
];

export const FinancingBalances = {smeBalance: '1.197.042,87₺', supplierBalance: '697.042,87₺'};

export const RegisteredCardData = [
  {
    id: 1,
    cardName: 'Visa',
    cardNo: '**** **** **** 4980',
  },
  {
    id: 2,
    cardName: 'MasterCard',
    cardNo: '**** **** **** 6423',
  },
];

// !
export const RequestBadgeFilterData = [
  {id: 3, title: 'requests.all_requests'},
  {id: 0, title: 'requests.sme_financing'},
  {id: 1, title: 'requests.supplier_financing'},
];
