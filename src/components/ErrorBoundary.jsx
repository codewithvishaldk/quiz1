import React from 'react'

export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = React.useState(false)
  const [error, setError] = React.useState(null)

  const handleError = (error, errorInfo) => {
    console.error('Error caught by boundary:', error, errorInfo)
    setHasError(true)
    setError(error.toString())
  }

  React.useEffect(() => {
    const handleUncaughtError = (event) => {
      handleError(event.error, { componentStack: '' })
    }

    window.addEventListener('error', handleUncaughtError)
    return () => window.removeEventListener('error', handleUncaughtError)
  }, [])

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 dark:bg-red-900/20 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {error}
          </p>
          <button
            onClick={() => {
              setHasError(false)
              window.location.reload()
            }}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return children
}
