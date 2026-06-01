import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/firebase'
import { useAuthStore } from './store'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { setUser, setAdmin } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        // Check if user is admin (you can use custom claims or a separate check)
        const idTokenResult = await user.getIdTokenResult()
        if (idTokenResult.claims.admin) {
          setAdmin(user)
        }
      } else {
        setUser(null)
        setAdmin(null)
      }
      setIsLoading(false)
    })

    return unsubscribe
  }, [setUser, setAdmin])

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
