import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import folderRoutes from './routes/folders';
import fileRoutes from './routes/files';
import shareRoutes from './routes/shares';
import publicRoutes from './routes/public';
import { errorHandler } from './middleware/errorHandler';
import { createAdminIfNone } from './utils/seedAdmin';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/shares', shareRoutes);
app.use('/api/public', publicRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

const start = async () => {
  await connectDB();
  await createAdminIfNone();
  const port = process.env.PORT || 4000;
  app.use(errorHandler);
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

start().catch(err => {
  console.error(err);
  process.exit(1);
});
