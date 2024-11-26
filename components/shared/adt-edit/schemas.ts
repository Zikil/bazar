import * as z from 'zod';

export const formAdtEditSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен'),
  description: z.string().optional(),
  price: z.string().optional(),
  categoryId: z.string().min(1, 'Выберите категорию'),
  countryId: z.string().min(1, 'Выберите страну'),
  cityId: z.string().min(1, 'Выберите город'),
  address: z.string().optional(),
  image: z.string().optional(),
});

export type TFormAdtEditValues = z.infer<typeof formAdtEditSchema>; 