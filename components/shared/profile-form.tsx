"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, TFormRegisterValues } from "./modals/auth-modal/forms/schemas";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./form/form-input";
import { Button } from "../ui/button";
import { updateUserInfo } from "@/app/actions";
import toast from "react-hot-toast";

interface Props {
    data: User
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
          name: data.name || '',
          email: data.email,
          password: '',
          confirmPassword: '',
        },
      });

    const onSubmit = async (formData: TFormRegisterValues) => {
        try {
          await updateUserInfo({
            email: formData.email,
            name: formData.name,
            password: formData.password,
          });
    
          toast.success('Data updated 📝', {
            icon: '✅',
          });
        } catch (error) {
          return toast.error('Error updating data', {
            icon: '❌',
          });
        console.log('error update', error)
        }
      };
    
      const onClickSignOut = () => {
        signOut({
          callbackUrl: '/',
        });
      };
    
    return (
        <Container className="my-10">
            <Title text="Личные данные" size='md' className="font-bold" />

            <FormProvider {...form}>
                <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput name="email" label="E-Mail" required />
                    <FormInput name="name" label="Полное имя" required />

                    <FormInput type="password" name="password" label="Новый пароль" required />
                    <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

                    <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
                        Сохранить
                    </Button>

                    <Button
                        onClick={onClickSignOut}
                        variant="secondary"
                        disabled={form.formState.isSubmitting}
                        className="text-base"
                        type="button">
                        Выйти
                    </Button>
                </form>
            </FormProvider>

        </Container>
    )
}