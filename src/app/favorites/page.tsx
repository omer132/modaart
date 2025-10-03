import { FavoritesGrid } from '@/components/FavoritesGrid'

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Favorilerim</h1>
          <p className="text-xl text-gray-600">
            Beğendiğiniz ürünleri burada saklayabilir ve kolayca erişebilirsiniz
          </p>
        </div>

        <FavoritesGrid />
      </div>
    </div>
  )
}






