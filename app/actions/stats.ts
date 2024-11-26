"use server"

import { prisma } from "@/prisma/prisma-client"



export async function getStats() {
  const [
    totalAds,
    activeAds,
    totalUsers,
    newUsers,
    topCategories,
    topCities
  ] = await Promise.all([
    // Общее количество объявлений
    prisma.adt.count(),
    
    // Активные объявления
    prisma.adt.count({
      where: {
        status: "PUBLISHED"
      }
    }),

    // Общее количество пользователей
    prisma.user.count(),

    // Новые пользователи за последние 30 дней
    prisma.user.count({
    //   where: {
    //     createdAt: {
    //       gte: addDays(new Date(), -30)
    //     }
    //   }
    }),

    // Топ категорий
    prisma.category.findMany({
      select: {
        id: true,
        nameEn: true,
        _count: {
          select: {
            adts: true
          }
        }
      },
      orderBy: {
        adts: {
          _count: 'desc'
        }
      },
      take: 5
    }),

    // Топ городов
    prisma.city.findMany({
      select: {
        id: true,
        nameEn: true,
        _count: {
          select: {
            adts: true
          }
        }
      },
      orderBy: {
        adts: {
          _count: 'desc'
        }
      },
      take: 5
    })
  ])

  return {
    totalAds,
    activeAds,
    totalUsers,
    newUsers,
    topCategories: topCategories.map(cat => ({
      id: cat.id,
      name: cat.nameEn,
      count: cat._count.adts
    })),
    topCities: topCities.map(city => ({
      id: city.id, 
      name: city.nameEn,
      count: city._count.adts
    }))
  }
}
