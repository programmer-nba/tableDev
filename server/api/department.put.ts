import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id, title } = body;

  if (!id || !title) {
    return { statusCode: 400, message: "ID and title are required" };
  }

  try {
    const updatedDepartment = await prisma.departments.update({
      where: { id },
      data: { title },
    });

    return {
      statusCode: 200,
      message: "Department updated successfully",
      data: updatedDepartment,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      message: "An error occurred while updating the department",
      error: error.message,
    };
  }
});
