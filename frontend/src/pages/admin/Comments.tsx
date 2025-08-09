import { useParams, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth, useAuthHooks } from '../../hooks/useAuth';
import {
  deleteComment,
  getAllComments,
  setCommentStatus,
} from '../../api/comment';
import { Comment } from '../../types/apiTypes';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { statusMapper } from '../../utils/commentStatus';
import WithLoaderAndError from '../../components/WithLoaderAndError';

type State = {
  id: string;
  comments: Comment[];
};

const ManageComments = () => {
  const { parent } = useParams<{ parent: 'products' | 'articles' | 'all' }>();
  const state: State = useLocation().state;
  const [comments, setComments] = useState(state?.comments ?? []);
  const { token } = useAuth();
  const auth = useAuthHooks();
  const allFaqsQuery = useQuery({
    queryKey: ['comments'],
    queryFn: () => getAllComments({ token, ...auth }),
  });

  useEffect(() => {
    if (allFaqsQuery.data) setComments(allFaqsQuery.data);
  }, [allFaqsQuery.data]);

  const handleCommentStatus = async (commentId: string, status: boolean) => {
    try {
      status
        ? await setCommentStatus({ token, ...auth }, commentId, true)
        : await deleteComment({ token, ...auth }, commentId);
      toast.success('موفقیت آمیز');
    } catch (error) {
      console.log(error);
      toast.error('خطا در برقراری ارتباط');
    }
  };
  return (
    <WithLoaderAndError
      data={allFaqsQuery.data}
      isLoading={allFaqsQuery.isLoading}
      isError={allFaqsQuery.isError}
      error={allFaqsQuery.error}
    >
      <ul className='flex flex-col gap-4'>
        {comments?.map(
          ({ _id, text, updatedAt, userID, status, productID, blogID }) => {
            return (
              <li key={_id} className='flex flex-col gap-2'>
                <span>تاریخ : {updatedAt}</span>
                <span>
                  {' '}
                  دسته بندی : برای محصول/مقاله{' '}
                  {productID?.title || blogID?.title}
                </span>
                <span>نام : {userID?.first_name}</span>
                <span>نام خانوادگی : {userID?.last_name}</span>
                <span>کامنت : {text}</span>
                <span>{statusMapper[status]}</span>
                <div className='flex gap-3'>
                  {parent === 'all' && (
                    <button
                      className='max-w-fit bg-pink-500 p-2 rounded-small'
                      onClick={() => handleCommentStatus(_id, true)}
                    >
                      تایید
                    </button>
                  )}
                  <button
                    className='max-w-fit bg-red-500 p-2 rounded-small'
                    onClick={() => handleCommentStatus(_id, false)}
                  >
                    رد نظر
                  </button>
                </div>
                <hr className='bg-main-brown-800 h-1 w-auto' />
              </li>
            );
          }
        )}
      </ul>
    </WithLoaderAndError>
  );
};

export default ManageComments;
