import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LayoutGrid, BookOpen, ListChecks, Grid3x3, BarChart3, Settings } from 'lucide-react'

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { path: '/admin/quizzes', label: 'Quizzes', icon: BookOpen },
    { path: '/admin/questions', label: 'Questions', icon: ListChecks },
    { path: '/admin/categories', label: 'Categories', icon: Grid3x3 },
    { path: '/admin/attempts', label: 'Attempts', icon: BarChart3 },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-30 h-screen transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 md:w-20'
        } bg-slate-900 text-white`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-slate-700">
            <Link to="/admin/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">A</span>
              </div>
              {sidebarOpen && (
                <span className="font-bold text-lg hidden md:inline">Admin</span>
              )}
            </Link>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-600 border-l-4 border-primary-400'
                      : 'hover:bg-slate-800'
                  }`}
                  title={!sidebarOpen ? item.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="hidden md:inline">{item.label}</span>}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-gray-900 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
            )}
          </button>

          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Welcome back, Admin
            </p>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        />
      )}
    </div>
  )
}
