
'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

import { categories } from '@/lib/data'

const allCategories = ['Tümü', ...categories]

export const priceRanges = [
  { label: 'Tümü', min: 0, max: null },
  { label: '₺0 - ₺500', min: 0, max: 500 },
  { label: '₺500 - ₺1000', min: 500, max: 1000 },
  { label: '₺1000 - ₺1500', min: 1000, max: 1500 },
  { label: '₺1500+', min: 1500, max: null }
]

export const sortOptions = [
  'En Popüler',
  'En Yeni',
  'Fiyat: Düşükten Yükseğe',
  'Fiyat: Yüksekten Düşüğe',
  'En Çok Değerlendirilen'
]

interface ProductFiltersProps {
  selectedCategory: string
  selectedPriceRange: string
  selectedSort: string
  onChange: (filters: { selectedCategory?: string; selectedPriceRange?: string; selectedSort?: string }) => void
  onClear: () => void
}

export function ProductFilters({
  selectedCategory,
  selectedPriceRange,
  selectedSort,
  onChange,
  onClear
}: ProductFiltersProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isPriceOpen, setIsPriceOpen] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filtreler</h3>
        <button
          onClick={onClear}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Temizle
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Kategori
          <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isCategoryOpen && (
          <div className="space-y-2">
            {allCategories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => onChange({ selectedCategory: e.target.value })}
                  className="mr-3 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Fiyat Aralığı
          <ChevronDown className={`w-4 h-4 transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isPriceOpen && (
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  value={range.label}
                  checked={selectedPriceRange === range.label}
                  onChange={(e) => onChange({ selectedPriceRange: e.target.value })}
                  className="mr-3 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
