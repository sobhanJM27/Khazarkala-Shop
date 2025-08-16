type IdSchema = {
  _id: string;
};

type CommentStatus = 'pending' | 'approved' | 'rejected';

export type Category = IdSchema & {
  title: string;
  type: 'product' | 'blog';
};

export type CommentProduct = IdSchema & {
  title: string;
};

export type Comment = IdSchema & {
  text: string;
  createdAt: string;
  updatedAt: string;
  show: boolean;
  isShowAdmin: boolean;
  userID: User;
  answer: Omit<Comment, 'answer'>[];
  status: CommentStatus;
  productID?: CommentProduct;
  blogID?: CommentProduct;
};

export type imageSlide = IdSchema & {
  title: string;
  subtitle?: string;
  description?: string;
  images: string[];
  url?: string;
};

export type Product = IdSchema & {
  title: string;
  shortText: string;
  Description: string;
  category: string[];
  images: string[];
  price: number;
  discount: number;
  priceAfterDiscount: number;
  sortByNumber: number;
  createdAt: string;
  comments: Comment[];
  related: Product[];
  count: number;
};

export type Article = IdSchema & {
  author: {
    image: string;
    name: string;
    desc: string;
  };
  title: string;
  shortText: string;
  description: string;
  category: string[];
  images: string[];
  sortByNumber: number;
  createdAt: string;
  view: number;
  comments: Comment[];
  related: [];
  latest: [];
};

export type User = {
  Role: string[];
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  bought: Product[];
} & IdSchema;

export type UserResponse = {
  token: string;
  refreshToken: string;
  user: User;
};

export type GetProducts = [
  string | undefined,
  number | undefined,
  string | undefined
];
export type GetArticles = GetProducts;

export type SearchResponse = {
  blog: Article[];
  product: Product[];
};

export type DiscountCode = IdSchema & {
  code: string;
  discount: string;
};

export type UploadedImage = IdSchema & {
  images: string[];
};

