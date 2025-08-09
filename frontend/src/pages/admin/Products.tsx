import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { deleteProduct, getProducts } from '../../api/product';
import { useAuth, useAuthHooks } from '../../hooks/useAuth';
import WithLoaderAndError from '../../components/WithLoaderAndError';
import { toUrl } from '../../utils/toUrl';

const Products = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(undefined, undefined, undefined),
  });

  const { token } = useAuth();
  const auth = useAuthHooks();

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => deleteProduct({ token, ...auth }, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('موفقیت آمیز');
    },
    onError: () => {
      toast.error('خطا در برقراری ارتباط');
    },
  });
  return (
    <WithLoaderAndError {...{ data, isLoading, isError, error }}>
      <div className='flex flex-col gap-12'>
        <Link to={'Add'} className='border-b border-purple max-w-fit'>
          اضافه کردن محصول جدید
        </Link>
        <ul className='flex flex-col gap-6'>
          {data?.map((item) => {
            const url = `/Product/${item?._id}/${toUrl(item?.title)}`;
            return (
              <li
                key={item._id}
                className='flex flex-col border-b-2 border-black'
              >
                <Link to={url} className='text-blue max-w-fit'>
                  صفحه ی محصول
                </Link>
                <span>{item.title}</span>
                <span>{item.shortText}</span>
                <span>آیدی : {item._id}</span>
                <button
                  className='text-red-500 cursor-pointer max-w-fit'
                  disabled={deleteProductMutation.isPending}
                  onClick={() => {
                    deleteProductMutation.mutate(item._id);
                  }}
                >
                  حذف محصول
                </button>
                <Link
                  to={`Edit`}
                  className='text-yellow max-w-fit'
                  state={item}
                >
                  <span>تغییر محصول</span>
                </Link>
                <Link
                  to={'comments'}
                  className='text-yellow max-w-fit'
                  state={{ id: item._id, comments: item.comments }}
                >
                  <span>مدیریت کامنت ها</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </WithLoaderAndError>
  );
};

export default Products;
