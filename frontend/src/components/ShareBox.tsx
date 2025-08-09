import { useState } from 'react';
import IconWrapper from './UI/IconWrapper';
import Share from './UI/icons/Share';
import { cn } from '../utils/lib/cn';
import Copy from './UI/icons/Copy';
import { toUrl } from '../utils/toUrl';
import toast from 'react-hot-toast';

type Props = {
  className?: string;
  postId: string;
  postTitle: string;
  type: 'product' | 'article';
};

const ShareBox = ({ className, postId, postTitle, type }: Props) => {
  const [showBox, setShowBox] = useState(false);
  const url =
    'wincells.com/' +
    (type == 'product' ? 'product' : 'article') +
    '/' +
    postId +
    '/' +
    toUrl(postTitle);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    toast.success('لینک با موفقیت کپی شد');
  };

  return (
    <div className={cn('flex gap-2', className)}>
      <div
        hidden={!showBox}
        className={cn(
          'flex gap-1 transition-all duration-300 opacity-0 pointer-events-none translate-x-4',
          showBox && 'opacity-100 pointer-events-auto translate-x-0'
        )}
        role='list'
      >
        <IconWrapper onClick={handleCopyUrl} role='listitem'>
          <Copy className='w-5 h-5 dark:invert' />
        </IconWrapper>
      </div>
      <IconWrapper onClick={() => setShowBox((prev) => !prev)}>
        <Share className='w-5 h-5 dark:invert' />
      </IconWrapper>
    </div>
  );
};

export default ShareBox;
