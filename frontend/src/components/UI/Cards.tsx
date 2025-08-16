import { cn } from '../../utils/lib/cn';
import { Article, Product } from '../../types/apiTypes';
import ProductCard from './ProductCard';
import ArticleCard from './ArticleCard';

type Props =
  | {
      type: 'product';
      array: Product[];
    }
  | {
      type: 'article';
      array: Article[];
    };

const Cards = ({ array, type }: Props) => {
  // const sortedArray = [...array].sort(
  //   (a, b) => (b.sortByNumber) - (a.sortByNumber )
  // );
  return (
    <div
      role='list'
      className={cn('flex flex-wrap gap-4', {
        'gap-4 flex-col flex-nowrap': type === 'article',
      })}
    >
      {array?.map((item) => {
        return type === 'product' ? (
          <ProductCard key={item._id} data={item as Product} />
        ) : (
          <ArticleCard key={item._id} data={item as Article} />
        );
      })}
    </div>
  );
};

export default Cards;
