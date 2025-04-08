import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const uuid = event.context.params?.uuid;

  if (!uuid) {
    throw createError({ statusCode: 400, message: 'UUID is required' });
  }

  try {
    await prisma.user.delete({
      where: { uuid },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: 'Failed to delete user' });
  }
});