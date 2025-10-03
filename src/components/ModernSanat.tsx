'use client'

import { useState, useEffect } from 'react'
import { useProducts } from '@/contexts/ProductContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCart, Heart, ArrowRight, Palette, Brush, Shapes, Zap } from 'lucide-react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

export function ModernSanat() {
  const { getProductsByCategory } = useProducts()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToCart } = useCart()
  
  // Modern Sanat kategorisindeki ürünleri al
  const modernSanatUrunleri = getProductsByCategory('Modern Sanat')

  const { scrollYProgress } = useScroll()
  
  // Galeri atmosferi - dinamik arka plan renkleri
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      '#F3E5F5', // Açık mor (galeri girişi)
      '#E1BEE7', // Orta mor (ana salon)
      '#CE93D8', // Canlı mor (heykeltıraş atölyesi)
      '#BA68C8', // Koyu mor (eser sergisi)
      '#AB47BC', // Daha koyu mor (sanatçı köşesi)
      '#9C27B0'  // En koyu mor (özel koleksiyon)
    ]
  )

  // Heykeltıraş siluetleri - parallax
  const sculptor1Y = useTransform(scrollYProgress, [0, 1], [0, -150])
  const sculptor2Y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const sculptor3Y = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  // Heykel parallax efektleri
  const sculpture1Y = useTransform(scrollYProgress, [0, 1], [0, -250])
  const sculpture2Y = useTransform(scrollYProgress, [0, 1], [0, -180])
  const sculpture3Y = useTransform(scrollYProgress, [0, 1], [0, -220])
  
  // Sanat parçacıkları opacity
  const artParticlesOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1])
  
  // Boya sıçrama efekti
  const paintSplashOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 0.6])

  // Mouse takip için interaktif efekt
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
      {/* Dinamik Galeri Arka Planı */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ backgroundColor }}
      />

      {/* Heykeltıraş Siluetleri */}
      <div className="fixed inset-0 z-5">
        {/* Sol Kenar Heykeltıraş */}
        <motion.div 
          className="absolute left-10 top-1/4 opacity-20"
          style={{ y: sculptor1Y }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 2, -2, 0],
              scale: [1, 1.02, 0.98, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="120" height="200" viewBox="0 0 120 200" className="text-purple-600">
              {/* Heykeltıraş Vücut Silueti */}
              <ellipse cx="60" cy="30" rx="15" ry="20" fill="currentColor" opacity="0.6"/>
              <rect x="50" y="45" width="20" height="40" rx="10" fill="currentColor" opacity="0.6"/>
              <rect x="45" y="85" width="30" height="60" rx="15" fill="currentColor" opacity="0.6"/>
              <ellipse cx="40" cy="70" rx="8" ry="25" fill="currentColor" opacity="0.5"/>
              <ellipse cx="80" cy="75" rx="8" ry="25" fill="currentColor" opacity="0.5"/>
              <rect x="55" y="145" width="10" height="40" fill="currentColor" opacity="0.6"/>
              <rect x="45" y="180" width="12" height="8" fill="currentColor" opacity="0.6"/>
              <rect x="63" y="180" width="12" height="8" fill="currentColor" opacity="0.6"/>
              {/* Çekiç ve Keski */}
              <rect x="85" y="60" width="15" height="3" fill="currentColor" opacity="0.8"/>
              <rect x="97" y="58" width="3" height="7" fill="currentColor" opacity="0.8"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Merkez Heykeltıraş */}
        <motion.div 
          className="absolute left-1/3 top-1/3 opacity-15"
          style={{ y: sculptor2Y }}
        >
          <motion.div
            animate={{ 
              rotate: [0, -1, 1, 0],
              x: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="100" height="180" viewBox="0 0 100 180" className="text-purple-700">
              <ellipse cx="50" cy="25" rx="12" ry="16" fill="currentColor" opacity="0.6"/>
              <rect x="42" y="38" width="16" height="35" rx="8" fill="currentColor" opacity="0.6"/>
              <rect x="38" y="73" width="24" height="50" rx="12" fill="currentColor" opacity="0.6"/>
              <ellipse cx="32" cy="60" rx="6" ry="20" fill="currentColor" opacity="0.5"/>
              <ellipse cx="68" cy="65" rx="6" ry="20" fill="currentColor" opacity="0.5"/>
              <rect x="46" y="123" width="8" height="35" fill="currentColor" opacity="0.6"/>
              <rect x="38" y="155" width="10" height="6" fill="currentColor" opacity="0.6"/>
              <rect x="52" y="155" width="10" height="6" fill="currentColor" opacity="0.6"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Sağ Kenar Heykeltıraş */}
        <motion.div 
          className="absolute right-16 top-1/5 opacity-18"
          style={{ y: sculptor3Y }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 3, -3, 0],
              scale: [1, 1.05, 0.95, 1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="140" height="220" viewBox="0 0 140 220" className="text-purple-500">
              <ellipse cx="70" cy="35" rx="18" ry="22" fill="currentColor" opacity="0.6"/>
              <rect x="58" y="52" width="24" height="45" rx="12" fill="currentColor" opacity="0.6"/>
              <rect x="52" y="97" width="36" height="65" rx="18" fill="currentColor" opacity="0.6"/>
              <ellipse cx="44" cy="80" rx="10" ry="28" fill="currentColor" opacity="0.5"/>
              <ellipse cx="96" cy="85" rx="10" ry="28" fill="currentColor" opacity="0.5"/>
              <rect x="65" y="162" width="12" height="45" fill="currentColor" opacity="0.6"/>
              <rect x="55" y="200" width="14" height="8" fill="currentColor" opacity="0.6"/>
              <rect x="71" y="200" width="14" height="8" fill="currentColor" opacity="0.6"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Heykel Siluetleri */}
      <div className="fixed inset-0 z-8">
        {/* Sol Heykel - Soyut Form */}
        <motion.div 
          className="absolute left-1/4 bottom-0 opacity-25"
          style={{ y: sculpture1Y }}
        >
          <motion.div
            animate={{ 
              rotateY: [0, 10, -10, 0],
              scale: [1, 1.03, 0.97, 1]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="80" height="120" viewBox="0 0 80 120" className="text-purple-400">
              <path d="M40,120 Q20,100 30,80 Q40,60 25,40 Q35,20 40,0 Q45,20 55,40 Q40,60 50,80 Q60,100 40,120" 
                    fill="currentColor" opacity="0.7"/>
              <ellipse cx="40" cy="25" rx="8" ry="12" fill="currentColor" opacity="0.5"/>
              <rect x="35" y="110" width="10" height="10" fill="currentColor" opacity="0.8"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Orta Heykel - Geometrik */}
        <motion.div 
          className="absolute left-1/2 bottom-0 opacity-20"
          style={{ y: sculpture2Y }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 1, -1, 0],
              y: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="100" height="150" viewBox="0 0 100 150" className="text-purple-600">
              <polygon points="50,0 20,40 30,80 70,80 80,40" fill="currentColor" opacity="0.6"/>
              <rect x="35" y="80" width="30" height="40" fill="currentColor" opacity="0.7"/>
              <circle cx="50" cy="30" r="15" fill="currentColor" opacity="0.5"/>
              <rect x="40" y="120" width="20" height="30" fill="currentColor" opacity="0.8"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Sağ Heykel - Organik Form */}
        <motion.div 
          className="absolute right-1/4 bottom-0 opacity-22"
          style={{ y: sculpture3Y }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.02, 0.98, 1],
              rotateZ: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="90" height="140" viewBox="0 0 90 140" className="text-purple-500">
              <path d="M45,140 Q25,120 20,100 Q15,80 30,60 Q45,40 35,20 Q45,0 55,20 Q45,40 60,60 Q75,80 70,100 Q65,120 45,140" 
                    fill="currentColor" opacity="0.6"/>
              <ellipse cx="45" cy="30" rx="12" ry="18" fill="currentColor" opacity="0.5"/>
              <ellipse cx="45" cy="70" rx="15" ry="10" fill="currentColor" opacity="0.4"/>
              <rect x="35" y="130" width="20" height="10" fill="currentColor" opacity="0.8"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Sanat Parçacıkları - Floating Elements */}
      <motion.div 
        className="fixed inset-0 z-10 pointer-events-none"
        style={{ opacity: artParticlesOpacity }}
      >
        {Array.from({ length: 25 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -30, 30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 180, 360],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {Math.random() > 0.5 ? (
              <Palette className="text-purple-300 opacity-40" size={8 + Math.random() * 16} />
            ) : (
              <Brush className="text-purple-400 opacity-30" size={6 + Math.random() * 12} />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Boya Sıçramaları */}
      <motion.div 
        className="fixed inset-0 z-7 pointer-events-none"
        style={{ opacity: paintSplashOpacity }}
      >
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0, 1.5, 0.8, 1.2, 0.6],
              opacity: [0, 0.8, 0.4, 0.6, 0.2]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div 
              className={`rounded-full ${
                Math.random() > 0.7 ? 'bg-yellow-400' : 
                Math.random() > 0.4 ? 'bg-pink-400' : 'bg-blue-400'
              } opacity-30`}
              style={{
                width: `${5 + Math.random() * 15}px`,
                height: `${5 + Math.random() * 15}px`
              }}
            />
          </motion.div>
        ))}
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
                🎨 Modern Sanat
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
                Çağdaş sanatçıların atölyesinde yaratılan benzersiz eserler
              </p>
              <motion.div 
                className="flex items-center justify-center gap-4 text-purple-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Palette className="w-6 h-6" />
                <span>Heykeltıraşların ve sanatçıların dünyasına adım atın</span>
                <Shapes className="w-6 h-6" />
              </motion.div>
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
                Modern Sanat Eserleri
              </h2>
              <p className="text-lg text-purple-100">
                {modernSanatUrunleri.length} adet çağdaş sanat koleksiyonu
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {modernSanatUrunleri.map((product, index) => (
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
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                        {product.name}
                      </h3>
                      

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">
                            ₺{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-lg text-purple-200 line-through">
                              ₺{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-purple-100">
                          Stok: {product.stock}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product.id)}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 group"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {modernSanatUrunleri.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Palette className="w-24 h-24 text-purple-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Henüz Modern Sanat Eseri Yok
                </h3>
                <p className="text-purple-100 mb-8">
                  Yakında muhteşem çağdaş sanat eserleri eklenecek!
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
              <p className="text-xl text-purple-100 mb-8">
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
                  <p className="text-purple-100">
                    Denizin derinliklerinden ilham alan eserler
                  </p>
                </a>

                <a
                  href="/doga-koleksiyonu"
                  className="group bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">🌿</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-200 transition-colors">
                    Doğa Koleksiyonu
                  </h3>
                  <p className="text-purple-100">
                    Doğanın güzelliklerini yansıtan eserler
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
                  <p className="text-purple-100">
                    Yükseklerden manzaralar
                  </p>
                </a>
              </div>

              <div className="mt-8">
                <a
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors group"
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
