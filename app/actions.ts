'use server'

import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { Category, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";


export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error('Not found user')
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            },
        });

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                name: body.name,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password ,
            }
        })


    } catch (error) {
        console.log('Error [UPDATE_USER]', error);
        throw error;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })

        if (user) {
            throw new Error('user exist')
        }

        await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashSync(body.password as string, 10) ,
            }
        })

    } catch (error) {
        console.log('Erro [create user]', error);
        throw error;
    }
}


export async function createAdt(body: Prisma.AdtCreateInput, categories: Category[]) {
    try {

        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error('Not found user')
        }


        await prisma.adt.create({
            data: {
                title: body.title,
                categories: {
                    connect: categories?.map((category) => ({
                        id: category.id,
                    })),
                },                
                price: body.price,
                description: body.description,
                image: body.image,
                location: body.location,
                userId: Number(currentUser.id),
            }
        })
    } catch (error) {
        console.log('Error [create adt]', error);
        throw error;
    }
}