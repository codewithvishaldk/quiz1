import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, BookOpen, Users, TrendingUp } from 'lucide-react'
import { analyticsService } from '../../services/db'
import AdminLayout from '../components/AdminLayout'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const data = await analyticsService.getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    {
      icon: BookOpen,
      label: 'Total Quizzes',
      value: stats?.totalQuizzes || 0,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: BarChart3,
      label: 'Total Questions',
      value: stats?.totalQuestions || 0,
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Users,
      label: 'Total Attempts',
      value: stats?.totalAttempts || 0,
      color: 'from-green-500 to-green-600',
    },
    {
      icon: TrendingUp,
      label: 'Average Score',
      value: `${stats?.averageScore || 0}%`,
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome to Quiz Master Admin Panel
          </p>
        </div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${card.color}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {card.label}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {loading ? '...' : card.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color} text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Quiz Performance
            </h2>
            <div className="h-64 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">
                Chart will be displayed here
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="h-64 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">
                Recent activities will be displayed here
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  )
}
