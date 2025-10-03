'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: 'Sanatın Büyüsü',
      subtitle: 'Modern ve Minimal Tasarımlar',
      description: 'Özel koleksiyonlarımızla evinizi güzelleştirin',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      cta: 'Koleksiyonu Keşfet'
    },
    {
      id: 2,
      title: 'Deniz Temalı Eserler',
      subtitle: 'Balık ve Deniz Koleksiyonu',
      description: 'Denizin derinliklerinden ilham alan özel eserler',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      cta: 'Deniz Koleksiyonu'
    },
    {
      id: 3,
      title: 'Doğa Temalı Sanat',
      subtitle: 'Ağaçlar ve Doğa Koleksiyonu',
      description: 'Doğanın güzelliğini evinize taşıyan eserler',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      cta: 'Doğa Koleksiyonu'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-gray-200">
              {slides[currentSlide].subtitle}
            </p>
            <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto">
              {slides[currentSlide].description}
            </p>
            <div className="flex justify-center">
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105">
                {slides[currentSlide].cta}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white" />
      </div>
    </section>
  )
}

