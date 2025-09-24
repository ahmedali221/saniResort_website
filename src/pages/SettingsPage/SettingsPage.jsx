import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../services/api'

const SettingsPage = () => {
  const { user, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [activeTab, setActiveTab] = useState('account')
  
  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  // AI settings
  const [aiSettings, setAiSettings] = useState({
    aiEnabled: true,
    aiDailyLimit: 20
  })

  // Initialize settings when user changes
  useEffect(() => {
    if (user) {
      setAiSettings({
        aiEnabled: user.aiEnabled !== false,
        aiDailyLimit: user.aiDailyLimit || 20
      })
    }
  }, [user])

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
    setSuccess('')
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match')
      return
    }
    
    if (passwordForm.newPassword.length < 6) {
      setError('New password must be at least 6 characters long')
      return
    }

    try {
      setLoading(true)
      setError('')
      
      await api.changePassword({
        password: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      })
      
      setSuccess('Password changed successfully!')
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (err) {
      setError('Failed to change password. Please check your current password.')
      console.error('Password change error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAiSettingsChange = (e) => {
    const { name, value, type, checked } = e.target
    setAiSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAiSettingsSave = async () => {
    try {
      setLoading(true)
      setError('')
      
      const result = await updateProfile(aiSettings)
      
      if (result.success) {
        setSuccess('AI settings updated successfully!')
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Failed to update AI settings')
      console.error('AI settings update error:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bat-black)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--yellow-primary)' }}></div>
          <p className="text-xl" style={{ color: 'var(--text-primary)' }}>Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bat-black)' }}>
      {/* Header */}
      <section className="py-20 px-8" style={{ backgroundColor: 'var(--yellow-primary)' }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bruce-font" style={{ color: 'var(--bat-black)' }}>
            Account Settings
          </h1>
        </div>
      </section>

      {/* Settings Content */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Success/Error Messages */}
          {success && (
            <div className="mb-8 p-4 rounded-xl bg-green-100 border border-green-300">
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}
          
          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-100 border border-red-300">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Settings Tabs */}
          <div className="bg-white rounded-2xl p-8">
            <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('account')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'account' 
                    ? 'bg-yellow-400 text-black' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Account Security
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'ai' 
                    ? 'bg-yellow-400 text-black' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                AI Settings
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'privacy' 
                    ? 'bg-yellow-400 text-black' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Privacy & Data
              </button>
            </div>

            {/* Account Security Tab */}
            {activeTab === 'account' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 bruce-font" style={{ color: 'var(--bat-black)' }}>
                  Account Security
                </h2>
                
                {/* Change Password */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--bat-black)' }}>
                    Change Password
                  </h3>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors"
                        placeholder="Enter your current password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors"
                        placeholder="Enter your new password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors"
                        placeholder="Confirm your new password"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                      style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
                    >
                      {loading ? 'Changing Password...' : 'Change Password'}
                    </button>
                  </form>
                </div>

                {/* Account Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--bat-black)' }}>
                    Account Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                        Email Address
                      </p>
                      <p className="text-lg" style={{ color: 'var(--bat-black)' }}>
                        {user.email || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                        Phone Number
                      </p>
                      <p className="text-lg" style={{ color: 'var(--bat-black)' }}>
                        {user.phone || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                        Account Created
                      </p>
                      <p className="text-lg" style={{ color: 'var(--bat-black)' }}>
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                        Last Sign In
                      </p>
                      <p className="text-lg" style={{ color: 'var(--bat-black)' }}>
                        {formatDate(user.lastSignInAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Settings Tab */}
            {activeTab === 'ai' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 bruce-font" style={{ color: 'var(--bat-black)' }}>
                  AI Tutoring Settings
                </h2>
                
                <div className="space-y-6">
                  {/* AI Enabled Toggle */}
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                    <div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                        Enable AI Tutoring
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                        Allow AI to help with your math homework and questions
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="aiEnabled"
                        checked={aiSettings.aiEnabled}
                        onChange={handleAiSettingsChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                    </label>
                  </div>

                  {/* Daily AI Limit */}
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                      Daily AI Usage Limit
                    </h3>
                    <p className="text-sm mb-4" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      Maximum number of AI requests per day
                    </p>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        name="aiDailyLimit"
                        value={aiSettings.aiDailyLimit}
                        onChange={handleAiSettingsChange}
                        min="1"
                        max="100"
                        className="w-24 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
                      />
                      <span className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                        requests per day
                      </span>
                    </div>
                  </div>

                  {/* Current Usage */}
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                      Today's Usage
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-4">
                        <div
                          className="h-4 rounded-full transition-all duration-500"
                          style={{
                            backgroundColor: 'var(--yellow-primary)',
                            width: `${((user.aiUsedCount || 0) / (user.aiDailyLimit || 20)) * 100}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: 'var(--bat-black)' }}>
                        {user.aiUsedCount || 0} / {user.aiDailyLimit || 20}
                      </span>
                    </div>
                    <p className="text-sm mt-2" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      {user.aiLastResetAt ? `Last reset: ${formatDate(user.aiLastResetAt)}` : 'Usage resets daily at midnight'}
                    </p>
                  </div>

                  <button
                    onClick={handleAiSettingsSave}
                    disabled={loading}
                    className="px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                    style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
                  >
                    {loading ? 'Saving Settings...' : 'Save AI Settings'}
                  </button>
                </div>
              </div>
            )}

            {/* Privacy & Data Tab */}
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 bruce-font" style={{ color: 'var(--bat-black)' }}>
                  Privacy & Data
                </h2>
                
                <div className="space-y-6">
                  {/* Data Collection */}
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--bat-black)' }}>
                      Data We Collect
                    </h3>
                    <ul className="space-y-2 text-sm" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
                      <li>• Personal information (name, email, phone)</li>
                      <li>• Learning progress and quiz results</li>
                      <li>• AI interaction history</li>
                      <li>• Session watch history</li>
                      <li>• Purchase history and preferences</li>
                    </ul>
                  </div>

                  {/* Data Usage */}
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--bat-black)' }}>
                      How We Use Your Data
                    </h3>
                    <ul className="space-y-2 text-sm" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
                      <li>• Provide personalized learning experiences</li>
                      <li>• Track your progress and achievements</li>
                      <li>• Improve our AI tutoring system</li>
                      <li>• Send important account notifications</li>
                      <li>• Generate learning analytics and reports</li>
                    </ul>
                  </div>

                  {/* Data Export */}
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--bat-black)' }}>
                      Your Data Rights
                    </h3>
                    <div className="space-y-4">
                      <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
                        You have the right to access, modify, or delete your personal data. 
                        Contact support if you need assistance with data-related requests.
                      </p>
                      <div className="flex gap-4">
                        <button
                          className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 border-2"
                          style={{ borderColor: 'var(--bat-black)', color: 'var(--bat-black)' }}
                        >
                          Export My Data
                        </button>
                        <button
                          className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
                          style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}
                        >
                          Contact Support
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SettingsPage
