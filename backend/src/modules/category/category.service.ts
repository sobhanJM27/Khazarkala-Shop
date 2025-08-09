import { ObjectId } from 'mongoose';
import { CategoryDto } from './dto/category.dto';
import { CategoryModel, ICategory } from './model/category.model';
import { AuthMessageError } from './../../common/enums/message.enum';
import { NotFound } from 'http-errors';

class categoryService {
  constructor(private categoryModel = CategoryModel<ICategory>) {}

  async createCategory(category: CategoryDto): Promise<object> {
    const { title, parent, type } = category;
    if (type == 'product') {
      if (!parent) {
        if (
          await CategoryModel.findOne({ title, type }, { __v: 0, parent: 0 })
        ) {
          throw new Error('این دسته بندی با این عنوان وجود دارد');
        }

        const result = await this.categoryModel.create({
          title: category.title,
          type: category.type,
        });
      } else {
        if (
          await CategoryModel.findOne({ title, type }, { __v: 0, parent: 0 })
        ) {
          throw new Error('این دسته بندی با این عنوان وجود دارد');
        }
        if (parent && !(await CategoryModel.findOne({ _id: parent }))) {
          throw new Error('پرنت وجود ندارد');
        }
        const result = await this.categoryModel.create({
          title: category.title,
          parent: category.parent,
          type: category.type,
        });
      }
    }
    if (type == 'blog') {
      if (!parent) {
        if (
          await CategoryModel.findOne({ title, type }, { __v: 0, parent: 0 })
        ) {
          throw new Error('این دسته بندی با این عنوان وجود دارد');
        }
        const result = await this.categoryModel.create({
          title: category.title,
          type: category.type,
        });
      } else {
        if (
          await CategoryModel.findOne({ title, type }, { __v: 0, parent: 0 })
        ) {
          throw new Error('این دسته بندی با این عنوان وجود دارد');
        }
        if (parent && !(await CategoryModel.findOne({ _id: parent }))) {
          throw new Error('پرنت وجود ندارد');
        }
        const result = await this.categoryModel.create({
          title: category.title,
          parent: category.parent,
          type: category.type,
        });
      }
    }

    return { message: 'دسته بندی با موفقیت افزوده شد' };
  }

  async updateCategoy(id: String, category: CategoryDto): Promise<object> {
    const { title, parent, type } = category;
    if (type == 'product') {
      if (!parent) {
        if (
          await CategoryModel.findOne({ title, type }, { __v: 0, parent: 0 })
        ) {
          throw new Error('این دسته بندی با این عنوان وجود دارد');
        }

        const result = await this.categoryModel.updateOne(
          { _id: id },
          {
            $set: {
              title: category.title,
              type: category.type,
            },
          }
        );
      } else {
        if (
          await CategoryModel.findOne({ title, type }, { __v: 0, parent: 0 })
        ) {
          throw new Error('این دسته بندی با این عنوان وجود دارد');
        }
        if (parent && !(await CategoryModel.findOne({ _id: parent }))) {
          throw new Error('پرنت وجود ندارد');
        }
        const result = await this.categoryModel.updateOne(
          { _id: id },
          {
            $set: {
              title: category.title,
              type: category.type,
              parent: category.parent,
            },
          }
        );
      }
    }
    if (type == 'blog') {
      if (!parent) {
        if (
          await CategoryModel.findOne({ title, type }, { __v: 0, parent: 0 })
        ) {
          throw new Error('این دسته بندی با این عنوان وجود دارد');
        }

        const result = await this.categoryModel.updateOne(
          { _id: id },
          {
            $set: {
              title: category.title,
              type: category.type,
            },
          }
        );
      } else {
        if (
          await CategoryModel.findOne({ title, type }, { __v: 0, parent: 0 })
        ) {
          throw new Error('این دسته بندی با این عنوان وجود دارد');
        }
        if (parent && !(await CategoryModel.findOne({ _id: parent }))) {
          throw new Error('پرنت وجود ندارد');
        }
        const result = await this.categoryModel.updateOne(
          { _id: id },
          {
            $set: {
              title: category.title,
              type: category.type,
              parent: category.parent,
            },
          }
        );
      }
    }
    return { message: 'دسته بندی با موفقیت اپدیت افزوده شد' };
  }

  async deleteCategory(id: String): Promise<object> {
    const result = await this.categoryModel.deleteOne({ _id: id });
    //if(!result) throw createHttpError.InternalServerError("به روز رسانی دسته بندی انجام نشد")
    return { message: 'دسته بندی با موفقیت حذف افزوده شد', result };
  }

  async getOneCategory(id: string) {
    const category = await this.categoryModel.findById({ _id: id });
    if (!category) throw NotFound(AuthMessageError.NotFound);
    return category;
  }

  async getChildern(nameParent: string) {
    const category = await this.categoryModel.find({ parent: nameParent });
    if (!category) throw NotFound(AuthMessageError.NotFound);
    return category;
  }

  async getAllCategory(type: string) {
    let category;
    if (type !== 'undefined') {
      category = await this.categoryModel.find({ type: type });
      if (!category) throw NotFound(AuthMessageError.NotFound);
    } else if (type == 'undefined') {
      category = await this.categoryModel.find({});
    }
    return category;
  }
}

const categoryServices = new categoryService();

export { categoryServices };
