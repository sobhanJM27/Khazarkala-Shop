import mongoose, { model, ObjectId } from 'mongoose';

interface ICodeDisCount extends mongoose.Document {
  code: string;
  discount: string;
}

const codeSchema = new mongoose.Schema<ICodeDisCount>({
  code: { type: String, required: true, unique: true, trim: true },
  discount: { type: String, required: true },
});

interface IProduct extends mongoose.Document {
  title: string;
  Description: string;
  shortText: string;
  price: number;
  discount: number;
  priceAfterDiscount: number;
  category: Array<string>;
  images: Array<string>;
  comments: Array<ObjectId>;
  createdAt: string;
  sortByNumber: number;
  related: Array<ObjectId>;
  latest: Array<ObjectId>;
  sale: number;
  status: boolean;
}

const productSchema = new mongoose.Schema<IProduct>({
  title: { type: String, default: '' },
  Description: { type: String, default: '' },
  shortText: { type: String, default: '' },
  price: { type: Number },
  discount: { type: Number },
  priceAfterDiscount: { type: Number, default: 0 },
  category: { type: [String], ref: 'category' },
  images: { type: [String] },
  comments: { type: [], ref: 'comment' },
  createdAt: { type: String, default: '' },
  sortByNumber: { type: Number },
  related: { type: [Object], default: [] },
  latest: { type: [mongoose.Types.ObjectId], default: [] },
  sale: { type: Number, default: 0 },
  status: { type: Boolean },
});
productSchema.index({ title: 'text', shortText: 'text', category: 'text' });

const ProductModel = model<IProduct>('product', productSchema);
const CodeDiscountModel = model<ICodeDisCount>('codeDiscount', codeSchema);
export { IProduct, ProductModel, CodeDiscountModel, ICodeDisCount };
