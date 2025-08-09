import mongoose, { Model, Document, FilterQuery } from 'mongoose';
import {
  IComment,
  CommentModel,
  AnswerModel,
  IAnswer,
} from './model/comment.model';
import { CommentDto } from './dto/comment.Dto';
import { TypeEnumComment, TypeEnumSned } from './enum/typeComment.enum';
import * as createHttpError from 'http-errors';
import {
  GlobalMessageError,
  NotFoundError,
} from './../../common/enums/message.enum';
import { BlogModel, IBlog } from '../blog/model/blog.model';
import { ProductModel, IProduct } from '../product/model/product.model';
import { statusEnum as statusComment } from './../../common/enums/status.enum';

export class CommentService {
  constructor(
    private commentRepository = CommentModel,
    private answerRepository = AnswerModel,
    private blogRepository = BlogModel,
    private productRepository = ProductModel
  ) {}

  async createSchemaComment(commentDto: CommentDto): Promise<IComment> {
    let createComment: IComment = await this.commentRepository.create({
      text: commentDto.text,
      userID: commentDto.userID,
      [commentDto.method]: commentDto.ID,
    });
    if (!createComment)
      throw createHttpError.ServiceUnavailable(
        GlobalMessageError.ServiceUnavailable
      );
    return createComment;
  }

  async createSchemaAnswer(commentDto: CommentDto): Promise<IAnswer> {
    const findComment = await this.findComment(commentDto.parent);
    let createAnswer: IAnswer = await this.answerRepository.create({
      text: commentDto.text,
      userID: commentDto.userID,
      title: commentDto.title,
      [commentDto.method]: commentDto.ID,
      commentID: commentDto.parent,
    });
    if (!createAnswer)
      throw createHttpError.ServiceUnavailable(
        GlobalMessageError.ServiceUnavailable
      );
    await findComment.updateOne({ $push: { answer: createAnswer } });
    await findComment.save();
    return createAnswer;
  }

  async addComment(commentDto: CommentDto): Promise<object> {
    const { method } = commentDto;
    const existRepository = await this.findBlogOrProduct(commentDto.ID, method);
    const createComment = await this.createSchemaComment(commentDto);
    await this[`${existRepository.type}Repository`].updateOne(
      { _id: commentDto.ID },
      { $push: { comments: createComment._id } }
    );
    return { message: 'نظر شما با موفقیت ثبت گردید' };
  }

  async addAnswer(commentDto: CommentDto): Promise<object> {
    const { method } = commentDto;
    await this.findBlogOrProduct(commentDto.ID, method);
    await this.createSchemaAnswer(commentDto);
    return { message: 'نظر شما با موفقیت ثبت گردید' };
  }

  async removeComment(id: string): Promise<object> {
    const findComment = await this.commentRepository.deleteOne({ _id: id });
    if (findComment.deletedCount == 0) {
      const findAnswer = await this.answerRepository.deleteOne({ _id: id });
      if (findAnswer.deletedCount == 0)
        throw createHttpError.NotFound(NotFoundError.NotFoundComment);
    }
    return { message: 'کامنت با موفقیت حذف گردید' };
  }

  async avrageStar(): Promise<number> {
    const comments = await this.commentRepository.find({
      status: statusComment.accept,
    });
    const countComment = comments.length;
    let sumStar = 0;
    for (let i = 0; i < comments.length; i++) {
      sumStar += comments[i].star;
    }
    const avrage = sumStar / countComment;
    return avrage;
  }

  async changeStatus(id: string, status: boolean): Promise<object> {
    const findComment = await this.commentRepository.findOne({ _id: id });
    if (!findComment) {
      const findAnswer = await this.answerRepository.findOne({ _id: id });
      if (!findAnswer)
        throw createHttpError.NotFound(NotFoundError.NotFoundComment);
      findAnswer.status = status ? statusComment.accept : statusComment.reject;
      await findAnswer.save();
      return { message: 'با موفقیت انجام شد' };
    }

    findComment.status = status ? statusComment.accept : statusComment.reject;
    await findComment.save();

    if (status === true) {
      if (findComment.blogID) {
        await this.blogRepository.updateOne(
          { _id: findComment.blogID },
          { $addToSet: { comments: findComment._id } }
        );
      }
      if (findComment.productID) {
        await this.productRepository.updateOne(
          { _id: findComment.productID },
          { $addToSet: { comments: findComment._id } }
        );
      }
    }

    return { message: 'با موفقیت انجام شد' };
  }

  async findComment(id: string): Promise<IComment> {
    const comment = await this.commentRepository.findOne({ _id: id });
    if (!comment) throw createHttpError.NotFound(NotFoundError.NotFoundComment);
    return comment;
  }

  async readCommentForAsnswer(
    id: string,
    method: TypeEnumComment
  ): Promise<{ find: IBlog | IProduct }> {
    let result: { find: IBlog | IProduct };
    switch (method) {
      case TypeEnumComment.blog:
        result = {
          find: (await this.populateCommentAndAnswer(this.blogRepository, id))
            .find as IBlog,
        };
        break;
      case TypeEnumComment.product:
        result = {
          find: (
            await this.populateCommentAndAnswer(this.productRepository, id)
          ).find as IProduct,
        };
        break;
      default:
        throw createHttpError.BadRequest('نوع method ارسال‌شده نامعتبر است');
    }
    return result;
  }

  async populateCommentAndAnswer<T extends IBlog | IProduct>(
    repository: Model<T>,
    id: string
  ): Promise<{ find: any | null }> {
    const filter: FilterQuery<T> = { _id: id, status: true } as any;
    const find = await repository
      .findOne(filter)
      .populate({
        path: 'comments',
        select: ['title', 'text', 'fullName', 'star'],
      })
      .populate({
        path: 'comments.answer',
        select: ['title', 'text', 'fullName'],
      });

    if (!find) throw createHttpError.NotFound(NotFoundError.NotFoundBlog);
    return { find };
  }

  async TyepRequest(commentDto: CommentDto): Promise<object> {
    const { snedType } = commentDto;
    switch (snedType) {
      case TypeEnumSned.comment:
        return await this.addComment(commentDto);
      case TypeEnumSned.answer:
        return await this.addAnswer(commentDto);
      default:
        throw createHttpError.BadRequest('نوع snedType ارسال‌شده نامعتبر است');
    }
  }

  async findBlogOrProduct(
    id: string,
    method: TypeEnumComment
  ): Promise<{
    type: 'blog' | 'product';
    find: IBlog | IProduct;
  }> {
    switch (method) {
      case TypeEnumComment.blog: {
        const find = await this.blogRepository.findOne({ _id: id });
        if (!find) throw createHttpError.NotFound(NotFoundError.NotFoundBlog);
        return { type: 'blog', find };
      }
      case TypeEnumComment.product: {
        const find = await this.productRepository.findOne({ _id: id });
        if (!find)
          throw createHttpError.NotFound(NotFoundError.NotFoundProduct);
        return { type: 'product', find };
      }
      default:
        throw createHttpError.BadRequest('نوع method ارسال‌شده نامعتبر است');
    }
  }

  async readAllCommentsAndAnswerByAdmin() {
    const allComment = await this.commentRepository
      .find()
      .populate({
        path: 'answer',
        model: 'answer',
        match: { status: statusComment.reject },
      })
      .exec();

    if (!allComment || allComment.length === 0)
      return { status: 404, message: 'هیچ کامنتی یافت نشد' };

    return { allComment };
  }
}
