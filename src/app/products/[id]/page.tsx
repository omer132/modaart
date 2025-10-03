import { ProductDetail } from '@/components/ProductDetail'
import { RelatedProducts } from '@/components/RelatedProducts'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetail productId={params.id} />
        <RelatedProducts />
      </div>
    </div>
  )
}

