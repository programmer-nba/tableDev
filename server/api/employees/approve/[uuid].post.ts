import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const uuid = event.context.params?.uuid;

  if (!uuid) {
    throw createError({ statusCode: 400, message: 'UUID is required' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { uuid },
      data: { status: 'ยืนยันแล้ว' },
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: 'Failed to approve user' });
  }
});