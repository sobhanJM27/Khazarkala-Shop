import { useEffect, useRef, useState } from 'react';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { getUserAddress, updateUserAddress } from '../../api/index';
import { useAuth, useAuthHooks } from '../../hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { cn } from '../../utils/lib/cn';
import { bgTextFull, textTitle4 } from '../../constants/styles';
import WithLoaderAndError from '../../components/WithLoaderAndError';

const Address = () => {
  const [formData, setFormData] = useState({
    province: '',
    city: '',
    postalCode: '',
    street: '',
    detail: '',
  });

  const { token } = useAuth();
  const authHooks = useAuthHooks();

  const queryClient = useQueryClient();

  const provinceRef = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLInputElement | null>(null);
  const postalCodeRef = useRef<HTMLInputElement | null>(null);
  const streetRef = useRef<HTMLInputElement | null>(null);
  const detailRef = useRef<HTMLInputElement | null>(null);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['userAddress'],
    queryFn: () => getUserAddress({ token, ...authHooks }),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        province: data.province || '',
        city: data.city || '',
        postalCode: data.postalCode || '',
        street: data.street || '',
        detail: data.detail || '',
      });
    }
  }, [data]);

  const addressMutation = useMutation({
    mutationFn: () =>
      updateUserAddress(
        { token, ...authHooks },
        {
          province: provinceRef.current!.value,
          city: cityRef.current!.value,
          postalCode: postalCodeRef.current!.value,
          street: streetRef.current!.value,
          detail: detailRef.current!.value,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAddress'] });
      toast.success('موفقیت آمیز');
    },
    onError: (err) => {
      toast.error('خطا در برقراری ارتباط');
      console.log(err);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className='flex flex-col gap-4'>
      <div
        className={cn(
          'bg-main-secondary-bg border border-main-primary-text',
          bgTextFull
        )}
      >
        <h1 className={textTitle4}>آدرس من</h1>
      </div>
      <WithLoaderAndError {...{ data, isLoading, isError, error }}>
        <div className='flex flex-col gap-4 max-w-fit'>
          <Input
            label='استان'
            type='text'
            placeholder='استان خود را وارد کنید'
            ref={provinceRef}
            intent={'secondary'}
            inputSize='base'
            value={formData.province}
            onChange={handleChange}
            id='province'
          />
          <Input
            label='شهر'
            type='text'
            placeholder='شهر خود را وارد کنید'
            ref={cityRef}
            intent={'secondary'}
            inputSize='base'
            value={formData.city}
            onChange={handleChange}
            id='city'
          />
          <Input
            label='خیابان'
            type='text'
            placeholder='خیابان'
            ref={streetRef}
            intent={'secondary'}
            inputSize='base'
            value={formData.street}
            onChange={handleChange}
            id='street'
          />
          <Input
            label='کد پستی'
            type='text'
            placeholder='کد پستی'
            ref={postalCodeRef}
            intent={'secondary'}
            inputSize='base'
            value={formData.postalCode}
            onChange={handleChange}
            id='postalCode'
          />
          <Input
            label='توضیحات بیشتر ...'
            type='text'
            placeholder='مثلا پلاک، واحد و ...'
            ref={detailRef}
            intent={'secondary'}
            inputSize='base'
            value={formData.detail}
            onChange={handleChange}
            id='detail'
          />
          <Button
            type='submit'
            intent='primary'
            size='fit'
            className='px-16'
            disabled={addressMutation.isPending}
            onClick={() => {
              addressMutation.mutate();
            }}
          >
            ذخیره آدرس
          </Button>
        </div>
      </WithLoaderAndError>
    </div>
  );
};

export default Address;
