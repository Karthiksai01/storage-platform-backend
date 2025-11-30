import express from 'express';
import { requireAuth } from '../middleware/auth';
import { createFolder, listRootFolders, getFolder, renameFolder, deleteFolder } from '../controllers/folderController';
const router = express.Router();

router.get('/', requireAuth, listRootFolders);
router.post('/', requireAuth, createFolder);
router.get('/:id', requireAuth, getFolder);
router.put('/:id', requireAuth, renameFolder);
router.delete('/:id', requireAuth, deleteFolder);

export default router;
