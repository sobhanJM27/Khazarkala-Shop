import { useQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../api/product';
import WithLoaderAndError from '../../components/WithLoaderAndError';
import { cn } from '../../utils/lib/cn';
import {
  bgTextColor,
  textTitle1,
  textTitle3,
  textTitle4,
} from '../../constants/styles';
import Markdown from '../../components/UI/Markdown';
import ProductComment from '../../components/UI/ProductComment';
import Cards from '../../components/UI/Cards';
import WriteComment from '../../components/WriteComment';
import ShareBox from '../../components/ShareBox';
import ProductDetailsBox from '../../components/ProductDetailsBox';
import ProductNavbar from '../../components/ProductNavbar';

const Product = () => {
  const infoRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id as string),
  });

  const handleSwitch = useCallback((id: string) => {
    const refs = [infoRef, commentsRef, relatedRef];
    for (const ref of refs) {
      if (ref?.current?.id === id) {
        ref?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
        break;
      }
    }
  }, []);
  return (
    <WithLoaderAndError {...{ data, isLoading, isError, error }}>
      {data && (
        <main className='flex gap-4 p-4 product-sidebar:flex-col'>
          <div className='flex flex-col gap-8 w-full'>
            <section className='flex flex-col gap-4'>
              <div className='flex items-center justify-between gap-2 flex-wrap'>
                <h1 className={cn(textTitle1, bgTextColor)}>{data.title}</h1>
                <ShareBox
                  postId={data._id}
                  postTitle={data.title}
                  type='product'
                />
              </div>
              <h2 className={textTitle4}>{data.shortText}</h2>
            </section>
            <ProductNavbar switchHandler={handleSwitch} />
            <Markdown
              text={data.Description}
              title='درباره‌ی محصول'
              ref={infoRef}
              sectionId='info'
            />
            <section
              className='flex flex-col gap-4'
              ref={commentsRef}
              id='comments'
            >
              <h2 className={cn(textTitle3, bgTextColor)}>آخرین نظرات</h2>
              <ul className='flex flex-col gap-4'>
                {data.comments.map((comment) => (
                  <ProductComment
                    key={comment._id}
                    comment={comment.text}
                    name={
                      comment.userID.first_name + ' ' + comment.userID.last_name
                    }
                    date={comment.createdAt}
                  />
                ))}
              </ul>
              <WriteComment type='product' postId={data._id} />
            </section>
            <section
              className='flex flex-col gap-4'
              ref={relatedRef}
              id='related-products'
            >
              <h2 className={cn(textTitle3, bgTextColor)}>
                محصول‌های پیشنهادی
              </h2>
              <Cards array={data.related} type='product' />
            </section>
          </div>
          <ProductDetailsBox
            image={data.images[0]}
            id={data._id}
            price={data.price}
            priceAfterDicount={data.priceAfterDiscount}
          />
        </main>
      )}
    </WithLoaderAndError>
  );
};

export default Product;
