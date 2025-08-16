import { textBody2, textTitle3 } from '../../constants/styles';
import { toPersianNumbers } from '../../utils/toPersianNumbers';
import TableWrapper from '../../components/UI/TableWrapper';
import { TableRow, TableCell } from '../../components/UI/Table';
import { cn } from '../../utils/lib/cn';
import { useAuth, useAuthHooks } from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { orderDetail } from '../../api/basket';
import ImageWrapper from '../../components/UI/ImageWrapper';
import WithLoaderAndError from '../../components/WithLoaderAndError';
import IconWrapper from '../../components/UI/IconWrapper';
import Copy from '../../components/UI/icons/Copy';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { OrderDetailResponse } from '../../types/orderTypes';

const Invoice = () => {
  const { id } = useParams();

  const { token } = useAuth();
  const authHooks = useAuthHooks();
  const { data, isError, isLoading, error } = useQuery<OrderDetailResponse>({
    queryKey: ['orderDetail', id],
    queryFn: () => orderDetail({ token, ...authHooks }, id!),
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(toPersianNumbers(data!.authority, false));
    toast.success('کد با موفقیت کپی شد');
  };

  const tableRows =
    data?.products?.map((product, index) => (
      <TableRow key={index}>
        <TableCell className='text-right'>
          {toPersianNumbers(index + 1, false)}
        </TableCell>
        <TableCell className='text-center'>
          <div className='flex justify-center items-center gap-2'>
            <ImageWrapper
              className='w-[3.9rem] h-[2.8rem] object-cover'
              src={product.image}
              alt={product.title}
            />
            <span className={textBody2}>{product.title}</span>
          </div>
        </TableCell>
        <TableCell className='text-center'>
          <span className={textBody2}>
            {toPersianNumbers(product.priceAfterDiscount, false)} تومان
          </span>
        </TableCell>
        <TableCell>
          <div className='flex justify-center items-center gap-1'>
            <span className={cn(textBody2, 'w-11 truncate text-center')}>
              {toPersianNumbers(data?.authority, false)}
            </span>
            <IconWrapper onClick={handleCopyCode}>
              <Copy className='w-4 dark:invert' />
            </IconWrapper>
          </div>
        </TableCell>
      </TableRow>
    )) ?? [];

  const totalAmount =
    data?.products?.reduce((total: number, p) => {
      return total + p.priceAfterDiscount * p.count;
    }, 0) || 0;

  return (
    <WithLoaderAndError {...{ data, isError, isLoading, error }}>
      <div className='flex flex-col gap-4 max-w-4xl'>
        <h1
          className={cn(
            textTitle3,
            'rounded-small bg-main-secondary-bg border border-main-primary-text py-3 px-2'
          )}
        >
          جزئیات فاکتور #{data?.invoiceNumber}
        </h1>
        {data && (
          <div className='flex flex-col gap-2'>
            <h2 className={cn(textBody2, 'px-2')}>
              مبلغ کل: {toPersianNumbers(totalAmount, false)} تومان
            </h2>
            <TableWrapper
              caption='محصولات خریداری شده'
              headers={['ردیف', 'محصول', 'قیمت', 'کد تراکنش']}
              tableRows={tableRows}
              title='جدول محصولات'
            />
          </div>
        )}
      </div>
    </WithLoaderAndError>
  );
};

export default Invoice;
