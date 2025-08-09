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

class ProductService {
  constructor(
    private readonly productModel = ProductModel<IProduct>,
    private readonly categortyModel = CategoryModel<ICategory>,
    private readonly userRepository = UserModel<IUser>,
    private readonly codeRepository = CodeDiscountModel<ICodeDisCount>
  ) {}

  async createProduct(product: ProductDto): Promise<object> {
    let category = await this.categortyModel.findOne({ _id: product.category });
    if (product.discount > 0 && product.discount != 0) {
      const add = (product.discount * product.price) / 100;
      product.priceAfterDiscount = product.price - add;
      product.priceAfterDiscount =
        Math.floor(product.priceAfterDiscount / 10000) * 10000;
    } else {
      product.priceAfterDiscount = product.price;
      product.priceAfterDiscount =
        Math.floor(product.priceAfterDiscount / 10000) * 10000;
    }

    await this.productModel.create({
      title: product.title,
      Description: product.Description,
      shortText: product.shortText,
      price: product.price,
      discount: product.discount,
      priceAfterDiscount: product.priceAfterDiscount,
      category: category.title,
      images: product.images,
      comments: product.comments,
      createdAt: new Date(),
      sortByNumber: product.sortByNumber,
    });
    return { message: 'محصول با موفقیت اضافه شد' };
  }

  async updateProduct(id: string, product: ProductDto): Promise<object> {
    await this.findOneProduct(id);

    if (product.discount > 0 && product.discount != 0) {
      const add = (product.discount * product.price) / 100;
      product.priceAfterDiscount = product.price - add;
      product.priceAfterDiscount =
        Math.floor(product.priceAfterDiscount / 10000) * 10000;
    } else {
      product.priceAfterDiscount = product.price;
      product.priceAfterDiscount =
        Math.floor(product.priceAfterDiscount / 10000) * 10000;
    }

    await this.productModel.updateOne(
      { _id: id },
      {
        $set: {
          title: product.title,
          Description: product.Description,
          shortText: product.shortText,
          price: product.price,
          discount: product.discount,
          priceAfterDiscount: product.priceAfterDiscount,
          category: product.category,
          images: product.images,
          comments: product.comments,
          createdAt: new Date(),
          sortByNumber: product.sortByNumber,
        },
      }
    );
    return { message: 'محصول با موفقیت اپدیت شد' };
  }

  async deleteProduct(id: string): Promise<object> {
    await this.productModel.deleteOne({ _id: id });
    return { status: 200, message: 'محصول با موفقیت حذف شد' };
  }

  async findProduct(id: string): Promise<IProduct> {
    const product = await this.productModel.findOne({ _id: id }).populate({
      path: 'comments',
      populate: {
        path: 'userID',
        select: 'first_name last_name',
      },
    });

    if (!product) throw NotFound(AuthMessageError.NotFound);
    return product;
  }

  async findOneProduct(id: string): Promise<IProduct> {
    const product = await this.productModel.findOne({ _id: id }).populate({
      path: 'comments',
      populate: {
        path: 'userID',
        select: 'first_name last_name',
      },
    });

    if (!product) throw NotFound(AuthMessageError.NotFound);
    // find blog related
    const CategoryProduct = await this.productModel.find({
      category: product.category,
    });
    const findProduct = copyObject(product);
    let relates = [];
    for (let i = 0; i < CategoryProduct.length; i++) {
      if (CategoryProduct[i]._id == id) {
        continue;
      } else {
        relates.push(CategoryProduct[i]);
      }
    }
    findProduct['related'] = relates;

    const result = await this.productModel.find({}).sort({ createdAt: -1 });
    let latest = [];
    for (let i = 0; i < result.length; i++) {
      if (i == 5) break;
      latest.push(result[i]);
    }
    findProduct['latest'] = latest;

    const view = await this.productModel.updateOne(
      { _id: id },
      { $inc: { view: 1 } }
    );

    return findProduct;
  }

  async findAllProduct(
    categoryId: string,
    limit: number,
    sort: string
  ): Promise<Object> {
    let result: Object;
    if (categoryId !== 'undefined' && sort == 'latest') {
      let category = await this.categortyModel.findOne({ _id: categoryId });
      const products = await this.productModel
        .find({ category: category.title })
        .limit(limit)
        .sort({ createdAt: -1 });
      result = products;
    } else if (categoryId !== 'undefined' && sort == 'oldest') {
      let category = await this.categortyModel.findOne({ _id: categoryId });
      const products = await this.productModel
        .find({ category: category.title })
        .limit(limit)
        .sort({ createdAt: +1 });
      result = products;
    } else if (categoryId !== 'undefined' && sort == 'popular') {
      let category = await this.categortyModel.findOne({ _id: categoryId });
      const products = await this.productModel
        .find({ category: category.title })
        .limit(limit)
        .sort({ sale: -1 });
      result = products;
    } else if (categoryId !== 'undefined' && sort == 'high') {
      let category = await this.categortyModel.findOne({ _id: categoryId });
      const products = await this.productModel
        .find({ category: category.title })
        .limit(limit)
        .sort({ price: -1 });
      result = products;
    } else if (categoryId !== 'undefined' && sort == 'low') {
      let category = await this.categortyModel.findOne({ _id: categoryId });
      const products = await this.productModel
        .find({ category: category.title })
        .limit(limit)
        .sort({ price: +1 });
      result = products;
    } else if (categoryId !== 'undefined') {
      let category = await this.categortyModel.findOne({ _id: categoryId });
      const products = await this.productModel
        .find({ category: category.title })
        .limit(limit);
      result = products;
    } else if (categoryId == 'undefined' && sort !== 'undefined') {
      let products: Object;
      if (sort == 'latest') {
        products = await this.productModel
          .find({})
          .limit(limit)
          .sort({ createdAt: -1 });
      } else if (sort == 'oldest') {
        products = await this.productModel
          .find({})
          .limit(limit)
          .sort({ createdAt: +1 });
      } else if (sort == 'popular') {
        products = await this.productModel
          .find({})
          .limit(limit)
          .sort({ sale: -1 });
      } else if (sort == 'low') {
        products = await this.productModel
          .find({})
          .limit(limit)
          .sort({ price: +1 });
      } else if (sort == 'high') {
        products = await this.productModel
          .find({})
          .limit(limit)
          .sort({ price: -1 });
      }
      result = products;
    } else if (categoryId == 'undefined' && sort == 'undefined') {
      const AllProduct = await this.productModel.find({}).limit(limit);
      if (!AllProduct) throw NotFound(AuthMessageError.NotFound);
      result = AllProduct;
    }

    return result;
  }

  async findCategoty(categoryId: string): Promise<ICategory> {
    let category = await this.categortyModel.findOne({ _id: categoryId });
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
