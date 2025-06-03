import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { subtaskId, status } = body

    console.log('body' , body)

    // ตรวจสอบข้อมูลที่ส่งมา
    if (!subtaskId || !status) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ต้องระบุ subtaskId และ status'
      })
    }

    const updatedSubtask = await prisma.subtask.update({
      where: { id: subtaskId },
      data: { status },
      include: {
        task: {
          include: {
            project: true
          }
        }
      }
    })

    if (!updatedSubtask) {
      throw createError({
        statusCode: 404,
        statusMessage: 'ไม่พบ Subtask ที่ต้องการอัพเดท'
      })
    }

    let message = ''
    switch (status) {
      case 'ยังไม่เริ่ม':
        message = 'Subtask ยังไม่ได้เริ่มงาน'
        break
      case 'In progress':
        message = 'Subtask อยู่ระหว่างดำเนินการ'
        break
      case 'Done':
        message = 'Subtask เสร็จสิ้นเรียบร้อยแล้ว'
        break
    }

    return {
      success: true,
      message,
      data: updatedSubtask
    }
  } catch (error) {
    console.error('Error updating subtask status:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'เกิดข้อผิดพลาดในการอัพเดทสถานะ Subtask'
    })
  }
})
