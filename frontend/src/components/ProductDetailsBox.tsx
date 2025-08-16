import { memo, MouseEvent, useState } from 'react';
import { textBody1, textTitle4 } from '../constants/styles';
import type { ProductDetailsBox } from '../types/productDetailsBoxType';
import { toPersianNumbers } from '../utils/toPersianNumbers';
import Button from './UI/Button';
import ImageWrapper from './UI/ImageWrapper';
import IconWrapper from './UI/IconWrapper';
import LeftArrow from './UI/icons/LeftArrow';
import { cn } from '../utils/lib/cn';
import { addToBasketHandler } from '../utils/basket';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../hooks/useReduxHooks';

type Props = {
  image: string;
  id: string;
  price: string | number;
  priceAfterDicount: string | number;
};
const ProductDetailsBox = ({ id, image, price, priceAfterDicount }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { Auth } = useAuth();
  const dispatch = useAppDispatch();
  const addHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToBasketHandler(id, 1, Auth, dispatch);
  };

  return (
    <aside
      className='sticky top-2 flex flex-col gap-4 basis-[22rem] z-50 max-w-[22rem] bg-main-secondary-bg p-4 rounded-big shadow-box-shadow-3 self-start
    product-sidebar:fixed product-sidebar:bottom-0 product-sidebar:top-auto product-sidebar:left-0 
    product-sidebar:border-2 product-sidebar:border-main-primary-text product-sidebar:rounded-b-none product-sidebar:right-0 product-sidebar:max-w-none'
    >
      <ImageWrapper
        src={image}
        alt='عکس محصول سایت خزر کالا'
        className='max-h-[12rem] product-sidebar:hidden'
      />
      <div className='flex justify-between gap-2'>
        <span className={textBody1}>قیمت محصول:</span>
        <span className={textTitle4}>
          {toPersianNumbers(price, true)} تومان
        </span>
      </div>
      <div className='flex justify-between gap-2'>
        <span className={textBody1}>با تخفیف:</span>
        <span className={textTitle4}>
          {toPersianNumbers(priceAfterDicount, true)} تومان
        </span>
      </div>
      <Button
        intent='primary'
        size='base'
        className='h-auto py-4'
        onClick={(e) => addHandler(e)}
      >
        افزودن به سبد خرید
      </Button>
      <IconWrapper
        className='hidden absolute -top-4 left-1/2 -translate-x-1/2 h-auto bg-main-secondary-bg product-sidebar:flex'
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <LeftArrow
          className={cn(
            'w-4 h-4 transition-transform -rotate-90 dark:invert',
            collapsed && 'rotate-90'
          )}
        />
      </IconWrapper>
    </aside>
  );
};

export default memo(ProductDetailsBox);
