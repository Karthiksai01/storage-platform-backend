import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export interface IShare {
  resourceType: 'file' | 'folder';
  resourceId: mongoose.Types.ObjectId;
  shareId: string;
  active: boolean;
  expiresAt?: Date | null;
}

const shareSchema = new Schema<IShare>({
  resourceType: { type: String, enum: ['file', 'folder'], required: true },
  resourceId: { type: Schema.Types.ObjectId, required: true },
  shareId: { type: String, required: true, unique: true },
  active: { type: Boolean, default: true },
  expiresAt: { type: Date, default: null }
}, { timestamps: true });

export default model<IShare>('Share', shareSchema);
