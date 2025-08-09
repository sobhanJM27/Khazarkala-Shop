import mongoose, { ObjectId } from 'mongoose';

interface IUser extends mongoose.Document {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  otp?: { code: string; expiresIn: number };
  basket?: Array<ObjectId>;
  bought?: Array<ObjectId>;
  isvalidateMobile?: boolean;
  isValidateEmail?: boolean;
  Role: Array<string>;
  address?: {
    province?: string;
    city?: string;
    postalCode?: string;
    street?: string;
    detail?: string;
  };
}

const userSchema = new mongoose.Schema<IUser>({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  phone: { type: String },
  otp: { type: Object },
  basket: { type: [mongoose.Types.ObjectId] },
  bought: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
    },
  ],
  isvalidateMobile: { type: Boolean, default: false },
  Role: { type: [String], default: ['USER'] },
  address: {
    province: { type: String },
    city: { type: String },
    postalCode: { type: String },
    street: { type: String },
    detail: { type: String },
  },
});

const UserModel = mongoose.model<IUser>('user', userSchema);

export { UserModel, IUser };
