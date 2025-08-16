import { Router } from 'express';
import { CommentController } from './comment.controller';
import { authMiddleware } from '../auth/auth.middleware';

const commentController = new CommentController();

export default (router: Router) => {
  router.post(
    '/comment/addComment',
    authMiddleware,
    commentController.createCommentAndAnswer
  );
  router.post('/comment/changeStatus/:id', commentController.changeStatus);
  router.delete('/comment/deleteComment/:id', commentController.deleteComment);
  router.get('/comment/allComment', commentController.readAllComments);
  router.post(
    '/comment/addAnswer',
    authMiddleware,
    commentController.createCommentAndAnswer
  );
};
