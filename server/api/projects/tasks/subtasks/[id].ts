import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log('body' , body)

  if (!body.name || !body.taskId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and taskId are required'
    });
  }

  const newSubtask = await prisma.subtask.create({
    data: {
      name: body.name,
      taskId: body.taskId,
      status: 'ยังไม่เริ่ม'
    }
  });

  return newSubtask;
});