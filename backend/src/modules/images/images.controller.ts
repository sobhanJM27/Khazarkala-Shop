import { Request, Response, NextFunction } from 'express';
import { ImageServices } from './images.service';

class ImageController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const files = req.files;
      if (!files || !Array.isArray(files) || files.length === 0) {
        throw new Error('هیچ فایلی ارسال نشده است');
      }

      const fileField = files as Express.Multer.File[];
      const images: string[] = fileField.map((file) => (file as any).dbPath);

      const result = await ImageServices.createImage(images);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const images = await ImageServices.getAllImages();
      return res.status(200).json(images);
    } catch (error) {
      next(error);
    }
  }

  async deleteImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id = req.params.id;
      if (!id) throw new Error('آیدی ارسال نشده');

      const result = await ImageServices.deleteImage(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { ImageController };
