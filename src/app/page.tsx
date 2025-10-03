import { HeroSection } from '@/components/HeroSection'
import { CategoryCards } from '@/components/CategoryCards'
import { ParallaxSection } from '@/components/ParallaxSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryCards />
      <ParallaxSection />
    </div>
  )
}
