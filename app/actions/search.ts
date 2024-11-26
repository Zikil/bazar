"use server"

import { AdtWithRelations } from "@/@types/prisma"
import { prisma } from "@/prisma/prisma-client"

export async function searchAdts(query: string): Promise<AdtWithRelations[]> {
  if (!query || query.length < 2) {
    return []
  }

  const adts = await prisma.adt.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: query,
            mode: 'insensitive'
          }
        }
      ],
      status: 'PUBLISHED'
    },
    include: {
      images: {
        take: 1,
        orderBy: {
          order: 'asc'
        }
      },
      category: true,
      city: true,
      country: true,
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 5
  })

  return adts as AdtWithRelations[]
} 