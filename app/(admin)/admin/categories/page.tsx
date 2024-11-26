// import { getCategoriesWithCount } from "@/app/actions/categories";
import CategoryForm from "@/components/admin/CategoryForm";
import { DataTable } from "@/components/admin/DataTable";
import { Category, categoryColumns } from "./columns";
import { getCategoriesWithCount } from "@/app/actions/categories";

export default async function CategoriesPage() {
  const categories = await getCategoriesWithCount();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление категориями</h1>
        <CategoryForm />
      </div>
      <DataTable columns={categoryColumns} data={categories as Category[]} />
    </div>
  );
} 