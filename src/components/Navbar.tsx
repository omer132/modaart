'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ShoppingCart, Heart, User, Menu, X, LogOut, LogIn } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useCart } from '@/contexts/CartContext'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const { getFavoriteCount } = useFavorites()
  const { getCartItemCount } = useCart()
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="bg-transparent backdrop-blur-sm border-b border-white/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold gradient-text">ModaArt</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white/90 hover:text-white transition-colors backdrop-blur-sm px-3 py-1 rounded-lg hover:bg-white/10">
              Ana Sayfa
            </Link>
            <Link href="/products" className="text-white/90 hover:text-white transition-colors backdrop-blur-sm px-3 py-1 rounded-lg hover:bg-white/10">
              Ürünler
            </Link>
            <Link href="/about" className="text-white/90 hover:text-white transition-colors backdrop-blur-sm px-3 py-1 rounded-lg hover:bg-white/10">
              Hakkımızda
            </Link>
            <Link href="/contact" className="text-white/90 hover:text-white transition-colors backdrop-blur-sm px-3 py-1 rounded-lg hover:bg-white/10">
              İletişim
            </Link>
          </div>


          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/favorites" className="p-2 text-white/90 hover:text-white transition-colors hover:bg-white/10 rounded-lg backdrop-blur-sm relative">
              <Heart className="w-5 h-5" />
              {getFavoriteCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getFavoriteCount()}
                </span>
              )}
            </Link>
            <Link href="/cart" className="p-2 text-white/90 hover:text-white transition-colors hover:bg-white/10 rounded-lg backdrop-blur-sm relative">
              <ShoppingCart className="w-5 h-5" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 text-white/90 hover:text-white transition-colors hover:bg-white/10 rounded-lg backdrop-blur-sm flex items-center gap-2"
              >
                {isAuthenticated ? (
                  <>
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                    <span className="hidden md:inline text-sm">{user?.name}</span>
                  </>
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-600">{user?.email}</p>
                      </div>
                      <hr className="my-2" />
                      <button
                        onClick={() => {
                          logout()
                          setIsUserMenuOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Çıkış Yap
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        href="/auth/login" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <LogIn className="w-4 h-4" />
                        Giriş Yap
                      </Link>
                      <Link 
                        href="/auth/register" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Kayıt Ol
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-white/90 hover:text-white transition-colors hover:bg-white/10 rounded-lg backdrop-blur-sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 bg-black/20 backdrop-blur-sm">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                Ana Sayfa
              </Link>
              <Link href="/products" className="text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                Ürünler
              </Link>
              <Link href="/about" className="text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                Hakkımızda
              </Link>
              <Link href="/contact" className="text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                İletişim
              </Link>
              
              {/* Mobile Auth Links */}
              <hr className="border-white/20" />
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2">
                    <p className="text-white font-medium">{user?.name}</p>
                    <p className="text-white/70 text-sm">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="text-red-400 hover:text-red-300 transition-colors px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Giriş Yap
                  </Link>
                  <Link href="/auth/register" className="text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
