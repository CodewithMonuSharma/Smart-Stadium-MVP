import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Crowd from '@/pages/Crowd';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Ticketing from '@/pages/Ticketing';
import Energy from '@/pages/Energy';
import Merchandise from '@/pages/Merchandise';
import Analytics from '@/pages/Analytics';
import Sustainability from '@/pages/Sustainability';

// Protected Route Component
const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="flex h-screen items-center justify-center text-purple-600">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Layout><Outlet /></Layout>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crowd" element={<Crowd />} />
            <Route path="/ticketing" element={<Ticketing />} />
            <Route path="/energy" element={<Energy />} />
            <Route path="/merchandise" element={<Merchandise />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/sustainability" element={<Sustainability />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
