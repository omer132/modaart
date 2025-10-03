'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CreditCard, Truck, Shield, ArrowRight } from 'lucide-react'

import { useProducts } from '@/contexts/ProductContext'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useCoupons } from '@/contexts/CouponContext'

export function CartSummary() {
  const { getProductById } = useProducts()
  const { cartItems, getCartItemCount } = useCart()
  const { isAuthenticated } = useAuth()
  const { validateCoupon, useCoupon, appliedCoupon, applyCartCoupon, calculateDiscount } = useCoupons()
  const [promoCode, setPromoCode] = useState('')
  const [couponError, setCouponError] = useState('')

  // Gerçek sepet verilerinden toplam hesapla
  const subtotal = cartItems.reduce((sum, item) => {
    const product = getProductById(item.productId)
    return product ? sum + (product.price * item.quantity) : sum
  }, 0)
  
  const couponDiscount = calculateDiscount(subtotal)
  const total = subtotal - couponDiscount

  if (!isAuthenticated || cartItems.length === 0) {
    return null // Boş sepet durumunda summary gösterme
  }

  const applyPromoCode = () => {
    setCouponError('')
    
    if (!promoCode.trim()) {
      setCouponError('Kupon kodu girin')
      return
    }

    const validation = validateCoupon(promoCode)
    
    if (validation.isValid && validation.coupon) {
      applyCartCoupon(validation.coupon)
      setPromoCode('')
      setCouponError('')
    } else {
      setCouponError(validation.error || 'Geçersiz kupon kodu')
    }
  }

  return (
    <div className="space-y-6">
      {/* Promo Code */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">İndirim Kodu</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="İndirim kodunuzu girin"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            onClick={applyPromoCode}
            className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
          >
            Uygula
          </button>
        </div>
        {appliedCoupon && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✓ "{appliedCoupon.code}" kodu uygulandı (%{appliedCoupon.discount} indirim)
            </p>
          </div>
        )}
        {couponError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              {couponError}
            </p>
          </div>
        )}
      </div>


      {/* Features */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Neden ModaArt?</h3>
        <div className="space-y-4">
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Güvenli Ödeme</h4>
              <p className="text-sm text-gray-600">256-bit SSL şifreleme ile güvenli ödeme</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">30 Gün İade</h4>
              <p className="text-sm text-gray-600">Memnun kalmazsanız 30 gün içinde iade</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
