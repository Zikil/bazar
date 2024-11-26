"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { createCategory, updateCategory } from "@/app/actions/categories";

interface CategoryFormProps {
  category?: {
    id: string;
    nameEn: string;
    nameAr: string;
    slug: string;
    icon?: string;
  };
  mode?: "create" | "edit";
}

export default function CategoryForm({ category, mode = "create" }: CategoryFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      if (mode === "create") {
        await createCategory({
          nameEn: formData.get("nameEn") as string,
          nameAr: formData.get("nameAr") as string,
          slug: formData.get("slug") as string,
          icon: formData.get("icon") as string,
        });
        toast({
          title: "Категория создана",
          description: "Новая категория успешно добавлена",
        });
      } else {
        await updateCategory(category!.id, {
          nameEn: formData.get("nameEn") as string,
          nameAr: formData.get("nameAr") as string,
          slug: formData.get("slug") as string,
          icon: formData.get("icon") as string,
        });
        toast({
          title: "Категория обновлена", 
          description: "Изменения успешно сохранены",
        });
      }
      
      setOpen(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Что-то пошло не так",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {mode === "create" ? "Добавить категорию" : "Редактировать"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Новая категория" : "Редактировать категорию"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          
          <Input 
            name="nameEn"
            placeholder="Название на английском"
            defaultValue={category?.nameEn}
          />
          <Input
            name="nameAr"
            placeholder="Название на арабском"
            defaultValue={category?.nameAr}
          />
          <Input
            name="slug"
            placeholder="URL-slug"
            defaultValue={category?.slug}
          />
          <Input
            name="icon"
            placeholder="Иконка (URL или название)"
            defaultValue={category?.icon}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Сохранение..." : "Сохранить"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}