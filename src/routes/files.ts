import express from 'express';
import { requireAuth } from '../middleware/auth';
import { addFile, renameFile, deleteFile } from '../controllers/fileController';
const router = express.Router();

router.post('/', requireAuth, addFile);
router.put('/:id', requireAuth, renameFile);
router.delete('/:id', requireAuth, deleteFile);

export default router;
