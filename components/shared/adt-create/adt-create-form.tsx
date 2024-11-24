'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formAdtCreateSchema, type TFormAdtCreateValues } from './schemas';
import Image from 'next/image';
import { Category, Country, City } from '@prisma/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface CreateAdtFormProps {
  categories: Category[];
  countries: Country[];
  cities: City[];
}

export default function AdtCreateForm({ categories, countries, cities }: CreateAdtFormProps) {
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
      categoryId: '',
    }
  });

  const selectedCategory = watch('categoryId');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState<string | null>(null);
  const [filteredSubCategories, setFilteredSubCategories] = useState<Category[]>([]);

  const parentCategories = useMemo(() => {
    return categories.filter(cat => !cat.parentId);
  }, [categories]);

  useEffect(() => {
    if (selectedCountry) {
      const countryCities = cities.filter(city => city.countryId === selectedCountry);
      setFilteredCities(countryCities);
      setValue('cityId', '');
    }
  }, [selectedCountry, cities]);

  useEffect(() => {
    if (selectedParentCategory) {
      const subCategories = categories.filter(cat => cat.parentId === selectedParentCategory);
      setFilteredSubCategories(subCategories);
      setValue('categoryId', '');
    }
  }, [selectedParentCategory, categories]);

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
      const data_f = await response.json();
      router.push(`/adt/${data_f.id}`);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCountryChange = (countryId: string) => {
    setSelectedCountry(countryId);
    setValue('countryId', countryId);
  };

  const handleCategoryParentChange = (categoryId: string) => {
    setSelectedParentCategory(categoryId);
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
            <option value="">Выберите категорию</option>
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
              {...register('categoryId')}
            >
              <option value="">Выберите подкатегорию</option>
              {filteredSubCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nameEn}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
            )}
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
            onChange={(e) => handleCountryChange(e.target.value)}
            value={selectedCountry || ''}
          >
            <option value="">Выберите страну</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.nameEn}
              </option>
            ))}
          </select>
          {errors.countryId && (
            <p className="mt-1 text-sm text-red-600">{errors.countryId.message}</p>
          )}
        </div>

        {selectedCountry && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Город*
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register('cityId')}
            >
              <option value="">Выберите город</option>
              {filteredCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.nameEn}
                </option>
              ))}
            </select>
            {errors.cityId && (
              <p className="mt-1 text-sm text-red-600">{errors.cityId.message}</p>
            )}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Адрес
        </label>
        <input
          type="text"
          id="address"
          {...register('address')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
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
