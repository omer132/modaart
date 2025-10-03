'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: number
  email: string
  name: string
  avatar?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; isAdmin?: boolean }>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // İlk yüklemede localStorage'dan kullanıcı bilgilerini al ve demo kullanıcı oluştur
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Demo kullanıcıyı oluştur (eğer yoksa)
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
        if (!existingUsers.find((u: any) => u.email === 'demo@modaart.com')) {
          const demoUser = {
            id: 1,
            name: 'Demo Kullanıcı',
            email: 'demo@modaart.com',
            password: 'demo123',
            avatar: 'https://ui-avatars.com/api/?name=Demo+Kullanıcı&background=random',
            createdAt: new Date().toISOString()
          }
          existingUsers.push(demoUser)
          localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))
        }

        // Kullanıcı session kontrolü
        const userSession = localStorage.getItem('userSession')
        if (userSession) {
          const userData = JSON.parse(userSession)
          setUser(userData)
        }
      } catch (error) {
        console.error('Auth kontrol hatası:', error)
        localStorage.removeItem('userSession')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; isAdmin?: boolean }> => {
    setIsLoading(true)
    
    try {
      // Admin kontrolü
      if (email === 'admin@modaart.com' && password === 'admin123') {
        // Admin session'ı oluştur
        localStorage.setItem('adminSession', JSON.stringify({
          isAdmin: true,
          email: email,
          loginTime: new Date().toISOString()
        }))
        
        return { success: true, isAdmin: true }
      }
      
      // Kayıtlı kullanıcıları localStorage'dan al
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      
      // Kullanıcıyı bul ve şifre kontrolü yap
      const user = users.find((u: any) => u.email === email && u.password === password)
      
      if (user) {
        // Şifre bilgisini çıkar ve kullanıcı bilgilerini session'a kaydet
        const { password, ...userWithoutPassword } = user
        
        setUser(userWithoutPassword)
        localStorage.setItem('userSession', JSON.stringify(userWithoutPassword))
        
        return { success: true, isAdmin: false }
      } else {
        return { success: false }
      }
    } catch (error) {
      console.error('Giriş hatası:', error)
      return { success: false }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Mevcut kullanıcıları al
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      
      // Email zaten kayıtlı mı kontrol et
      if (users.find((u: any) => u.email === email)) {
        return false // Email zaten kullanımda
      }
      
      // Yeni kullanıcı oluştur
      const newUser = {
        id: Date.now(),
        name,
        email,
        password, // Gerçek uygulamada hash'lenmeli
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        createdAt: new Date().toISOString()
      }
      
      // Kullanıcıyı kaydet
      users.push(newUser)
      localStorage.setItem('registeredUsers', JSON.stringify(users))
      
      // Otomatik giriş yap
      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      localStorage.setItem('userSession', JSON.stringify(userWithoutPassword))
      
      return true
    } catch (error) {
      console.error('Kayıt hatası:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('userSession')
    router.push('/')
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
