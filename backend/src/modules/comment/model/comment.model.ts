import mongoose, { ObjectId } from 'mongoose';
import { statusEnum } from './../../../common/enums/status.enum';

interface IComment extends mongoose.Document {
  userID?: ObjectId;
  blogID?: ObjectId;
  productID?: ObjectId;
  title: string;
  text: string;
  fullName: string;
  answer?: Array<ObjectId>;
  star?: number;
  status: string;
  email: string;
  createdAt: Date;
}

interface IAnswer extends mongoose.Document {
  userID: ObjectId;
  commentID: ObjectId;
  text: string;
  fullName: string;
  status: string;
  createdAt: Date;
}

const commentSchema = new mongoose.Schema<IComment>({
  userID: { type: mongoose.Types.ObjectId, ref: 'user' },
  blogID: { type: mongoose.Types.ObjectId, ref: 'blog' },
  productID: { type: mongoose.Types.ObjectId, ref: 'product' },
  title: { type: String },
  text: { type: String, required: true },
  fullName: { type: String },
  answer: [{ type: mongoose.Types.ObjectId, ref: 'answer' }],
  star: { type: Number, max: 5 },
  status: { type: String, default: statusEnum.pending },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const answerSchema = new mongoose.Schema<IAnswer>({
  userID: { type: mongoose.Types.ObjectId, ref: 'user' },
  commentID: { type: mongoose.Types.ObjectId, ref: 'comment' },
  fullName: { type: String },
  text: { type: String, required: true },
  status: { type: String, default: statusEnum.pending },
  createdAt: { type: Date, default: Date.now },
});

const CommentModel = mongoose.model('comment', commentSchema);
const AnswerModel = mongoose.model('answer', answerSchema);

export { CommentModel, AnswerModel, IAnswer, IComment };
