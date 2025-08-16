import { GetArticles, GetProducts } from '../types/apiTypes';

export const Endpoints = {
  // User endpoints
  registerOtp: `/auth/registerStepOne`,
  register: `/auth/registerStepTwo`,
  logIn: `/auth/login`,
  checkOtp: `/auth/checkOtp`,
  resetCode: `/auth/resetCode`,
  refreshToken: `/auth/refreshToken`,
  getMyProducts: `/user/getBought`,
  getMyComments: `/user/getAllComment`,
  getUsers: `/user/getAllUser`,
  deleteUser: (userId: string) => `/user/${userId}`,
  getUserAddress: '/user/address',
  updateUserAddress: '/user/address',

  // Product endpoints
  getProducts: (
    categoryId: GetProducts[0],
    limit: GetProducts[1],
    filter: GetProducts[2]
  ) => `/getAllProducts/${categoryId}/${limit}/${filter}`,
  getProduct: (productID: string) => `/getOneProduct/${productID}`,
  addProduct: `/createProduct`,
  deleteProduct: (productID: string) => `/deleteProduct/${productID}`,
  editProduct: (productID: string) => `/updateProduct/${productID}`,

  // Article endpoints
  getArticles: (
    categoryId: GetArticles[0],
    limit: GetArticles[1],
    filter: GetArticles[2]
  ) => `/getAllBlog/${categoryId}/${limit}/${filter}`,
  getArticle: (articleID: string) => `/getOneBlog/${articleID}`,
  addArticle: `/createBlog`,
  deleteArticle: (articleID: string) => `/deleteBlog/${articleID}`,
  editArticle: (articleID: string) => `/updateBlog/${articleID}`,

  // category
  getCategories: (type: 'product' | 'blog' | undefined) =>
    `/getAllCategory/${type}`,
  addCategory: `/addCategory`,
  editCategory: (categoryID: string) => `/updateCategory/${categoryID}`,
  deleteCategory: (categoryID: string) => `/deleteCategory/${categoryID}`,
  getOneCategory: (categoryID: string) => `/getOneCategory/${categoryID}`,

  // Images endpoints
  addImages: `/addImage`,
  deleteImage: (id: string) => `/admin/image/remove/${id}`,
  getImages: `/admin/image/list`,

  // basket endpoints
  payment: `/basket`,
  orderDetail: (id: string) => `/getAuthority/${id}`,
  updateBasket: `/basket/update`,

  // comment endpoints
  addComment: `/comment/addComment`,
  setCommentStatus: (commentId: string) => `/comment/changeStatus/${commentId}`,
  deleteComment: (commentId: string) => `/comment/deleteComment/${commentId}`,
  getAllComments: `/comment/allComment`,
  addAnswer: `/comment/addAnswer`,

  // filter endpoints
  searchAll: (query: string) => `/searchAll/${query}`,
  searchProduct: (query: string) => `/searchProduct?search?${query}`,
  searchBlog: (query: string) => `/searchBlog?search?${query}`,

  // sales endpoints
  getSales: `/basket/getAllSold`,

  // discount code endpoints
  addDiscountCode: `/code/add`,
  deleteDiscountCode: (discountId: string) => `/code/delete/${discountId}`,
  checkDiscountCode: `/checkCode`,
  getCodes: `/code/getAllCode`,
};
