import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { formAdtCreateSchema } from '@/components/shared/adt-create/schemas';
import { getUserSession } from '@/lib/get-user-session';

const prisma = new PrismaClient();


// GET функция для получения списка объявлений с пагинацией
export async function GET(request: Request) {
  try {
    // Получаем параметры из URL
    const { searchParams } = new URL(request.url);
    
    // Параметры пагинации (по умолчанию: страница 1, 10 элементов на странице)
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Получаем общее количество объявлений для пагинации
    const total = await prisma.adt.count();

    // Получаем объявления с учетом пагинации
    const adts = await prisma.adt.findMany({
      skip,
      take: limit,
      include: {
        categories: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc' // Сортировка по дате создания (новые первыми)
      }
    });

    // Формируем метаданные для пагинации
    const meta = {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: total,
      totalPages: Math.ceil(total / limit)
    };

    return NextResponse.json({
      data: adts,
      meta
    });
    
  } catch (error) {
    console.error('Error fetching adts:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении объявлений' },
      { status: 500 }
    );
  }
}


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
