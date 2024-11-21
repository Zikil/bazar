import { adts, categories } from "./constant";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";


async function up() {
    await prisma.user.createMany({
        data: [
            {
                name: "user",
                email: "j@j.com",
                password: hashSync("123456", 10),
                // verified: new Date(),
                role: "USER",
                provider: 'credentials'
            },
            {
                name: "user2",
                email: "da@j.com",
                password: hashSync("123456", 10),
                // verified: new Date(),
                role: "USER",
                provider: 'credentials'
            },
            {
                name: "admin",
                email: "d@j.com",
                password: hashSync("123456", 10),
                // verified: new Date(),
                role: "ADMIN",
                provider: 'credentials'
            }
        ]
    });

    await prisma.category.createMany({
        data: categories
    });

    await prisma.adt.createMany({
        data: adts
    });
}


async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Adt" RESTART IDENTITY CASCADE`;

}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main()
    .then(async() => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect()
        process.exit(1)
    })