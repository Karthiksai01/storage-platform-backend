import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export interface IUser {
  email: string;
  password: string;
  role: 'admin' | 'viewer';
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
}, { timestamps: true });

export default model<IUser>('User', userSchema);
