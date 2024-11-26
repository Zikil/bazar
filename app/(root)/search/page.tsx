import { searchAdts } from "@/app/actions/search"
import Categories from "@/components/Categories"
import ListingCard from "@/components/ListingCard"
import { AdtWithRelations } from "@/@types/prisma"

interface SearchPageProps {
  searchParams: Promise<{ q: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const results = await searchAdts(params.q)

  return (
    <div className="min-h-screen bg-gray-100">
      <Categories />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold mb-6">
          Результаты поиска: {params.q}
        </h1>
        
        {results.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">По вашему запросу ничего не найдено</p>
            <p className="text-gray-400 mt-2">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((adt) => (
              <ListingCard 
                key={adt.id} 
                id={String(adt.id)} 
                title={adt.title} 
                price={adt.price?.toString() || 'Цена не указана'} 
                location={`${adt.city.nameEn}, ${adt.country.nameEn}`} 
                image={String(adt.image)} 
                date={new Date(adt.createdAt).toLocaleDateString()} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}