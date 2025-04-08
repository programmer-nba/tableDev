import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        status: 'ยืนยันแล้ว',
      },
    });

    return {
      statusCode: 200,
      message: "Users fetched successfully",
      data: users,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      message: "An error occurred while fetching Users",
      error: error.message,
    };
  }
});
