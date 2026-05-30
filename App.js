import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Documents } from './pages/Documents';
import { Flashcards } from './pages/Flashcards';
import { Quizzes } from './pages/Quizzes';
import { Chat } from './pages/Chat';
import { DocumentDetail } from './pages/DocumentDetail';
import { Lessons } from './pages/Lessons';
import { LessonDetail } from './pages/LessonDetail';
import Admin from './pages/Admin';
import './index.css';

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function AppRoutes() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <PrivateRoute>
            <Documents />
          </PrivateRoute>
        }
      />
      <Route
        path="/flashcards"
        element={
          <PrivateRoute>
            <Flashcards />
          </PrivateRoute>
        }
      />
      <Route
        path="/quizzes"
        element={
          <PrivateRoute>
            <Quizzes />
          </PrivateRoute>
        }
      />
      <Route
        path="/chat/:documentId"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
      <Route
        path="/documents/:documentId"
        element={
          <PrivateRoute>
            <DocumentDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/lessons"
        element={
          <PrivateRoute>
            <Lessons />
          </PrivateRoute>
        }
      />
      <Route
        path="/lessons/:lessonId"
        element={
          <PrivateRoute>
            <LessonDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

function AppContent() {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation user={user} onLogout={logout} />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
