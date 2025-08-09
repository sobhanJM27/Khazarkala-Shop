import WithLoaderAndError from '../../components/WithLoaderAndError';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteUser, getUsers } from '../../api';
import { useAuth, useAuthHooks } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import Button from '../../components/UI/Button';

const Users = () => {
  const { token } = useAuth();
  const auth = useAuthHooks();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers({ token, ...auth }),
  });

  const { mutate: removeUser, isPending: deleting } = useMutation({
    mutationFn: (userId: string) => deleteUser({ token, ...auth }, userId),
    onSuccess: () => {
      toast.success('کاربر با موفقیت حذف شد');
      refetch();
    },
    onError: () => {
      toast.error('حذف کاربر با خطا مواجه شد');
    },
  });

  return (
    <div className='flex flex-col gap-4'>
      <WithLoaderAndError {...{ data, isLoading, isError, error }}>
        <ol className='flex flex-col gap-6'>
          {!isLoading &&
            data?.map(({ _id, first_name, last_name }, idx) => (
              <>
                <li key={_id} className='flex flex-col gap-3'>
                  <span>شماره: {idx + 1}</span>
                  <span>شناسه: {_id}</span>
                  <span>اسم: {first_name}</span>
                  <span>نام خانوادگی: {last_name}</span>
                  <Button
                    onClick={() => removeUser(_id)}
                    disabled={deleting}
                    intent='secondary'
                    size='base'
                  >
                    {deleting ? 'در حال حذف...' : 'حذف کاربر'}
                  </Button>
                </li>
                <hr className='bg-main-brown-800 h-1 w-auto' />
              </>
            ))}
        </ol>
      </WithLoaderAndError>
    </div>
  );
};

export default Users;
