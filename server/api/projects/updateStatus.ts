import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { taskId, status } = await readBody(event);

  console.log('taskId' , taskId)
  console.log('status' , status)

  if (!taskId || !status) {
    return {
      statusCode: 400,
      body: { message: "Missing taskId or status" },
    };
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    return {
      statusCode: 200,
      body: { message: "Status updated successfully", task: updatedTask },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: { message: "Failed to update status" },
    };
  }
});
