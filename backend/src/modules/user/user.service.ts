import { IUser, UserModel } from './model/user.model';
import { validateObjectID } from '../../common/functions/globalFunction';
import { NotFound } from 'http-errors';
import { AnswerModel, IAnswer } from '../comment/model/comment.model';
import { CommentModel, IComment } from '../comment/model/comment.model';

class UserService {
  constructor(
    private readonly userRepository = UserModel<IUser>,
    private readonly commentRepository = CommentModel<IComment>,
    private readonly answerRepository = AnswerModel<IAnswer>
  ) {}

  async getAllCommentUser(userID: string) {
    validateObjectID(userID);

    const user = await this.userRepository.findById(userID);
    if (!user) throw NotFound('کاربری یافت نشد');

    const comment = await this.commentRepository
      .find({ userID: userID })
      .populate('userID', 'first_name last_name')
      .populate('productID', '_id title')
      .populate('blogID', '_id title');

    const answer = await this.answerRepository.find({ userID: userID });

    if (!comment.length && !answer.length)
      throw NotFound('شما هیچ کامنتی ندارید');

    return { comment, answer };
  }

  async getBoughtProducts(userID: string) {
    validateObjectID(userID);

    const user = await this.userRepository
      .findById(userID)
      .populate({ path: 'bought', model: 'product' });

    if (!user) throw NotFound('کاربری یافت نشد');

    return user.bought;
  }

  async getAllUsers() {
    return this.userRepository.find().select('-password');
  }

  async deleteUserByAdmin(userID: string) {
    validateObjectID(userID);

    const user = await this.userRepository.findById(userID);
    if (!user) throw NotFound('کاربر یافت نشد');

    await this.userRepository.deleteOne({ _id: userID });

    return { message: 'کاربر با موفقیت حذف شد' };
  }

  async updateUserAddress(
    userID: string,
    addressData: Partial<IUser['address']>
  ) {
    validateObjectID(userID);

    const user = await this.userRepository.findById(userID);
    if (!user) throw NotFound('کاربری یافت نشد');

    user.address = { ...user.address, ...addressData };
    await user.save();

    return user.address;
  }

  async getUserAddress(userID: string) {
    validateObjectID(userID);

    const user = await this.userRepository.findById(userID);
    if (!user) throw NotFound('کاربری یافت نشد');

    return user.address || {};
  }
}

const UserServices = new UserService();
export { UserServices as UserService };
