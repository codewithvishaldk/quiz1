import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Users, Star } from 'lucide-react'

export default function QuizCard({ quiz }) {
  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all hover:-translate-y-1"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      {quiz.image && (
        <div className="relative h-40 bg-gradient-to-br from-primary-400 to-blue-500 overflow-hidden">
          <img
            src={quiz.image}
            alt={quiz.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full mb-3">
          {quiz.category || 'General'}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {quiz.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {quiz.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-col space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
          {quiz.questionCount && (
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>{quiz.questionCount} Questions</span>
            </div>
          )}
          {quiz.timeLimit && (
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{quiz.timeLimit} minutes</span>
            </div>
          )}
          {quiz.attempts && (
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>{quiz.attempts} attempts</span>
            </div>
          )}
        </div>

        {/* Difficulty */}
        <div className="mb-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              quiz.difficulty === 'easy'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : quiz.difficulty === 'medium'
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            }`}
          >
            {quiz.difficulty?.charAt(0).toUpperCase() + quiz.difficulty?.slice(1) || 'Medium'}
          </span>
        </div>

        {/* Start Button */}
        <Link
          to={`/quiz/${quiz.id}`}
          className="w-full block py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg text-center transition-colors"
        >
          Start Quiz
        </Link>
      </div>
    </motion.div>
  )
}
