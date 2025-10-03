'use client'

import { useEffect, useRef, useState } from 'react'
import { Fish, Waves, Anchor, TreePine, Leaf, Mountain, Snowflake, Palette, Brush } from 'lucide-react'

export function ParallaxSection() {
  const [scrollY, setScrollY] = useState(0)

  const sections = [
    {
      id: 'deniz',
      title: 'Denizin Derinliklerine Dalın',
      description: 'Balık ve deniz temalı özel koleksiyonumuzla evinizi güzelleştirin',
      icon: Waves,
      ctaText: 'Deniz Koleksiyonu',
      href: '/deniz-koleksiyonlari',
      bgGradient: 'from-cyan-50 to-blue-100',
      bgLayer: 'from-blue-200 via-cyan-100 to-blue-200',
      elementColor: 'text-blue-500'
    },
    {
      id: 'doga',
      title: 'Doğanın Sessizliğine Dalın',
      description: 'Ağaçlar ve doğa temalı özel koleksiyonumuzla huzuru evinize taşıyın',
      icon: TreePine,
      ctaText: 'Doğa Koleksiyonu',
      href: '/doga-koleksiyonu',
      bgGradient: 'from-green-50 to-emerald-100',
      bgLayer: 'from-green-200 via-emerald-100 to-green-200',
      elementColor: 'text-green-600'
    },
    {
      id: 'dag',
      title: 'Dağların Zirvesine Çıkın',
      description: 'Dağ manzaraları ve zirveler ile evinizi yüksek enerjiye taşıyın',
      icon: Mountain,
      ctaText: 'Dağ Manzaraları',
      href: '/dag-manzaralari',
      bgGradient: 'from-gray-50 to-slate-100',
      bgLayer: 'from-gray-200 via-slate-100 to-gray-200',
      elementColor: 'text-gray-600'
    },
    {
      id: 'modern',
      title: 'Sanatın Geleceğine Adım Atın',
      description: 'Modern sanat ve çağdaş eserlerle evinizi geleceğe taşıyın',
      icon: Palette,
      ctaText: 'Modern Sanat',
      href: '/modern-sanat',
      bgGradient: 'from-purple-50 to-pink-100',
      bgLayer: 'from-purple-200 via-pink-100 to-purple-200',
      elementColor: 'text-purple-600'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setScrollY(scrollTop)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setScrollY(scrollTop)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderSection = (section: any, index: number) => {
    const parallaxStyle = {
      transform: `translateY(${scrollY * (0.3 + index * 0.1)}px)`,
    }

    const elementStyle = {
      transform: `translateY(${scrollY * (0.2 + index * 0.05)}px) translateX(${Math.sin((scrollY + index * 1000) * 0.01) * 20}px)`,
    }

    const renderBackgroundElements = () => {
      switch (section.id) {
        case 'deniz':
          return (
            <>
              <div className={`absolute top-1/2 left-1/4 ${section.elementColor} opacity-80`} style={elementStyle}>
                <Fish className="w-8 h-8" />
              </div>
              <div className="absolute top-1/3 right-1/4 text-cyan-400 opacity-70" style={elementStyle}>
                <Fish className="w-6 h-6" />
              </div>
              <div className="absolute bottom-20 left-10 w-2 h-32 bg-green-400 rounded-full transform rotate-12 opacity-60" />
              <div className="absolute bottom-16 left-20 w-2 h-24 bg-green-500 rounded-full transform -rotate-6 opacity-70" />
            </>
          )
        case 'doga':
          return (
            <>
              <div className={`absolute top-1/3 left-1/4 ${section.elementColor} opacity-80`} style={elementStyle}>
                <TreePine className="w-12 h-12" />
              </div>
              <div className="absolute top-1/2 right-1/4 text-emerald-500 opacity-70" style={elementStyle}>
                <TreePine className="w-8 h-8" />
              </div>
              <div className="absolute top-2/3 left-1/3 text-green-400 opacity-60" style={elementStyle}>
                <Leaf className="w-6 h-6" />
              </div>
            </>
          )
        case 'dag':
          return (
            <>
              <div className={`absolute top-1/4 left-1/4 ${section.elementColor} opacity-80`} style={elementStyle}>
                <Mountain className="w-10 h-10" />
              </div>
              <div className="absolute top-1/3 right-1/4 text-slate-500 opacity-70" style={elementStyle}>
                <Mountain className="w-8 h-8" />
              </div>
              <div className="absolute top-1/2 left-1/3 text-white opacity-60" style={elementStyle}>
                <Snowflake className="w-6 h-6" />
              </div>
            </>
          )
        case 'modern':
          return (
            <>
              <div className={`absolute top-1/3 left-1/4 ${section.elementColor} opacity-80`} style={elementStyle}>
                <Palette className="w-10 h-10" />
              </div>
              <div className="absolute top-1/2 right-1/4 text-pink-500 opacity-70" style={elementStyle}>
                <Brush className="w-8 h-8" />
              </div>
              <div className="absolute top-2/3 left-1/3 w-4 h-4 bg-purple-400 rounded-full opacity-60" />
              <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-pink-400 rounded-full opacity-50" />
            </>
          )
        default:
          return null
      }
    }

    return (
      <section 
        key={section.id}
        className={`relative h-screen overflow-hidden bg-gradient-to-b ${section.bgGradient}`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-b ${section.bgLayer}`} />
          
          {/* Clouds/atmosphere */}
          <div className="absolute top-20 left-10 w-32 h-16 bg-white/30 rounded-full blur-sm" />
          <div className="absolute top-32 right-20 w-24 h-12 bg-white/40 rounded-full blur-sm" />
          <div className="absolute top-16 right-1/3 w-20 h-10 bg-white/25 rounded-full blur-sm" />
          
          {/* Sun */}
          <div className="absolute top-10 right-10 w-16 h-16 bg-yellow-300 rounded-full shadow-lg" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0" style={parallaxStyle}>
          {renderBackgroundElements()}
          
          {/* Floating particles */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <div className="animate-fade-in">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                  <section.icon className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                {section.title}
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-md">
                {section.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={section.href}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 border border-white/30"
                >
                  {section.ctaText}
                </a>
                <button className="border-2 border-white/50 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                  <Anchor className="w-4 h-4" />
                  Keşfet
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Sadece son section'da değil */}
        {index === sections.length - 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex flex-col items-center text-white/70">
              <span className="text-sm mb-2">Devam et</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </section>
    )
  }

  return (
    <div>
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  )
}

