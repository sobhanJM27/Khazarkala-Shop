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
        },
      }
    );
    return { message: 'با موفقیت اپدیت شد' };
  }

  async deleteBlog(id: string): Promise<object> {
    await this.findBlog(id);
    let result = await this.blogModel.deleteOne({ _id: id });
    return { message: 'با موفقیت حذف شد', result };
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
    // find blog related
    const CategoryBlog = await this.blogModel.find({ category: blog.category });
    const findblog = copyObject(blog);
    let relates = [];
    for (let i = 1; i < CategoryBlog.length; i++) {
      relates.push(CategoryBlog[i]);
    }
    findblog['related'] = relates;
    const result = await this.blogModel.find({}).sort({ createdAt: -1 });
    let latest = [];
    for (let i = 0; i < result.length; i++) {
      if (i == 5) break;
      latest.push(result[i]);
    }
    findblog['latest'] = latest;
    await this.blogModel.updateOne({ _id: id }, { $inc: { view: 1 } });

    return findblog;
  }

  async findAllBlog(
    categoryId: string,
    limit: number,
    filter: string
  ): Promise<Object> {
    let result: Array<object>;

    if (categoryId !== 'undefined' && filter == 'latest') {
      let category = await this.categoryModel.findOne({ _id: categoryId });
      const blogs = await this.blogModel
        .find({ category: category.title })
        .limit(limit)
        .sort({ createdAt: -1 });
      result = blogs;
    } else if (categoryId !== 'undefined' && filter == 'oldest') {
      let category = await this.categoryModel.findOne({ _id: categoryId });
      const blogs = await this.blogModel
        .find({ category: category.title })
        .limit(limit)
        .sort({ createdAt: +1 });
      result = blogs;
    } else if (categoryId !== 'undefined' && filter == 'undefined') {
      let category = await this.categoryModel.findOne({ _id: categoryId });
      const blogs = await this.blogModel
        .find({ category: category.title })
        .limit(limit);
      result = blogs;
    } else if (categoryId == 'undefined' && filter) {
      let blogs;
      if (filter == 'latest') {
        blogs = await this.blogModel
          .find({})
          .limit(limit)
          .sort({ createdAt: 1 });
      } else if (filter == 'oldest') {
        blogs = await this.blogModel
          .find({})
          .limit(limit)
          .sort({ createdAt: -1 });
      } else {
        blogs = await this.blogModel
          .find({})
          .limit(limit)
          .sort({ numberLike: +1 });
      }

      result = blogs;
    } else if (categoryId !== 'undefined' && filter == 'undefined') {
      const AllBlog = await this.blogModel.find({}).limit(limit);
      if (!AllBlog) throw NotFound(AuthMessageError.NotFound);
      result = AllBlog;
    }
    return result;
  }
}

const BlogServices = new BlogService();

export { BlogServices };
