import { aboutParagraphs, whyKhazarKala } from '../../constants/aboutUsText';
import {
  bgTextColor,
  textBody1,
  textBody1Bold,
  textTitle1,
  textTitle2,
} from '../../constants/styles';
import { cn } from '../../utils/lib/cn';

const AboutUs = () => {
  return (
    <section className='flex flex-col gap-10 px-12 py-6'>
      <div className='flex flex-col gap-4'>
        <h1 className={cn(textTitle1, bgTextColor)}>درباره خزر کالا</h1>
        <p className={cn(textBody1Bold)}>{aboutParagraphs[0]}</p>
      </div>
      <div className='flex flex-col gap-6'>
        <h2 className={cn(textTitle2)}>چرا خزر کالا؟</h2>
        <ul
          className={cn('list-disc list-inside flex flex-col gap-3', textBody1)}
        >
          {whyKhazarKala.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className={cn(textBody1)}>{aboutParagraphs[1]}</p>
      </div>
      <p className={cn(textBody1Bold)}>
        از اینکه خزر کالا را برای خرید انتخاب کرده‌اید سپاسگزاریم. مشتاقانه
        منتظر همراهی شما در مسیر یک تجربه خرید مطمئن، آسان و باکیفیت هستیم.
      </p>
    </section>
  );
};

export default AboutUs;
