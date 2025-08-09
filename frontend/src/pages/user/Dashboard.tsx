import CardsWrapper from '../../components/CardsWrapper';
import Products from '../../components/UI/icons/Products';
import { cn } from '../../utils/lib/cn';
import { bgTextFull, textTitle4 } from '../../constants/styles';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { data } = useAuth();
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div
          className={cn(
            'bg-main-secondary-bg border border-main-primary-text',
            bgTextFull
          )}
        >
          <Products className='w-4 h-4' />
          <h2 className={textTitle4}>آخرین محصول‌های من</h2>
        </div>
        <CardsWrapper
          type='product'
          linkUrl='products'
          getterFunc={() =>
            new Promise((resolve) => resolve(data?.bought))
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;
