import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import LoadingSpinner from '../Common/LoadingSpinner'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore()
  if (loading) return <LoadingSpinner fullscreen />
  if (!user) return <Navigate to="/login" replace />
  return children
}
