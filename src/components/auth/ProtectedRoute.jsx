import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bat-black)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--yellow-primary)' }}></div>
          <p className="text-xl" style={{ color: 'var(--text-primary)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bat-black)' }}>
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--yellow-primary)' }}>
              <span className="text-4xl">🔒</span>
            </div>
            <h1 className="text-4xl font-bold bruce-font mb-4" style={{ color: 'var(--text-primary)' }}>
              Authentication Required
            </h1>
            <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
              Please sign in to access this page
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate('/login')}
              className="w-full px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 border-2"
              style={{ borderColor: 'var(--yellow-primary)', color: 'var(--yellow-primary)' }}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bat-black)' }}>
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--yellow-primary)' }}>
              <span className="text-4xl">🚫</span>
            </div>
            <h1 className="text-4xl font-bold bruce-font mb-4" style={{ color: 'var(--text-primary)' }}>
              Access Denied
            </h1>
            <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
              You don't have permission to access this page
            </p>
          </div>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
