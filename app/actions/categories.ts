"use server";

import { prisma } from "@/prisma/prisma-client";
import { revalidatePath } from "next/cache";

export async function getCategoriesWithCount() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { adts: true }
      }
    }
  });
  
  return categories;
}

export async function createCategory(data: {
  nameEn: string;
  nameAr: string;
  slug: string;
  icon?: string;
}) {
  const category = await prisma.category.create({
    data: {
      nameEn: data.nameEn,
      nameAr: data.nameAr,
      slug: data.slug,
      icon: data.icon
    }
  });
  
  revalidatePath("/admin/categories");
  return category;
}

export async function updateCategory(
  id: string,
  data: {
    nameEn: string;
    nameAr: string;
    slug: string;
    icon?: string;
  }
) {
  const category = await prisma.category.update({
    where: { id },
    data: {
      nameEn: data.nameEn,
      nameAr: data.nameAr,
      slug: data.slug,
      icon: data.icon
    }
  });
  
  revalidatePath("/admin/categories");
  return category;
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({
    where: { id }
  });
  
  revalidatePath("/admin/categories");
}