import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Users, Zap, Award } from 'lucide-react'
import { useEffect, useState } from 'react'
import { analyticsService } from '../services/db'

export default function Home() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await analyticsService.getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    fetchStats()
  }, [])

  const features = [
    {
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Get immediate feedback on your answers with detailed explanations',
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor your performance with detailed analytics and progress reports',
    },
    {
      icon: Users,
      title: 'Multiple Categories',
      description: 'Access quizzes across various topics and difficulty levels',
    },
    {
      icon: Award,
      title: 'Achievements',
      description: 'Earn badges and certificates as you complete quizzes',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900/50 dark:to-slate-800/50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Master Your Knowledge with{' '}
              <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                Quiz Master
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Create, take, and analyze interactive quizzes with real-time feedback, beautiful animations, and comprehensive analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quizzes"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:-translate-y-1"
              >
                Start Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 text-primary-600 dark:text-primary-400 font-semibold rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
              >
                Admin Panel
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          {stats && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { label: 'Quizzes', value: stats.totalQuizzes },
                { label: 'Questions', value: stats.totalQuestions },
                { label: 'Attempts', value: stats.totalAttempts },
                { label: 'Avg Score', value: `${stats.averageScore}%` },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Quiz Master?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Everything you need for an amazing quiz experience
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all"
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-900 dark:to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of learners taking interactive quizzes today
            </p>
            <Link
              to="/quizzes"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all"
            >
              Explore Quizzes
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
