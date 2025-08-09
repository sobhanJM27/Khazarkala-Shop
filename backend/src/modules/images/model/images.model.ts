import mongoose, { model } from 'mongoose';

interface IImages extends mongoose.Document {
  images: Array<string>;
  urlImage: Array<string>;
}

const imagesSchema = new mongoose.Schema<IImages>({
  images: { type: [String] },
  urlImage: { type: [String] },
});

const ImagesModel = model<IImages>('image', imagesSchema);

export { IImages, ImagesModel };
