import { Model } from 'mongoose';
import * as path from 'path';
import * as fs from 'fs';
import { IImages, ImagesModel } from './model/images.model';

class ImageService {
  constructor(private imagesModel: Model<IImages> = ImagesModel) {}

  async createImage(
    images: string[]
  ): Promise<{ message: string; urlImage: string[] }> {
    const urlImage = images.map(
      (image) => `${process.env.LIARA_BACKEND_URL}${image.replace(/^\/+/, '')}`
    );

    await this.imagesModel.create({
      images,
      urlImage,
    });

    return {
      message: 'عکس با موفقیت اضافه شد',
      urlImage,
    };
  }

  async getAllImages(): Promise<Array<Record<string, any>>> {
    const images = await this.imagesModel.find();

    return images.map((item) => ({
      ...item.toObject(),
      images: item.images.map(
        (path) => `${process.env.LIARA_BACKEND_URL}${path.replace(/\\/g, '/')}`
      ),
      urlImage: item.urlImage?.map(
        (url) => `${process.env.LIARA_BACKEND_URL}${url.replace(/\\/g, '/')}`
      ),
    }));
  }

  async deleteImage(id: string): Promise<{ message: string }> {
    const imageRecord = await this.imagesModel.findById(id);
    if (!imageRecord) throw new Error('رکورد یافت نشد');

    const images = imageRecord.images ?? [];

    if (!Array.isArray(images)) throw new Error('فرمت عکس‌ها نامعتبر است');

    for (const imgPath of images) {
      if (typeof imgPath === 'string' && imgPath.trim()) {
        const fullPath = path.resolve(imgPath);
        if (fs.existsSync(fullPath)) {
          await fs.promises.unlink(fullPath);
        }
      }
    }

    await this.imagesModel.deleteOne({ _id: id });

    return { message: 'عکس با موفقیت حذف شد' };
  }
}

const ImageServices = new ImageService();
export { ImageServices };
