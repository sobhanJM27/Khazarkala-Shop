import { useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuth, useAuthHooks } from '../../hooks/useAuth';
import { Article, Product } from '../../types/apiTypes';
import { editArticle } from '../../api/article';
import { editProduct } from '../../api/product';
import Button from '../../components/UI/Button';
const Edit = () => {
  const { parent } = useParams();
  const location = useLocation();
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
    const details = location.state as Article;
    const editArticleMutation = useMutation({
      mutationFn: (id: string) =>
        editArticle({ token, ...auth }, id, {
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
        }),
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
        <input
          type='text'
          placeholder='title'
          defaultValue={details.title}
          ref={titleRef}
        />
        <input
          type='text'
          placeholder='متنی کوتاه برای نمایش در کنار سر تیتر'
          defaultValue={details.shortText}
          ref={shortTextRef}
        />
        <textarea
          placeholder='مقاله ی خود را در فرمت مارکداون بنویسید'
          cols={30}
          rows={10}
          defaultValue={details.description}
          ref={textRef}
        ></textarea>
        <input
          type='text'
          placeholder='نام دسته بندی'
          defaultValue={details.category.join(',')}
          ref={categoryRef}
        />
        <input
          type='text'
          placeholder='عکس'
          ref={imagesRef}
          defaultValue={details.images.map((image) => image)}
        />
        <input
          type='text'
          placeholder='شماره ترتیب'
          ref={sortRef}
          defaultValue={details.sortByNumber}
        />
        <input
          type='text'
          placeholder='نام نویسنده'
          ref={ownerNameRef}
          defaultValue={details.author.name}
        />
        <input
          type='text'
          placeholder='توضیح نویسنده'
          ref={ownerDescRef}
          defaultValue={details.author?.desc}
        />
        <input
          type='text'
          placeholder='عکس نویسنده'
          ref={ownerLogoRef}
          defaultValue={details.author.image}
        />
        <Button
          intent={'secondary'}
          size={'fit'}
          className='bg-pink max-w-fit'
          disabled={editArticleMutation.isPending}
          onClick={() => {
            editArticleMutation.mutate(details._id);
          }}
        >
          تایید
        </Button>
      </div>
    );
  } else if (parent === 'products') {
    const priceRef = useRef<HTMLInputElement | null>(null);
    const discountRef = useRef<HTMLInputElement | null>(null);
    const details = location.state as Product;

    const editProductMutation = useMutation({
      mutationFn: (id: string) => {
        return editProduct({ token, ...auth }, id, {
          shortText: shortTextRef.current!.value,
          title: titleRef.current!.value,
          category: categoryRef.current!.value.split(',') || [],
          images: imagesRef.current?.value.split(',') || [],
          discount: Number(discountRef.current!.value),
          price: Number(priceRef.current!.value),
          Description: textRef.current!.value,
          sortByNumber: Number(sortRef.current!.value),
        });
      },
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
        <input
          type='text'
          placeholder='title'
          defaultValue={details.title}
          ref={titleRef}
        />
        <input
          type='text'
          placeholder='متنی کوتاه برای نمایش در کنار سر تیتر'
          defaultValue={details.shortText}
          ref={shortTextRef}
        />
        <textarea
          placeholder='توضیحات محصول خود را در فرمت مارکداون بنویسید'
          cols={30}
          rows={10}
          defaultValue={details.Description}
          ref={textRef}
        ></textarea>
        <input
          type='number'
          placeholder='قیمت اصلی محصول به تومن'
          defaultValue={details.price}
          ref={priceRef}
        />
        <input
          type='text'
          placeholder='نام دسته بندی'
          defaultValue={details.category.join(',')}
          ref={categoryRef}
        />
        <input
          type='number'
          placeholder='تخفیف'
          defaultValue={details.discount}
          ref={discountRef}
        />
        <input
          type='text'
          placeholder='عکس'
          ref={imagesRef}
          defaultValue={details.images.map((image) => image)}
        />
        <input
          type='text'
          placeholder='شماره ترتیب'
          ref={sortRef}
          defaultValue={details.sortByNumber}
        />
        <Button
          intent={'secondary'}
          size={'fit'}
          className='bg-pink max-w-fit'
          disabled={editProductMutation.isPending}
          onClick={() => {
            editProductMutation.mutate(details._id);
          }}
        >
          تایید
        </Button>
      </div>
    );
  }
};

export default Edit;
