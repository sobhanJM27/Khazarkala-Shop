import mongoose, { ObjectId } from 'mongoose';

interface IBlog extends mongoose.Document {
  title: string;
  description: string;
  shortText: string;
  status: boolean;
  comments: Array<ObjectId>;
  category: Array<string>;
  images: Array<string>;
  shortLink: string;
  createdAt: string;
  related: Array<ObjectId>;
  latest: Array<ObjectId>;
  sortByNumber: number;
  view: number;
  author: { name: string };
}

const blogSchema = new mongoose.Schema<IBlog>({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  shortText: { type: String, default: '' },
  status: { type: Boolean },
  comments: { type: [mongoose.Types.ObjectId], ref: 'comment', default: [] },
  category: { type: [String], ref: 'category' },
  images: { type: [String] },
  sortByNumber: { type: Number },
  createdAt: { type: String, default: '' },
  related: { type: [mongoose.Types.ObjectId], default: [] },
  latest: { type: [mongoose.Types.ObjectId] },
  view: { type: Number, default: 0 },
  author: { type: Object, default: {} },
});

blogSchema.index({ title: 'text', shortText: 'text', category: 'text' });

const BlogModel = mongoose.model<IBlog>('blog', blogSchema);

export { BlogModel, IBlog };
