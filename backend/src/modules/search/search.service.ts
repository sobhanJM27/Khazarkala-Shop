import { ParsedQs } from 'qs';
import { BlogModel, IBlog } from '../blog/model/blog.model';
import { ProductModel, IProduct } from '../product/model/product.model';

class SearchService {
  constructor(
    private readonly blogRepository = BlogModel<IBlog>,
    private readonly productRepository = ProductModel<IProduct>
  ) {}

  async searchBlog(query: string | string[] | ParsedQs | ParsedQs[]) {
    const searchString = typeof query === 'string' ? query : '';

    const search = await this.blogRepository.find({
      $or: [
        { title: { $regex: searchString, $options: 'i' } },
        { shortText: { $regex: searchString, $options: 'i' } },
      ],
    });

    return { blog: search };
  }

  async searchProduct(query: string | string[] | ParsedQs | ParsedQs[]) {
    const searchString = typeof query === 'string' ? query : '';

    const search = await this.productRepository.find({
      $or: [
        { title: { $regex: searchString, $options: 'i' } },
        { shortText: { $regex: searchString, $options: 'i' } },
      ],
    });

    return { product: search };
  }

  async searchAll(query: string | string[] | ParsedQs | ParsedQs[]) {
    const product = await this.searchProduct(query);
    const blog = await this.searchBlog(query);
    return { product: product.product, blog: blog.blog };
  }
}

const searchService = new SearchService();

export { searchService as SearchService };
