//server/api/auth/login.post.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { phone, password } = await readBody(event);

  const user = await prisma.user.findUnique({
    where: { phone },
  });

  if (!user || !user.password) {
    throw createError({
      statusCode: 400,
      message: 'ไม่มีข้อมูลผู้ใช้นี้อยู่ในระบบ',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createError({
      statusCode: 400,
      message: 'รหัสผ่านไม่ถูกต้อง',
    });
  }
  
  const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

  return {
    message: 'เข้าสู่ระบบสำเร็จ',
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      uuid: user.uuid,
      firstname: user.firstname,
      lastname: user.lastname,
      status: user.status
    },
  };
});