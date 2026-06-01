import './styles/globals.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './services/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Toaster } from 'react-hot-toast'

// Hooks
import { useAuthStore, useUIStore } from './context/store'
import ErrorBoundary from './components/ErrorBoundary'

// Pages
import Home from './pages/Home'
import QuizList from './pages/QuizList'
import QuizPlay from './pages/QuizPlay'
import ResultPage from './pages/ResultPage'
import AdminLogin from './pages/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'

// Admin Pages
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminQuizzes from './admin/pages/AdminQuizzes'
import AdminQuestions from './admin/pages/AdminQuestions'
import AdminCategories from './admin/pages/AdminCategories'
import AdminAttempts from './admin/pages/AdminAttempts'
import AdminSettings from './admin/pages/AdminSettings'

// Components
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const { setUser, setLoading, loading, setIsAdmin } = useAuthStore()
  const { isDark } = useUIStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })

        // Check if user is admin
        try {
          const adminRef = doc(db, 'admins', user.uid)
          const adminSnap = await getDoc(adminRef)
          setIsAdmin(adminSnap.exists())
        } catch (error) {
          console.error('Error checking admin status:', error)
          setIsAdmin(false)
        }
      } else {
        setUser(null)
        setIsAdmin(false)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [setUser, setLoading, setIsAdmin])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className={isDark ? 'dark' : ''}>
          <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white transition-colors duration-200">
            <Navigation />
            <main className="min-h-[calc(100vh-200px)]">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/quizzes" element={<QuizList />} />
                <Route path="/quiz/:id" element={<QuizPlay />} />
                <Route path="/result/:attemptId" element={<ResultPage />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/quizzes"
                  element={
                    <ProtectedRoute>
                      <AdminQuizzes />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/questions"
                  element={
                    <ProtectedRoute>
                      <AdminQuestions />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/categories"
                  element={
                    <ProtectedRoute>
                      <AdminCategories />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/attempts"
                  element={
                    <ProtectedRoute>
                      <AdminAttempts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedRoute>
                      <AdminSettings />
                    </ProtectedRoute>
                  }
                />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
        <Toaster />
      </Router>
    </ErrorBoundary>
  )
}

export default App
