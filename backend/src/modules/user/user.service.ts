import { IUser, UserModel } from './model/user.model';
import { validateObjectID } from './../../common/functions/globalFunction';
import { NotFound } from 'http-errors';
import {
  AnswerModel,
  CommentModel,
  IAnswer,
  IComment,
} from '../comment/model/comment.model';
import { ProductModel, IProduct } from '../product/model/product.model';
import { BlogModel, IBlog } from '../blog/model/blog.model';

class UserService {
  constructor(
    private readonly userRepository = UserModel<IUser>,
    private readonly commentRepository = CommentModel<IComment>,
    private readonly answerRepository = AnswerModel<IAnswer>,
    private readonly productRepository = ProductModel<IProduct>,
    private readonly blogRepository = BlogModel<IBlog>
  ) {}

  async getAllCommentUser(userID: string) {
    validateObjectID(userID);
    const findUser = await this.userRepository.findOne({ _id: userID });
    if (!findUser) throw NotFound('کاربری یافت نشد');
    const comment = await this.commentRepository
      .find({ userID: findUser.id }, { title: 1, text: 1, status: 1 })
      .populate('userID', 'first_name last_name');
    const answer = await this.answerRepository
      .find({ userID: findUser.id }, { title: 1, text: 1, status: 1 })
      .populate('userID', 'first_name last_name');

    if (!comment && !answer) throw NotFound('شما هیچ کامنتی ندارید');
    return {
      comment,
      answer,
    };
  }

  async getBoughtProducts(userID: string) {
    validateObjectID(userID);

    const user = await UserModel.findById(userID).populate({
      path: 'bought',
      model: 'product',
    });

    if (!user) throw NotFound('کاربری یافت نشد');

    return user.bought;
  }

  async getAllUsers() {
    return await UserModel.find().select('-password');
  }

  async getSoldProduct(userID: string) {
    validateObjectID(userID);
  }

  async deleteUserByAdmin(userID: string) {
    validateObjectID(userID);

    const user = await this.userRepository.findById(userID);
    if (!user) throw NotFound('کاربر یافت نشد');

    await this.userRepository.deleteOne({ _id: userID });

    return { message: 'کاربر با موفقیت حذف شد' };
  }
}
const UserServices = new UserService();
export { UserServices as UserService };
