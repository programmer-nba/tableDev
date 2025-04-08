import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

  const { uuid } = event.context.params;

  if (!uuid) {
    return {
      statusCode: 400,
      message: 'Missing UUID parameter',
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        uuid: uuid,
      },
    });

    if (!user) {
      return {
        statusCode: 404,
        message: 'User not found',
      };
    }

    return {
      statusCode: 200,
      message: 'User fetched successfully',
      data: user,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      message: 'An error occurred while fetching user',
      error: error.message,
    };
  }
});
