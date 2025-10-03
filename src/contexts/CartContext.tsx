'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface CartItem {
  id: number
  productId: number
  quantity: number
  addedAt: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (productId: number, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getCartItemCount: () => number
  getCartTotal: (getProductById: (id: number) => any) => number
  isInCart: (productId: number) => boolean
  getItemQuantity: (productId: number) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { user, isAuthenticated } = useAuth()

  // Kullanıcı değiştiğinde sepet verilerini yükle
  useEffect(() => {
    if (isAuthenticated && user) {
      const userCart = localStorage.getItem(`cart_${user.id}`)
      if (userCart) {
        try {
          setCartItems(JSON.parse(userCart))
        } catch (error) {
          console.error('Sepet yüklenirken hata:', error)
          setCartItems([])
        }
      } else {
        setCartItems([])
      }
    } else {
      // Kullanıcı çıkış yapmışsa sepeti temizle
      setCartItems([])
    }
  }, [user, isAuthenticated])

  // Sepet değiştiğinde localStorage'a kaydet
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems))
    }
  }, [cartItems, user, isAuthenticated])

  const addToCart = (productId: number, quantity: number = 1) => {
    if (!isAuthenticated) {
      alert('Sepete eklemek için giriş yapmanız gerekiyor.')
      return
    }

    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === productId)
      
      if (existingItem) {
        // Mevcut ürünün miktarını artır
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Yeni ürün ekle
        const newItem: CartItem = {
          id: Date.now(),
          productId,
          quantity,
          addedAt: new Date().toISOString()
        }
        return [...prev, newItem]
      }
    })

    // Başarılı ekleme bildirimi
    alert('Ürün sepete eklendi!')
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = (getProductById: (id: number) => any) => {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.productId)
      if (product) {
        return total + (item.quantity * product.price)
      }
      return total
    }, 0)
  }

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.productId === productId)
  }

  const getItemQuantity = (productId: number) => {
    const item = cartItems.find(item => item.productId === productId)
    return item ? item.quantity : 0
  }

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    isInCart,
    getItemQuantity
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
