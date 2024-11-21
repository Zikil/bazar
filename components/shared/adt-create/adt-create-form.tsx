'use client'

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { formAdtCreateSchema, TFormAdtCreateValues } from "./schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from "@/components/shared/title";
import { FormInput } from "@/components/shared/form";
import { Button } from "@/components/ui/button";
import { createAdt } from "@/app/actions";
import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/lib/get-user-session";
import { Category } from "@prisma/client";

interface Props {
    onClose?: VoidFunction;
}

export const AdtCreateForm: React.FC<Props> = ({onClose}) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = await fetch('/api/category').then(res => res.json());
            setCategories(categoriesData);
        };

        fetchCategories();
    }, []);
    
    // const currentUser = await getUserSession();

    const form = useForm<TFormAdtCreateValues>({
        // resolver: zodResolver(formAdtCreateSchema),
        defaultValues: {
            title: '',
            categories: categories,
            price: '0',
            description: '',
            image: '',
            location: '',
        }
    })

    const onSubmit = async (data: TFormAdtCreateValues) => {
        try {
            await createAdt({
                title: data.title,
                price: data.price.toString(),
                description: data.description,
                image: data.image,
                location: data.location,
                // categories: data.categories,
            }, categories)

            // if (!resp?.ok) {
            //     throw Error();
            // }
            
            

            onClose?.()
        } catch (error) {
            console.error('Error [LOGIN]', error)
        }
    }

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title text="Создать объявление" size='md' className="font-bold" />
                        <p className="text-gray-400">Заполните все поля для создания объявления</p>
                    </div>
                </div>

                <FormInput name='title' label='Заголовок' required />
                
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Категории</label>
                    <select 
                        multiple
                        {...form.register('categories')}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200"
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <FormInput 
                    name='price' 
                    label='Цена' 
                    type="number"
                    required 
                />

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Описание</label>
                    <textarea
                        {...form.register('description')}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200"
                        rows={4}
                    />
                </div>

                <FormInput 
                    name='image' 
                    label='Ссылка на изображение'
                    required 
                />

                <FormInput 
                    name='location' 
                    label='Местоположение'
                    required 
                />
            
                <Button 
                    loading={form.formState.isSubmitting} 
                    className="h-12 text-base" 
                    type='submit'
                >
                    Создать объявление
                </Button>
            </form>
        </FormProvider>
    )
}