import {
  externalLegalItems,
  fastAccessItems,
  linkItems,
} from '../../constants/footerItems';
import { textBody2 } from '../../constants/styles';
import { cn } from '../../utils/lib/cn';
import Logo from './icons/Logo';
import FooterLinks from './FooterLinks';
import { socials } from '../../constants/socials';

const Footer = () => {
  return (
    <footer
      className={cn(
        'bg-main-black flex gap-4 flex-wrap text-main-white mt-4 p-8 border-0 outline-0 justify-center',
        textBody2
      )}
    >
      <div className='flex-1 flex flex-col gap-4 min-w-40 mt-4'>
        <Logo className='max-w-[90px]' id='' />
        <p>
          خزر کالا؛ فروشگاه اینترنتی جامع و تخصصی در حوزه عرضه انواع کالاهای
          باکیفیت و اصیل ایرانی
        </p>
        <div className='flex flex-col gap-3'>
          <span>با ما در فضای مجازی همراه باشید</span>
          <ul className='flex items-center gap-4 flex-wrap'>
            {socials.map((item) => (
              <li
                className='w-5 h-5 transition-transform duration-300 hover:scale-105'
                key={item.id}
              >
                <a href={item.link} target='_blank' rel='noopener noreferrer'>
                  <item.icon />
                </a>
              </li>
            ))}
          </ul>
          <p>
            توسعه :{' '}
            <a
              className='underline underline-offset-2'
              href='https://bracketteam.net/'
              target='_blank'
              rel='noopener noreferrer'
            >
              تیم براکت
            </a>
          </p>
        </div>
      </div>
      <FooterLinks title='دسترسی سریع' type='link' data={fastAccessItems} />
      <FooterLinks title='راه های ارتباطی' type='link' data={linkItems} />
      <FooterLinks title='مجوز ها' type='image' data={externalLegalItems} />
    </footer>
  );
};

export default Footer;
