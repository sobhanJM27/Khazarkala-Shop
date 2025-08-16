import { contactDetails } from '../../constants/contactUsText';
import {
  bgTextColor,
  textBody1,
  textBody1Bold,
  textTitle1,
} from '../../constants/styles';
import { cn } from '../../utils/lib/cn';
import SeoTags from '../../utils/lib/SEO';

const ContactUs = () => {
  return (
    <>
      <SeoTags
        titleTemplate='تماس با ما'
        description=''
        Url=''
        keywords=''
      />    
    <section className='flex flex-col gap-10 px-12 py-6'>
      <div className='flex flex-col gap-4'>
        <h1 className={cn(textTitle1, bgTextColor)}>تماس با ما</h1>
        <p className={cn(textBody1Bold)}>
          اگر سوالی دارید، یا برای خرید نیاز به مشاوره دارید،
          تیم پشتیبانی «خزر کالا» با افتخار آماده پاسخگویی به شماست. کافیست از
          طریق یکی از راه‌های زیر با ما در تماس باشید.
        </p>
      </div>

      <div className='flex flex-col gap-6'>
        {contactDetails.map((item, index) => (
          <p key={index} className={cn(textBody1)}>
            <span className={cn(textBody1Bold)}>
              {item.icon} {item.label}
            </span>{' '}
            {item.value}
          </p>
        ))}
      </div>

      <p className={cn(textBody1Bold)}>
        ما مشتاق شنیدن صدای گرم شما هستیم. با ما تماس بگیرید!
      </p>
    </section>
    </>
  );
};

export default ContactUs;
