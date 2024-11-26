// "use client"
import React from 'react';
import Link from 'next/link';
import { prisma } from '@/prisma/prisma-client';

export default async function Categories() {
  const categories = await prisma.category.findMany({
    where: {
      parentId: null,
    }
  });

  return (
    <div className="py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Categories</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={`/${category.slug}`}
              className="group"
            >
              <div className="bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center justify-center min-h-[70px] border border-gray-100">
                {category.icon && (
                  <span className="text-xl mb-1 ">
                    {category.icon}
                  </span>
                )}
                <span className="text-xs font-medium text-gray-900 text-center group-hover:text-indigo-600 transition-colors">
                  {category.nameEn}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}