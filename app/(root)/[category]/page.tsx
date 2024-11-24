import React from 'react';
import { notFound } from 'next/navigation';
import { BreadcrumbsCategory } from '@/components/shared/breadcrumbs-category';
import { BlockAdts } from '@/components/shared/block-adts';
import { prisma } from '@/prisma/prisma-client';


type Params = Promise<{ category: string }>

export default async function CategoryPage(props: { params: Params }) {
  const params = await props.params;
  const categorySlug = params.category;

  const category = await prisma.category.findFirst({
    where: {
      slug: categorySlug
    },
    include: {
      adts: true,
      children: {
        include: {
          adts: true
        }
      },
      parent: true
    }
  });

  if (!category) {
    return notFound();
  }

  // Объединяем объявления текущей категории и всех подкатегорий
  const allAdts = [
    ...category.adts,
    ...category.children.flatMap(child => child.adts)
  ];

//   const aadts = await fetch(`/api/adt?category=${categorySlug}`).then(res => res.json());
  
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{category.nameEn}</h1>
        {category.parentId && (
            <BreadcrumbsCategory category={category} />
        )}
      </div>

      {category.children.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Подкатегории</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.children.map((subcat) => (
              <a
                key={subcat.id}
                href={`/${subcat.slug}`}
                className="p-4 border rounded-lg hover:border-indigo-500 transition-colors"
              >
                {subcat.nameEn}
              </a>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Объявления</h2>
          <BlockAdts category={categorySlug} /> 
          {/* {allAdts.map((adt) => (
            <div key={adt.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {adt.image && (
                <img 
                  src={adt.image}
                  alt={adt.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{adt.title}</h3>
                <p className="text-gray-600 mb-2 line-clamp-2">{adt.description}</p>
                <p className="text-lg font-bold text-indigo-600">
                  {adt.price ? `${adt.price} ₽` : 'Цена не указана'}
                </p>
              </div>
            </div>
          ))} */}
      </div>
    </main>
  );
}
