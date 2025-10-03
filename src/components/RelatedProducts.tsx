'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import { useProducts } from '@/contexts/ProductContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useCart } from '@/contexts/CartContext'

interface RelatedProductsProps {
  productId?: number
}

export function RelatedProducts({ productId = 1 }: RelatedProductsProps) {
  const { getRelatedProducts } = useProducts()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToCart } = useCart()
  const relatedProducts = getRelatedProducts(productId)

  return (
    <section className="mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Benzer Ürünler
        </h2>
        <p className="text-lg text-gray-600">
          Bu ürünle birlikte beğenebileceğiniz diğer eserler
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
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
                  onClick={() => toggleFavorite(product.id)}
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
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary-600 font-medium">
                  {product.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>

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

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link
          href="/products"
          className="inline-flex items-center px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-300 transform hover:scale-105"
        >
          Tüm Ürünleri Gör
          <Eye className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </section>
  )
}
