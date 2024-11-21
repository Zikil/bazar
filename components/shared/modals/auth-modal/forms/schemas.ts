import {z} from 'zod'

export const passwordSchema = z.string().min(6, {message: 'пароль должен содержать не менее 6 символов'})

export const formLoginSchema = z.object({
    email: z.string().email({message: 'введите корректную почту'}),
    password: passwordSchema
})

export const formRegisterSchema = formLoginSchema.merge(
    z.object({
        name: z.string().min(2, {message: 'введите имя и фамилию'}),
        confirmPassword: passwordSchema,
    })
).refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
});

export type TFormLoginValues = z.infer<typeof formLoginSchema>
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>