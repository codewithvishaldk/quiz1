import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { quizService, questionService, attemptService } from '../services/db'
import { FeedbackOverlay } from '../components/FeedbackOverlay'
import { QuestionSkeleton } from '../components/Skeletons'
import { Clock, ChevronRight } from 'lucide-react'
import { useQuizStore } from '../context/store'
import { calculateScore } from '../utils/grading'

export default function QuizPlay() {
  const { id: quizId } = useParams()
  const navigate = useNavigate()
  const {
    currentQuiz,
    setCurrentQuiz,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    recordAnswer,
    setScore,
    setStartTime,
    setEndTime,
  } = useQuizStore()

  const [quiz, setQuiz] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true)
        const [quizData, questionsData] = await Promise.all([
          quizService.getQuiz(quizId),
          questionService.getQuestions(quizId),
        ])
        setQuiz(quizData)
        setQuestions(questionsData)
        setCurrentQuiz(quizData)
      } catch (error) {
        console.error('Error fetching quiz:', error)
      } finally {
        setLoading(false)
      }
    }

    if (!currentQuiz) {
      fetchQuizData()
    } else {
      setQuiz(currentQuiz)
    }
  }, [quizId, currentQuiz, setCurrentQuiz])

  useEffect(() => {
    if (quizStarted) {
      setStartTime(Date.now())
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [quizStarted, setStartTime])

  const handleStartQuiz = () => {
    setQuizStarted(true)
  }

  const handleAnswerSelect = (option) => {
    if (showFeedback) return

    const currentQuestion = questions[currentQuestionIndex]
    const correct = option === currentQuestion.correctAnswer
    
    setSelectedAnswer(option)
    setIsCorrect(correct)
    recordAnswer(currentQuestion.id, option)
    setShowFeedback(true)

    if (correct) {
      setScore(calculateScore(Object.keys(answers).length + 1, questions.length))
    }
  }

  const handleNextQuestion = () => {
    setShowFeedback(false)
    setSelectedAnswer(null)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      handleQuizEnd()
    }
  }

  const handleQuizEnd = async () => {
    setEndTime(Date.now())

    const correctCount = Object.keys(answers).reduce((count, questionId) => {
      const question = questions.find((q) => q.id === questionId)
      return answers[questionId] === question.correctAnswer ? count + 1 : count
    }, 0)

    const score = calculateScore(correctCount, questions.length)
    setScore(score)

    try {
      const attempt = await attemptService.recordAttempt({
        quizId,
        userId: 'anonymous',
        score,
        correctAnswers: correctCount,
        totalQuestions: questions.length,
        timeSpent: timeElapsed,
        answers,
      })

      navigate(`/result/${attempt.id}`)
    } catch (error) {
      console.error('Error recording attempt:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <QuestionSkeleton />
        </div>
      </div>
    )
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Quiz not found or no questions available
          </p>
        </div>
      </div>
    )
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 text-center"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center mb-6">
              <span className="text-white font-bold text-4xl">Q</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {quiz.title}
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {quiz.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Questions</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {questions.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Difficulty</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {quiz.difficulty?.toUpperCase() || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Time Limit</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  Unlimited
                </p>
              </div>
            </div>

            <motion.button
              onClick={handleStartQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-colors text-lg"
            >
              Start Quiz
            </motion.button>
          </motion.div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}</span>
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-600 to-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option
                const isCorrectOption = option === currentQuestion.correctAnswer
                let bgClass = 'bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600'

                if (showFeedback) {
                  if (isCorrectOption) {
                    bgClass = 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
                  } else if (isSelected && !isCorrect) {
                    bgClass = 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500'
                  }
                }

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showFeedback}
                    whileHover={!showFeedback ? { scale: 1.02 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                    className={`w-full p-4 rounded-lg text-left font-medium transition-all ${bgClass} ${
                      !showFeedback ? 'cursor-pointer hover:shadow-md' : 'cursor-default'
                    } ${
                      isSelected && !showFeedback ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'bg-primary-600 border-primary-600' : 'border-gray-400'
                      }`}>
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-gray-900 dark:text-white">
                        {option}
                      </span>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {currentQuestion.explanation && showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
              >
                <p className="text-sm text-blue-900 dark:text-blue-300">
                  <span className="font-semibold">Explanation: </span>
                  {currentQuestion.explanation}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4"
          >
            <button
              onClick={handleNextQuestion}
              className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>
                {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {showFeedback && (
          <FeedbackOverlay
            isCorrect={isCorrect}
            selectedAnswer={selectedAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            onAnimationEnd={() => {
              // Auto move to next after 2 seconds
              const timer = setTimeout(() => {
                handleNextQuestion()
              }, 2000)
              return () => clearTimeout(timer)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
