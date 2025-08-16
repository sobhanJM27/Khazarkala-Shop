import {
  DiscountCode,
  SearchResponse,
  UploadedImage,
  User,
} from '../types/apiTypes';
import { PrivateAuth } from '../types/auth';
import axiosInstance, { createPrivateAxios } from './axiosInstance';
import { Endpoints } from './endpoints';

// Search
export const searchAll = async (query: string): Promise<SearchResponse> => {
  const response = await axiosInstance.get(Endpoints.searchAll(query));
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

// images
export const addImage = async (
  auth: PrivateAuth,
  images: File[]
): Promise<string[]> => {
  const privateAxios = createPrivateAxios(auth);
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }
  const response = await privateAxios.post(Endpoints.addImages, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (response.status === 201) {
    return response.data.urlImage;
  } else {
    throw new Error(response.statusText);
  }
};

export const getImages = async (
  auth: PrivateAuth
): Promise<UploadedImage[]> => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.get(Endpoints.getImages);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const deleteImage = async (
  auth: PrivateAuth,
  id: string
): Promise<{ message: string }> => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.delete(Endpoints.deleteImage(id));
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

// discountCode
export const getAllCodes = async (
  auth: PrivateAuth
): Promise<DiscountCode[]> => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.get(Endpoints.getCodes);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const checkCode = async (auth: PrivateAuth, code: string) => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.post(Endpoints.checkDiscountCode, {
    code,
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const deleteCode = async (auth: PrivateAuth, codeId: string) => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.delete(
    Endpoints.deleteDiscountCode(codeId)
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const addCode = async (
  auth: PrivateAuth,
  code: string,
  discount: string
) => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.post(Endpoints.addDiscountCode, {
    code,
    discount,
  });
  return response.data;
};

// Users
export const getUsers = async (auth: PrivateAuth): Promise<User[]> => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.get(Endpoints.getUsers);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const deleteUser = async (auth: PrivateAuth, userId: string) => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.delete(Endpoints.deleteUser(userId));
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const getSales = async (auth: PrivateAuth): Promise<any[]> => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.get(Endpoints.getSales);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const getUserAddress = async (
  auth: PrivateAuth
): Promise<{
  province?: string;
  city?: string;
  postalCode?: string;
  street?: string;
  detail?: string;
}> => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.get(Endpoints.getUserAddress);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const updateUserAddress = async (
  auth: PrivateAuth,
  addressData: {
    province?: string;
    city?: string;
    postalCode?: string;
    street?: string;
    detail?: string;
  }
): Promise<{ message: string }> => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.put(
    Endpoints.updateUserAddress,
    addressData
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};
