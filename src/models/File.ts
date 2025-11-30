import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export interface IFile {
  name: string;
  url: string;
  folder: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

const fileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  folder: { type: Schema.Types.ObjectId, ref: 'Folder', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default model<IFile>('File', fileSchema);
