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
      .min(1, 'Укажите цену')
      .nullable(),
    location: z.string()
      .min(2, 'Укажите местоположение')
      .max(100, 'Слишком длинное название местоположения')
      .nullable(),
    image: z.string().nullable().optional(),
    categoryIds: z.array(z.number()).min(1, 'Выберите хотя бы одну категорию'),
  });

export type TFormAdtCreateValues = z.infer<typeof formAdtCreateSchema>
