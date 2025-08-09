import { Router } from 'express';
import { CommentController } from './comment.controller';

const commentController = new CommentController();

export default (router: Router) => {
  router.post('/comment/addComment', commentController.createCommentAndAnswer);
  router.post('/comment/changeStatus/:id', commentController.changeStatus);
  router.delete('/comment/deleteComment/:id', commentController.deleteComment);
  router.get('/comment/allComment', commentController.readAllComments);
};
