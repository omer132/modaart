'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getProducts } from '@/lib/data'

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number | null
  images: string[]
  rating: number
  reviews: number
  category: string
  isNew: boolean
  // Admin vitrini: ürünü öne çıkarma durumu
  isFeatured?: boolean
  discount: number | null
  stock: number
  status: 'active' | 'inactive'
  description: string
  features: string[]
  specifications: Record<string, string>
  createdAt: string
}

interface ProductContextType {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: number, product: Partial<Product>) => void
  deleteProduct: (id: number) => void
  getProductById: (id: number) => Product | undefined
  getProductsByCategory: (category: string) => Product[]
  getFeaturedProducts: () => Product[]
  getRelatedProducts: (productId: number, limit?: number) => Product[]
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  // İlk yüklemede localStorage'dan veya statik verilerden yükle
  useEffect(() => {
    const loadProducts = () => {
      try {
        const savedProducts = localStorage.getItem('modaart_products')
        if (savedProducts) {
          const parsed = JSON.parse(savedProducts)
          // Eski kayıtlarda isFeatured alanı olmayabilir; varsayılanı ekle
          const normalized = parsed.map((p: any) => ({
            ...p,
            isFeatured: typeof p.isFeatured === 'boolean' ? p.isFeatured : false,
          }))
          setProducts(normalized)
        } else {
          const staticProducts = getProducts()
          // Statik ürünleri normalize et
          const normalized = staticProducts.map((p: any) => ({
            ...p,
            isFeatured: typeof p.isFeatured === 'boolean' ? p.isFeatured : false,
          }))
          setProducts(normalized)
          localStorage.setItem('modaart_products', JSON.stringify(normalized))
        }
      } catch (error) {
        console.error('Ürünler yüklenirken hata:', error)
        const staticProducts = getProducts()
        const normalized = staticProducts.map((p: any) => ({
          ...p,
          isFeatured: typeof p.isFeatured === 'boolean' ? p.isFeatured : false,
        }))
        setProducts(normalized)
      }
    }

    loadProducts()

    // localStorage değişikliklerini dinle (farklı tab'lar arası senkronizasyon)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'modaart_products' && e.newValue) {
        try {
          setProducts(JSON.parse(e.newValue))
        } catch (error) {
          console.error('Storage değişikliği işlenirken hata:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now(), // Basit ID oluşturma - gerçek uygulamada UUID kullanılmalı
    }
    setProducts(prev => {
      const updatedProducts = [...prev, newProduct]
      localStorage.setItem('modaart_products', JSON.stringify(updatedProducts))
      return updatedProducts
    })
  }

  const updateProduct = (id: number, productData: Partial<Product>) => {
    setProducts(prev => {
      const updatedProducts = prev.map(product => 
        product.id === id ? { ...product, ...productData } : product
      )
      localStorage.setItem('modaart_products', JSON.stringify(updatedProducts))
      return updatedProducts
    })
  }

  const deleteProduct = (id: number) => {
    setProducts(prev => {
      const updatedProducts = prev.filter(product => product.id !== id)
      localStorage.setItem('modaart_products', JSON.stringify(updatedProducts))
      return updatedProducts
    })
  }

  const getProductById = (id: number) => {
    return products.find(product => product.id === id)
  }

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category)
  }

  const getFeaturedProducts = () => {
    return products.filter(product => product.isNew || product.rating >= 4.7)
  }

  const getRelatedProducts = (productId: number, limit: number = 4) => {
    const product = getProductById(productId)
    if (!product) return []
    
    return products
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, limit)
  }

  const value: ProductContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    getRelatedProducts
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}
