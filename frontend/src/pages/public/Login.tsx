import LoginTabs from '../../components/LoginTabs';
import SeoTags from '../../utils/lib/SEO';

const Login = () => {
  return (
    <>
      <SeoTags titleTemplate='ورود' description='' Url='' keywords='' />
      <main className='flex items-center justify-center min-h-[50%] py-8'>
        <div className='flex flex-col gap-8 items-center w-[90%]'>
          <LoginTabs />
        </div>
      </main>
    </>
  );
};

export default Login;
