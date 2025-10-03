'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface FavoritesContextType {
  favorites: number[]
  addToFavorites: (productId: number) => void
  removeFromFavorites: (productId: number) => void
  isFavorite: (productId: number) => boolean
  toggleFavorite: (productId: number) => void
  getFavoriteCount: () => number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([])
  const { user, isAuthenticated } = useAuth()

  // Kullanıcı değiştiğinde favori listesini yükle
  useEffect(() => {
    if (isAuthenticated && user) {
      const userFavorites = localStorage.getItem(`favorites_${user.id}`)
      if (userFavorites) {
        try {
          setFavorites(JSON.parse(userFavorites))
        } catch (error) {
          console.error('Favoriler yüklenirken hata:', error)
          setFavorites([])
        }
      } else {
        setFavorites([])
      }
    } else {
      // Kullanıcı çıkış yapmışsa favorileri temizle
      setFavorites([])
    }
  }, [user, isAuthenticated])

  // Favoriler değiştiğinde localStorage'a kaydet
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites))
    }
  }, [favorites, user, isAuthenticated])

  const addToFavorites = (productId: number) => {
    if (!isAuthenticated) {
      alert('Favorilere eklemek için giriş yapmanız gerekiyor.')
      return
    }

    setFavorites(prev => {
      if (!prev.includes(productId)) {
        return [...prev, productId]
      }
      return prev
    })
  }

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(id => id !== productId))
  }

  const isFavorite = (productId: number) => {
    return favorites.includes(productId)
  }

  const toggleFavorite = (productId: number) => {
    if (!isAuthenticated) {
      alert('Favorilere eklemek için giriş yapmanız gerekiyor.')
      return
    }

    if (isFavorite(productId)) {
      removeFromFavorites(productId)
    } else {
      addToFavorites(productId)
    }
  }

  const getFavoriteCount = () => {
    return favorites.length
  }

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    getFavoriteCount
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}



