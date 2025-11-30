import { Request, Response } from 'express';
import Folder from '../models/Folder';
import File from '../models/File';

// create folder
export const createFolder = async (req: any, res: Response) => {
  try {
    const { name, parent } = req.body;
    const createdBy = req.user._id;
    const folder = await Folder.create({ name, parent: parent || null, createdBy });
    res.json({ success: true, data: folder });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// list top-level folders (parent null)
export const listRootFolders = async (req: Request, res: Response) => {
  try {
    const folders = await Folder.find({ parent: null }).sort({ createdAt: -1 });
    res.json({ success: true, data: folders });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// get folder with child folders and files
export const getFolder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const folder = await Folder.findById(id);
    if (!folder) return res.status(404).json({ success: false, error: 'Not found' });
    const children = await Folder.find({ parent: folder._id });
    const files = await File.find({ folder: folder._id });
    res.json({ success: true, data: { folder, children, files } });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const renameFolder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const folder = await Folder.findByIdAndUpdate(id, { name }, { new: true });
    res.json({ success: true, data: folder });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // simple cascade: delete files and subfolders (recursive)
    const removeRecursively = async (folderId: any) => {
      const files = await File.find({ folder: folderId });
      for (const f of files) await f.deleteOne();

      const children = await Folder.find({ parent: folderId });
      for (const c of children) await removeRecursively(c._id);
      await Folder.findByIdAndDelete(folderId);
    };
    await removeRecursively(id);
    res.json({ success: true, data: 'deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
