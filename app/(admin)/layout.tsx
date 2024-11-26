// import { auth } from "@clerk/nextjs";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getUserSession } from "@/lib/get-user-session";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
//   const { userId } = auth();

    const user = await getUserSession()
  
  if (!user) {
    redirect('/sign-in');
  }

  // Здесь можно добавить проверку на роль админа
  // TODO: Добавить проверку isAdmin из базы данных

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
} 