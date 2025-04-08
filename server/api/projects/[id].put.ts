import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody(event);

  try {
    const updated = await prisma.projects.update({
      where: { id },
      data: {
        projectId: body.projectId,
        name: body.name,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        status: body.status,
      },
    });

    return { success: true, data: updated };
  } catch (error) {
    setResponseStatus(event, 400);
    return { success: false, message: "Update failed", error };
  }
});
