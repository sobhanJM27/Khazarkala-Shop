import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from './Table';
import { textBody1Bold, textBody2, textTitle4 } from '../../constants/styles';
import Trash from './icons/Trash';
import ImageWrapper from './ImageWrapper';
import { cn } from '../../utils/lib/cn';
import IconWrapper from './IconWrapper';
import { toPersianNumbers } from '../../utils/toPersianNumbers';
import { Product } from '../../types/apiTypes';
import Basket from './icons/Basket';

type Props = {
  listProduct: Product[];
  handleDeleteProduct: Function;
};

const BasketProducts = ({ listProduct, handleDeleteProduct }: Props) => {
  const headers = ['محصول', 'قیمت', ' '];

  const tableRows = [
    listProduct &&
      listProduct.map((product) => {
        return (
          <TableRow key={product._id}>
            <TableCell className='flex gap-3 items-center text-center'>
              <div className='relative w-[3.9rem] h-[2.8rem]'>
                <ImageWrapper
                  className='border-none rounded-small w-full h-full'
                  src={product.images[0]}
                  alt={product.title}
                />
                <div className='absolute inset-1.5 bg-gradient-to-l rounded-small from-transparent to-black opacity-90 mix-blend-overlay'></div>
              </div>
              <span className={cn(textBody2, 'text-main-primary-text')}>
                {product.title}
              </span>
            </TableCell>
            <TableCell className={cn(textBody2, 'text-main-primary-text')}>
              {toPersianNumbers(
                product.priceAfterDiscount * product.count,
                true
              )}{' '}
              تومان
              <span className='text-sm text-gray-500 mr-2'>
                ({toPersianNumbers(product.count)} عدد)
              </span>
            </TableCell>
            <TableCell className='mr-auto'>
              <div className='flex justify-end'>
                <IconWrapper
                  onClick={() => handleDeleteProduct(product._id)}
                  className='flex border border-main-primary-text border-main-gray-50'
                >
                  <Trash className='dark:invert' />
                </IconWrapper>
              </div>
            </TableCell>
          </TableRow>
        );
      }),
  ];

  return (
    <div
      className={cn(
        'flex-1 whitespace-nowrap bg-main-secondary-bg rounded-small',
        'max-w-[40rem] w-[60%]'
      )}
    >
      {listProduct.length === 0 ? (
        <div className='flex items-center justify-center gap-2 p-11'>
          <Basket className='w-5 h-5 dark:invert' />
          <p className={textTitle4}>سبد خرید شما خالی است</p>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <Table className='min-w-[500px]'>
            <TableHeader>
              <TableRow>
                {headers.map((head, i) => (
                  <TableHead
                    key={i}
                    className={cn(
                      textBody1Bold,
                      'py-[1.4375rem] article:py-[0.9375rem] px-10 article:px-5 text-right'
                    )}
                  >
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default BasketProducts;
