import { countries, cities, categories, adts } from "./constant";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";


async function up() {
    // Создаем страны
    await prisma.country.createMany({
        data: countries
    });

    // Создаем города
    await prisma.city.createMany({
        data: cities
    });

    // Создаем пользователей
    await prisma.user.createMany({
        data: [
            {
                name: "user",
                email: "user@example.com",
                password: hashSync("123456", 10),
                role: "USER",
                provider: 'credentials',
                countryId: "country-1",
                cityId: "city-1",
                phone: "+971501234567"
            },
            {
                name: "admin",
                email: "admin@example.com",
                password: hashSync("123456", 10),
                role: "ADMIN",
                provider: 'credentials',
                countryId: "country-1",
                cityId: "city-1",
                phone: "+971501234568"
            }
        ]
    });

    // Создаем категории
    await prisma.category.createMany({
        data: categories
    });

    // Создаем объявления
    await prisma.adt.createMany({
        data: adts
    });
}


async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Adt" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Country" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "City" RESTART IDENTITY CASCADE`;

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