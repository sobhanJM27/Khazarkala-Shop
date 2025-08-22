import { ObjectId } from 'mongoose';
import { CategoryDto } from './dto/category.dto';
import { CategoryModel, ICategory } from './model/category.model';
import { AuthMessageError } from './../../common/enums/message.enum';
import { BadRequest, NotFound } from 'http-errors';

class categoryService {
  constructor(private categoryModel = CategoryModel<ICategory>) {}

  private async checkDuplicate(
    title: string,
    type: string,
    excludeId?: string
  ) {
    const query: any = { title, type };
    if (excludeId) query._id = { $ne: excludeId };

    const exist = await this.categoryModel.findOne(query);
    if (exist) throw BadRequest('این دسته‌بندی با این عنوان وجود دارد');
  }

  private async checkParent(parent?: string) {
    if (parent) {
      const exist = await this.categoryModel.findById(parent);
      if (!exist) throw BadRequest('پرنت وجود ندارد');
    }
  }

  async createCategory(category: CategoryDto): Promise<object> {
    const { title, parent, type } = category;

    await this.checkDuplicate(title, type);
    await this.checkParent(parent);

    await this.categoryModel.create({ title, parent, type });

    return { message: 'دسته بندی با موفقیت افزوده شد' };
  }

  async updateCategory(id: string, category: CategoryDto): Promise<object> {
    const { title, parent, type } = category;

    const exist = await this.categoryModel.findById(id);
    if (!exist) throw NotFound(AuthMessageError.NotFound);

    await this.checkDuplicate(title, type, id);
    await this.checkParent(parent);

    await this.categoryModel.updateOne(
      { _id: id },
      { $set: { title, parent, type } }
    );

    return { message: 'دسته بندی با موفقیت بروزرسانی شد' };
  }

  async deleteCategory(id: string): Promise<object> {
    const exist = await this.categoryModel.findById(id);
    if (!exist) throw NotFound(AuthMessageError.NotFound);

    await this.categoryModel.deleteOne({ _id: id });
    return { message: 'دسته بندی با موفقیت حذف شد' };
  }

  async getOneCategory(id: string) {
    const category = await this.categoryModel.findById({ _id: id });
    if (!category) throw NotFound(AuthMessageError.NotFound);
    return category;
  }

  async getChildren(parentId: string) {
    const children = await this.categoryModel.find({ parent: parentId });
    if (!children.length) throw NotFound('هیچ زیر دسته‌ای یافت نشد');
    return children;
  }

  async getAllCategory(type?: string) {
    let query: any = {};
    if (type && type !== 'undefined') query.type = type;

    const categories = await this.categoryModel.find(query);
    if (!categories.length) throw NotFound(AuthMessageError.NotFound);
    return categories;
  }
}

const categoryServices = new categoryService();

export { categoryServices };
