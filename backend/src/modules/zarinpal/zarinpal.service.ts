import * as moment from 'moment-jalali';
import { Response } from 'express';
import axios from 'axios';
import { Model, ObjectId } from 'mongoose';
import { isMongoId } from 'class-validator';
import { IUser, UserModel } from '../user/model/user.model';
import { CheckDto, PaymentDto, UpdateDto } from './dto/payment.dto';
import {
  IProduct,
  ProductModel,
  CodeDiscountModel,
  ICodeDisCount,
} from '../product/model/product.model';
import {
  IPayment,
  ISale,
  PaymentModel,
  SaleModel,
} from './model/zarinpal.model';
import createHttpError from 'http-errors';
import { invoiceNumberGenerator } from './../../common/functions/globalFunction';

class PaymentService {
  constructor(
    private readonly productRepository = ProductModel<IProduct>,
    private readonly saleRepositoy = SaleModel<ISale>,
    private readonly paymentRepository = PaymentModel<IPayment>,
    private readonly userRepository = UserModel<IUser>,
    private readonly codeRepository = CodeDiscountModel<ICodeDisCount>
  ) {}

  async PaymentGateway(paymentDto: PaymentDto, userID: string): Promise<void> {
    const { basket } = paymentDto;
    let amount: number = 0;
    let listProduct: Array<{ product: ObjectId; count: number }> = [];
    for (let i = 0; i < basket.length; i++) {
      const id: string = basket[i].id;
      const findProduct: IProduct = await this.productRepository.findOne({
        _id: id,
      });
      if (findProduct) {
        listProduct.push({ product: findProduct._id, count: basket[i].count });
        amount += findProduct.priceAfterDiscount * basket[i].count;
      }
    }
    const user: IUser = await this.userRepository.findOne({ _id: userID });
    if (!user) throw createHttpError.Unauthorized('کاربری یافت نشد');
    await this.zarinpal(user, listProduct, amount);
  }

  async zarinpal(
    user: IUser,
    listProduct: Array<{ product: ObjectId; count: number }>,
    amount: number
  ): Promise<object> {
    const zarinpal_request_url =
      'https://api.zarinpal.com/pg/v4/payment/request.json';
    const zarinpalGatewayURL = 'https://www.zarinpal.com/pg/StartPay';
    const description = 'بابت خرید دوره یا محصولات';
    const zapripal_options = {
      merchant_id: process.env.ZARINPAL_MERCHANTID,
      amount: amount,
      description,
      metadata: {
        email: user?.email || 'example@domain.com',
        mobile: user.phone,
      },
      callback_url: 'https://hyperkala-backend.liara.run/api/payment/verify',
    };
    const RequestResult = await axios
      .post(zarinpal_request_url, zapripal_options)
      .then((result) => result.data);
    const { authority, code } = RequestResult.data;
    if (code == 100 && authority) {
      const payment = await this.paymentRepository.create({
        authority,
        amount,
        paymentData: moment().format('jYYYYjMMjDDHHmmss'),
        invoiceNumber: invoiceNumberGenerator(),
        verify: false,
        description,
      });
      await this.saleRepositoy.create({
        userID: user._id,
        productID: listProduct,
        payment: payment._id,
      });
      return {
        statusCode: 200,
        code,
        gatewayURL: `${zarinpalGatewayURL}/${authority}`,
      };
    }
  }

  async verifyPayment(res: Response, authority: string) {
    const verifyURL = 'https://api.zarinpal.com/pg/v4/payment/verify.json';
    const payment = await this.paymentRepository.findOne({ authority });
    const sale = await this.saleRepositoy.findOne({ payment: payment._id });
    if (!payment) throw createHttpError.NotFound('تراکنش مورد انتظار یافت نشد');
    if (payment.verify)
      throw createHttpError.BadRequest('تراکنش مورد نظر قبلا پرداخت شده است');
    const verifyBody = JSON.stringify({
      authority,
      amount: payment.amount,
      merchant_id: process.env.ZARINPAL_MERCHANTID,
    });
    const verifyResult = await fetch(verifyURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: verifyBody,
    }).then((result) => result.json());
    if (verifyResult.data.code == 100) {
      await this.updateSaleProduct(sale.productID);
      await payment.updateOne({
        $set: {
          verify: true,
          saleID: sale._id,
          refID: verifyResult.data.ref_id,
          cardHash: verifyResult.data.card_hash,
        },
      });
      return res.redirect('');
    }
    return res.redirect('');
  }

  async updateSaleProduct(
    listProduct: Array<{ product: ObjectId; count: number }>
  ) {
    for (let i = 0; i < listProduct.length; i++) {
      await this.productRepository.updateOne(
        { _id: listProduct[i].product },
        {
          $inc: { sale: 1 },
        }
      );
    }
  }

  async getAuthority(authority: string, userID: string) {
    const payment = await this.paymentRepository.findOne({ authority });
    const sale = await this.saleRepositoy.findOne({ payment: payment._id });
    const product = sale.productID;
    const listProduct = [];
    for (var i = 0; i < product.length; i++) {
      const findProduct = await this.productRepository.findOne({
        _id: product[i].product,
      });
      if (findProduct)
        listProduct.push({
          title: findProduct.title,
          image: findProduct.images,
          priceAfterDiscount: findProduct.priceAfterDiscount,
          count: product[i].count,
        });
    }
    return { listProduct };
  }

  async updateBasket(updateDto: UpdateDto) {
    const { listProduct } = updateDto;

    if (!Array.isArray(listProduct)) {
      return [];
    }

    let validProduct = [];
    for (var i = 0; i < listProduct.length; i++) {
      if (!isMongoId(listProduct[i])) continue;
      const product = await this.productRepository.findOne(
        { _id: listProduct[i] },
        { price: 1, priceAfterDiscount: 1, title: 1, images: 1 }
      );
      if (product) {
        validProduct.push(product);
      }
    }
    return { listProduct: validProduct };
  }

  async getAllSold() {
    const sales = await this.saleRepositoy
      .find()
      .populate({
        path: 'payment',
        select: 'amount verify invoiceNumber refID paymentData',
      })
      .lean();

    const detailedSales = [];

    for (const sale of sales) {
      const productsWithDetails = [];

      for (const prodItem of sale.productID) {
        const product = await this.productRepository
          .findOne({ _id: prodItem.product })
          .lean();
        if (product) {
          productsWithDetails.push({
            productId: product._id,
            title: product.title,
            images: product.images,
            priceAfterDiscount: product.priceAfterDiscount,
            count: prodItem.count,
          });
        }
      }

      detailedSales.push({
        saleId: sale._id,
        userID: sale.userID,
        payment: sale.payment,
        products: productsWithDetails,
      });
    }

    return detailedSales;
  }

  async checkCodeDiscount(codeDto: CheckDto) {
    const { code } = codeDto;
    const findCode = await this.codeRepository.findOne({ code });
    if (!findCode) throw createHttpError.NotFound('کد وارد شده صحیح نمیباشد');
    return { discount: findCode.discount };
  }

  async getAllCodes() {
    return await CodeDiscountModel.find().sort({ createdAt: -1 });
  }

  async addCode(code: string, discount: number) {
    if (!code || !discount)
      throw createHttpError.BadRequest('کد یا مقدار تخفیف نباید خالی باشد');

    const exists = await this.codeRepository.findOne({ code });
    if (exists) throw createHttpError.Conflict('این کد تخفیف قبلا ثبت شده است');

    const newCode = await this.codeRepository.create({ code, discount });
    return newCode;
  }

  async deleteCode(discountId: string) {
    if (!isMongoId(discountId))
      throw createHttpError.BadRequest('شناسه معتبر نیست');

    const deleted = await this.codeRepository.findByIdAndDelete(discountId);
    if (!deleted) throw createHttpError.NotFound('کد تخفیف یافت نشد');

    return { message: 'کد تخفیف با موفقیت حذف شد' };
  }
}

const paymentService = new PaymentService();

export { paymentService as PaymentService };
