'use client'

import { useState, useEffect } from 'react'
import { useProducts } from '@/contexts/ProductContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCart, Heart, ArrowRight, TreePine, Leaf, Wind, Sun } from 'lucide-react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

export function DogaKoleksiyonu() {
  const { getProductsByCategory } = useProducts()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToCart } = useCart()
  
  // Doğa kategorisindeki ürünleri al
  const dogaUrunleri = getProductsByCategory('Doğa Koleksiyonu')

  const { scrollYProgress } = useScroll()
  
  // Scroll progress'e göre arka plan rengini değiştir
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['#C8E6C9', '#388E3C', '#2E7D32', '#1B5E20']
  )

  // Scroll progress'e göre opacity değiştir
  const surfaceOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const deepOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1])
  const mistOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 0.3])

  // Parallax efektler için scroll değerleri
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -200])

  // Rüzgar efekti için mouse pozisyonu
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })



  // Mouse takip efekti
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dinamik Arka Plan */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ backgroundColor }}
      />

      {/* Orman Yüzeyi Efektleri */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-32 z-10"
        style={{ opacity: surfaceOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-200 to-transparent">
          {/* Güneş ışığı efekti */}
          <motion.div 
            className="absolute top-2 right-1/4 opacity-40"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sun className="w-12 h-12 text-yellow-300" />
          </motion.div>

          {/* Rüzgar ile hareket eden yapraklar */}
          <motion.div 
            className="absolute top-4 left-1/4 opacity-30"
            style={{ 
              x: useTransform(springX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-10, 10]),
              y: useTransform(springY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-5, 5])
            }}
            animate={{ 
              rotate: [0, 5, -5, 0],
              x: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-8 h-8 text-green-400" />
          </motion.div>

          <motion.div 
            className="absolute top-8 right-1/3 opacity-25"
            style={{ 
              x: useTransform(springX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [5, -5]),
              y: useTransform(springY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [3, -3])
            }}
            animate={{ 
              rotate: [0, -3, 3, 0],
              x: [0, -8, 8, 0]
            }}
            transition={{ 
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-6 h-6 text-green-500" />
          </motion.div>

          <motion.div 
            className="absolute top-12 left-1/2 opacity-20"
            style={{ 
              x: useTransform(springX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-8, 8]),
              y: useTransform(springY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-2, 2])
            }}
            animate={{ 
              rotate: [0, 8, -8, 0],
              x: [0, 12, -12, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-10 h-10 text-green-300" />
          </motion.div>

          {/* Ekranın tamamını kaplayan yapraklar */}
          {/* Sol taraf yapraklar */}
          <motion.div 
            className="absolute top-6 left-1/12 opacity-15"
            style={{ y: y1 }}
            animate={{ 
              rotate: [0, 360],
              x: [0, 20, -20, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="w-4 h-4 text-green-400" />
          </motion.div>

          <motion.div 
            className="absolute top-12 left-1/8 opacity-18"
            style={{ y: y2 }}
            animate={{ 
              rotate: [0, -270, -540],
              x: [0, 25, -25, 0]
            }}
            transition={{ 
              duration: 9,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="w-3 h-3 text-green-300" />
          </motion.div>

          <motion.div 
            className="absolute top-8 left-1/6 opacity-12"
            style={{ y: y3 }}
            animate={{ 
              rotate: [0, 180, 360],
              x: [0, 30, -30, 0]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="w-5 h-5 text-green-500" />
          </motion.div>

          <motion.div 
            className="absolute top-16 left-1/4 opacity-16"
            style={{ y: y4 }}
            animate={{ 
              rotate: [0, -180, -360],
              x: [0, -20, 20, 0]
            }}
            transition={{ 
              duration: 6.5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="w-4 h-4 text-green-400" />
          </motion.div>

          {/* Merkez yapraklar */}
          <motion.div 
            className="absolute top-10 left-1/3 opacity-14"
            style={{ y: y1 }}
            animate={{ 
              rotate: [0, 270, 540],
              x: [0, 35, -35, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="w-3 h-3 text-green-600" />
          </motion.div>

          <motion.div 
            className="absolute top-14 left-2/5 opacity-20"
            style={{ y: y2 }}
            animate={{ 
              rotate: [0, -90, -180, -270, -360],
              x: [0, -25, 25, 0]
            }}
            transition={{ 
              duration: 8.5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="w-5 h-5 text-green-300" />
          </motion.div>

          <motion.div 
            className="absolute top-6 left-1/2 opacity-17"
            style={{ y: y3 }}
            animate={{ 
              rotate: [0, 450, 900],
              x: [0, 40, -40, 0]
            }}
            transition={{ 
              duration: 11,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="w-4 h-4 text-green-400" />
          </motion.div>

          <motion.div 
            className="absolute top-18 left-3/5 opacity-13"
            style={{ y: y4 }}
            animate={{ 
              rotate: [0, -360, -720],
              x: [0, -30, 30, 0]
            }}
            transition={{ 
              duration: 9.5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="w-3 h-3 text-green-500" />
          </motion.div>

          {/* Sağ taraf yapraklar */}
          <motion.div 
            className="absolute top-8 left-2/3 opacity-15"
            style={{ y: y1 }}
            animate={{ 
              rotate: [0, 180, 360],
              x: [0, 20, -20, 0]
            }}
            transition={{ 
              duration: 7.2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="w-4 h-4 text-green-300" />
          </motion.div>

          <motion.div 
            className="absolute top-12 left-3/4 opacity-19"
            style={{ y: y2 }}
            animate={{ 
              rotate: [0, -270, -540],
              x: [0, -35, 35, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="w-5 h-5 text-green-400" />
          </motion.div>

          <motion.div 
            className="absolute top-16 left-5/6 opacity-11"
            style={{ y: y3 }}
            animate={{ 
              rotate: [0, 360, 720],
              x: [0, 25, -25, 0]
            }}
            transition={{ 
              duration: 9,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="w-3 h-3 text-green-600" />
          </motion.div>

          <motion.div 
            className="absolute top-10 right-1/12 opacity-16"
            style={{ y: y4 }}
            animate={{ 
              rotate: [0, -180, -360],
              x: [0, -15, 15, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="w-4 h-4 text-green-500" />
          </motion.div>

          <motion.div 
            className="absolute top-6 right-1/8 opacity-14"
            style={{ y: y1 }}
            animate={{ 
              rotate: [0, 270, 540],
              x: [0, 30, -30, 0]
            }}
            transition={{ 
              duration: 10.5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="w-5 h-5 text-green-300" />
          </motion.div>

          <motion.div 
            className="absolute top-14 right-1/6 opacity-18"
            style={{ y: y2 }}
            animate={{ 
              rotate: [0, -450, -900],
              x: [0, -40, 40, 0]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="w-3 h-3 text-green-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Derin Orman Efektleri */}
      <motion.div 
        className="fixed inset-0 z-5"
        style={{ opacity: deepOpacity }}
      >
        <div className="absolute inset-0">
          {/* Ağaç Gövdeleri - Parallax ile hareket */}
          <motion.div 
            className="absolute top-1/4 left-1/6 opacity-20"
            style={{ y: y1 }}
          >
            <TreePine className="w-20 h-32 text-green-600" />
          </motion.div>
          
          <motion.div 
            className="absolute top-1/3 right-1/5 opacity-15"
            style={{ y: y2 }}
          >
            <TreePine className="w-16 h-28 text-green-700" />
          </motion.div>
          
          <motion.div 
            className="absolute top-1/2 left-1/3 opacity-10"
            style={{ y: y3 }}
          >
            <TreePine className="w-24 h-36 text-green-800" />
          </motion.div>

          {/* Ek ağaçlar */}
          <motion.div 
            className="absolute top-1/6 right-1/3 opacity-12"
            style={{ y: y4 }}
          >
            <TreePine className="w-14 h-24 text-green-700" />
          </motion.div>

          <motion.div 
            className="absolute top-2/3 left-1/5 opacity-8"
            style={{ y: y1 }}
          >
            <TreePine className="w-18 h-30 text-green-900" />
          </motion.div>
          
          {/* Sarmaşıklar - Animasyonlu */}
          <motion.div 
            className="absolute top-1/5 right-1/4 opacity-15"
            animate={{ 
              rotate: [12, 15, 12],
              scaleY: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-1 h-20 bg-green-500 transform rotate-12"></div>
          </motion.div>

          <motion.div 
            className="absolute top-1/3 left-1/5 opacity-10"
            animate={{ 
              rotate: [-6, -9, -6],
              scaleY: [1, 0.9, 1]
            }}
            transition={{ 
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-1 h-16 bg-green-600 transform -rotate-6"></div>
          </motion.div>

          {/* Ek sarmaşıklar */}
          <motion.div 
            className="absolute top-1/2 right-1/6 opacity-8"
            animate={{ 
              rotate: [8, 12, 8],
              scaleY: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-1 h-24 bg-green-700 transform rotate-8"></div>
          </motion.div>

          {/* Ekranın tamamını kaplayan düşen yapraklar */}
          {/* Sol kenar düşen yapraklar */}
          <motion.div 
            className="absolute top-1/6 left-1/12 opacity-12"
            animate={{ 
              y: [0, 90, 0],
              rotate: [0, 270, 540],
              x: [0, 35, -35, 0]
            }}
            transition={{ 
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-4 h-4 text-green-300" />
          </motion.div>

          <motion.div 
            className="absolute top-1/8 left-1/8 opacity-18"
            animate={{ 
              y: [0, 110, 0],
              rotate: [0, -270, -540],
              x: [0, -28, 28, 0]
            }}
            transition={{ 
              duration: 8.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-5 h-5 text-green-400" />
          </motion.div>

          <motion.div 
            className="absolute top-1/7 left-1/6 opacity-14"
            animate={{ 
              y: [0, 95, 0],
              rotate: [0, 180, 360],
              x: [0, 32, -32, 0]
            }}
            transition={{ 
              duration: 7.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-3 h-3 text-green-500" />
          </motion.div>

          <motion.div 
            className="absolute top-1/9 left-1/4 opacity-16"
            animate={{ 
              y: [0, 105, 0],
              rotate: [0, -180, -360],
              x: [0, -30, 30, 0]
            }}
            transition={{ 
              duration: 9.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-4 h-4 text-green-600" />
          </motion.div>

          {/* Merkez düşen yapraklar */}
          <motion.div 
            className="absolute top-1/5 left-1/3 opacity-20"
            animate={{ 
              y: [0, 115, 0],
              rotate: [0, 360, 720],
              x: [0, 20, -20, 0]
            }}
            transition={{ 
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-5 h-5 text-green-500" />
          </motion.div>

          <motion.div 
            className="absolute top-1/4 left-2/5 opacity-15"
            animate={{ 
              y: [0, 88, 0],
              rotate: [0, -360, -720],
              x: [0, -18, 18, 0]
            }}
            transition={{ 
              duration: 9.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-3 h-3 text-green-600" />
          </motion.div>

          <motion.div 
            className="absolute top-1/6 left-1/2 opacity-17"
            animate={{ 
              y: [0, 100, 0],
              rotate: [0, 180, 360],
              x: [0, 30, -30, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-6 h-6 text-green-400" />
          </motion.div>

          <motion.div 
            className="absolute top-1/8 left-3/5 opacity-13"
            animate={{ 
              y: [0, 92, 0],
              rotate: [0, 180, 360],
              x: [0, 15, -15, 0]
            }}
            transition={{ 
              duration: 8.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-4 h-4 text-green-300" />
          </motion.div>

          {/* Sağ kenar düşen yapraklar */}
          <motion.div 
            className="absolute top-1/7 left-2/3 opacity-11"
            animate={{ 
              y: [0, 98, 0],
              rotate: [0, -180, -360],
              x: [0, -22, 22, 0]
            }}
            transition={{ 
              duration: 9.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-3 h-3 text-green-400" />
          </motion.div>

          <motion.div 
            className="absolute top-1/5 left-3/4 opacity-19"
            animate={{ 
              y: [0, 120, 0],
              rotate: [0, -270, -540],
              x: [0, -35, 35, 0]
            }}
            transition={{ 
              duration: 10.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-5 h-5 text-green-500" />
          </motion.div>

          <motion.div 
            className="absolute top-1/6 left-5/6 opacity-14"
            animate={{ 
              y: [0, 85, 0],
              rotate: [0, 90, 180, 270, 360],
              x: [0, 26, -26, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-3 h-3 text-green-300" />
          </motion.div>

          <motion.div 
            className="absolute top-1/9 right-1/12 opacity-16"
            animate={{ 
              y: [0, 100, 0],
              rotate: [0, -90, -180, -270, -360],
              x: [0, -24, 24, 0]
            }}
            transition={{ 
              duration: 8.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-4 h-4 text-green-400" />
          </motion.div>

          <motion.div 
            className="absolute top-1/4 right-1/8 opacity-12"
            animate={{ 
              y: [0, 130, 0],
              rotate: [0, 450, 900],
              x: [0, 40, -40, 0]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-5 h-5 text-green-600" />
          </motion.div>

          <motion.div 
            className="absolute top-1/3 right-1/6 opacity-18"
            animate={{ 
              y: [0, 75, 0],
              rotate: [0, -450, -900],
              x: [0, -45, 45, 0]
            }}
            transition={{ 
              duration: 11.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-3 h-3 text-green-300" />
          </motion.div>

          <motion.div 
            className="absolute top-1/10 right-1/4 opacity-15"
            animate={{ 
              y: [0, 110, 0],
              rotate: [0, 360, 720, 1080],
              x: [0, 25, -25, 0]
            }}
            transition={{ 
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="w-4 h-4 text-green-500" />
          </motion.div>
        </div>
      </motion.div>

      {/* Sis Efekti */}
      <motion.div 
        className="fixed inset-0 z-15 pointer-events-none"
        style={{ opacity: mistOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent"></div>
        
        {/* Ekranın tamamını kaplayan sis parçacıkları */}
        {/* Sol kenar sis efektleri */}
        <motion.div 
          className="absolute bottom-0 left-1/12 w-16 h-16 bg-green-700/12 rounded-full blur-lg"
          animate={{ 
            x: [0, 60, -60, 0],
            y: [0, -15, 15, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute bottom-0 left-1/8 w-28 h-28 bg-green-800/8 rounded-full blur-2xl"
          animate={{ 
            x: [0, -45, 45, 0],
            y: [0, -12, 12, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{ 
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute bottom-0 left-1/6 w-14 h-14 bg-green-500/15 rounded-full blur-sm"
          animate={{ 
            x: [0, 35, -35, 0],
            y: [0, -8, 8, 0],
            scale: [1, 1.4, 0.6, 1]
          }}
          transition={{ 
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute bottom-0 left-1/4 w-32 h-32 bg-green-800/10 rounded-full blur-xl"
          animate={{ 
            x: [0, 50, -50, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Merkez sis efektleri */}
        <motion.div 
          className="absolute bottom-0 left-1/3 w-22 h-22 bg-green-600/10 rounded-full blur-xl"
          animate={{ 
            x: [0, -55, 55, 0],
            y: [0, -18, 18, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ 
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute bottom-0 left-2/5 w-18 h-18 bg-green-700/14 rounded-full blur-lg"
          animate={{ 
            x: [0, 50, -50, 0],
            y: [0, -14, 14, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ 
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute bottom-0 left-1/2 w-20 h-20 bg-green-600/20 rounded-full blur-md"
          animate={{ 
            x: [0, 40, -40, 0],
            y: [0, -10, 10, 0],
            scale: [1, 1.3, 0.7, 1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute bottom-0 left-3/5 w-26 h-26 bg-green-800/6 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 40, 0],
            y: [0, -16, 16, 0],
            scale: [1, 0.7, 1.3, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Sağ kenar sis efektleri */}
        <motion.div 
          className="absolute bottom-0 left-2/3 w-12 h-12 bg-green-500/18 rounded-full blur-md"
          animate={{ 
            x: [0, 30, -30, 0],
            y: [0, -6, 6, 0],
            scale: [1, 1.5, 0.5, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute bottom-0 left-3/4 w-24 h-24 bg-green-600/12 rounded-full blur-2xl"
          animate={{ 
            x: [0, -35, 35, 0],
            y: [0, -20, 20, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{ 
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute bottom-0 left-5/6 w-20 h-20 bg-green-700/10 rounded-full blur-lg"
          animate={{ 
            x: [0, 25, -25, 0],
            y: [0, -10, 10, 0],
            scale: [1, 1.3, 0.7, 1]
          }}
          transition={{ 
            duration: 10.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute bottom-0 right-1/12 w-16 h-16 bg-green-500/16 rounded-full blur-md"
          animate={{ 
            x: [0, -30, 30, 0],
            y: [0, -12, 12, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ 
            duration: 12.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute bottom-0 right-1/8 w-30 h-30 bg-green-800/7 rounded-full blur-3xl"
          animate={{ 
            x: [0, 70, -70, 0],
            y: [0, -25, 25, 0],
            scale: [1, 0.6, 1.4, 1]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute bottom-0 right-1/6 w-24 h-24 bg-green-700/15 rounded-full blur-lg"
          animate={{ 
            x: [0, -30, 30, 0],
            y: [0, -15, 15, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute bottom-0 right-1/4 w-18 h-18 bg-green-600/13 rounded-full blur-xl"
          animate={{ 
            x: [0, 45, -45, 0],
            y: [0, -22, 22, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ 
            duration: 14.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Ana İçerik */}
      <div className="relative z-20">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                🌿 Doğa Koleksiyonu
              </h1>
              <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
                Ormanın huzurunu sanatla keşfedin
              </p>
            </motion.div>
          </div>
        </section>

        {/* Ürün Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Doğa Temalı Sanat Eserleri
              </h2>
              <p className="text-lg text-green-100">
                {dogaUrunleri.length} adet özel doğa koleksiyonu
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {dogaUrunleri.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    {/* Ürün Görseli */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Favori Butonu */}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      >
                        <Heart 
                          className={`w-5 h-5 ${
                            isFavorite(product.id) 
                              ? 'text-red-500 fill-current' 
                              : 'text-white'
                          }`} 
                        />
                      </button>

                      {/* İndirim Badge */}
                      {product.discount && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                          %{product.discount} İndirim
                        </div>
                      )}
                    </div>

                    {/* Ürün Bilgileri */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-200 transition-colors">
                        {product.name}
                      </h3>
                      

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">
                            ₺{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-lg text-green-200 line-through">
                              ₺{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-green-100">
                          Stok: {product.stock}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product.id)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 group"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {dogaUrunleri.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <TreePine className="w-24 h-24 text-green-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Henüz Doğa Koleksiyonu Yok
                </h3>
                <p className="text-green-100 mb-8">
                  Yakında harika doğa temalı sanat eserleri eklenecek!
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Daha Fazla Keşfet Bölümü */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Daha Fazla Keşfet
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Diğer koleksiyonlarımızı da keşfedin
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a
                  href="/deniz-koleksiyonlari"
                  className="group bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">🌊</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                    Deniz Koleksiyonu
                  </h3>
                  <p className="text-green-100">
                    Denizin derinliklerinden ilham alan eserler
                  </p>
                </a>

                <a
                  href="/modern-sanat"
                  className="group bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    Modern Sanat
                  </h3>
                  <p className="text-green-100">
                    Çağdaş sanatın en güzel örnekleri
                  </p>
                </a>

                <a
                  href="/dag-manzaralari"
                  className="group bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">🏔️</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
                    Dağ Manzaraları
                  </h3>
                  <p className="text-green-100">
                    Yükseklerden manzaralar
                  </p>
                </a>
              </div>

              <div className="mt-8">
                <a
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors group"
                >
                  Tüm Koleksiyonları Gör
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
