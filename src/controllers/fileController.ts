import { Request, Response } from 'express';
import File from '../models/File';

// add file metadata
export const addFile = async (req: any, res: Response) => {
  try {
    const { name, url, folder } = req.body;
    const createdBy = req.user._id;
    const file = await File.create({ name, url, folder, createdBy });
    res.json({ success: true, data: file });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const renameFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const file = await File.findByIdAndUpdate(id, { name }, { new: true });
    res.json({ success: true, data: file });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await File.findByIdAndDelete(id);
    res.json({ success: true, data: 'deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
