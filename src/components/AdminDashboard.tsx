'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  LogOut,
  Tag
} from 'lucide-react'
import { ProductModal } from './ProductModal'
import { DeleteConfirmationModal } from './DeleteConfirmationModal'
import { CouponModal } from './CouponModal'
import { useProducts } from '@/contexts/ProductContext'
import { useCoupons } from '@/contexts/CouponContext'

// Gerçek istatistikler hesaplama fonksiyonu
const calculateStats = (products: any[]) => {
  const totalProducts = products.length
  const activeProducts = products.filter(p => p.status === 'active').length
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  const lowStockProducts = products.filter(p => p.stock < 5).length
  
  return {
    totalProducts,
    activeProducts,
    totalValue,
    lowStockProducts
  }
}

export function AdminDashboard() {
  const router = useRouter()
  const { products, addProduct, updateProduct, deleteProduct: contextDeleteProduct } = useProducts()
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useCoupons()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [customers, setCustomers] = useState<any[]>([])
  const [searchCustomer, setSearchCustomer] = useState('')
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState(null)
  const [searchCoupon, setSearchCoupon] = useState('')

  const handleLogout = () => {
    localStorage.removeItem('adminSession')
    router.push('/admin/login')
  }

  // Müşterileri yükle
  const loadCustomers = () => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      setCustomers(registeredUsers)
    } catch (error) {
      console.error('Müşteriler yüklenirken hata:', error)
      setCustomers([])
    }
  }

  // Component mount olduğunda müşterileri yükle
  useEffect(() => {
    loadCustomers()
  }, [])

  // Admin için ürünleri dönüştür
  const adminProducts = products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    category: product.category,
    stock: product.stock,
    status: product.status,
    createdAt: product.createdAt,
    image: product.images[0]
  }))

  const filteredProducts = adminProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchCustomer.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchCustomer.toLowerCase())
    return matchesSearch
  })

  const handleDeleteClick = (product: any) => {
    setProductToDelete(product)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!productToDelete) return
    
    setIsDeleting(true)
    
    try {
      // Simulated API call - gerçek uygulamada API endpoint'e istek atılacak
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      contextDeleteProduct(productToDelete.id)
      setIsDeleteModalOpen(false)
      setProductToDelete(null)
    } catch (error) {
      console.error('Silme hatası:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const cancelDelete = () => {
    setIsDeleteModalOpen(false)
    setProductToDelete(null)
  }

  // Gerçek istatistikleri hesapla
  const stats = calculateStats(products)
  const statsData = [
    { title: 'Toplam Ürün', value: stats.totalProducts.toString(), icon: Package, change: '+12%', changeType: 'positive' },
    { title: 'Aktif Ürün', value: stats.activeProducts.toString(), icon: Eye, change: '+8%', changeType: 'positive' },
    { title: 'Toplam Müşteri', value: customers.length.toString(), icon: Users, change: '+15%', changeType: 'positive' }
  ]

  const toggleProductStatus = (id: number) => {
    const product = products.find(p => p.id === id)
    if (product) {
      updateProduct(id, {
        status: product.status === 'active' ? 'inactive' : 'active'
      })
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsProductModalOpen(true)
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setIsProductModalOpen(true)
  }

  const handleSaveProduct = (productData: any) => {
    if (editingProduct) {
      // Update existing product
      updateProduct(editingProduct.id, productData)
    } else {
      // Add new product
      addProduct(productData)
    }
  }

  const handleCloseModal = () => {
    setIsProductModalOpen(false)
    setEditingProduct(null)
  }

  // Coupon management functions
  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchCoupon.toLowerCase())
    return matchesSearch
  })

  const handleAddCoupon = () => {
    setEditingCoupon(null)
    setIsCouponModalOpen(true)
  }

  const handleEditCoupon = (coupon: any) => {
    setEditingCoupon(coupon)
    setIsCouponModalOpen(true)
  }

  const handleSaveCoupon = (couponData: any) => {
    if (editingCoupon) {
      updateCoupon(editingCoupon.id, couponData)
    } else {
      addCoupon(couponData)
    }
  }

  const handleCloseCouponModal = () => {
    setIsCouponModalOpen(false)
    setEditingCoupon(null)
  }

  const handleDeleteCoupon = (couponId: number) => {
    if (window.confirm('Bu kuponu silmek istediğinizden emin misiniz?')) {
      deleteCoupon(couponId)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">ModaArt Admin</h1>
          <p className="text-gray-600 text-sm">Yönetim Paneli</p>
        </div>
        
        <div className="px-6 pb-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Çıkış Yap
          </button>
        </div>
        
        <nav className="mt-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'Ürünler', icon: Package },
            { id: 'orders', label: 'Siparişler', icon: ShoppingCart },
            { id: 'customers', label: 'Müşteriler', icon: Users },
            { id: 'coupons', label: 'Kuponlar', icon: Tag }
          ].map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'products' && 'Ürün Yönetimi'}
              {activeTab === 'orders' && 'Sipariş Yönetimi'}
              {activeTab === 'customers' && 'Müşteri Yönetimi'}
              {activeTab === 'coupons' && 'Kupon Yönetimi'}
            </h2>
            <p className="text-gray-600">
              {activeTab === 'dashboard' && 'Genel bakış ve istatistikler'}
              {activeTab === 'products' && 'Ürünleri ekleyin, düzenleyin ve yönetin'}
              {activeTab === 'orders' && 'Siparişleri görüntüleyin ve yönetin'}
              {activeTab === 'customers' && 'Müşteri bilgilerini yönetin'}
              {activeTab === 'coupons' && 'İndirim kuponları oluşturun ve yönetin'}
            </p>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {statsData.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        </div>
                        <div className="p-3 bg-primary-100 rounded-lg">
                          <IconComponent className="w-6 h-6 text-primary-600" />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center">
                        <span className={`text-sm font-medium ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-gray-600 text-sm ml-2">geçen aya göre</span>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Products Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Ürün ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Pasif</option>
                  </select>
                </div>
                <button 
                  onClick={handleAddProduct}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Yeni Ürün Ekle
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ürün
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kategori
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fiyat
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stok
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Öne Çıkarma
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          İşlemler
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg mr-4"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {product.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              ₺{product.price.toLocaleString()}
                            </div>
                            {product.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                ₺{product.originalPrice.toLocaleString()}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.stock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => updateProduct(product.id, { isFeatured: !(products.find(p=>p.id===product.id)?.isFeatured) })}
                              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                (products.find(p=>p.id===product.id)?.isFeatured)
                                  ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                  : 'bg-gray-100 text-gray-700 border-gray-200'
                              }`}
                            >
                              {(products.find(p=>p.id===product.id)?.isFeatured) ? 'Çıkarma' : 'Öne çıkar'}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button className="text-primary-600 hover:text-primary-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleEditProduct(product)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => toggleProductStatus(product.id)}
                                className={`${
                                  product.status === 'active'
                                    ? 'text-yellow-600 hover:text-yellow-900'
                                    : 'text-green-600 hover:text-green-900'
                                }`}
                              >
                                {product.status === 'active' ? 'Pasifleştir' : 'Aktifleştir'}
                              </button>
                               <button
                                 onClick={() => handleDeleteClick(product)}
                                 className="text-red-600 hover:text-red-900"
                               >
                                 <Trash2 className="w-4 h-4" />
                               </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              {/* Customers Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Müşteri ara..."
                      value={searchCustomer}
                      onChange={(e) => setSearchCustomer(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Toplam {customers.length} müşteri
                </div>
              </div>

              {/* Customers Table */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Müşteri
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          E-posta
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kayıt Tarihi
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Durum
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((customer) => (
                          <tr key={customer.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={customer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=random`}
                                  alt={customer.name}
                                  className="w-10 h-10 rounded-full mr-4"
                                />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    ID: {customer.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {customer.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(customer.createdAt).toLocaleDateString('tr-TR')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                Aktif
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                            {searchCustomer ? 'Arama kriterlerine uygun müşteri bulunamadı' : 'Henüz kayıtlı müşteri bulunmuyor'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Coupons Tab */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              {/* Coupons Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Kupon ara..."
                      value={searchCoupon}
                      onChange={(e) => setSearchCoupon(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button 
                  onClick={handleAddCoupon}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Yeni Kupon Oluştur
                </button>
              </div>

              {/* Coupons Table */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kupon Kodu
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          İndirim
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kullanım
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Durum
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          İşlemler
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCoupons.length > 0 ? (
                        filteredCoupons.map((coupon) => (
                          <tr key={coupon.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="p-2 bg-primary-100 rounded-lg mr-3">
                                  <Tag className="w-4 h-4 text-primary-600" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {coupon.code}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {new Date(coupon.createdAt).toLocaleDateString('tr-TR')}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-lg font-bold text-green-600">
                                %{coupon.discount}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {coupon.usageCount}{coupon.maxUsage ? ` / ${coupon.maxUsage}` : ' / ∞'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                coupon.isActive
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {coupon.isActive ? 'Aktif' : 'Pasif'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => handleEditCoupon(coupon)}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="Düzenle"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCoupon(coupon.id)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Sil"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                            {searchCoupon ? 'Arama kriterlerine uygun kupon bulunamadı' : 'Henüz kupon oluşturulmamış'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab Placeholder */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Sipariş Yönetimi
              </h3>
              <p className="text-gray-600 mb-8">
                Bu bölüm yakında eklenecek. Şu anda ürün yönetimi aktif.
              </p>
              <button
                onClick={() => setActiveTab('products')}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Ürün Yönetimine Git
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={handleCloseModal}
        product={editingProduct}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        productName={productToDelete?.name || ''}
        isLoading={isDeleting}
      />

      {/* Coupon Modal */}
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={handleCloseCouponModal}
        coupon={editingCoupon}
        onSave={handleSaveCoupon}
      />
    </div>
  )
}
