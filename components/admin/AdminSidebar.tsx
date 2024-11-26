import Link from "next/link";
import { 
  LayoutDashboard, 
  MapPin, 
  Globe, 
  Tags
} from "lucide-react";

const AdminSidebar = () => {
  const menuItems = [
    {
      title: "Панель управления",
      href: "/admin",
      icon: LayoutDashboard
    },
    {
      title: "Категории",
      href: "/admin/categories",
      icon: Tags
    },
    {
      title: "Города",
      href: "/admin/cities",
      icon: MapPin
    },
    {
      title: "Страны",
      href: "/admin/countries",
      icon: Globe
    }
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-4">
      <div className="text-xl font-bold mb-8">Админ панель</div>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg mb-2"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar; 