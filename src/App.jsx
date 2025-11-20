import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { AuthProvider } from './contexts/AuthContext'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import ProtectedRoute from './components/ProtectedRoute'
// import HomePage from './pages/HomePage/HomePage'
// import AboutPage from './pages/AboutPage/AboutPage'
// import CoursesPage from './pages/CoursesPage/CoursesPage'
// import BooksPage from './pages/BooksPage/BooksPage'
// import QuizzesPage from './pages/QuizzesPage/QuizzesPage'
// import ProfilePage from './pages/ProfilePage/ProfilePage'
// import SettingsPage from './pages/SettingsPage/SettingsPage'
// import SignupPage from './pages/SignupPage/SignupPage'
// import LoginPage from './pages/LoginPage/LoginPage'
// import SessionsPage from './pages/SessionsPage/SessionsPage'
import LandingPage from './pages/Sani Resort/landingPage'
import './App.css'

function App() {
  return (
    // <AuthProvider>
    //   <Router>
    //     <div className="app">
    //       <Header />
    //       <Routes>
    //         <Route path="/" element={<HomePage />} />
    //         <Route path="/about" element={<AboutPage />} />
    //         <Route path="/courses" element={<CoursesPage />} />
    //         <Route path="/books" element={<BooksPage />} />
    //         <Route path="/quizzes" element={<QuizzesPage />} />
    //         <Route path="/sessions" element={<SessionsPage />} />
    //         <Route path="/login" element={<LoginPage />} />
    //         <Route path="/signup" element={<SignupPage />} />
    //         <Route path="/profile" element={
    //           <ProtectedRoute>
    //             <ProfilePage />
    //           </ProtectedRoute>
    //         } />
    //         <Route path="/settings" element={
    //           <ProtectedRoute>
    //             <SettingsPage />
    //           </ProtectedRoute>
    //         } />
    //       </Routes>
    //       <Footer />
    //     </div>
    //   </Router>
    // </AuthProvider>
    <div className="app">
      <LandingPage />
    </div>
  )
}

export default App
