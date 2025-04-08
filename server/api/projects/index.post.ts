import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    const prefix = `PJ${yyyy}${mm}${dd}`
    
    const lastProject = await prisma.projects.findFirst({
      where: {
        projectId: {
          startsWith: prefix
        }
      },
      orderBy: {
        projectId: 'desc'
      }
    })

    let sequence = 1
    if (lastProject) {
      const lastId = lastProject.projectId
      const lastSeqStr = lastId.slice(-6)
      const lastSeq = parseInt(lastSeqStr, 10)

      if (!isNaN(lastSeq)) {
        sequence = lastSeq + 1
      }
    }

    const newProjectId = `${prefix}${String(sequence).padStart(6, '0')}`

    const newProject = await prisma.projects.create({
      data: {
        projectId: newProjectId,
        name: body.name,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        status: body.status ?? "เปิดงาน"
      }
    })

    return {
      success: true,
      data: newProject
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }
  }
})
