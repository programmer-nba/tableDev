
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
export default defineEventHandler(async (event) => {
  const { password, firstname , lastname , phone, department } = await readBody(event);

  const existingUser = await prisma.user.findUnique({
    where: { phone },
  });

  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: 'มีผู้ใช้นี้อยู่ในระบบแล้ว',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const lastUser = await prisma.user.findFirst({
    orderBy: { id: 'desc' },
  });
  
  let newUuid = 'EM0001';
  if (lastUser) {
    const lastUuidNumberString = lastUser.uuid.substring(2); // Remove the "EM" prefix
    const lastUuidNumber = parseInt(lastUuidNumberString, 10);
  
    if (!isNaN(lastUuidNumber)) {
      newUuid = `EM${String(lastUuidNumber + 1).padStart(4, '0')}`;
    } else {
      newUuid = 'EM0001';
    }
  }
  
  const newUser = await prisma.user.create({
    data: {
      uuid: newUuid,
      password: hashedPassword,
      firstname,
      lastname,
      phone,
      department
    },
  });
  
  return {
    message: 'สมัครสมาชิกสำเร็จ',
    user: newUser,
  };
  
});