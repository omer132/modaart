'use client'

import { useState, useEffect } from 'react'
import { X, Upload, Plus, Trash2, Image as ImageIcon, AlertCircle } from 'lucide-react'
import { ImageGallery } from './ImageGallery'
import { processImageFiles } from '@/utils/imageUtils'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product?: any
  onSave: (product: any) => void
}

export function ProductModal({ isOpen, onClose, product, onSave }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: '',
    description: '',
    features: [''],
    specifications: {
      'Açıklama': '',
      'Boyutlar': '',
      'Ağırlık (gram)': ''
    },
    images: [''],
    status: 'active'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false)
  const [uploadErrors, setUploadErrors] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // Product prop'u değiştiğinde form verilerini güncelle
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        category: product.category || '',
        stock: product.stock || '',
        description: product.description || '',
        features: product.features && product.features.length > 0 ? product.features : [''],
        specifications: product.specifications || {
          'Açıklama': '',
          'Boyutlar': '',
          'Ağırlık (gram)': ''
        },
        images: product.images && product.images.length > 0 ? product.images : [''],
        status: product.status || 'active'
      })
    } else {
      // Yeni ürün için form'u sıfırla
      setFormData({
        name: '',
        price: '',
        originalPrice: '',
        category: '',
        stock: '',
        description: '',
        features: [''],
        specifications: {
          'Açıklama': '',
          'Boyutlar': '',
          'Ağırlık (gram)': ''
        },
        images: [''],
        status: 'active'
      })
    }
    // Hataları temizle
    setErrors({})
    setUploadErrors([])
  }, [product])

  const categories = [
    'Deniz Koleksiyonu',
    'Doğa Koleksiyonu', 
    'Modern Sanat',
    'Dağ Manzaraları'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }))
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }))
  }

  const handleSpecificationChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value
      }
    }))
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData(prev => ({
      ...prev,
      images: newImages
    }))
  }

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }))
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      images: newImages
    }))
  }

  const handleGallerySelect = (selectedImages: string[]) => {
    setFormData(prev => ({
      ...prev,
      images: selectedImages
    }))
  }

  const openImageGallery = () => {
    setIsImageGalleryOpen(true)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadErrors([])

    try {
      const result = await processImageFiles(files, {
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.8,
        format: 'jpeg'
      })

      if (result.success.length > 0) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images.filter(img => img.trim()), ...result.success]
        }))
      }

      if (result.errors.length > 0) {
        setUploadErrors(result.errors)
      }
    } catch (error) {
      setUploadErrors(['Görsel yükleme sırasında bir hata oluştu'])
    } finally {
      setIsUploading(false)
      // Reset the input
      e.target.value = ''
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Ürün adı gerekli'
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Geçerli bir fiyat girin'
    if (!formData.category) newErrors.category = 'Kategori seçin'
    if (!formData.stock || Number(formData.stock) < 0) newErrors.stock = 'Geçerli bir stok miktarı girin'
    if (!formData.description.trim()) newErrors.description = 'Açıklama gerekli'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const productData = {
      ...formData,
      id: product?.id || Date.now(),
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      stock: Number(formData.stock),
      features: formData.features.filter(f => f.trim()),
      images: formData.images.filter(img => img.trim()),
      createdAt: product?.createdAt || new Date().toISOString().split('T')[0]
    }

    onSave(productData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ürün Adı *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ürün adını girin"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Kategori seçin</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fiyat (₺) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orijinal Fiyat (₺)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stok Miktarı *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.stock ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
              />
              {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ürün açıklamasını girin"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Özellikler
            </label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Özellik girin"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-800"
              >
                <Plus className="w-4 h-4" />
                Özellik Ekle
              </button>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heykel Bilgileri
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm text-gray-600 mb-1">{key}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleSpecificationChange(key, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={`${key} girin`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ürün Görselleri
            </label>
            
            {/* File Upload */}
            <div className="mb-4">
              <input
                type="file"
                id="imageUpload"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
              <label
                htmlFor="imageUpload"
                className={`flex items-center gap-2 px-4 py-3 border-2 border-dashed border-primary-300 text-primary-600 hover:border-primary-400 hover:bg-primary-50 rounded-lg transition-colors cursor-pointer ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Upload className={`w-5 h-5 ${isUploading ? 'animate-spin' : ''}`} />
                {isUploading ? 'Yükleniyor...' : 'Cihazdan Görsel Seç'}
              </label>
              
              {/* Gallery Button (Alternative) */}
              <button
                type="button"
                onClick={openImageGallery}
                className="flex items-center gap-2 px-4 py-3 mt-2 border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 rounded-lg transition-colors w-full justify-center"
              >
                <ImageIcon className="w-5 h-5" />
                Hazır Galeriden Seç
              </button>
              
              {/* Upload Tips */}
              <div className="mt-2 text-xs text-gray-500 space-y-1">
                <p>💡 <strong>İpuçları:</strong></p>
                <p>• Desteklenen formatlar: JPEG, PNG, WebP</p>
                <p>• Maksimum dosya boyutu: 10MB</p>
                <p>• Görseller otomatik olarak optimize edilir</p>
                <p>• Birden fazla görsel seçebilirsiniz</p>
              </div>
            </div>

            {/* Upload Errors */}
            {uploadErrors.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800 mb-1">
                      Görsel yükleme hataları:
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {uploadErrors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Selected Images Preview */}
            {formData.images.length > 0 && formData.images[0] && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Seçilen Görseller:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Görsel ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Manual URL Input (Alternative) */}
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                Manuel URL Ekle (Alternatif)
              </summary>
              <div className="mt-2 space-y-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Görsel URL'si girin"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImage}
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-800 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  URL Ekle
                </button>
              </div>
            </details>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durum
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
            >
              {product ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>

        {/* Image Gallery Modal */}
        <ImageGallery
          isOpen={isImageGalleryOpen}
          onClose={() => setIsImageGalleryOpen(false)}
          onSelectImages={handleGallerySelect}
          selectedImages={formData.images.filter(img => img.trim())}
        />
      </div>
    </div>
  )
}
