'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Coupon {
  id: number
  code: string
  discount: number // Percentage discount (e.g., 20 for 20%)
  isActive: boolean
  createdAt: string
  usageCount: number
  maxUsage?: number // Optional usage limit
}

interface CouponContextType {
  coupons: Coupon[]
  appliedCoupon: Coupon | null
  addCoupon: (coupon: Omit<Coupon, 'id' | 'createdAt' | 'usageCount'>) => void
  updateCoupon: (id: number, updates: Partial<Coupon>) => void
  deleteCoupon: (id: number) => void
  getCouponByCode: (code: string) => Coupon | null
  validateCoupon: (code: string) => { isValid: boolean; coupon?: Coupon; error?: string }
  useCoupon: (code: string) => void
  applyCartCoupon: (coupon: Coupon | null) => void
  calculateDiscount: (subtotal: number) => number
}

const CouponContext = createContext<CouponContextType | undefined>(undefined)

export function CouponProvider({ children }: { children: ReactNode }) {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)

  // Load coupons from localStorage on mount
  useEffect(() => {
    try {
      const savedCoupons = localStorage.getItem('adminCoupons')
      if (savedCoupons) {
        setCoupons(JSON.parse(savedCoupons))
      } else {
        // Create some demo coupons
        const demoCoupons: Coupon[] = [
          {
            id: 1,
            code: 'WELCOME10',
            discount: 10,
            isActive: true,
            createdAt: new Date().toISOString(),
            usageCount: 0,
            maxUsage: 100
          },
          {
            id: 2,
            code: 'SUMMER20',
            discount: 20,
            isActive: true,
            createdAt: new Date().toISOString(),
            usageCount: 5,
            maxUsage: 50
          }
        ]
        setCoupons(demoCoupons)
        localStorage.setItem('adminCoupons', JSON.stringify(demoCoupons))
      }
    } catch (error) {
      console.error('Error loading coupons:', error)
    }
  }, [])

  // Save coupons to localStorage whenever coupons change
  useEffect(() => {
    localStorage.setItem('adminCoupons', JSON.stringify(coupons))
  }, [coupons])

  const addCoupon = (couponData: Omit<Coupon, 'id' | 'createdAt' | 'usageCount'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      usageCount: 0
    }
    setCoupons(prev => [...prev, newCoupon])
  }

  const updateCoupon = (id: number, updates: Partial<Coupon>) => {
    setCoupons(prev => prev.map(coupon => 
      coupon.id === id ? { ...coupon, ...updates } : coupon
    ))
  }

  const deleteCoupon = (id: number) => {
    setCoupons(prev => prev.filter(coupon => coupon.id !== id))
  }

  const getCouponByCode = (code: string): Coupon | null => {
    return coupons.find(coupon => 
      coupon.code.toLowerCase() === code.toLowerCase()
    ) || null
  }

  const validateCoupon = (code: string): { isValid: boolean; coupon?: Coupon; error?: string } => {
    if (!code.trim()) {
      return { isValid: false, error: 'Kupon kodu gerekli' }
    }

    const coupon = getCouponByCode(code)
    
    if (!coupon) {
      return { isValid: false, error: 'Geçersiz kupon kodu' }
    }

    if (!coupon.isActive) {
      return { isValid: false, error: 'Bu kupon artık geçerli değil' }
    }

    if (coupon.maxUsage && coupon.usageCount >= coupon.maxUsage) {
      return { isValid: false, error: 'Bu kuponun kullanım limiti dolmuş' }
    }

    return { isValid: true, coupon }
  }

  const useCoupon = (code: string) => {
    const coupon = getCouponByCode(code)
    if (coupon) {
      updateCoupon(coupon.id, { usageCount: coupon.usageCount + 1 })
    }
  }

  const applyCartCoupon = (coupon: Coupon | null) => {
    setAppliedCoupon(coupon)
  }

  const calculateDiscount = (subtotal: number): number => {
    if (!appliedCoupon) return 0
    return Math.round((subtotal * appliedCoupon.discount) / 100)
  }

  const value: CouponContextType = {
    coupons,
    appliedCoupon,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    getCouponByCode,
    validateCoupon,
    useCoupon,
    applyCartCoupon,
    calculateDiscount
  }

  return (
    <CouponContext.Provider value={value}>
      {children}
    </CouponContext.Provider>
  )
}

export function useCoupons() {
  const context = useContext(CouponContext)
  if (context === undefined) {
    throw new Error('useCoupons must be used within a CouponProvider')
  }
  return context
}
