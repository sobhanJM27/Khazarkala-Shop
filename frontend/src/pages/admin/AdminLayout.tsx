import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import SeoTags from '../../utils/lib/SEO';

function AdminLayout() {
  return (
    <>
      <SeoTags titleTemplate='پنل ادمین' description='' Url='' keywords='' />
      <main className='flex gap-2 article-sidebar:flex-col p-4'>
        <AdminNavbar />
        <section className='pt-6 px-4 w-full'>
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default AdminLayout;
