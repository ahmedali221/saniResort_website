import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/check-auth')
      
      if (response.isAuthenticated) {
        // Get user profile
        const profileResponse = await api.getProfile()
        setUser(profileResponse.user)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (identifier, password) => {
    try {
      const response = await api.post('/users/login', { identifier, password })

      setUser(response.user)
      setIsAuthenticated(true)
      return { success: true, user: response.user }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message || 'Login failed' }
    }
  }

  const signup = async (userData) => {
    try {
      const response = await api.post('/users/signup', userData)

      return { success: true, user: response.user }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: error.message || 'Signup failed' }
    }
  }

  const logout = async () => {
    try {
      await api.get('/users/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const updateProfile = async (updates) => {
    try {
      const response = await api.updateProfile(updates)
      setUser(response.user)
      return { success: true, user: response.user }
    } catch (error) {
      console.error('Profile update error:', error)
      return { success: false, error: error.message || 'Profile update failed' }
    }
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    checkAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
