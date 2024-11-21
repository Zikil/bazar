import {z} from 'zod'

export const formAdtCreateSchema = z.object({
    title: z.string().min(1, {message: 'заголовок обязателен'}),
    categories: z.array(z.object({
        id: z.number(),
        name: z.string()
    })).min(1, {message: 'выберите хотя бы одну категорию'}),
    price: z.string().min(0, {message: 'цена должна быть положительным числом'}),
    description: z.string().min(1, {message: 'описание обязательно'}),
    image: z.string().url({message: 'неверный формат URL'}),
    location: z.string().min(1, {message: 'местоположение обязательно'}),
    // createdAt: z.date().default(new Date()),
    // userId: z.string().uuid({message: 'неверный формат UUID'}),
});

export type TFormAdtCreateValues = z.infer<typeof formAdtCreateSchema>
