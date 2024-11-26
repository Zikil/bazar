"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteCategory } from "@/app/actions/categories"
import CategoryForm from "@/components/admin/CategoryForm"

export type Category = {
  id: string
  nameEn: string
  nameAr: string
  slug: string
  icon?: string
  _count: {
    adts: number
  }
}

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "nameEn",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Название
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "icon",
    header: "Иконка",
    cell: ({ row }) => row.getValue("icon") || "—",
  },
  {
    accessorKey: "_count.adts",
    header: "Количество объявлений",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <CategoryForm category={category} mode="edit" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                if (confirm("Вы уверены, что хотите удалить эту категорию?")) {
                  deleteCategory(category.id)
                }
              }}
            >
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]