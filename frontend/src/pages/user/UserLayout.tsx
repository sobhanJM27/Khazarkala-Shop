import { Outlet } from 'react-router-dom';
import DashboardNav from '../../components/DashboardNav';
import SeoTags from '../../utils/lib/SEO';

function UserLayout() {
  return (
    <>
      <SeoTags titleTemplate='داشبورد' description='' Url='' keywords='' />
      <main className='flex gap-2 sidebar:flex-col'>
        <DashboardNav />
        <section className='pt-6 px-4 w-full'>
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default UserLayout;
