'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useProducts } from '@/contexts/ProductContext'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useCoupons } from '@/contexts/CouponContext'

export function CartItems() {
  const { getProductById } = useProducts()
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { appliedCoupon, calculateDiscount } = useCoupons()

  // Sepet ürünlerini detaylı bilgileri ile birleştir
  const cartWithDetails = cartItems.map(cartItem => {
    const product = getProductById(cartItem.productId)
    return product ? {
      ...cartItem,
      product
    } : null
  }).filter(Boolean)

  const subtotal = cartWithDetails.reduce((sum, item) => {
    return sum + (item!.product.price * item!.quantity)
  }, 0)
  const couponDiscount = calculateDiscount(subtotal)
  const total = subtotal - couponDiscount

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Sepeti Görüntülemek İçin Giriş Yapın
        </h3>
        <p className="text-gray-600 mb-8">
          Ürünleri sepete eklemek için önce hesabınıza giriş yapmanız gerekiyor.
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

  if (cartWithDetails.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Sepetiniz Boş
        </h3>
        <p className="text-gray-600 mb-8">
          Henüz sepetinizde ürün bulunmuyor. Koleksiyonlarımızı keşfederek beğendiğiniz ürünleri sepete ekleyebilirsiniz.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Alışverişe Başla
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-900">
          Sepetiniz ({cartWithDetails.length} ürün)
        </h3>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
        >
          Sepeti Temizle
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartWithDetails.map((item) => (
          <div key={item!.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row">
              {/* Product Image */}
              <div className="md:w-48 h-48 md:h-40">
                <img
                  src={item!.product.images[0]}
                  alt={item!.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-sm text-primary-600 font-medium">
                      {item!.product.category}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900 mt-1">
                      {item!.product.name}
                    </h4>
                  </div>
                  <button
                    onClick={() => removeFromCart(item!.productId)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                    title="Sepetten Kaldır"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ₺{item!.product.price.toLocaleString()}
                    </span>
                    {item!.product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ₺{item!.product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    {item!.product.discount && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                        %{item!.product.discount} İndirim
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item!.productId, item!.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 font-bold text-lg"
                      disabled={item!.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="text-lg font-semibold text-gray-900 min-w-[3rem] text-center">
                      {item!.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item!.productId, item!.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 font-bold text-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <span className="text-xl font-bold text-gray-900">
                      ₺{(item!.product.price * item!.quantity).toLocaleString()}
                    </span>
                    <p className="text-sm text-gray-600">
                      Toplam ({item!.quantity} adet)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <div className="space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Ara Toplam ({cartWithDetails.length} ürün)</span>
            <span>₺{subtotal.toLocaleString()}</span>
          </div>
          {appliedCoupon && couponDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>İndirim ({appliedCoupon.code})</span>
              <span>-₺{couponDiscount.toLocaleString()}</span>
            </div>
          )}
          <hr className="border-gray-300" />
          <div className="flex justify-between text-xl font-bold text-gray-900">
            <span>Toplam</span>
            <span>₺{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/products"
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium"
        >
          Alışverişe Devam Et
        </Link>
        <button className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
          Sipariş Ver (₺{total.toLocaleString()})
        </button>
      </div>
    </div>
  )
}