export interface OrderDetailProduct {
  title: string;
  image: string;
  priceAfterDiscount: number;
  count: number;
}

export interface OrderDetailResponse {
  invoiceNumber: string;
  authority: string;
  amount: number;
  verify: boolean;
  products: OrderDetailProduct[];
}
