import DropDown from '../../components/UI/DropDown';
import { textTitle1, bgTextColor, textBody1Bold } from '../../constants/styles';
import { cn } from '../../utils/lib/cn';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../api/product';
import { productsSorts } from '../../constants/filterItems';
import { useState } from 'react';
import { getCategories } from '../../api/category';
import WithLoaderAndError from '../../components/WithLoaderAndError';
import Cards from '../../components/UI/Cards';
import SeoTags from '../../utils/lib/SEO';

const ProductsPage = () => {
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<string | undefined>(undefined);

  const categoriesQuery = useQuery({
    queryKey: ['product_categories'],
    queryFn: () => getCategories('product'),
  });

  const productQuery = useQuery({
    queryKey: ['products', categoryId, sort],
    queryFn: () => getProducts(categoryId, undefined, sort),
  });

  const data = productQuery.data;
  const isLoading = productQuery.isLoading || categoriesQuery.isLoading;
  const isError = productQuery.isError || categoriesQuery.isError;
  const error = productQuery.error || categoriesQuery.error;

  return (
    <>
      <SeoTags
        titleTemplate='محصولات'
        description=''
        Url=''
        keywords=''
      />
      <main className='flex flex-col gap-10 px-12 py-6'>
        <section className='flex flex-col gap-4'>
          <h1 className={cn(textTitle1, bgTextColor)}>محصولات خزر کالا</h1>
          <p className={cn(textBody1Bold)}>
            خزر کالا، فروشگاهی اینترنتی تخصصی در زمینه عرضه انواع محصولات اصیل و
            باکیفیت ایرانی است. این سایت با گردآوری مجموعه‌ای متنوع از کالاها،
            از جمله مواد غذایی، لوازم خانگی، پوشاک، لوازم دیجیتال و محصولات
            دیگر، تلاش می‌کند کیفیت، اصالت و رضایت مشتری را به صورت مستقیم و
            بدون واسطه به دست مصرف‌کنندگان برساند. خزر کالا با همکاری نزدیک با
            تولیدکنندگان و تأمین‌کنندگان معتبر، انجام کنترل‌های کیفی دقیق و
            ارائه خدمات ارسال سریع، بستری امن و مطمئن برای خرید آنلاین فراهم
            کرده است تا خانواده‌ها بتوانند با اطمینان کامل، انتخابی سالم، اصیل و
            باکیفیت داشته باشند.
          </p>
        </section>
        <WithLoaderAndError {...{ data, isLoading, isError, error }}>
          <section className='flex gap-4 flex-wrap'>
            <DropDown
              title='دسته‌بندی'
              keyToBePassed='_id'
              items={categoriesQuery.data!}
              type='primary'
              state={categoryId}
              setState={setCategoryId}
            />
            <DropDown
              title='مرتب‌سازی'
              keyToBePassed='key'
              items={productsSorts}
              type='secondary'
              state={sort}
              setState={setSort}
            />
          </section>
          <section>
            <Cards array={data!} type='product' />
          </section>
        </WithLoaderAndError>
      </main>
    </>
  );
};

export default ProductsPage;
