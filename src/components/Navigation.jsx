import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Moon, Sun, LogOut, Settings } from 'lucide-react'
import { useAuthStore, useUIStore } from '../context/store'
import { auth } from '../services/firebase'
import { signOut } from 'firebase/auth'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, isAdmin } = useAuthStore()
  const { isDark, toggleTheme } = useUIStore()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      logout()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-slate-900 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="font-bold text-xl text-primary-600 dark:text-primary-400 hidden sm:inline">
              Quiz Master
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/quizzes"
              className={`font-medium transition-colors ${
                isActive('/quizzes')
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              Quizzes
            </Link>

            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className={`font-medium transition-colors ${
                  location.pathname.startsWith('/admin')
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                Admin
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            {/* Auth Menu */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-gray-200 dark:border-slate-700"
          >
            <Link
              to="/quizzes"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Quizzes
            </Link>

            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Admin Panel
              </Link>
            )}

            <button
              onClick={() => {
                toggleTheme()
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg flex items-center space-x-2"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            {user ? (
              <button
                onClick={() => {
                  handleLogout()
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/admin/login"
                className="block px-4 py-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
