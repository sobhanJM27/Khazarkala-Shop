import { Link } from 'react-router-dom';
import {
  bgTextColor,
  bottomTriangle,
  textTitle2,
  textTitle3,
  textTitle4,
  topTriangle,
} from '../../constants/styles';
import { cn } from '../../utils/lib/cn';
import Button from './Button';
import Logo from './icons/Logo';

const beforeClass = cn(
  topTriangle,
  'before:border-t-[34px] before:border-t-main-primary-bg before:absolute before:top-0 before:right-1/2 before:translate-x-1/2 before:border-r-[50px] before:border-l-[50px]'
);
const afterClass = cn(
  bottomTriangle,
  'after:border-b-[34px] after:border-b-main-primary-bg after:absolute after:bottom-0 after:right-1/2 after:translate-x-1/2 after:border-r-[50px] after:border-l-[50px]'
);

const Bio = () => {
  return (
    <section
      className={cn(
        'relative flex flex-col gap-2 p-12 border-none bg-main-primary-text text-main-primary-bg rounded-big',
        beforeClass,
        afterClass
      )}
    >
      <div className='flex gap-4 items-center mobile-navbar:flex-col'>
        <Logo className='max-w-[290px]' id='' />
        <div className='flex flex-col gap-2'>
          <h2 className={cn(textTitle2, bgTextColor)}>خزر کالا</h2>
          <h3 className={textTitle3}>فروشگاه تخصصی عرضه کالا های باکیفیت</h3>
          <p className={cn(textTitle4, 'break-normal')}>
            خزر کالا یک فروشگاه اینترنتی جامع و تخصصی در حوزه عرضه انواع کالاهای
            باکیفیت و اصیل ایرانی است. این فروشگاه با هدف ایجاد تجربه‌ای مطمئن،
            آسان و لذت‌بخش از خرید آنلاین، مجموعه‌ای متنوع از محصولات شامل مواد
            غذایی، لوازم خانگی، پوشاک، لوازم دیجیتال، بهداشت و زیبایی و بسیاری
            دیگر را مستقیماً از تولیدکنندگان و تأمین‌کنندگان معتبر در سراسر کشور
            به دست مشتریان می‌رساند. خزر کالا با تضمین اصالت کالا، قیمت‌گذاری
            منصفانه، ارسال سریع، خدمات پشتیبانی پاسخ‌گو و اطلاعات دقیق درباره هر
            محصول، همراه قابل اعتماد شما در خرید آنلاین است.
          </p>
          <Link to={'/about-us'} className='self-end'>
            <Button intent='primary' size='base' className='w-full px-14'>
              درباره ما
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Bio;
