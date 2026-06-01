import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center mb-6"
          animate={{ rotateY: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white font-bold text-2xl">Q</span>
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Quiz Master
        </h1>
        <motion.div
          className="flex justify-center space-x-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary-600 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
        <p className="text-gray-600 dark:text-gray-400 mt-6">Loading...</p>
      </div>
    </div>
  )
}
