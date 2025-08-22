import { ObjectId } from 'mongoose';
import { BlogDto } from './dto/blog.dto';
import { BlogModel, IBlog } from './model/blog.model';
import { AuthMessageError } from './../../common/enums/message.enum';
import { NotFound } from 'http-errors';
import { copyObject } from '../../common/functions/globalFunction';
import { CategoryModel, ICategory } from '../category/model/category.model';

class BlogService {
  constructor(
    private blogModel = BlogModel<IBlog>,
    private categoryModel = CategoryModel<ICategory>
  ) {}

  async createBlog(blog: BlogDto): Promise<object> {
    let category = await this.categoryModel.findOne({ title: blog.category });
    await this.blogModel.create({
      title: blog.title,
      description: blog.description,
      shortText: blog.shortText,
      status: blog.status,
      images: blog.images,
      category: category.title,
      shortLink: blog.shortLink,
      sortByNumber: blog.sortByNumber,
      comment: blog.comment,
      createdAt: new Date(),
      author: blog.author,
    });
    return { message: 'با موفقیت اضافه شد' };
  }

  async updateBlog(id: string, blog: BlogDto): Promise<object> {
    await this.findBlog(id);
    await this.blogModel.updateOne(
      { _id: id },
      {
        $set: {
          title: blog.title,
          description: blog.description,
          shortText: blog.shortText,
          status: blog.status,
          images: blog.images,
          shortLink: blog.shortLink,
          comment: blog.comment,
          sortByNumber: blog.sortByNumber,
          category: blog.category,
          createdAt: new Date(),
          author: blog.author,
          updatedAt: new Date(),
        },
      }
    );
    return { message: 'با موفقیت اپدیت شد' };
  }

  async deleteBlog(id: string): Promise<object> {
    await this.findBlog(id);
    await this.blogModel.deleteOne({ _id: id });
    return { message: 'با موفقیت حذف شد' };
  }

  async findBlog(id: string): Promise<IBlog> {
    const blog = await this.blogModel.findOne({ _id: id });

    if (!blog) throw NotFound('بلاگی با این شناسه پیدا نشد');
    return blog;
  }

  async findOneBlog(id: string): Promise<IBlog> {
    const blog = await this.blogModel.findOne({ _id: id }).populate({
      path: 'comments',
      populate: [
        {
          path: 'userID',
          model: 'user',
          select: 'first_name last_name',
        },
        {
          path: 'answer',
          populate: {
            path: 'userID',
          },
        },
      ],
    });

    if (!blog) throw NotFound(AuthMessageError.NotFound);

    const categoryBlogs = await this.blogModel.find({
      category: blog.category,
    });
    const related = categoryBlogs
      .filter((b) => b._id.toString() !== id)
      .slice(0, 5);

    const latest = await this.blogModel.find().sort({ createdAt: -1 }).limit(5);

    await this.blogModel.updateOne({ _id: id }, { $inc: { view: 1 } });

    return Object.assign(blog.toObject(), { related, latest });
  }

  async findAllBlog(
    categoryId: string | undefined,
    limit: number,
    filter: string | undefined
  ): Promise<IBlog[]> {
    const query: any = {};
    let sort: any = {};

    if (categoryId && categoryId !== 'undefined') {
      const category = await this.categoryModel.findById(categoryId);
      if (!category) throw NotFound(AuthMessageError.NotFound);
      query.category = category._id;
    }

    if (filter === 'latest') sort.createdAt = -1;
    else if (filter === 'oldest') sort.createdAt = 1;

    const blogs = await this.blogModel
      .find(query)
      .limit(limit)
      .sort(sort)
      .lean();
    if (!blogs.length) throw NotFound(AuthMessageError.NotFound);

    return blogs;
  }
}

const BlogServices = new BlogService();

export { BlogServices };
