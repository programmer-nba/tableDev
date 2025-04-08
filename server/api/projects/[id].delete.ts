import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  try {
    await prisma.projects.delete({ where: { id } })
    return { success: true, message: 'Project deleted' }
  } catch (error) {
    setResponseStatus(event, 404)
    return { success: false, message: 'Project not found or already deleted' }
  }
})
