'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AdminProtectionProps {
  children: React.ReactNode
}

export function AdminProtection({ children }: AdminProtectionProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Admin session kontrolü
    const checkAdminSession = () => {
      try {
        const adminSession = localStorage.getItem('adminSession')
        if (adminSession) {
          const session = JSON.parse(adminSession)
          const loginTime = new Date(session.loginTime)
          const now = new Date()
          const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60)
          
          // 24 saat geçerli
          if (session.isAdmin && hoursDiff < 24) {
            setIsAdmin(true)
          } else {
            localStorage.removeItem('adminSession')
            router.push('/admin/login')
          }
        } else {
          router.push('/admin/login')
        }
      } catch (error) {
        localStorage.removeItem('adminSession')
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminSession()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return <>{children}</>
}




