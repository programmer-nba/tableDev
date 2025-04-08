import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const uuid = getRouterParam(event, 'uuid');
  const body = await readBody(event);
  const image = body.image;

  if (!uuid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'UUID ไม่ถูกต้อง',
    });
  }

  if (!image || typeof image !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'รูปภาพ (image) จำเป็นต้องเป็น string',
    });
  }

  if (!image.startsWith('data:image/')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ไฟล์ที่อัปโหลดไม่ใช่รูปภาพ',
    });
  }
  
  if (Buffer.byteLength(image, 'base64') > 2 * 1024 * 1024) {
    throw createError({
      statusCode: 400,
      statusMessage: 'รูปภาพมีขนาดใหญ่เกิน 2MB',
    });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { uuid },
      data: { image },
    });

    return {
      status: 'success',
      message: 'อัปเดตรูปภาพสำเร็จ',
      data: updatedUser,
    };
  } catch (err) {
    console.error('Error updating image:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการอัปเดตรูปภาพ',
    });
  }
});
