import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { formAdtCreateSchema } from '@/components/shared/adt-create/schemas';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { getUserSession } from '@/lib/get-user-session';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getUserSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Валидация данных
    const validatedData = formAdtCreateSchema.parse(body);
    
    // Получаем пользователя
    const user = await prisma.user.findUnique({
      where: { id: Number(session.id) }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    // Создание объявления
    const adt = await prisma.adt.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        price: validatedData.price,
        location: validatedData.location,
        image: validatedData.image,
        userId: user.id,
        categories: {
          connect: validatedData.categoryIds.map(id => ({ id }))
        }
      },
      include: {
        categories: true
      }
    });
    
    return NextResponse.json(adt, { status: 201 });
  } catch (error) {
    console.error('Error creating adt:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании объявления' },
      { status: 400 }
    );
  }
}
