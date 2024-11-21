import React from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, formRegisterSchema, TFormLoginValues, TFormRegisterValues } from "./schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from "@/components/shared/title";
import { FormInput } from "@/components/shared/form";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { registerUser } from "@/app/actions";

interface Props {
    onClose?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({onClose}) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    })

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await registerUser({
                email: data.email,
                name: data.name,
                password: data.password,
            })

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
                {/* <div className="fles justify-between items-center">
                    <div className="mr-2">
                        <Title text="Вход в аккаунт" size='md' className="font-bold" />
                        <p className="text-gray-400">Введите свою почту, чтобы войти</p>
                    </div>
                </div> */}
                <FormInput name='name' label='Name' required />
                <FormInput name='email' label='E-Mail' required />
                <FormInput name='password' label='Password' required />
                <FormInput name='confirmPassword' label='ConfirmPassword' required />
            
                <Button loading={form.formState.isSubmitting} className="h-12 text-base" type='submit' >
                    {
                        'Sign Up'
                    }
                </Button>
            </form>
        </FormProvider>
    )
}