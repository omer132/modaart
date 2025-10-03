'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Eye, Trash2, Share2 } from 'lucide-react'
import { useProducts } from '@/contexts/ProductContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'

export function FavoritesGrid() {
  const { products } = useProducts()
  const { favorites, removeFromFavorites } = useFavorites()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price-low' | 'price-high'>('newest')

  // Favori ürünleri al
  const favoriteProducts = products.filter(product => favorites.includes(product.id))


  const clearAllFavorites = () => {
    favorites.forEach(productId => removeFromFavorites(productId))
  }

  const handleShare = async (product: any) => {
    const shareData = {
      title: product.name,
      text: `${product.name} - ${product.category} - ₺${product.price.toLocaleString()}`,
      url: `${window.location.origin}/products/${product.id}`
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}/products/${product.id}`)
        alert('Ürün linki kopyalandı! Artık paylaşabilirsiniz.')
      }
    } catch (error) {
      console.log('Paylaşım iptal edildi veya hata oluştu:', error)
    }
  }

  const sortedFavorites = [...favoriteProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      default:
        return 0
    }
  })

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Favorileri Görüntülemek İçin Giriş Yapın
        </h3>
        <p className="text-gray-600 mb-8">
          Beğendiğiniz ürünleri favorilerinize eklemek için önce hesabınıza giriş yapmanız gerekiyor.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/login"
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Giriş Yap
          </Link>
          <Link
            href="/auth/register"
            className="px-6 py-3 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    )
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Favori Listeniz Boş</h3>
        <p className="text-gray-600 mb-8">
          Henüz favori listenize ürün eklemediniz. Beğendiğiniz ürünleri kalp ikonuna tıklayarak favorilere ekleyebilirsiniz.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-300"
        >
          Ürünleri Keşfet
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {favorites.length} Favori Ürün
            </h2>
            <p className="text-gray-600 text-sm">
              Beğendiğiniz ürünlerinizi burada saklayabilirsiniz
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="newest">En Yeni</option>
              <option value="oldest">En Eski</option>
              <option value="price-low">Fiyat: Düşükten Yükseğe</option>
              <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
            </select>
            
            <button
              onClick={clearAllFavorites}
              className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              Tümünü Temizle
            </button>
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedFavorites.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
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
                  onClick={() => removeFromFavorites(product.id)}
                  className="p-2 bg-white text-red-500 rounded-full shadow-lg hover:bg-red-50 transition-colors"
                  title="Favorilerden Kaldır"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <Link
                  href={`/products/${product.id}`}
                  className="p-2 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-colors"
                  title="Ürünü Görüntüle"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleShare(product)}
                  className="p-2 bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  title="Paylaş"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Sepete Ekle
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="mb-2">
                <span className="text-sm text-primary-600 font-medium">
                  {product.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>

              <div className="flex items-center justify-between mb-2">
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

              <div className="text-xs text-gray-500">
                Favorilere eklendi: {new Date(product.addedDate).toLocaleDateString('tr-TR')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Favori Listenizde {favorites.length} Ürün Var
            </h3>
            <p className="text-gray-600 text-sm">
              Beğendiğiniz ürünleri sepete ekleyerek satın alabilirsiniz
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/products"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Alışverişe Devam Et
            </Link>
            <button
              onClick={() => {
                // Add all favorites to cart
                favorites.forEach(product => addToCart(product.id))
              }}
              className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              Tümünü Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
