"use client"

import { useState, useMemo } from 'react'
import { ProductGrid } from '@/components/ProductGrid'
import { ProductFilters, priceRanges, sortOptions } from '@/components/ProductFilters'
import { useProducts } from '@/contexts/ProductContext'

export default function ProductsPage() {
  const { products } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('Tümü')
  const [selectedSort, setSelectedSort] = useState<string>('En Popüler')

  const filteredProducts = useMemo(() => {
    let list = [...products]

    // Category
    if (selectedCategory !== 'Tümü') {
      list = list.filter(p => p.category === selectedCategory)
    }

    // Price
    const pr = priceRanges.find(r => r.label === selectedPriceRange)
    if (pr && pr.label !== 'Tümü') {
      list = list.filter(p => {
        const minOk = pr.min == null ? true : p.price >= pr.min!
        const maxOk = pr.max == null ? true : p.price < pr.max!
        return minOk && maxOk
      })
    }

    // Sort
    switch (selectedSort) {
      case 'En Yeni':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'Fiyat: Düşükten Yükseğe':
        list.sort((a, b) => a.price - b.price)
        break
      case 'Fiyat: Yüksekten Düşüğe':
        list.sort((a, b) => b.price - a.price)
        break
      case 'En Çok Değerlendirilen':
        list.sort((a, b) => b.rating - a.rating)
        break
      default:
        // En Popüler: basitçe rating + reviews kombinasyonu
        list.sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))
    }

    return list
  }, [products, selectedCategory, selectedPriceRange, selectedSort])

  const handleFilterChange = (filters: { selectedCategory?: string; selectedPriceRange?: string; selectedSort?: string }) => {
    if (filters.selectedCategory !== undefined) setSelectedCategory(filters.selectedCategory)
    if (filters.selectedPriceRange !== undefined) setSelectedPriceRange(filters.selectedPriceRange)
    if (filters.selectedSort !== undefined) setSelectedSort(filters.selectedSort)
  }

  const clearFilters = () => {
    setSelectedCategory('Tümü')
    setSelectedPriceRange('Tümü')
    setSelectedSort('En Popüler')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tüm Ürünler</h1>
          <p className="text-xl text-gray-600">
            Sanat koleksiyonumuzdan en güzel eserleri keşfedin
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <ProductFilters
              selectedCategory={selectedCategory}
              selectedPriceRange={selectedPriceRange}
              selectedSort={selectedSort}
              onChange={handleFilterChange}
              onClear={clearFilters}
            />
          </div>
          <div className="lg:w-3/4">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  )
}


