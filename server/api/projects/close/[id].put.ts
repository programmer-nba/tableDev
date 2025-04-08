import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const projectId = event.context.params?.id

  if (!projectId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Project ID is required'
    })
  }

  try {
    const updatedProject = await prisma.projects.update({
      where: { 
        id: projectId 
      },
      data: { 
        status: 'ปิดงาน'
      },
      include: {
        tasks: true
      }
    })

    return {
      statusCode: 200,
      message: 'Project closed successfully',
      data: updatedProject
    }
    
  } catch (error: any) {
    console.error('Error closing project:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to close project',
      data: error
    })
  }
})
