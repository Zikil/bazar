'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formAdtEditSchema, type TFormAdtEditValues } from './schemas';
import Image from 'next/image';
import { Category, Country, City, Adt } from '@prisma/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AdtEditFormProps {
  adt: Adt & {
    price: string;
    category: Category & {
      parent: Category | null;
    };
  };
  categories: (Category & {
    children: Category[];
    parent: Category | null;
  })[];
  countries: Country[];
  cities: City[];
}

export default function AdtEditForm({ adt, categories, countries, cities }: AdtEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(adt.image);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm<TFormAdtEditValues>({
    resolver: zodResolver(formAdtEditSchema),
    defaultValues: {
      title: adt.title,
      description: adt.description || '',
      price: String(adt.price) || '',
      categoryId: adt.categoryId,
      countryId: String(adt.countryId),
      cityId: String(adt.cityId),
      address: adt.address || '',
      image: adt.image || '',
    }
  });

  const [selectedCountry, setSelectedCountry] = useState<string>(adt.countryId);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState<string | null>(
    adt.category.parentId || adt.category.id
  );
  const [filteredSubCategories, setFilteredSubCategories] = useState<Category[]>([]);

  const parentCategories = useMemo(() => {
    return categories.filter(cat => !cat.parentId);
  }, [categories]);

  useEffect(() => {
    if (selectedCountry) {
      const countryCities = cities.filter(city => city.countryId === selectedCountry);
      setFilteredCities(countryCities);
    }
  }, [selectedCountry, cities]);

  useEffect(() => {
    if (selectedParentCategory) {
      const subCategories = categories.filter(cat => cat.parentId === selectedParentCategory);
      setFilteredSubCategories(subCategories);
    }
  }, [selectedParentCategory, categories]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        form.setValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: TFormAdtEditValues) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/adt', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, id: String(adt.id) }),
      });

      if (!response.ok) {
        const error = await response.text();
        toast.error("Ошибка при обновлении объявления: " + error);
        throw new Error('Error updating adt');
      }

      const updatedAdt = await response.json();
      toast.success("Объявление успешно обновлено");
      router.push(`/adt/${updatedAdt.id}`);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCountryChange = (countryId: string) => {
    setSelectedCountry(countryId);
    form.setValue('countryId', countryId);
  };

  const handleCategoryParentChange = (categoryId: string) => {
    setSelectedParentCategory(categoryId);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Заголовок*
        </label>
        <input
          type="text"
          id="title"
          {...form.register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {form.formState.errors.title && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Описание
        </label>
        <textarea
          id="description"
          rows={4}
          {...form.register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Цена
        </label>
        <input
          type="text"
          id="price"
          {...form.register('price')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Например: 1000 ₽"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Основная категория*
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => handleCategoryParentChange(e.target.value)}
            value={selectedParentCategory || ''}
          >
            {parentCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nameEn}
              </option>
            ))}
          </select>
        </div>

        {selectedParentCategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Подкатегория*
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...form.register('categoryId')}
            >
              {filteredSubCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nameEn}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Страна*
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...form.register('countryId')}
            onChange={(e) => handleCountryChange(e.target.value)}
            value={selectedCountry}
          >
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.nameEn}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Город*
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...form.register('cityId')}
          >
            {filteredCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.nameEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Адрес
        </label>
        <input
          type="text"
          id="address"
          {...form.register('address')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
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
            {/* <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-md"
            />  */}
            <img
              src={preview}
              alt="Preview"
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
          {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </div>
    </form>
  );
} 