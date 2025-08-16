import { memo, useRef, useState } from 'react';
import { bgProductPage, bgTextFull, textTitle4 } from '../constants/styles';
import { cn } from '../utils/lib/cn';
import Comment from './UI/icons/Comment';
import Textarea from './UI/Textarea';
import Button from './UI/Button';
import { useAuth, useAuthHooks } from '../hooks/useAuth';
import inputValidator from '../utils/inputValidator';
import toast from 'react-hot-toast';
import Loader from './UI/Loader';
import { addComment } from '../api/comment';

type Props = {
  type: 'product' | 'blog';
  postId: string;
  parentId?: string | null;
  exitReplyMode?: () => void;
};

const WriteComment = ({
  type,
  postId,
  parentId = null,
  exitReplyMode,
}: Props) => {
  const [pending, setPending] = useState(false);
  const { token, Auth } = useAuth();
  const authHooks = useAuthHooks();
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!Auth)
      return toast.error('برای ارسال نظر باید وارد حساب کاربری خود شوید');
    const msgText = inputValidator(textRef.current?.value);
    if (msgText) return toast.error(msgText);

    setPending(true);
    try {
      await addComment(
        { token, ...authHooks },
        {
          text: textRef.current!.value,
          method: type,
          ID: postId,
          snedType: parentId ? 'answer' : 'comment',
          parent: parentId || '',
        }
      );
      toast.success(parentId ? 'پاسخ شما ارسال شد' : 'نظر شما ارسال شد');
      textRef.current!.value = '';
      exitReplyMode?.();
    } catch (error) {
      console.log(error);
      toast.error('ارسال با خطا مواجه شد');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-2', bgProductPage)}>
      <div
        className={cn('bg-main-brown-300 dark:bg-main-gray-300', bgTextFull)}
      >
        <Comment className='w-4 h-4 dark:invert' />
        <h3 className={textTitle4}>
          {parentId ? 'پاسخ شما چیه؟' : 'نظر شما چیه؟'}
        </h3>
        {parentId && (
          <Button intent='secondary' size='fit' onClick={exitReplyMode}>
            انصراف
          </Button>
        )}
      </div>
      <Textarea
        intent='primary'
        inputSize='base'
        ref={textRef}
        placeholder='اینجا بنویسید...'
      />
      <Button
        intent='primary'
        size='fit'
        className='self-end'
        disabled={pending}
        onClick={handleSubmit}
      >
        {pending ? (
          <Loader type='button' />
        ) : parentId ? (
          'ارسال پاسخ'
        ) : (
          'ارسال نظر'
        )}
      </Button>
    </div>
  );
};

export default memo(WriteComment);
