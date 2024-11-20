// "use client"
import React from 'react';
import { Car, Home, Laptop, Shirt, Briefcase, Dumbbell, Palette, Book } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/prisma/prisma-client';

const categories = [
  { name: 'Vehicles', icon: Car },
  { name: 'Real Estate', icon: Home },
  { name: 'Electronics', icon: Laptop },
  { name: 'Fashion', icon: Shirt },
  { name: 'Jobs', icon: Briefcase },
  { name: 'Sports', icon: Dumbbell },
  { name: 'Art', icon: Palette },
  { name: 'Books', icon: Book },
];

export default async function Categories() {
  const categories = await prisma.category.findMany();

  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((category) => {
            // const Icon = category.icon;
            return (
              <button
                key={category.name}
                className="flex flex-col items-center p-4 bg-white rounded-xl hover:shadow-md transition-shadow"
              >
                {/* <Icon className="h-8 w-8 text-indigo-600 mb-2" /> */}
                <span className="text-sm text-gray-700">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}