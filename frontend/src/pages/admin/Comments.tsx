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
import { toPersianDate } from '../../utils/toPersianDate';
import Button from '../../components/UI/Button';

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
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['comments'],
    queryFn: () => getAllComments({ token, ...auth }),
  });

  console.log(data);

  useEffect(() => {
    if (data) setComments(data);
  }, [data]);

  console.log(data);

  const handleCommentStatus = async (commentId: string, status: boolean) => {
    try {
      status
        ? await setCommentStatus({ token, ...auth }, commentId, status)
        : await deleteComment({ token, ...auth }, commentId);
      toast.success('موفقیت آمیز');
    } catch (error) {
      console.log(error);
      toast.error('خطا در برقراری ارتباط');
    }
  };
  return (
    <WithLoaderAndError {...{ data, isError, error, isLoading }}>
      <ul className='flex flex-col gap-4'>
        {comments?.map(
          ({
            _id,
            text,
            createdAt,
            userID,
            status,
            blogID,
            productID,
            answer,
          }) => (
            <li key={_id} className='flex flex-col gap-2'>
              <span>تاریخ : {toPersianDate(createdAt)}</span>
              <span>
                برای محصول/مقاله : {productID?.title || blogID?.title}
              </span>
              <span>نام : {userID?.first_name}</span>
              <span>نام خانوادگی : {userID?.last_name}</span>
              <span>کامنت : {text}</span>
              <span>{statusMapper[status]}</span>
              <div className='flex gap-3'>
                {parent === 'all' && (
                  <Button
                    onClick={() => handleCommentStatus(_id, true)}
                    intent='primary'
                    size='fit'
                  >
                    تایید
                  </Button>
                )}
                <Button
                  onClick={() => handleCommentStatus(_id, false)}
                  intent='secondary'
                  size='fit'
                >
                  رد نظر
                </Button>
              </div>
              {answer?.map((reply) => (
                <div
                  key={reply._id}
                  className='ml-6 mt-2 flex flex-col gap-1 border-l-2 border-gray-300 pl-2'
                >
                  <span>تاریخ: {toPersianDate(reply.createdAt)}</span>
                  <span>پاسخ: {reply.text}</span>
                  <span>نام: {reply.userID?.first_name}</span>
                  <span>نام خوانوادگی : {reply.userID?.last_name}</span>
                  <span>{statusMapper[reply.status]}</span>
                  <div className='flex gap-2 mt-1'>
                    {parent === 'all' && (
                      <Button
                        onClick={() => handleCommentStatus(reply._id, true)}
                        intent='primary'
                        size='fit'
                      >
                        تایید
                      </Button>
                    )}
                    <Button
                      onClick={() => handleCommentStatus(reply._id, false)}
                      intent='secondary'
                      size='fit'
                    >
                      رد
                    </Button>
                  </div>
                </div>
              ))}

              <hr className='bg-main-brown-800 h-1 w-auto mt-2' />
            </li>
          )
        )}
      </ul>
    </WithLoaderAndError>
  );
};

export default ManageComments;
