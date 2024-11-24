import { Tag } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Category } from "@prisma/client";
import { prisma } from "@/prisma/prisma-client";

interface BreadcrumbsCategoryProps {
    category?: Category
}


export const BreadcrumbsCategory = async ({ category }: BreadcrumbsCategoryProps) => {
    const categ = await prisma.category.findFirst({
        where: {
            id: String(category?.id)
        },
        include: {
            parent: true
        }
    })
    return (
        <div className="flex items-center gap-2 mt-2">
            <Tag className="h-4 w-4 text-gray-500" />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${categ?.parent?.slug}`}>{categ?.parent?.nameEn}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${categ?.slug}`}>{categ?.nameEn}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}