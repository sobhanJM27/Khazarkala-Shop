import { MulterFile } from './../../modules/fileupload';
import { IUser, UserModel } from '../../modules/user/model/user.model';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
      file?: MulterFile[];
    }
  }
}
