import { Task } from './../../../node_modules/.prisma/client/index.d';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const projects = await prisma.projects.findMany({
      include: {
        tasks: true,
      },
    });
    return { success: true, data: projects };
  } catch (error) {
    console.log("Error fetching projects and tasks: ", error);
    return { success: false, message: 'Error fetching data' };
  }
});
