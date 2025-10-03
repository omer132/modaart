'use client'

import { useState } from 'react'
import { Heart, ShoppingCart, Share2, Minus, Plus, Check } from 'lucide-react'
import { useProducts } from '@/contexts/ProductContext'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface ProductDetailProps {
  productId: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const { getProductById } = useProducts()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const product = getProductById(Number(productId))
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h2>
        <p className="text-gray-600">Aradığınız ürün mevcut değil.</p>
      </div>
    )
  }

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showAddedToCart, setShowAddedToCart] = useState(false)

  const addToCart = () => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }
    setShowAddedToCart(true)
    setTimeout(() => setShowAddedToCart(false), 3000)
  }

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }
    setIsFavorite(!isFavorite)
  }

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `${product.name} - ${product.category} - ₺${product.price.toLocaleString()}`,
      url: window.location.href
    }

    try {
      // Modern Web Share API kullan (mobil cihazlar için)
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback: URL'yi kopyala
        await navigator.clipboard.writeText(window.location.href)
        alert('Ürün linki kopyalandı! Artık paylaşabilirsiniz.')
      }
    } catch (error) {
      // Kullanıcı paylaşmayı iptal ettiyse veya hata oluştuysa
      console.log('Paylaşım iptal edildi veya hata oluştu:', error)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === index
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="flex gap-2">
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

          {/* Title and Category */}
          <div>
            <span className="text-sm text-primary-600 font-medium">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">
              {product.name}
            </h1>
          </div>


          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-gray-900">
              ₺{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-2xl text-gray-500 line-through">
                ₺{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Açıklama</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Adet</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 font-bold text-lg"
              >
                −
              </button>
              <span className="text-lg font-semibold w-12 text-center text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 font-bold text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                onClick={addToCart}
                className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Sepete Ekle
              </button>
              <button
                onClick={handleFavoriteClick}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  isFavorite
                    ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-gray-300 hover:border-red-300 text-gray-600'
                }`}
                title="Favorilere Ekle"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={handleShare}
                className="p-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 text-gray-600 transition-colors"
                title="Paylaş"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {showAddedToCart && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                <Check className="w-5 h-5" />
                <span className="font-medium">Ürün sepete eklendi!</span>
              </div>
            )}
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Özellikler</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="border-t border-gray-200 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Teknik Özellikler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-700">{key}</span>
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
