"use client"

import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { searchAdts } from "@/app/actions/search"
import Link from "next/link"
import { AdtWithRelations } from "@/@types/prisma"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('q') || '')
  const [suggestions, setSuggestions] = useState<AdtWithRelations[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const debouncedValue = useDebounce(value, 300)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const getSuggestions = async () => {
      if (debouncedValue.length < 1) {
        setSuggestions([])
        return
      }
      
      const results = await searchAdts(debouncedValue)
      setSuggestions(results)
      setIsOpen(true)
    }

    getSuggestions()
  }, [debouncedValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`)
      setIsOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => value.length >= 1 && setIsOpen(true)}
            placeholder="Поиск объявлений..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </form>
      {/* Выпадающий список с предложениями */}
      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-auto"
        >
          {suggestions.length > 0 ? (
            suggestions.map((adt) => (
              <Link
                key={adt.id}
                href={`/adt/${adt.id}`}
                onClick={() => {
                  setIsOpen(false)
                  setValue('')
                }}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {adt.image && (
                    <img 
                      src={adt.image} 
                      alt={adt.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <div className="font-medium">{adt.title}</div>
                    <div className="text-sm text-gray-500">
                      {adt.price ? `${adt.price} ₽` : 'Цена не указана'}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              Ничего не найдено
            </div>
          )}
        </div>
      )}
    </div>
  )
}