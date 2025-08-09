import { bgTextFull, textTitle4 } from '../../constants/styles';
import { cn } from '../../utils/lib/cn';
import Products from '../../components/UI/icons/Products';
import { useQuery } from '@tanstack/react-query';
import { getMyProducts } from '../../api/product';
import { useAuth, useAuthHooks } from '../../hooks/useAuth';
import { TableCell, TableRow } from '../../components/UI/Table';
import { toPersianNumbers } from '../../utils/toPersianNumbers';
import { toPersianDate } from '../../utils/toPersianDate';
import { Link } from 'react-router-dom';
import { toUrl } from '../../utils/toUrl';
import TableWrapper from '../../components/UI/TableWrapper';
import WithLoaderAndError from '../../components/WithLoaderAndError';

const MyProducts = () => {
  const { token } = useAuth();
  const authHooks = useAuthHooks();
  const productsQuery = useQuery({
    queryKey: ['my_products'],
    queryFn: () => getMyProducts({ token, ...authHooks }),
  });
  const productsRows = productsQuery.data?.map((item, idx) => {
    const link = `/product/${item?._id}/${toUrl(item?.title)}`;
    return (
      <TableRow key={item._id}>
        <TableCell className='text-right'>
          {toPersianNumbers(idx + 1)}
        </TableCell>
        <TableCell className='text-center'>
          <Link to={link}>{item?.title}</Link>
        </TableCell>
        <TableCell className='text-center'>
          {toPersianDate(item?.createdAt)}
        </TableCell>
        <TableCell className='text-center'>مشاهده جزئیات</TableCell>
      </TableRow>
    );
  });
  return (
    <div className='flex flex-col gap-4'>
      <div
        className={cn(
          'bg-main-secondary-bg border border-main-primary-text',
          bgTextFull
        )}
      >
        <Products className='w-4 h-4' />
        <h1 className={textTitle4}>محصولات خریداری شده من</h1>
      </div>
      <WithLoaderAndError
        {...{
          data: productsQuery.data,
          isLoading: productsQuery.isLoading,
          isError: productsQuery.isError,
          error: productsQuery.error,
        }}
      >
        <TableWrapper
          tableRows={productsRows!}
          title='محصولات'
          caption='محصولات خریداری شده'
          headers={['محصول', 'تاریخ ایجاد', 'مشاهده جزئیات']}
        />
      </WithLoaderAndError>
    </div>
  );
};

export default MyProducts;
