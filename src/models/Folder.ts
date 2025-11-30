import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export interface IFolder {
  name: string;
  parent?: mongoose.Types.ObjectId | null;
  createdBy: mongoose.Types.ObjectId;
}

const folderSchema = new Schema<IFolder>({
  name: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default model<IFolder>('Folder', folderSchema);
