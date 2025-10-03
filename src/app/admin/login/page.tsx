import { AdminLoginForm } from '@/components/AdminLoginForm'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            ModaArt Admin
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Yönetici paneline giriş yapın
          </p>
        </div>
        
        <AdminLoginForm />
      </div>
    </div>
  )
}






