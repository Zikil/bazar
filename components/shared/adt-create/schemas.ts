import {z} from 'zod'

export const formAdtCreateSchema = z.object({
    title: z.string()
      .min(2, 'Заголовок должен содержать минимум 5 символов')
      .max(100, 'Заголовок не может быть длиннее 100 символов'),
    description: z.string()
      .min(10, 'Описание должно содержать минимум 20 символов')
      .max(1000, 'Описание не может быть длиннее 1000 символов')
      .nullable(),
    price: z.string()
    //   .transform((val) => (val ? parseFloat(val) : null))
      .nullable(),
    countryId: z.string().min(1, 'Выберите страну'),
    cityId: z.string().min(1, 'Выберите город'),
    address: z.string().nullable().optional(),
    latitude: z.number().nullable().optional(),
    longitude: z.number().nullable().optional(),
    contactPhone: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    images: z.array(z.string()).optional(),
    categoryId: z.string().min(1, 'Выберите категорию'),
});

export type TFormAdtCreateValues = z.infer<typeof formAdtCreateSchema>
