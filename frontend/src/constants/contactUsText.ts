import { toPersianNumbers } from '../utils/toPersianNumbers';

const phone = toPersianNumbers(989355690741);

export const contactDetails = [
  {
    icon: '📍',
    label: 'آدرس فروشگاه:',
    value: 'گیلان، تالش، شیرآباد',
  },
  {
    icon: '📞',
    label: 'شماره تماس:',
    value: `${phone}+`,
  },
  {
    icon: '⏰',
    label: 'پاسخ‌گویی:',
    value: 'همه روزه',
  },
  {
    icon: '📦',
    label: 'ارسال سفارش‌ها:',
    value: 'به سراسر ایران',
  },
];
