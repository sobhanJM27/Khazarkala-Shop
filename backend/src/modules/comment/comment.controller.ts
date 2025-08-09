import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { CommentDto } from './dto/comment.Dto';
import { CommentService } from './comment.service';
import createHttpError from 'http-errors';
import { IUser } from '../user/model/user.model';

class CommentController {
  constructor(private commentService = new CommentService()) {}

  createCommentAndAnswer = async (
    req: Request & { user: IUser },
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const commentDto: CommentDto = { ...req.body, userID: req.user };
      const result = await this.commentService.TyepRequest(commentDto);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  deleteComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id))
        throw createHttpError.BadRequest('آیدی ارسال شده صحیح نمیباشد');
      const result = await this.commentService.removeComment(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  changeStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!mongoose.isValidObjectId(id))
        throw createHttpError.BadRequest('آیدی ارسال شده صحیح نمیباشد');
      const result = await this.commentService.changeStatus(id, status);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  readAllComments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const result =
        await this.commentService.readAllCommentsAndAnswerByAdmin();
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export { CommentController };
