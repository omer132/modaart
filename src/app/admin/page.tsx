import { AdminDashboard } from '@/components/AdminDashboard'
import { AdminProtection } from '@/components/AdminProtection'

export default function AdminPage() {
  return (
    <AdminProtection>
      <div className="min-h-screen bg-gray-50">
        <AdminDashboard />
      </div>
    </AdminProtection>
  )
}
