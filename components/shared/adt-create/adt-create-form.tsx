'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formAdtCreateSchema, type TFormAdtCreateValues } from './schemas';
import Image from 'next/image';
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface CreateAdtFormProps {
  categories: Category[];
}

export default function AdtCreateForm({ categories }: CreateAdtFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<TFormAdtCreateValues>({
    resolver: zodResolver(formAdtCreateSchema),
    defaultValues: {
      categoryIds: [],
    }
  });

  const selectedCategories = watch('categoryIds');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: TFormAdtCreateValues) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/adt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.text()
        toast.error("Error creating adt: " + err)
        throw new Error('Error creating adt');
      }

      reset();
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      toast.success("Adt created successfully")
      // Здесь можно добавить уведомление об успешном создании
      const data_f = await response.json();
      // Редирект на страницу созданного объявления
      router.push(`/adt/${data_f.id}`);
      // Обновляем кэш Next.js
    //   router.refresh();
      
    } catch (error) {
      console.error('Error:', error);
        //   toast.error("Error creating adt: " + error)
      // Здесь можно добавить обработку ошибок
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    const currentCategories = watch('categoryIds') || [];
    const updatedCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    setValue('categoryIds', updatedCategories);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Заголовок*
        </label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Описание
        </label>
        <textarea
          id="description"
          rows={4}
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Цена
        </label>
        <input
          type="text"
          id="price"
          {...register('price')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Например: 1000 ₽"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Категории*
        </label>
        <div className="mt-2 space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600"
                onChange={() => handleCategoryChange(category.id)}
                checked={selectedCategories?.includes(category.id)}
              />
              <span className="ml-2">{category.name}</span>
            </label>
          ))}
        </div>
        {errors.categoryIds && (
          <p className="mt-1 text-sm text-red-600">{errors.categoryIds.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Местоположение
        </label>
        <input
          type="text"
          id="location"
          {...register('location')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Изображение
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
        {preview && (
          <div className="mt-2 relative h-48 w-48">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Создание...' : 'Создать объявление'}
        </button>
      </div>
    </form>
  );
}
