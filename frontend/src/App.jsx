import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import AuthProvider from './context/AuthContext';
import ThemeProvider from './context/ThemeContext';
import ResponsiveWrapper from './context/ResponsiveContext';
import SocketProvider from './context/SocketContext';

// Components
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/common/ProtectedRoute';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import MobileNavigation from './components/responsive/MobileNavigation';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const Search = lazy(() => import('./pages/Search'));
const Matches = lazy(() => import('./pages/Matches'));
const Messages = lazy(() => import('./pages/Messages'));
const Settings = lazy(() => import('./pages/Settings'));
const Help = lazy(() => import('./pages/Help'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Layout wrapper component
const Layout = ({ children, hideNavigation = false }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!hideNavigation && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!hideNavigation && <Footer />}
      {!hideNavigation && <MobileNavigation />}
    </div>
  );
};

// Auth layout for login/register pages
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

// Admin layout
const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ResponsiveWrapper>
        <ThemeProvider>
          <AuthProvider>
            <SocketProvider>
              <Router>
                <div className="App">
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <LoadingSpinner size="lg" text="Loading..." />
                    </div>
                  }>
                    <Routes>
                      {/* Public Routes */}
                      <Route 
                        path="/" 
                        element={
                          <Layout>
                            <Home />
                          </Layout>
                        } 
                      />
                      
                      {/* Auth Routes */}
                      <Route 
                        path="/login" 
                        element={
                          <AuthLayout>
                            <Login />
                          </AuthLayout>
                        } 
                      />
                      <Route 
                        path="/register" 
                        element={
                          <AuthLayout>
                            <Register />
                          </AuthLayout>
                        } 
                      />

                      {/* Protected Routes */}
                      <Route 
                        path="/dashboard" 
                        element={
                          <ProtectedRoute>
                            <Layout>
                              <Dashboard />
                            </Layout>
                          </ProtectedRoute>
                        } 
                      />
                      
                      <Route 
                        path="/profile" 
                        element={
                          <ProtectedRoute>
                            <Layout>
                              <Profile />
                            </Layout>
                          </ProtectedRoute>
                        } 
                      />
                      
                      <Route 
                        path="/profile/edit" 
                        element={
                          <ProtectedRoute>
                            <Layout>
                              <EditProfile />
                            </Layout>
                          </ProtectedRoute>
                        } 
                      />
                      
                      <Route 
                        path="/search" 
                        element={
                          <ProtectedRoute>
                            <Layout>
                              <Search />
                            </Layout>
                          </ProtectedRoute>
                        } 
                      />
                      
                      <Route 
                        path="/matches" 
                        element={
                          <ProtectedRoute>
                            <Layout>
                              <Matches />
                            </Layout>
                          </ProtectedRoute>
                        } 
                      />
                      
                      <Route 
                        path="/messages" 
                        element={
                          <ProtectedRoute>
                            <Layout>
                              <Messages />
                            </Layout>
                          </ProtectedRoute>
                        } 
                      />
                      
                      <Route 
                        path="/settings" 
                        element={
                          <ProtectedRoute>
                            <Layout>
                              <Settings />
                            </Layout>
                          </ProtectedRoute>
                        } 
                      />

                      {/* Admin Routes */}
                      <Route 
                        path="/admin/*" 
                        element={
                          <ProtectedRoute requireAdmin>
                            <AdminLayout>
                              <AdminPanel />
                            </AdminLayout>
                          </ProtectedRoute>
                        } 
                      />

                      {/* Public Info Pages */}
                      <Route 
                        path="/help" 
                        element={
                          <Layout>
                            <Help />
                          </Layout>
                        } 
                      />
                      
                      <Route 
                        path="/privacy" 
                        element={
                          <Layout>
                            <Privacy />
                          </Layout>
                        } 
                      />
                      
                      <Route 
                        path="/terms" 
                        element={
                          <Layout>
                            <Terms />
                          </Layout>
                        } 
                      />
                      
                      <Route 
                        path="/about" 
                        element={
                          <Layout>
                            <About />
                          </Layout>
                        } 
                      />
                      
                      <Route 
                        path="/contact" 
                        element={
                          <Layout>
                            <Contact />
                          </Layout>
                        } 
                      />

                      {/* Redirect /profile/:id to protected profile view */}
                      <Route 
                        path="/profile/:id" 
                        element={
                          <ProtectedRoute>
                            <Layout>
                              <Profile />
                            </Layout>
                          </ProtectedRoute>
                        } 
                      />

                      {/* 404 Route */}
                      <Route 
                        path="/404" 
                        element={
                          <Layout hideNavigation>
                            <NotFound />
                          </Layout>
                        } 
                      />
                      
                      {/* Catch all route */}
                      <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                  </Suspense>

                  {/* Toast Notifications */}
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: '#363636',
                        color: '#fff',
                      },
                      success: {
                        duration: 3000,
                        iconTheme: {
                          primary: '#4ade80',
                          secondary: '#fff',
                        },
                      },
                      error: {
                        duration: 5000,
                        iconTheme: {
                          primary: '#ef4444',
                          secondary: '#fff',
                        },
                      },
                    }}
                  />
                </div>
              </Router>
            </SocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </ResponsiveWrapper>
    </ErrorBoundary>
  );
}

export default App;
