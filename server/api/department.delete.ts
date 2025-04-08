import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id } = body;

  if (!id) {
    return { statusCode: 400, message: "ID is required" };
  }

  try {
    const deletedDepartment = await prisma.departments.delete({
      where: { id },
    });

    return {
      statusCode: 200,
      message: "Department deleted successfully",
      data: deletedDepartment,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      message: "An error occurred while deleting the department",
      error: error.message,
    };
  }
});
