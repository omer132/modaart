'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Eye, Grid, List } from 'lucide-react'
import { useProducts } from '@/contexts/ProductContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface ProductGridProps {
  products?: ReturnType<typeof useProducts>['products']
}

export function ProductGrid(props: ProductGridProps = {}) {
  const { products: allProducts } = useProducts()
  const products = props.products ?? allProducts
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const handleFavoriteClick = (productId: number) => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }
    toggleFavorite(productId)
  }

  const handleAddToCart = (productId: number) => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }
    addToCart(productId)
  }

  return (
    <div>
      {/* Header with view options */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Görünüm:</span>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-gray-600">
          {products.length} ürün bulundu
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {products.map((product) => (
          <div
            key={product.id}
            className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            {/* Product Image */}
            <div className={`relative overflow-hidden ${
              viewMode === 'list' ? 'w-1/3 h-48' : 'h-64'
            }`}>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isFeatured && (
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    Öne Çıkan
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Yeni
                  </span>
                )}
                {product.discount && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    %{product.discount} İndirim
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleFavoriteClick(product.id)}
                  className={`p-2 rounded-full shadow-lg transition-colors ${
                    isFavorite(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                </button>
                <Link
                  href={`/products/${product.id}`}
                  className="p-2 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>

              {/* Add to Cart Button */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Sepete Ekle
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className={`p-6 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary-600 font-medium">
                  {product.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>

              {viewMode === 'list' && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ₺{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₺{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
