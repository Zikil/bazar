import React from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginValues } from "./schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from "@/components/shared/title";
import { FormInput } from "@/components/shared/form";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface Props {
    onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({onClose}) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false
            })

            if (!resp?.ok) {
                throw Error();
            }
            


            onClose?.()
        } catch (error) {
            console.error('Error [LOGIN]', error)
        }
    }

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="fles justify-between items-center">
                    <div className="mr-2">
                        <Title text="Вход в аккаунт" size='md' className="font-bold" />
                        <p className="text-gray-400">Введите свою почту, чтобы войти</p>
                    </div>
                    {/* <img src="..." /> */}
                </div>
                <FormInput name='email' label='E-Mail' required />
                <FormInput name='password' label='Password' required />
            
                <Button loading={form.formState.isSubmitting} className="h-12 text-base" type='submit' >
                    {
                        'Войти'
                    }
                </Button>
            </form>
        </FormProvider>
    )
}