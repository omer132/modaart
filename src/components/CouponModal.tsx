'use client'

import { useState, useEffect } from 'react'
import { X, Tag, Percent, Users, Calendar } from 'lucide-react'
import { type Coupon } from '@/contexts/CouponContext'

interface CouponModalProps {
  isOpen: boolean
  onClose: () => void
  coupon?: Coupon | null
  onSave: (coupon: Omit<Coupon, 'id' | 'createdAt' | 'usageCount'>) => void
}

export function CouponModal({ isOpen, onClose, coupon, onSave }: CouponModalProps) {
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    maxUsage: '',
    isActive: true
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Update form when coupon prop changes
  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code || '',
        discount: coupon.discount?.toString() || '',
        maxUsage: coupon.maxUsage?.toString() || '',
        isActive: coupon.isActive ?? true
      })
    } else {
      setFormData({
        code: '',
        discount: '',
        maxUsage: '',
        isActive: true
      })
    }
    setErrors({})
  }, [coupon])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.code.trim()) {
      newErrors.code = 'Kupon kodu gerekli'
    } else if (formData.code.length < 3) {
      newErrors.code = 'Kupon kodu en az 3 karakter olmalı'
    }
    
    if (!formData.discount || Number(formData.discount) <= 0) {
      newErrors.discount = 'Geçerli bir indirim yüzdesi girin'
    } else if (Number(formData.discount) > 100) {
      newErrors.discount = 'İndirim yüzdesi 100\'den fazla olamaz'
    }
    
    if (formData.maxUsage && Number(formData.maxUsage) <= 0) {
      newErrors.maxUsage = 'Kullanım limiti pozitif bir sayı olmalı'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const couponData = {
      ...formData,
      code: formData.code.toUpperCase().trim(),
      discount: Number(formData.discount),
      maxUsage: formData.maxUsage ? Number(formData.maxUsage) : undefined
    }

    onSave(couponData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {coupon ? 'Kuponu Düzenle' : 'Yeni Kupon Oluştur'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Coupon Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-2" />
              Kupon Kodu *
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent uppercase ${
                errors.code ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="ÖRNEK: WELCOME10"
              maxLength={20}
            />
            {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
          </div>

          {/* Discount Percentage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Percent className="w-4 h-4 inline mr-2" />
              İndirim Yüzdesi *
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.discount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="20"
              min="1"
              max="100"
            />
            {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount}</p>}
          </div>

          {/* Max Usage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-2" />
              Kullanım Limiti (Opsiyonel)
            </label>
            <input
              type="number"
              name="maxUsage"
              value={formData.maxUsage}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.maxUsage ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="100"
              min="1"
            />
            {errors.maxUsage && <p className="text-red-500 text-sm mt-1">{errors.maxUsage}</p>}
            <p className="text-xs text-gray-500 mt-1">Boş bırakırsanız sınırsız kullanım olur</p>
          </div>

          {/* Active Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
              Kupon aktif
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
            >
              {coupon ? 'Güncelle' : 'Oluştur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}



