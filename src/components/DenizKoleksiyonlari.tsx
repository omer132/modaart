'use client'

import { useState, useEffect } from 'react'
import { useProducts } from '@/contexts/ProductContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCart, Heart, ArrowRight, Fish, Waves, Circle } from 'lucide-react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

export function DenizKoleksiyonlari() {
  const { getProductsByCategory } = useProducts()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToCart } = useCart()
  
  // Deniz kategorisindeki ürünleri al
  const denizUrunleri = getProductsByCategory('Deniz Koleksiyonu')

  const { scrollYProgress } = useScroll()
  
  // Scroll progress'e göre arka plan rengini değiştir
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['#AEE4F4', '#3AB0C9', '#1E5F8B', '#052A49']
  )

  // Scroll progress'e göre opacity değiştir
  const surfaceOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const deepOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1])
  const bubbleOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1])

  // Parallax efektler için scroll değerleri
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -200])

  // Mouse takip efekti
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

      {/* Deniz Yüzeyi Efektleri */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-32 z-10"
        style={{ opacity: surfaceOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-transparent">
          <Waves className="w-full h-full text-blue-300 opacity-30" />
        </div>
      </motion.div>

      {/* Derin Deniz Efektleri */}
      <motion.div 
        className="fixed inset-0 z-5"
        style={{ opacity: deepOpacity }}
      >
        <div className="absolute inset-0">
          {/* Ekranı Kaplayan Balık Silüetleri */}
          {/* Sol kenar balıklar */}
          <motion.div 
            className="absolute top-1/6 left-1/12 opacity-20"
            style={{ y: y1 }}
            animate={{ 
              x: [0, 30, -30, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Fish className="w-14 h-14 text-blue-400" />
          </motion.div>

          <motion.div 
            className="absolute top-1/4 left-1/8 opacity-15"
            style={{ y: y2 }}
            animate={{ 
              x: [0, -25, 25, 0],
              rotate: [0, -3, 3, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Fish className="w-10 h-10 text-blue-500" />
          </motion.div>

          <motion.div 
            className="absolute top-1/3 left-1/6 opacity-18"
            style={{ y: y3 }}
            animate={{ 
              x: [0, 40, -40, 0],
              rotate: [0, 8, -8, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Fish className="w-18 h-18 text-blue-600" />
          </motion.div>

          <motion.div 
            className="absolute top-1/2 left-1/4 opacity-12"
            style={{ y: y4 }}
            animate={{ 
              x: [0, -35, 35, 0],
              rotate: [0, -6, 6, 0]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Fish className="w-22 h-22 text-blue-700" />
          </motion.div>

          {/* Merkez balıklar */}
          <motion.div 
            className="absolute top-1/5 left-1/3 opacity-16"
            style={{ y: y1 }}
            animate={{ 
              x: [0, 20, -20, 0],
              rotate: [0, 4, -4, 0]
            }}
            transition={{ 
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Fish className="w-16 h-16 text-blue-400" />
          </motion.div>

          <motion.div 
            className="absolute top-1/3 left-2/5 opacity-14"
            style={{ y: y2 }}
            animate={{ 
              x: [0, -30, 30, 0],
              rotate: [0, -7, 7, 0]
            }}
            transition={{ 
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Fish className="w-12 h-12 text-blue-500" />
          </motion.div>

          <motion.div 
            className="absolute top-1/2 left-1/2 opacity-20"
            style={{ y: y3 }}
            animate={{ 
              x: [0, 45, -45, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Fish className="w-20 h-20 text-blue-600" />
          </motion.div>

          <motion.div 
            className="absolute top-1/4 left-3/5 opacity-13"
            style={{ y: y4 }}
            animate={{ 
              x: [0, -20, 20, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 8.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Fish className="w-14 h-14 text-blue-700" />
          </motion.div>

          {/* Sağ kenar balıklar */}
          <motion.div 
            className="absolute top-1/6 left-2/3 opacity-17"
            style={{ y: y1 }}
            animate={{ 
              x: [0, 25, -25, 0],
              rotate: [0, 6, -6, 0]
            }}
            transition={{ 
              duration: 7.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Fish className="w-15 h-15 text-blue-400" />
          </motion.div>

          <motion.div 
            className="absolute top-1/4 left-3/4 opacity-11"
            style={{ y: y2 }}
            animate={{ 
              x: [0, -40, 40, 0],
              rotate: [0, -9, 9, 0]
            }}
            transition={{ 
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Fish className="w-13 h-13 text-blue-500" />
          </motion.div>

          <motion.div 
            className="absolute top-1/3 left-5/6 opacity-19"
            style={{ y: y3 }}
            animate={{ 
              x: [0, 30, -30, 0],
              rotate: [0, 7, -7, 0]
            }}
            transition={{ 
              duration: 9.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Fish className="w-17 h-17 text-blue-600" />
          </motion.div>

          <motion.div 
            className="absolute top-1/2 right-1/12 opacity-15"
            style={{ y: y4 }}
            animate={{ 
              x: [0, -25, 25, 0],
              rotate: [0, -4, 4, 0]
            }}
            transition={{ 
              duration: 10.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Fish className="w-19 h-19 text-blue-700" />
          </motion.div>

          <motion.div 
            className="absolute top-1/5 right-1/8 opacity-14"
            style={{ y: y1 }}
            animate={{ 
              x: [0, 35, -35, 0],
              rotate: [0, 8, -8, 0]
            }}
            transition={{ 
              duration: 11.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Fish className="w-11 h-11 text-blue-400" />
          </motion.div>

          <motion.div 
            className="absolute top-1/6 right-1/6 opacity-16"
            style={{ y: y2 }}
            animate={{ 
              x: [0, -30, 30, 0],
              rotate: [0, -6, 6, 0]
            }}
            transition={{ 
              duration: 8.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Fish className="w-16 h-16 text-blue-500" />
          </motion.div>
        </div>
      </motion.div>

      {/* Baloncuk Efektleri */}
      <motion.div 
        className="fixed inset-0 z-10"
        style={{ opacity: bubbleOpacity }}
      >
        <div className="absolute inset-0">
          {/* Ekranı Kaplayan Baloncuklar */}
          {/* Sol kenar baloncuklar */}
          <motion.div 
            className="absolute bottom-0 left-1/12"
            animate={{ 
              y: [0, -400, 0],
              x: [0, 15, -15, 0],
              scale: [0.5, 1, 0.3, 0.5]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-4 h-4 text-blue-200 opacity-60" />
          </motion.div>

          <motion.div 
            className="absolute bottom-0 left-1/8"
            animate={{ 
              y: [0, -350, 0],
              x: [0, -10, 10, 0],
              scale: [0.3, 0.8, 0.2, 0.3]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-3 h-3 text-blue-300 opacity-70" />
          </motion.div>

          <motion.div 
            className="absolute bottom-0 left-1/6"
            animate={{ 
              y: [0, -450, 0],
              x: [0, 20, -20, 0],
              scale: [0.4, 1.2, 0.1, 0.4]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-5 h-5 text-blue-100 opacity-50" />
          </motion.div>

          <motion.div 
            className="absolute bottom-0 left-1/4"
            animate={{ 
              y: [0, -380, 0],
              x: [0, -12, 12, 0],
              scale: [0.6, 0.9, 0.2, 0.6]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-6 h-6 text-blue-200 opacity-65" />
          </motion.div>

          {/* Merkez baloncuklar */}
          <motion.div 
            className="absolute bottom-0 left-1/3"
            animate={{ 
              y: [0, -420, 0],
              x: [0, 18, -18, 0],
              scale: [0.7, 1.1, 0.3, 0.7]
            }}
            transition={{ 
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-4 h-4 text-blue-300 opacity-75" />
          </motion.div>

          <motion.div 
            className="absolute bottom-0 left-2/5"
            animate={{ 
              y: [0, -320, 0],
              x: [0, -25, 25, 0],
              scale: [0.3, 0.7, 0.1, 0.3]
            }}
            transition={{ 
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-3 h-3 text-blue-100 opacity-60" />
          </motion.div>

          <motion.div 
            className="absolute bottom-0 left-1/2"
            animate={{ 
              y: [0, -480, 0],
              x: [0, 22, -22, 0],
              scale: [0.8, 1.3, 0.2, 0.8]
            }}
            transition={{ 
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-7 h-7 text-blue-200 opacity-55" />
          </motion.div>

          <motion.div 
            className="absolute bottom-0 left-3/5"
            animate={{ 
              y: [0, -360, 0],
              x: [0, -16, 16, 0],
              scale: [0.5, 0.9, 0.25, 0.5]
            }}
            transition={{ 
              duration: 7.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-5 h-5 text-blue-300 opacity-70" />
          </motion.div>

          {/* Sağ kenar baloncuklar */}
          <motion.div 
            className="absolute bottom-0 left-2/3"
            animate={{ 
              y: [0, -410, 0],
              x: [0, 14, -14, 0],
              scale: [0.6, 1.0, 0.3, 0.6]
            }}
            transition={{ 
              duration: 8.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-4 h-4 text-blue-100 opacity-65" />
          </motion.div>

          <motion.div 
            className="absolute bottom-0 left-3/4"
            animate={{ 
              y: [0, -340, 0],
              x: [0, -20, 20, 0],
              scale: [0.4, 0.8, 0.15, 0.4]
            }}
            transition={{ 
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-3 h-3 text-blue-200 opacity-75" />
          </motion.div>

          <motion.div 
            className="absolute bottom-0 left-5/6"
            animate={{ 
              y: [0, -460, 0],
              x: [0, 26, -26, 0],
              scale: [0.9, 1.4, 0.2, 0.9]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-6 h-6 text-blue-300 opacity-50" />
          </motion.div>

          <motion.div 
            className="absolute bottom-0 right-1/12"
            animate={{ 
              y: [0, -390, 0],
              x: [0, -18, 18, 0],
              scale: [0.7, 1.1, 0.25, 0.7]
            }}
            transition={{ 
              duration: 9.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-5 h-5 text-blue-100 opacity-60" />
          </motion.div>

          <motion.div 
            className="absolute bottom-0 right-1/8"
            animate={{ 
              y: [0, -330, 0],
              x: [0, 12, -12, 0],
              scale: [0.5, 0.85, 0.2, 0.5]
            }}
            transition={{ 
              duration: 6.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-4 h-4 text-blue-200 opacity-70" />
          </motion.div>

          <motion.div 
            className="absolute bottom-0 right-1/6"
            animate={{ 
              y: [0, -440, 0],
              x: [0, -24, 24, 0],
              scale: [0.8, 1.2, 0.3, 0.8]
            }}
            transition={{ 
              duration: 10.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-6 h-6 text-blue-300 opacity-55" />
          </motion.div>

          {/* Ek baloncuklar farklı yüksekliklerden */}
          <motion.div 
            className="absolute bottom-1/4 left-1/5"
            animate={{ 
              y: [0, -200, 0],
              x: [0, 8, -8, 0],
              scale: [0.3, 0.6, 0.1, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-2 h-2 text-blue-200 opacity-80" />
          </motion.div>

          <motion.div 
            className="absolute bottom-1/3 left-3/5"
            animate={{ 
              y: [0, -250, 0],
              x: [0, -15, 15, 0],
              scale: [0.4, 0.7, 0.15, 0.4]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-3 h-3 text-blue-100 opacity-65" />
          </motion.div>

          <motion.div 
            className="absolute bottom-1/2 left-4/5"
            animate={{ 
              y: [0, -180, 0],
              x: [0, 10, -10, 0],
              scale: [0.2, 0.5, 0.1, 0.2]
            }}
            transition={{ 
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-2 h-2 text-blue-300 opacity-75" />
          </motion.div>
        </div>
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
                🌊 Deniz Koleksiyonları
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Denizin derinliklerinden ilham alan sanat eserleri
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
                Deniz Temalı Sanat Eserleri
              </h2>
              <p className="text-lg text-blue-100">
                {denizUrunleri.length} adet özel deniz koleksiyonu
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {denizUrunleri.map((product, index) => (
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
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                        {product.name}
                      </h3>
                      

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">
                            ₺{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-lg text-blue-200 line-through">
                              ₺{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-blue-100">
                          Stok: {product.stock}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product.id)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 group"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {denizUrunleri.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Fish className="w-24 h-24 text-blue-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Henüz Deniz Koleksiyonu Yok
                </h3>
                <p className="text-blue-100 mb-8">
                  Yakında harika deniz temalı sanat eserleri eklenecek!
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
              <p className="text-xl text-blue-100 mb-8">
                Diğer koleksiyonlarımızı da keşfedin
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a
                  href="/products?category=Doğa"
                  className="group bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">🌿</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-200 transition-colors">
                    Doğa Koleksiyonu
                  </h3>
                  <p className="text-blue-100">
                    Doğanın güzelliklerini yansıtan eserler
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
                  <p className="text-blue-100">
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
                  <p className="text-blue-100">
                    Yükseklerden manzaralar
                  </p>
                </a>
              </div>

              <div className="mt-8">
                <a
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors group"
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
