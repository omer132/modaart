'use client'

import { useState, useEffect } from 'react'
import { useProducts } from '@/contexts/ProductContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCart, Heart, ArrowRight, Mountain, Snowflake, CloudSnow } from 'lucide-react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

export function DagManzaralari() {
  const { getProductsByCategory } = useProducts()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToCart } = useCart()
  
  // Dağ kategorisindeki ürünleri al
  const dagUrunleri = getProductsByCategory('Dağ Manzaraları')

  const { scrollYProgress } = useScroll()
  
  // Dağdan iniş efekti - yükseklikten toprağın altına kadar
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [
      '#E3F2FD', // Kar beyazı (zirve)
      '#BBDEFB', // Açık mavi (kar çizgisi)
      '#90CAF9', // Orta mavi (yüksek dağ)
      '#64B5F6', // Koyu mavi (orman çizgisi)
      '#8D6E63', // Toprak rengi başlangıcı (yeryüzü seviyesi)
      '#6D4C41', // Orta kahverengi (toprak altı)
      '#5D4037', // Koyu kahverengi (derin toprak)
      '#3E2723'  // En koyu kahverengi (yer altı)
    ]
  )

  // Kar yağışı opacity - sadece en üstte yoğun
  const snowOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  
  // Dağ katmanları - parallax etkisi
  const mountainLayer1 = useTransform(scrollYProgress, [0, 1], [0, -200]) // En uzak dağlar
  const mountainLayer2 = useTransform(scrollYProgress, [0, 1], [0, -300]) // Orta dağlar
  const mountainLayer3 = useTransform(scrollYProgress, [0, 1], [0, -400]) // En yakın dağlar
  
  // Sis efekti - vadi yaklaştıkça artır
  const mistOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 0.4])
  
  // Toprak katmanları - yer altına geçiş
  const soilLayer1 = useTransform(scrollYProgress, [0.6, 1], [400, -100]) // Üst toprak
  const soilLayer2 = useTransform(scrollYProgress, [0.7, 1], [500, -50])  // Orta toprak
  const soilLayer3 = useTransform(scrollYProgress, [0.8, 1], [600, 0])    // Derin toprak
  
  // Yer altı partikülleri opacity
  const undergroundOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 0.8])
  
  // Kar taneleri için random pozisyonlar
  const snowflakes = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 2 + Math.random() * 4
  }))



  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dinamik Arka Plan - Dağdan İniş */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ backgroundColor }}
      />

      {/* Kar Yağışı Efekti - Sadece Üst Kısımda */}
      <motion.div 
        className="fixed inset-0 z-10 pointer-events-none"
        style={{ opacity: snowOpacity }}
      >
        {snowflakes.map((flake) => (
          <motion.div
            key={flake.id}
            className="absolute"
            style={{
              left: `${flake.x}%`,
              top: '-10px'
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, -30, 30, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: flake.duration,
              delay: flake.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Snowflake 
              className="text-white" 
              style={{ 
                width: `${flake.size}px`, 
                height: `${flake.size}px`,
                opacity: 0.7
              }} 
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Dağ Katmanları - Parallax Efekti */}
      <div className="fixed inset-0 z-5">
        {/* En Uzak Dağlar - Siluet */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: mountainLayer1 }}
        >
          <div className="absolute bottom-0 w-full h-96">
            <svg
              viewBox="0 0 1200 400"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,400 L200,100 L400,150 L600,50 L800,120 L1000,80 L1200,140 L1200,400 Z"
                fill="#E8EAF6"
                opacity="0.3"
              />
            </svg>
          </div>
        </motion.div>

        {/* Orta Dağlar */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: mountainLayer2 }}
        >
          <div className="absolute bottom-0 w-full h-80">
            <svg
              viewBox="0 0 1200 350"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,350 L150,120 L350,80 L550,40 L750,100 L950,60 L1200,110 L1200,350 Z"
                fill="#C5CAE9"
                opacity="0.5"
              />
            </svg>
          </div>
        </motion.div>

        {/* En Yakın Dağlar */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: mountainLayer3 }}
        >
          <div className="absolute bottom-0 w-full h-64">
            <svg
              viewBox="0 0 1200 280"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,280 L100,140 L300,100 L500,60 L700,120 L900,80 L1200,100 L1200,280 Z"
                fill="#9FA8DA"
                opacity="0.7"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Toprak Katmanları - Yer Altına Geçiş */}
      <div className="fixed inset-0 z-10">
        {/* Üst Toprak Katmanı */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: soilLayer1 }}
        >
          <div className="absolute bottom-0 w-full h-96">
            <svg
              viewBox="0 0 1200 400"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,400 L1200,400 L1200,300 Q600,280 0,300 Z"
                fill="#8D6E63"
                opacity="0.6"
              />
              {/* Toprak dokusu için rastgele noktalar */}
              <circle cx="100" cy="320" r="2" fill="#6D4C41" opacity="0.7"/>
              <circle cx="200" cy="340" r="1.5" fill="#5D4037" opacity="0.8"/>
              <circle cx="350" cy="315" r="2.5" fill="#6D4C41" opacity="0.6"/>
              <circle cx="500" cy="335" r="1" fill="#3E2723" opacity="0.9"/>
              <circle cx="650" cy="325" r="2" fill="#5D4037" opacity="0.7"/>
              <circle cx="800" cy="345" r="1.5" fill="#6D4C41" opacity="0.8"/>
              <circle cx="950" cy="310" r="2" fill="#3E2723" opacity="0.6"/>
              <circle cx="1100" cy="330" r="1.5" fill="#5D4037" opacity="0.7"/>
            </svg>
          </div>
        </motion.div>

        {/* Orta Toprak Katmanı */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: soilLayer2 }}
        >
          <div className="absolute bottom-0 w-full h-80">
            <svg
              viewBox="0 0 1200 350"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,350 L1200,350 L1200,200 Q600,180 0,200 Z"
                fill="#6D4C41"
                opacity="0.7"
              />
              {/* Daha derin toprak partikülleri */}
              <circle cx="150" cy="220" r="3" fill="#5D4037" opacity="0.8"/>
              <circle cx="300" cy="240" r="2" fill="#3E2723" opacity="0.9"/>
              <circle cx="450" cy="215" r="2.5" fill="#4E342E" opacity="0.7"/>
              <circle cx="600" cy="235" r="1.5" fill="#3E2723" opacity="0.8"/>
              <circle cx="750" cy="225" r="3" fill="#5D4037" opacity="0.6"/>
              <circle cx="900" cy="245" r="2" fill="#4E342E" opacity="0.9"/>
              <circle cx="1050" cy="210" r="2.5" fill="#3E2723" opacity="0.7"/>
            </svg>
          </div>
        </motion.div>

        {/* Derin Toprak Katmanı */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: soilLayer3 }}
        >
          <div className="absolute bottom-0 w-full h-64">
            <svg
              viewBox="0 0 1200 280"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,280 L1200,280 L1200,100 Q600,80 0,100 Z"
                fill="#5D4037"
                opacity="0.8"
              />
              {/* En derin toprak mineralleri */}
              <circle cx="120" cy="120" r="4" fill="#3E2723" opacity="0.9"/>
              <circle cx="280" cy="140" r="3" fill="#2E1B11" opacity="0.8"/>
              <circle cx="440" cy="115" r="3.5" fill="#3E2723" opacity="0.7"/>
              <circle cx="600" cy="135" r="2.5" fill="#2E1B11" opacity="0.9"/>
              <circle cx="760" cy="125" r="4" fill="#3E2723" opacity="0.6"/>
              <circle cx="920" cy="145" r="3" fill="#2E1B11" opacity="0.8"/>
              <circle cx="1080" cy="110" r="3.5" fill="#3E2723" opacity="0.7"/>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Yer Altı Partikülleri - Floating Effect */}
      <motion.div 
        className="fixed inset-0 z-12 pointer-events-none"
        style={{ opacity: undergroundOpacity }}
      >
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${60 + Math.random() * 40}%`
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div 
              className="rounded-full bg-amber-800 opacity-60"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Sis Efekti - Vadi Yaklaştıkça */}
      <motion.div 
        className="fixed inset-0 z-15"
        style={{ opacity: mistOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
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
                🏔️ Dağ Manzaraları
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Yüksek zirvelerden toprağın derinliklerine uzanan büyüleyici yolculuk
              </p>
              <motion.div 
                className="flex items-center justify-center gap-4 text-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <CloudSnow className="w-6 h-6" />
                <span>Kar yağışından yeraltına doğru keşfe çıkın</span>
                <Mountain className="w-6 h-6" />
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
                Dağ Temalı Sanat Eserleri
              </h2>
              <p className="text-lg text-blue-100">
                {dagUrunleri.length} adet özel dağ manzarası koleksiyonu
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {dagUrunleri.map((product, index) => (
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

            {dagUrunleri.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Mountain className="w-24 h-24 text-blue-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Henüz Dağ Manzarası Yok
                </h3>
                <p className="text-blue-100 mb-8">
                  Yakında muhteşem dağ manzaralı sanat eserleri eklenecek!
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
                  href="/deniz-koleksiyonlari"
                  className="group bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">🌊</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                    Deniz Koleksiyonu
                  </h3>
                  <p className="text-blue-100">
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
                  <p className="text-blue-100">
                    Doğanın güzelliklerini yansıtan eserler
                  </p>
                </a>

                <a
                  href="/products?category=Modern Sanat"
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
