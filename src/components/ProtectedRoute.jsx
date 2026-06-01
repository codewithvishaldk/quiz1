import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../context/store'
import LoadingScreen from './LoadingScreen'

export default function ProtectedRoute({ children }) {
  const { user, isAdmin, loading } = useAuthStore()

  if (loading) {
    return <LoadingScreen />
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
