import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Share from '../models/Share';

export const createShare = async (req: Request, res: Response) => {
  try {
    const { resourceType, resourceId, expiresAt } = req.body;
    const shareId = uuidv4();
    const share = await Share.create({ resourceType, resourceId, shareId, expiresAt: expiresAt || null });
    res.json({ success: true, data: { share, url: `${process.env.CLIENT_URL}/public/${share.shareId}` } });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const revokeShare = async (req: Request, res: Response) => {
  try {
    const { shareId } = req.params;
    const share = await Share.findOneAndUpdate({ shareId }, { active: false }, { new: true });
    res.json({ success: true, data: share });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
