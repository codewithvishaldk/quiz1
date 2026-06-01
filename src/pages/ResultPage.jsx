import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { attemptService } from '../services/db'
import { getGrade, getGradeColor, formatTime } from '../utils/grading'
import { Share2, RotateCcw, Home, Award, TrendingUp } from 'lucide-react'

export default function ResultPage() {
  const { attemptId } = useParams()
  const navigate = useNavigate()
  const [attempt, setAttempt] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        // In a real app, you'd fetch the attempt by ID
        // For now, we'll use the data from store
        setLoading(false)
      } catch (error) {
        console.error('Error fetching attempt:', error)
        setLoading(false)
      }
    }
    fetchAttempt()
  }, [attemptId])

  const mockAttempt = {
    totalQuestions: 10,
    correctAnswers: 8,
    score: 80,
    timeSpent: 245,
  }

  const attempt_data = attempt || mockAttempt
  const percentage = Math.round((attempt_data.correctAnswers / attempt_data.totalQuestions) * 100)
  const grade = getGrade(percentage)

  const handleShareResult = () => {
    const text = `I scored ${percentage}% (${grade}) on the quiz! 🎉`
    const url = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz Result',
        text: text,
        url: url,
      })
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(`${text}\n${url}`)
      alert('Result copied to clipboard!')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading result...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg"
            animate={{ rotate: 360 }}
            transition={{ duration: 2 }}
          >
            <Award className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Quiz Completed!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Great job finishing the quiz
          </p>
        </motion.div>

        {/* Score Display */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Grade Card */}
          <motion.div
            variants={itemVariants}
            className={`rounded-lg p-8 text-center shadow-lg ${getGradeColor(grade)}`}
          >
            <p className="text-sm font-semibold mb-2 opacity-75">Your Grade</p>
            <p className="text-6xl font-bold">{grade}</p>
          </motion.div>

          {/* Score Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center shadow-lg"
          >
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Your Score
            </p>
            <p className="text-6xl font-bold text-primary-600 dark:text-primary-400">
              {percentage}%
            </p>
          </motion.div>
        </motion.div>

        {/* Detailed Stats */}
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quiz Results
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Total Questions
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {attempt_data.totalQuestions}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Correct Answers
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {attempt_data.correctAnswers}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Wrong Answers
              </p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {attempt_data.totalQuestions - attempt_data.correctAnswers}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Time Taken
              </p>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {formatTime(attempt_data.timeSpent)}
              </p>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Accuracy
              </span>
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                {percentage}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-600 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Performance Feedback */}
        <motion.div
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Performance Analysis
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-400">
                {percentage >= 90
                  ? 'Excellent! You have a great understanding of the material.'
                  : percentage >= 80
                    ? 'Great! You have a solid understanding of the topic.'
                    : percentage >= 70
                      ? 'Good effort! You understand most of the concepts.'
                      : 'Keep practicing! Review the material and try again.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            variants={itemVariants}
            onClick={() => navigate('/quizzes')}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>

          <motion.button
            variants={itemVariants}
            onClick={() => navigate(-1)}
            className="flex items-center justify-center space-x-2 px-6 py-4 border-2 border-primary-600 text-primary-600 dark:text-primary-400 font-semibold rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Retry Quiz</span>
          </motion.button>

          <motion.button
            variants={itemVariants}
            onClick={handleShareResult}
            className="flex items-center justify-center space-x-2 px-6 py-4 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
