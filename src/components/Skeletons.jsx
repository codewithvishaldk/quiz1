import { motion } from 'framer-motion'

export const LoadingSkeletons = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

export const QuestionSkeleton = () => {
  return (
    <div className="space-y-6">
      <motion.div
        className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="h-12 bg-gray-200 dark:bg-gray-700 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  )
}
