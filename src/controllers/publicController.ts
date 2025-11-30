import { Request, Response } from 'express';
import Share from '../models/Share';
import Folder from '../models/Folder';
import File from '../models/File';

// get public resource by shareId
export const getPublic = async (req: Request, res: Response) => {
  try {
    const { shareId } = req.params;
    const share = await Share.findOne({ shareId, active: true });
    if (!share) return res.status(404).json({ success: false, error: 'Not found or inactive' });
    if (share.expiresAt && new Date() > new Date(share.expiresAt)) {
      return res.status(410).json({ success: false, error: 'Expired' });
    }
    if (share.resourceType === 'folder') {
      const folder = await Folder.findById(share.resourceId);
      if (!folder) return res.status(404).json({ success: false, error: 'Folder removed' });
      // for simplicity, return folder + direct files + child folders (one level)
      const files = await File.find({ folder: folder._id });
      const children = await Folder.find({ parent: folder._id });
      return res.json({ success: true, data: { resourceType: 'folder', folder, files, children } });
    } else {
      const file = await File.findById(share.resourceId);
      if (!file) return res.status(404).json({ success: false, error: 'File removed' });
      return res.json({ success: true, data: { resourceType: 'file', file } });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
