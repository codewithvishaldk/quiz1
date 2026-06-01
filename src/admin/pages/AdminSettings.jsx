import AdminLayout from '../components/AdminLayout'

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Settings
        </h1>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Settings management coming soon...
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}
