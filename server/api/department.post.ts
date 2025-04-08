import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { title } = body;
  if (!title) {
    return { statusCode: 400, message: "Title is required" };
  }

  try {
    const newDepartment = await prisma.departments.create({
      data: {
        title,
      },
    });

    return {
      statusCode: 200,
      message: "Department created successfully",
      data: newDepartment,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      message: "An error occurred while creating the department",
      error: error.message,
    };
  }
});
