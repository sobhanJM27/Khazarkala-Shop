import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuth, useAuthHooks } from '../../hooks/useAuth';
import { addArticle } from '../../api/article';
import { addProduct } from '../../api/product';
import Button from '../../components/UI/Button';
const Add = () => {
  const { parent } = useParams();
  const queryClient = useQueryClient();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const shortTextRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const imagesRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLInputElement | null>(null);
  const sortRef = useRef<HTMLInputElement | null>(null);
  const ownerNameRef = useRef<HTMLInputElement | null>(null);
  const ownerLogoRef = useRef<HTMLInputElement | null>(null);
  const { token } = useAuth();
  const auth = useAuthHooks();

  if (parent === 'articles') {
    const ownerDescRef = useRef<HTMLInputElement | null>(null);
    const addArticleMutation = useMutation({
      mutationFn: () =>
        addArticle(
          { token, ...auth },
          {
            shortText: shortTextRef.current!.value,
            title: titleRef.current!.value,
            category: categoryRef.current!.value.split(',') || [],
            images: imagesRef.current?.value.split(',') || [],
            author: {
              image: ownerLogoRef.current!.value,
              name: ownerNameRef.current!.value,
              desc: ownerDescRef.current!.value,
            },
            description: textRef.current!.value,
            sortByNumber: Number(sortRef.current!.value),
          }
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['articles'] });
        toast.success('موفقیت آمیز');
      },
      onError: (err) => {
        toast.error('خطا در برقراری ارتباط');
        console.log(err);
      },
    });
    return (
      <div className='flex flex-col gap-6'>
        <input type='text' placeholder='عنوان' ref={titleRef} />
        <input type='text' placeholder='متن کوتاه' ref={shortTextRef} />
        <input type='text' placeholder='عنوان دسته بندی ها' ref={categoryRef} />
        <input type='text' placeholder='شماره ترتیب' ref={sortRef} />
        <input type='text' placeholder='عکس ها' ref={imagesRef} />
        <textarea
          placeholder='مقاله ی خود را در فرمت مارکداون بنویسید'
          cols={30}
          rows={10}
          ref={textRef}
        ></textarea>
        <input type='text' placeholder='نام نویسنده' ref={ownerNameRef} />
        <input type='text' placeholder='توضیح نویسنده' ref={ownerDescRef} />
        <input type='text' placeholder='عکس نویسنده' ref={ownerLogoRef} />
        <Button
          intent={'secondary'}
          size={'fit'}
          className='bg-pink max-w-fit'
          disabled={addArticleMutation.isPending}
          onClick={() => {
            addArticleMutation.mutate();
          }}
        >
          تایید
        </Button>
      </div>
    );
  } else if (parent === 'products') {
    const priceRef = useRef<HTMLInputElement | null>(null);
    const discountRef = useRef<HTMLInputElement | null>(null);

    const addProductMutation = useMutation({
      mutationFn: () =>
        addProduct(
          { token, ...auth },
          {
            shortText: shortTextRef.current!.value,
            title: titleRef.current!.value,
            category: categoryRef.current!.value.split(',') || [],
            images: imagesRef.current?.value.split(',') || [],
            discount: Number(discountRef.current!.value),
            price: Number(priceRef.current!.value),
            Description: textRef.current!.value,
            sortByNumber: Number(sortRef.current!.value),
          }
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        toast.success('موفقیت آمیز');
      },
      onError: (err) => {
        console.log(err);
        toast.error('خطا در برقراری ارتباط');
      },
    });
    return (
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4'></div>
        <input type='text' placeholder='عنوان' ref={titleRef} />
        <input type='text' placeholder='متن کوتاه' ref={shortTextRef} />
        <textarea
          placeholder='توضیحات محصول خود را در فرمت مارکداون بنویسید'
          cols={30}
          rows={10}
          ref={textRef}
        ></textarea>
        <input type='number' placeholder='قیمت اصلی محصول' ref={priceRef} />
        <input type='text' placeholder='عنوان دسته بندی ها' ref={categoryRef} />
        <input type='number' placeholder='درصد تخفیف' ref={discountRef} />
        <input type='text' placeholder='عکس ها' ref={imagesRef} />
        <input type='text' placeholder='شماره ترتیب' ref={sortRef} />
        <Button
          intent={'secondary'}
          size={'fit'}
          className='bg-pink max-w-fit'
          disabled={addProductMutation.isPending}
          onClick={() => {
            addProductMutation.mutate();
          }}
        >
          تایید
        </Button>
      </div>
    );
  }
};

export default Add;
