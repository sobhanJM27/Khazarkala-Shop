import { toPersianNumbers } from '../../utils/toPersianNumbers';
import { toPersianDate } from '../../utils/toPersianDate';
import Eye from './icons/Eye';
import Clock from './icons/Clock';
import { cn } from '../../utils/lib/cn';
import { bgProductPage, textBody2 } from '../../constants/styles';
import { memo } from 'react';
import ShareBox from '../ShareBox';

type Props = {
  views: number;
  createdAt: string;
  postId: string;
  postTitle: string;
};

const ArticleSummary = ({
  createdAt,
  views,
  postId,
  postTitle,
}: Props) => {
  return (
    <div
      className={cn(
        'flex gap-4 justify-between flex-wrap',
        textBody2,
        bgProductPage
      )}
    >
      <div className='flex gap-4'>
        <div className='flex items-center gap-2'>
          <Eye className='w-4 h-4 dark:invert' />
          <span>{`${toPersianNumbers(views, true)} بازدید`}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Clock className='w-4 h-4 dark:invert' />
          <span>{toPersianDate(createdAt)}</span>
        </div>
      </div>
      <ShareBox
        className='self-center'
        postId={postId}
        postTitle={postTitle}
        type='article'
      />
    </div>
  );
};

export default memo(ArticleSummary);
