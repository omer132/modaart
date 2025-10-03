'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Fish, TreePine, Palette, Mountain } from 'lucide-react'

const categories = [
  {
    id: 1,
    name: 'Deniz Koleksiyonu',
    description: 'Balık ve deniz temalı özel eserler',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    icon: Fish,
    color: 'from-blue-400 to-cyan-500',
    href: '/deniz-koleksiyonlari'
  },
  {
    id: 2,
    name: 'Doğa Koleksiyonu',
    description: 'Ağaçlar ve doğa temalı eserler',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    icon: TreePine,
    color: 'from-green-400 to-emerald-500',
    href: '/doga-koleksiyonu'
  },
  {
    id: 3,
    name: 'Modern Sanat',
    description: 'Çağdaş ve modern sanat eserleri',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    icon: Palette,
    color: 'from-purple-400 to-pink-500',
    href: '/modern-sanat'
  },
  {
    id: 4,
    name: 'Dağ Manzaraları',
    description: 'Dağ ve manzara temalı eserler',
    image: 'https://images.unsplash.com/photo-1506905925346-14b5e4d4b4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    icon: Mountain,
    color: 'from-orange-400 to-red-500',
    href: '/dag-manzaralari'
  }
]

export function CategoryCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kategorilerimizi Keşfedin
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Her zevke uygun özel koleksiyonlarımızla evinizi güzelleştirin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link
                key={category.id}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Icon */}
                  <div className={`absolute top-4 right-4 p-3 rounded-full bg-gradient-to-r ${category.color} shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                    <span className="text-sm">Keşfet</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-200 transition-colors duration-300`} />
              </Link>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-300 transform hover:scale-105"
          >
            Tüm Kategorileri Gör
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
