import User from '../models/User';
import bcrypt from 'bcryptjs';

export const createAdminIfNone = async () => {
  const existing = await User.findOne({ role: 'admin' });
  if (!existing) {
    const hashed = await bcrypt.hash('admin123', 10);
    await User.create({ email: 'admin@example.com', password: hashed, role: 'admin' });
    console.log('Seeded admin user: admin@example.com / admin123');
  }
};
