import { Product, GetProducts } from '../../types/apiTypes';
import { PrivateAuth } from '../../types/auth';
import axiosInstance, { createPrivateAxios } from '../axiosInstance';
import { Endpoints } from '../endpoints';

type EditArgs = Pick<
  Product,
  | 'Description'
  | 'discount'
  | 'title'
  | 'price'
  | 'images'
  | 'sortByNumber'
  | 'shortText'
  | 'category'
>;

type AddArgs = EditArgs;

export const getProducts = async (
  categoryId: GetProducts[0],
  limit: GetProducts[1],
  filter: GetProducts[2]
): Promise<Product[]> => {
  categoryId = categoryId == '' ? undefined : categoryId;
  const response = await axiosInstance.get(
    Endpoints.getProducts(categoryId, limit, filter)
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await axiosInstance.get(Endpoints.getProduct(id));
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const deleteProduct = async (auth: PrivateAuth, id: string) => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.delete(Endpoints.deleteProduct(id));
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const addProduct = async (auth: PrivateAuth, data: AddArgs) => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.post(Endpoints.addProduct, data);
  if (response.status === 201) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const editProduct = async (
  auth: PrivateAuth,
  productId: string,
  data: EditArgs
) => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.patch(
    Endpoints.editProduct(productId),
    data
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const getMyProducts = async (auth: PrivateAuth): Promise<Product[]> => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.get(Endpoints.getMyProducts);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};
