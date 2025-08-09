import { getArticles } from '../../api/article';
import CardsWithTabs from '../../components/CardsWithTabs';
import CardsWrapper from '../../components/CardsWrapper';
import Bio from '../../components/UI/Bio';
import SummaryBox from '../../components/UI/SummaryBox';
import { textBody1Bold, textTitle2 } from '../../constants/styles';
import { summaryBoxesLinks } from '../../constants/summaryBoxesLinks';
import { cn } from '../../utils/lib/cn';

const Home = () => {
  return (
    <main className='flex flex-col gap-4'>
      <section className='flex flex-col gap-4 pt-4 text-center p-8 leading-tight'>
        <h1 className={cn('', textTitle2)}>خزر کالا چیست؟</h1>
        <p className={cn('', textBody1Bold)}>
          خزر کالا یک فروشگاه اینترنتی جامع و تخصصی در حوزه عرضه انواع کالاهای
          باکیفیت و اصیل ایرانی است. این فروشگاه با هدف ایجاد تجربه‌ای مطمئن،
          آسان و لذت‌بخش از خرید آنلاین، مجموعه‌ای متنوع از محصولات شامل مواد
          غذایی، لوازم خانگی، پوشاک، لوازم دیجیتال، بهداشت و زیبایی و بسیاری
          دیگر را مستقیماً از تولیدکنندگان و تأمین‌کنندگان معتبر در سراسر کشور
          به دست مشتریان می‌رساند. خزر کالا با تضمین اصالت کالا، قیمت‌گذاری
          منصفانه، ارسال سریع، خدمات پشتیبانی پاسخ‌گو و اطلاعات دقیق درباره هر
          محصول، همراه قابل اعتماد شما در خرید آنلاین است.
        </p>
        <div className='flex gap-4 flex-wrap items-center justify-center'>
          {summaryBoxesLinks.map(({ id, IconComp, title, url }) => (
            <SummaryBox key={id} {...{ IconComp, title, url }} />
          ))}
        </div>
      </section>
      <section className='flex flex-col gap-4 pt-4 text-center p-8'>
        <CardsWithTabs title='آخرین محصولات' />
        <CardsWrapper
          title='آخرین مقالات'
          type='article'
          linkUrl='/articles'
          getterFunc={() => getArticles(undefined, 5, 'latest')}
        />
      </section>
      <Bio />
    </main>
  );
};

export default Home;
