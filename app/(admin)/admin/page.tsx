import { getStats } from "@/app/actions/stats"
import { Card } from "@/components/ui/card"
// import { getStats } from "@/app/actions/stats"

export default async function AdminPage() {
  const stats = await getStats()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Панель управления</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Всего объявлений</div>
          <div className="text-2xl font-bold">{stats.totalAds}</div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-500">Активные объявления</div>
          <div className="text-2xl font-bold">{stats.activeAds}</div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-500">Всего пользователей</div>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-500">Новые пользователи (30 дней)</div>
          <div className="text-2xl font-bold">{stats.newUsers}</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Популярные категории</h2>
          <div className="space-y-2">
            {stats.topCategories.map((category) => (
              <div key={category.id} className="flex justify-between">
                <span>{category.name}</span>
                <span className="font-medium">{category.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Популярные города</h2>
          <div className="space-y-2">
            {stats.topCities.map((city) => (
              <div key={city.id} className="flex justify-between">
                <span>{city.name}</span>
                <span className="font-medium">{city.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
