import WithLoaderAndError from '../../components/WithLoaderAndError';
import { bgTextFull, textTitle4 } from '../../constants/styles';
import { cn } from '../../utils/lib/cn';
import Comment from '../../components/UI/icons/Comment';
import { useAuth, useAuthHooks } from '../../hooks/useAuth';
import { getMyComments } from '../../api/comment';
import { useQuery } from '@tanstack/react-query';
import ProductComment from '../../components/UI/ProductComment';

const MyComments = () => {
  const { token } = useAuth();
  const authHooks = useAuthHooks();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['my_comments'],
    queryFn: () => getMyComments({ token, ...authHooks }),
  });
  return (
    <div className='flex flex-col gap-4'>
      <div
        className={cn(
          'bg-main-secondary-bg border border-main-primary-text',
          bgTextFull
        )}
      >
        <Comment className='w-4 h-4' />
        <h1 className={textTitle4}>نظرات من</h1>
      </div>
      <WithLoaderAndError {...{ isLoading, error, data, isError }}>
        <ul className='flex flex-col gap-4'>
          {data?.comment?.map((comment) => (
            <li key={comment._id} className='flex flex-col gap-2'>
              <ProductComment
                comment={comment.text}
                date={comment.createdAt}
                name={comment.userID?.first_name}
                status={comment.status}
                product={comment?.productID || comment?.blogID}
              />
              {data.answer?.map((reply) => (
                <div
                  key={reply._id}
                  className='ml-6 mt-2 flex flex-col gap-1 border-l-2 border-gray-300 pl-2'
                >
                  <ProductComment
                    comment={reply.text}
                    date={reply.createdAt}
                    name={reply.userID?.first_name}
                    status={reply.status}
                    product={reply?.productID || reply?.blogID}
                  />
                </div>
              ))}
            </li>
          ))}
        </ul>
      </WithLoaderAndError>
    </div>
  );
};

export default MyComments;
