import express from 'express';
import { requireAuth } from '../middleware/auth';
import { createShare, revokeShare } from '../controllers/shareController';
const router = express.Router();

router.post('/', requireAuth, createShare);
router.delete('/:shareId', requireAuth, revokeShare);

export default router;
