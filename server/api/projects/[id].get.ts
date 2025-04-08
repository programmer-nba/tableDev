import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;

    const project = await prisma.projects.findUnique({
      where: { id },
    });

    if (!project) {
      setResponseStatus(event, 404);
      return { success: false, message: "Project not found" };
    }

    return { success: true, data: project };
  } catch (error) {
    console.log("error : ", error);
  }
});
