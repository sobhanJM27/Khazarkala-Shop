import { textBody2 } from '../../constants/styles';
import { cn } from '../../utils/lib/cn';
import { toPersianNumbers } from '../../utils/toPersianNumbers';
import { Product } from '../../types/apiTypes';

type Props = {
  listProduct: Product[];
  totalPrice: number;
  totalDiscount: number;
  totalPriceWithDiscount: number;
};

const BasketDetails = ({
  listProduct,
  totalPrice,
  totalDiscount,
  totalPriceWithDiscount,
}: Props) => {
  const itemDetails = [
    {
      title: 'مبلغ بدون کد تخفیف',
      amount: totalPrice,
    },
    {
      title: 'سود شما',
      amount: totalDiscount,
    },
    {
      title: 'مبلغ کل با اعمال کد تخفیف',
      amount: totalPriceWithDiscount,
    },
  ];

  return (
    <div className='text-main-primary-text'>
      <div
        className={cn(
          'flex items-center justify-between border-t border-main-gray-50 py-[1.125rem] px-5',
          textBody2
        )}
      >
        <span>تعداد محصول‌ها</span>
        <span>
          {toPersianNumbers(
            listProduct.reduce((total, p) => total + (p.count || 1), 0),
            true
          )}
        </span>
      </div>
      {itemDetails.map((item, id) => {
        return (
          <div
            key={id}
            className={cn(
              'flex items-center justify-between border-t border-main-gray-50 py-4 px-5',
              textBody2
            )}
          >
            <span>{item.title}</span>
            <span>{toPersianNumbers(item.amount, true)} تومان</span>
          </div>
        );
      })}
    </div>
  );
};

export default BasketDetails;
