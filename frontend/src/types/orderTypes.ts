export type OrderDetailProduct = {
  title: string;
  image: string;
  priceAfterDiscount: number;
  count: number;
};

export type OrderDetailResponse = {
  invoiceNumber: string;
  authority: string;
  amount: number;
  verify: boolean;
  products: OrderDetailProduct[];
};
