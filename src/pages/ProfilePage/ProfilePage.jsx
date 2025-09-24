import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { FaUserCircle, FaEnvelope, FaPhone, FaCalendarAlt, FaSignInAlt, FaCoins, FaBook, FaQuestionCircle, FaChartLine, FaRobot } from 'react-icons/fa';

const ProfilePage = () => {
  const { user, updateProfile, checkAuthStatus } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError('');
    setSuccess('');
    if (!isEditing && user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        await checkAuthStatus(); // Refresh user data in AuthContext
      } else {
        setError(result.error || 'Failed to update profile.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bat-black)' }}>
        <p className="text-xl text-white">Please log in to view your profile.</p>
      </div>
    );
  }

  const aiUsagePercentage = user.aiDailyLimit > 0 ? Math.round((user.aiUsedCount / user.aiDailyLimit) * 100) : 0;

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 bruce-font" style={{ color: 'var(--yellow-primary)' }}>
          My Profile
        </h1>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold bruce-font" style={{ color: 'var(--bat-black)' }}>
              Personal Information
            </h2>
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-100 border border-red-300">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-xl bg-green-100 border border-green-300">
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                  <FaUserCircle className="inline-block mr-2" /> Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors"
                    required
                  />
                ) : (
                  <p className="text-lg p-3 rounded-xl" style={{ backgroundColor: 'var(--bat-light-gray)', color: 'var(--bat-black)' }}>
                    {user.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                  <FaEnvelope className="inline-block mr-2" /> Email
                </label>
                <p className="text-lg p-3 rounded-xl" style={{ backgroundColor: 'var(--bat-light-gray)', color: 'var(--bat-black)' }}>
                  {user.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                  <FaPhone className="inline-block mr-2" /> Phone
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors"
                  />
                ) : (
                  <p className="text-lg p-3 rounded-xl" style={{ backgroundColor: 'var(--bat-light-gray)', color: 'var(--bat-black)' }}>
                    {user.phone || 'N/A'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                  <FaUserCircle className="inline-block mr-2" /> Role
                </label>
                <p className="text-lg p-3 rounded-xl capitalize" style={{ backgroundColor: 'var(--bat-light-gray)', color: 'var(--bat-black)' }}>
                  {user.role}
                </p>
              </div>
            </div>
            {isEditing && (
              <div className="text-right">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-bold bruce-font mb-6" style={{ color: 'var(--bat-black)' }}>
            Account Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--bat-light-gray)' }}>
              <FaCoins className="text-4xl mx-auto mb-2" style={{ color: 'var(--yellow-primary)' }} />
              <p className="text-xl font-bold" style={{ color: 'var(--bat-black)' }}>{user.coinsRemaining || 0}</p>
              <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>Coins Remaining</p>
            </div>
            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--bat-light-gray)' }}>
              <FaChartLine className="text-4xl mx-auto mb-2" style={{ color: 'var(--yellow-primary)' }} />
              <p className="text-xl font-bold" style={{ color: 'var(--bat-black)' }}>{user.sessionAccess?.length || 0}</p>
              <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>Sessions Accessible</p>
            </div>
            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--bat-light-gray)' }}>
              <FaQuestionCircle className="text-4xl mx-auto mb-2" style={{ color: 'var(--yellow-primary)' }} />
              <p className="text-xl font-bold" style={{ color: 'var(--bat-black)' }}>{user.quizResults?.length || 0}</p>
              <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>Quizzes Taken</p>
            </div>
            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--bat-light-gray)' }}>
              <FaBook className="text-4xl mx-auto mb-2" style={{ color: 'var(--yellow-primary)' }} />
              <p className="text-xl font-bold" style={{ color: 'var(--bat-black)' }}>{user.purchasedBooks?.length || 0}</p>
              <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>Books Purchased</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-bold bruce-font mb-6" style={{ color: 'var(--bat-black)' }}>
            AI Usage
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold" style={{ color: 'var(--bat-black)' }}>AI Tutoring Enabled:</p>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.aiEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {user.aiEnabled ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold" style={{ color: 'var(--bat-black)' }}>Daily AI Limit:</p>
              <p className="text-lg" style={{ color: 'var(--bat-black)' }}>{user.aiDailyLimit || 0} requests</p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>AI Used Today:</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="h-4 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: 'var(--yellow-primary)',
                    width: `${aiUsagePercentage}%`
                  }}
                ></div>
              </div>
              <p className="text-sm mt-2" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                {user.aiUsedCount || 0} of {user.aiDailyLimit || 0} requests used ({aiUsagePercentage}%)
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold" style={{ color: 'var(--bat-black)' }}>Last AI Reset:</p>
              <p className="text-lg" style={{ color: 'var(--bat-black)' }}>{formatDate(user.aiLastResetAt)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold bruce-font mb-6" style={{ color: 'var(--bat-black)' }}>
            Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                <FaCalendarAlt className="inline-block mr-2" /> Member Since
              </label>
              <p className="text-lg p-3 rounded-xl" style={{ backgroundColor: 'var(--bat-light-gray)', color: 'var(--bat-black)' }}>
                {formatDate(user.createdAt)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                <FaSignInAlt className="inline-block mr-2" /> Last Sign In
              </label>
              <p className="text-lg p-3 rounded-xl" style={{ backgroundColor: 'var(--bat-light-gray)', color: 'var(--bat-black)' }}>
                {formatDate(user.lastSignInAt)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                Account Status
              </label>
              <p className="text-lg p-3 rounded-xl" style={{ backgroundColor: 'var(--bat-light-gray)', color: 'var(--bat-black)' }}>
                {user.blocked ? 'Blocked' : user.suspended ? 'Suspended' : 'Active'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
