import { BadRequest, NotFound, ServiceUnavailable } from 'http-errors';
import { copyObject } from '../../common/functions/globalFunction';
import { CodeDto, ProductDto } from './dto/product.dto';
import {
  CodeDiscountModel,
  ProductModel,
  ICodeDisCount,
  IProduct,
} from './model/product.model';
import {
  AuthMessageError,
  GlobalMessageError,
} from '../../common/enums/message.enum';
import { CategoryModel, ICategory } from '../category/model/category.model';
import { IUser, UserModel } from '../user/model/user.model';
import { statusEnum as statusComment } from './../../common/enums/status.enum';

class ProductService {
  constructor(
    private readonly productModel = ProductModel<IProduct>,
    private readonly categoryModel = CategoryModel<ICategory>,
    private readonly codeRepository = CodeDiscountModel<ICodeDisCount>
  ) {}

  private calculatePrice(price: number, discount: number): number {
    let finalPrice = price;
    if (discount > 0) {
      const discountAmount = (discount * price) / 100;
      finalPrice = price - discountAmount;
    }
    return Math.floor(finalPrice / 10000) * 10000;
  }

  async createProduct(product: ProductDto): Promise<object> {
    const category = await this.categoryModel.findById(product.category);
    if (!category) throw NotFound(AuthMessageError.NotFound);

    const priceAfterDiscount = this.calculatePrice(
      product.price,
      product.discount
    );

    await this.productModel.create({
      ...product,
      priceAfterDiscount,
      category: category.title,
      createdAt: new Date(),
    });

    return { message: 'محصول با موفقیت اضافه شد' };
  }

  async updateProduct(id: string, product: ProductDto): Promise<object> {
    await this.findOneProduct(id);

    const category = await this.categoryModel.findById(product.category);
    if (!category) throw NotFound(AuthMessageError.NotFound);

    const priceAfterDiscount = this.calculatePrice(
      product.price,
      product.discount
    );

    await this.productModel.updateOne(
      { _id: id },
      {
        $set: {
          ...product,
          priceAfterDiscount,
          category: category.title,
          updatedAt: new Date(),
        },
      }
    );

    return { message: 'محصول با موفقیت آپدیت شد' };
  }

  async deleteProduct(id: string): Promise<object> {
    const result = await this.productModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw NotFound(AuthMessageError.NotFound);
    }
    return { message: 'محصول با موفقیت حذف شد' };
  }

  async findProduct(id: string): Promise<IProduct> {
    const product = await this.productModel.findOne({ _id: id }).populate({
      path: 'comments',
      populate: [
        {
          path: 'userID',
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

    if (!product) throw NotFound(AuthMessageError.NotFound);
    return product;
  }

  async findOneProduct(id: string): Promise<any> {
    const product = await this.findProduct(id);

    const related = await this.productModel
      .find({ category: product.category, _id: { $ne: id } })
      .limit(5);

    const latest = await this.productModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    await this.productModel.updateOne({ _id: id }, { $inc: { view: 1 } });

    return { ...product.toObject(), related, latest };
  }

  async findAllProduct(
    categoryId?: string,
    limit?: number,
    sort?: string
  ): Promise<object> {
    const isCategorySet =
      categoryId && categoryId !== 'undefined' && categoryId.trim() !== '';
    const isSortSet = sort && sort !== 'undefined' && sort.trim() !== '';

    const finalLimit = limit && !isNaN(limit) ? limit : 10;

    let query: any = {};
    let sortOption: any = {};

    if (isCategorySet) {
      const category = await this.categoryModel.findOne({ _id: categoryId });
      if (!category) throw NotFound(AuthMessageError.NotFound);
      query.category = category.title;
    }

    if (isSortSet) {
      switch (sort) {
        case 'latest':
          sortOption = { createdAt: -1 };
          break;
        case 'oldest':
          sortOption = { createdAt: 1 };
          break;
        case 'highest':
          sortOption = { price: -1 };
          break;
        case 'lowest':
          sortOption = { price: 1 };
          break;
      }
    }

    let productsQuery = this.productModel.find(query);
    if (Object.keys(sortOption).length > 0) {
      productsQuery = productsQuery.sort(sortOption);
    }
    if (finalLimit > 0) {
      productsQuery = productsQuery.limit(finalLimit);
    }

    const products = await productsQuery;

    return products;
  }

  async findCategoty(categoryId: string): Promise<ICategory> {
    let category = await this.categoryModel.findOne({ _id: categoryId });
    if (!category) throw NotFound(AuthMessageError.NotFound);
    return category;
  }

  async createCodeDiscount(codeDto: CodeDto) {
    const { code, discount } = codeDto;
    const findCode = await this.codeRepository.findOne({ code });
    if (findCode) throw BadRequest('کد قبلا وجود داشته است');
    const create = await this.codeRepository.create({
      code,
      discount,
    });
    if (!create)
      throw ServiceUnavailable(GlobalMessageError.ServiceUnavailable);
    return { message: 'کد با تخفیف ساخته شد' };
  }
}

const ProductServices = new ProductService();

export { ProductServices };
