import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const departments = await prisma.departments.findMany();
    return {
      statusCode: 200,
      message: "Departments fetched successfully",
      data: departments,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      message: "An error occurred while fetching departments",
      error: error.message,
    };
  }
});
