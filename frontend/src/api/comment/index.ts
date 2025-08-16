import { Comment } from '../../types/apiTypes';
import { PrivateAuth } from '../../types/auth';
import { createPrivateAxios } from '../axiosInstance';
import { Endpoints } from '../endpoints';

type CommentArgs = {
  method: 'product' | 'blog';
  ID: string;
  text: string;
  snedType: 'comment' | 'answer';
  parent?: string;
};

type MyCommentsResponse = {
  comment: Comment[];
  answer: Comment[];
};

export const getMyComments = async (
  auth: PrivateAuth
): Promise<MyCommentsResponse> => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.get(Endpoints.getMyComments);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const getAllComments = async (auth: PrivateAuth): Promise<Comment[]> => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.get(Endpoints.getAllComments);
  if (response.status === 200 && response.data?.allComment) {
    return response.data.allComment;
  } else {
    return [];
  }
};

export const addComment = async (auth: PrivateAuth, data: CommentArgs) => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.post(Endpoints.addComment, data);
  if (response.status === 201) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const deleteComment = async (
  auth: PrivateAuth,
  commentId: string
): Promise<Comment> => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.delete(
    Endpoints.deleteComment(commentId)
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const setCommentStatus = async (
  auth: PrivateAuth,
  commentId: string,
  status: boolean
): Promise<Comment> => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.post(
    Endpoints.setCommentStatus(commentId),
    {
      status,
    }
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const addAnswer = async (auth: PrivateAuth, data: CommentArgs) => {
  const privateAxios = createPrivateAxios(auth);
  const response = await privateAxios.post(Endpoints.addAnswer, data);
  if (response.status === 201) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};
