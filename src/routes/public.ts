import express from 'express';
import { getPublic } from '../controllers/publicController';
const router = express.Router();

router.get('/:shareId', getPublic);

export default router;
