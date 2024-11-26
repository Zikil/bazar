import React from 'react';
import { prisma } from '@/prisma/prisma-client';
import { notFound, redirect } from 'next/navigation';
import AdtEditForm from '@/components/shared/adt-edit/adt-edit-form';
import { getUserSession } from '@/lib/get-user-session';
import { Adt } from '@prisma/client';

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditAdt({ params }: Props) {
  const session = await getUserSession();
  if (!session) {
    redirect('/login');
  }

  try {
    const [adt, categories, countries, cities] = await Promise.all([
      prisma.adt.findFirst({
        where: {
          id: Number((await params).id),
          userId: Number(session.id)
        },
        include: {
          category: {
            include: {
              parent: true
            }
          }
        }
      }).then(adt => adt ? {
        ...adt,
        price: adt.price || ''
      } : null),
      prisma.category.findMany({
        include: {
          children: true,
          parent: true
        }
      }),
      prisma.country.findMany(),
      prisma.city.findMany()
    ]);

    if (!adt) {
      return notFound();
    }

    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold mb-6">Редактировать объявление</h1>
        <AdtEditForm 
          adt={adt}
          categories={categories} 
          countries={countries} 
          cities={cities}
        />
      </main>
    );
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold mb-6 text-red-600">Произошла ошибка при загрузке данных</h1>
      </main>
    );
  }
}