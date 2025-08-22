import { v4 as uuidv4 } from 'uuid';
import Home from '../components/UI/icons/Home';
import Comment from '../components/UI/icons/Comment';
import User from '../components/UI/icons/User';
import LogOut from '../components/UI/icons/LogOut';
import Support from '../components/UI/icons/Support';
import ProductIcon from '../components/UI/icons/ProductIcon';
import Address from '../components/UI/icons/Address';

export const userNavItems = [
  {
    name: 'داشبورد',
    link: '',
    id: uuidv4(),
    Icon: Home,
  },
  {
    name: 'محصول‌های من',
    link: 'products',
    id: uuidv4(),
    Icon: ProductIcon,
  },
  {
    name: 'نظرات من',
    link: 'comments',
    id: uuidv4(),
    Icon: Comment,
  },
  {
    name: 'آدرس من',
    link: 'address',
    id: uuidv4(),
    Icon: Address,
  },
  {
    name: 'پروفایل',
    link: 'profile',
    id: uuidv4(),
    Icon: User,
  },
  {
    name: 'تماس با ما',
    link: '/contact-us',
    id: uuidv4(),
    Icon: Support,
  },
  {
    name: 'خروج',
    link: 'logout',
    id: uuidv4(),
    Icon: LogOut,
  },
];

export const adminNavItems = [
  {
    name: 'داشبورد',
    link: '',
    id: uuidv4(),
  },
  {
    name: 'محصولات',
    link: 'products',
    id: uuidv4(),
  },
  {
    name: 'مقالات',
    link: 'articles',
    id: uuidv4(),
  },
  {
    name: 'دسته بندی ها',
    link: 'categories',
    id: uuidv4(),
  },
  {
    name: 'فروش ها',
    link: 'sales',
    id: uuidv4(),
  },
  {
    name: 'مدیریت کامنت ها',
    link: 'all/comments',
    id: uuidv4(),
  },
  {
    name: 'مدیریت کاربران',
    link: 'users',
    id: uuidv4(),
  },
  {
    name: 'مدیریت کد های تخفیف',
    link: 'codes',
    id: uuidv4(),
  },
  {
    name: 'بارگذاری',
    link: 'upload',
    id: uuidv4(),
  },
];
