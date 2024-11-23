"use client"

// Импортируем необходимые компоненты и типы
import { FC, useEffect, useState, useRef, useCallback } from 'react'
import ListingCard from '../ListingCard'
import { Adt } from '@prisma/client'
import toast from 'react-hot-toast'

// interface BlockAdtsProps {}

export const BlockAdts: FC = () => {

  // Состояния для хранения объявлений и управления их отображением
  const [adts, setAdts] = useState<Adt[]>([]) // Массив объявлений
  const [sortBy, setSortBy] = useState('new') // Тип сортировки
  const [isLoading, setIsLoading] = useState(true) // Флаг загрузки
  const [isLoadingMore, setIsLoadingMore] = useState(false) // Флаг загрузки дополнительных объявлений
  const [page, setPage] = useState(1) // Текущая страница
  const [hasMore, setHasMore] = useState(true) // Флаг наличия дополнительных объявлений
  
  // Создаем наблюдатель для бесконечной прокрутки
  const observer = useRef<IntersectionObserver>()
  const lastAdtElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoadingMore) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      // Если последний элемент виден и есть еще объявления - загружаем следующую порцию
      if (entries[0].isIntersecting && hasMore) {
        loadMore()
      }
    })
    if (node) observer.current.observe(node)
  }, [isLoadingMore, hasMore])

  // Функция загрузки объявлений
  const loadAdts = async (pageNum: number, isLoadMore = false) => {
    try {
      // Устанавливаем соответствующий флаг загрузки
      if (isLoadMore) {
        setIsLoadingMore(true)
      } else {
        setIsLoading(true)
      }
      
      // Запрашиваем данные с сервера
      const response = await fetch(`/api/adt?page=${pageNum}&sort=${sortBy}`)
      const { data: newAdts, meta } = await response.json()
      
      // Обновляем список объявлений
      if (pageNum === 1) {
        setAdts(newAdts)
      } else {
        setAdts(prev => [...prev, ...newAdts])
      }

      // Проверяем, есть ли еще объявления для загрузки
      setHasMore(newAdts.length > 0 && pageNum < meta.totalPages)
    } catch (error) {
      console.error('Ошибка загрузки объявлений:', error)
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  // Загружаем объявления при изменении способа сортировки
  useEffect(() => {
    loadAdts(1)
  }, [sortBy])

  // Обработчик изменения сортировки
  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
    setAdts([])
    setPage(1)
    setHasMore(true)
  }

  // Функция загрузки дополнительных объявлений
  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      loadAdts(nextPage, true)
    }
  }

  // Компонент-заглушка для отображения во время загрузки
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Заголовок и селектор сортировки */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Listings</h2>
        <div className="flex gap-2">
          <select 
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white"
            onChange={handleSort}
            value={sortBy}
          >
            <option value="new">Newest</option>
            <option value="price_asc">Price: ascending</option>
            <option value="price_desc">Price: descending</option>
          </select>
        </div>
      </div>

      {/* Сетка объявлений */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Отображаем заглушки во время начальной загрузки
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          // Отображаем список объявлений
          adts.map((adt, index) => (
            <div 
              key={adt.id}
              ref={index === adts.length - 1 ? lastAdtElementRef : undefined}
            >
              <ListingCard 
                title={adt.title}
                image={String(adt.image)}
                price={String(adt.price)}
                location={String(adt.location)}
                date={String(adt.createdAt)}
                id={String(adt.id)}
              />
            </div>
          ))
        )}
      </div>

      {/* Отображаем заглушки при загрузке дополнительных объявлений */}
      {isLoadingMore && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}
    </div>
  )
}