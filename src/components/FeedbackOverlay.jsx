import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import { Check, X } from 'lucide-react'

export const FeedbackOverlay = ({ isCorrect, selectedAnswer, correctAnswer, onAnimationEnd }) => {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isCorrect) {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        onAnimationEnd()
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        onAnimationEnd()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isCorrect, onAnimationEnd])

  return (
    <>
      {showConfetti && <Confetti />}
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`rounded-lg p-12 text-center max-w-sm ${
            isCorrect ? 'bg-green-500' : 'bg-red-500'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            {isCorrect ? (
              <Check className="w-16 h-16 text-white" />
            ) : (
              <X className="w-16 h-16 text-white" />
            )}
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isCorrect ? 'Correct!' : 'Wrong!'}
          </h2>
          <p className="text-white text-lg">
            {isCorrect
              ? 'Great job! 🎉'
              : `The correct answer is: ${correctAnswer}`}
          </p>
        </motion.div>
      </motion.div>
    </>
  )
}
