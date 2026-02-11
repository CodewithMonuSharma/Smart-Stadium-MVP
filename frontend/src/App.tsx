import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
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

// No Auth required layout wrapper
const AppLayout = () => {
  return <Layout><Outlet /></Layout>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Landing & Auth Pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main App Routes - NOW PUBLIC (Auth Removed) */}
          <Route element={<AppLayout />}>
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
