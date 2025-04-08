import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const projectId = event.context.params?.projectId
  console.log('projectId : ' , projectId)
  if (!projectId) {
    throw createError({ statusCode: 400, message: 'Project ID is required' })
  }
  const body = await readBody(event)


  const project = await prisma.projects.findUnique({
    where: {
      id: projectId,
    }
  })

  if (!project) {
    throw createError({ statusCode: 404, message: 'Project not found' })
  }

  const newTask = await prisma.task.create({
    data: {
      name: body.name,
      projectId: projectId,
    },
  })

  return newTask
})
